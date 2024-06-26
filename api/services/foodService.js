const { default: axios } = require("axios");
const DiaryDay = require("../models/DiaryDay");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

// REMEMBER TO CHANGE TO ORG!
const openFoodFactsAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org",
});

const openFoodFactsSearchAPI = axios.create({
  baseURL: "https://search.openfoodfacts.org",
});

// We need try catch here to make sure it doesn't just exit and bubble up...
async function fetchProductWithFallback(searchTerm) {
  // try {
  //   // First try to fetch using the search API
  //   const response = await openFoodFactsSearchAPI.get("/searc", {
  //     params: {
  //       // q: `states_tags:"en:photos-uploaded" brands_tags:"aldi" ${searchTerm}`,
  //       q: `states_tags:"en:front-photo-selected" AND states_tags:"en:photos-uploaded" AND states_tags:"en:product-name-completed" AND states_tags:"en:ingredients-completed" AND states_tags:"en:brands-completed" AND countries_tags:"en:united-kingdom" ${searchTerm}`,
  //       // q: searchTerm,
  //       fields: "brands,code,image_url,product_name,nova_group",
  //       page_size: 30,
  //       countries: "united-kingdom",
  //     },
  //   });
  //   // Check if data is valid
  //   if (response.data) {
  //     return response.data.hits;
  //   }
  // } catch (error) {
  //   console.error("Error with openFoodFactsSearchAPI:", error.message);
  // }

  // Attempt fallback to the second API
  const fallbackResponse = await openFoodFactsAPI.get("/cgi/search.pl", {
    params: {
      action: "process",
      search_terms: searchTerm,
      // sort_by: "popularity_key", // left out since default popularity
      // page: 1,
      page_size: 30,
      states_tags: "product-name-completed",
      fields: "brands,code,image_url,product_name,nova_group",
      countries_tags_en: "united-kingdom", // This is correct
      json: 1, //correct
    },
  });
  if (fallbackResponse.data && fallbackResponse.data.products) {
    return fallbackResponse.data.products;
  }
}

async function checkIsInGroceryList(userId, identifier, isBarcode = true) {
  const groceries = await Grocery.findOne({ userId: userId }).populate(
    "groceries.item"
  );

  if (!groceries) return false; // Not in grocery list since none made yet

  return groceries.groceries.some((groceryItem) =>
    isBarcode
      ? groceryItem.item.barcode === identifier
      : groceryItem.item._id.toString() === identifier
  );
}

async function checkIsConsumedToday(
  userId,
  identifier,
  isBarcode = true,
  date
) {
  const decodedDate = decodeURIComponent(date);
  const localDate = new Date(decodedDate + "T00:00:00.000Z");

  const diaryDay = await DiaryDay.findOne({
    userId: userId,
    date: localDate,
  }).populate(isBarcode ? "consumedFoods" : "consumedSingleFoods");

  if (!diaryDay) return false; // Not in diary day since none made yet..

  return diaryDay[isBarcode ? "consumedFoods" : "consumedSingleFoods"].some(
    (foodItem) =>
      isBarcode
        ? foodItem.barcode === identifier
        : foodItem._id.toString() === identifier
  );
}

async function fetchOFFWithBarcode({ userId, barcode, date }) {
  const [isInGroceryList, isConsumedToday, fullResponse] = await Promise.all([
    checkIsInGroceryList(userId, barcode, true),
    checkIsConsumedToday(userId, barcode, true, date),
    openFoodFactsAPI.get(
      `/api/v3/product/${barcode}?fields=knowledge_panels,ingredients_text_en,packagings,ingredients_n,ingredients_tags,ingredients_text,ingredients_analysis_tags,nova_group,ingredients_hierarchy,brands,image_url,product_name`
    ),
  ]);

  const product = fullResponse?.data?.product;

  if (!product) {
    throw new NotFoundError("Product data not available");
  }

  const knowledgePanels = product?.knowledge_panels || {};

  const ingredients =
    product.ingredients_text_en || product.ingredients_text || "";

  console.log(knowledgePanels.additives);

  const additives = (knowledgePanels.additives?.elements || [])
    .map((el) => {
      const title =
        knowledgePanels[el.panel_element?.panel_id]?.title_element?.title;

      return title || undefined;
    })
    .filter((title) => title !== undefined); //  empty array if error

  // Maybe unknown should be the last one instead of "No"
  // Need to relook at tags!

  const getPalmOilContent = (product) => {
    if (!Array.isArray(product.ingredients_analysis_tags)) return "Unknown";
    const hasPalmOil = product.ingredients_analysis_tags.includes("en:palm-oil")
      ? "Yes"
      : product.ingredients_analysis_tags.includes("en:palm-oil-free")
      ? "No"
      : "Unknown";

    return hasPalmOil;
  };

  const co2Footprint = [
    knowledgePanels.carbon_footprint?.title_element?.subtitle,
    knowledgePanels.carbon_footprint?.title_element?.title,
  ];

  const packagingImpact =
    knowledgePanels.ecoscore_packaging?.title_element?.title;

  const processedState =
    product.nova_group === 1
      ? "Perfect"
      : product.nova_group === 2
      ? "Good"
      : product.nova_group === 3
      ? "Processed"
      : product.nova_group === 4
      ? "Processed"
      : "Unknown";

  // Need to deal with this on frontend and make sure its correct way to find it
  const hasVegetableOil = Array.isArray(product.ingredients_tags)
    ? product.ingredients_tags.some(
        (tag) =>
          tag === "en:vegetable-oil-and-fat" || tag === "en:vegetable-oil"
      )
    : "Unknown";

  const ecoscore =
    knowledgePanels.ecoscore_total?.title_element?.grade?.toUpperCase();

  const transformPackagingData = (packagings) => {
    return packagings.map((packaging) => {
      const shape = packaging.shape?.id
        ? packaging.shape.id.split(":").pop()
        : "Unknown shape";
      const material = packaging.material?.id
        ? packaging.material.id.split(":").pop()
        : "Unknown material";
      return { shape, material };
    });
  };

  console.log(product.packagings);

  const packagingData = product.packagings
    ? transformPackagingData(product.packagings)
    : [];

  return {
    name: product.product_name,
    processedScore: 100,
    processedState,
    brand: Array.isArray(product.brands) ? product.brands[0] : product.brands,
    image_url: product.image_url,
    ingredients: ingredients,
    additives: additives,
    barcode: barcode,
    novaScore: product.nova_group,
    isConsumedToday,
    isInGroceryList,
    packagingData,
    hasPalmOil: getPalmOilContent(product),
    hasVegetableOil,
    co2Footprint,
    ingredientsCount: product?.ingredients_n,
    ecoscore,
    packagingImpact,
  };
}

async function fetchOFFWithSearch({ search_term }) {
  const products = await fetchProductWithFallback(search_term);
  // Maybe return empty array instead so dont need to throw error?
  // Test this to see what happens
  if (!products) {
    throw new NotFoundError("No search results for this search term");
  }

  const foodList = products.map((product) => {
    // const processedScore = 100 - (product.nova_group - 1) * 25;
    const processedState =
      product.nova_group === 1
        ? "Perfect"
        : product.nova_group === 2
        ? "Good"
        : product.nova_group === 3
        ? "Processed"
        : product.nova_group === 4
        ? "Processed"
        : "Unknown";

    return {
      name: product.product_name,
      processedScore: 100, // dont use anymore
      processedState,
      brand: product.brands,
      image_url: product.image_url,
      barcode: product.code,
    };
  });

  return foodList;
}

async function fetchSingleFoodsWithSearch({ searchTerm }) {
  const searchStage = {
    $search: {
      autocomplete: {
        query: searchTerm,
        fuzzy: {
          maxEdits: 2,
          prefixLength: 3,
        },
        path: "name",
        tokenOrder: "sequential",
      },
    },
  };

  const results = await SingleFood.aggregate([
    searchStage,
    {
      $limit: 10,
    },
    {
      $project: { name: 1, image_url: 1, processedScore: 1, processedState: 1 }, // Adjust based on the fields you want to return
    },
  ]);

  return results;
}

async function fetchSingleFoodsWithIvyId({ IvyId, userId, date }) {
  const singleFood = await SingleFood.findById(IvyId).lean();

  if (!singleFood) throw new Error("No single food with this IvyId");

  const isInGroceryList = await checkIsInGroceryList(userId, IvyId, false);
  const isConsumedToday = await checkIsConsumedToday(
    userId,
    IvyId,
    false,
    date
  );

  return { singleFood, isConsumedToday, isInGroceryList };
}

module.exports = {
  fetchOFFWithBarcode,
  fetchOFFWithSearch,
  fetchSingleFoodsWithSearch,
  fetchSingleFoodsWithIvyId,
};
