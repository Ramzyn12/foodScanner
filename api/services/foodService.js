const { default: axios } = require("axios");
const DiaryDay = require("../models/DiaryDay");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

const openFoodFactsAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org",
});

async function checkIsInGroceryList(userId, identifier, isBarcode = true) {
  //ERROR HANDLING? 
  const groceries = await Grocery.findOne({ userId: userId }).populate(
    "groceries.item"
  );
  if (!groceries) return false;

  return groceries.groceries.some((groceryItem) =>
    isBarcode
      ? groceryItem.item.barcode === identifier
      : groceryItem.item._id.toString() === identifier
  );
}

async function checkIsConsumedToday(userId, identifier, isBarcode = true, date) {

  const decodedDate = decodeURIComponent(date)
  const decodedDateObj = new Date(decodedDate)
  decodedDateObj.setHours(0,0,0,0)

  const diaryDay = await DiaryDay.findOne({
    userId: userId,
    date: decodedDateObj,
  }).populate(isBarcode ? "consumedFoods" : "consumedSingleFoods");
  if (!diaryDay) return false;

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
    openFoodFactsAPI.get(`/api/v3/product/${barcode}?fields=knowledge_panels,ingredients_text_en,ingredients_analysis_tags,nova_group,ingredients_hierarchy,brands,image_url,product_name`),
  ]);

  const product = fullResponse.data.product
  const knowledgePanels = product.knowledge_panels

  const ingredients = product.ingredients_text_en
  const additives = knowledgePanels?.additives?.elements.map(el => knowledgePanels[el.panel_element.panel_id].title_element.title)
  // Maybe unknown should be the last one instead of "No"
  const hasPalmOil = product.ingredients_analysis_tags.includes("en:palm-oil")
    ? "Yes"
    : product.ingredients_analysis_tags.includes("en:palm-oil-content-unknown")
    ? "Unknown"
    : "No";
  const co2Footprint = [knowledgePanels?.carbon_footprint?.title_element?.subtitle, knowledgePanels?.carbon_footprint?.title_element?.title] 
  // const co2Footprint = product.ecoscore_data.agribalyse?.co2_total
  const processedState = product.nova_group === 1 ? 'Perfect' : product.nova_group === 2 ? 'Good' : 'Processed'
  const hasVegetableOil = product?.ingredients_hierarchy?.includes('en:vegetable-oil-and-fat')
  const ecoscore = knowledgePanels?.ecoscore_total?.title_element?.grade?.toUpperCase()

  return {
    name: product.product_name,
    processedScore: 100 - (product.nova_group - 1) * 25,
    processedState,
    brand: product.brands, 
    image_url: product.image_url,
    ingredients: ingredients,
    additives: additives,
    barcode: barcode,
    isConsumedToday,
    isInGroceryList,
    hasPalmOil,
    hasVegetableOil,
    co2Footprint,
    ecoscore
  };
}

async function fetchOFFWithSearch({ search_term }) {
  const response = await openFoodFactsAPI.get("/cgi/search.pl", {
    params: {
      action: "process",
      search_terms: search_term,
      sort_by: "popularity_key",
      page_size: 20,
      countries_tags: "united-kingdom",
      json: 1,
    },
  });

  // Maybe return empty array instead so dont need to throw error?
  if (!response) throw new NotFoundError("No search results for this search term");

  const products = response.data.products;

  const foodList = products.map((product) => {
    const processedScore = 100 - (product.nova_group - 1) * 25;
    const processedState = product.nova_group === 1 ? 'Perfect' : product.nova_group === 2 ? 'Good' : 'Processed'

    return {
      name: product.product_name,
      processedScore: processedScore,
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

  // console.log(date.setHours(0,0,0,0));

  const singleFood = await SingleFood.findById(IvyId).lean();

  if (!singleFood) throw new Error("No single food with this IvyId");

  const isInGroceryList = await checkIsInGroceryList(userId, IvyId, false);
  const isConsumedToday = await checkIsConsumedToday(userId, IvyId, false, date);

  return { singleFood, isConsumedToday, isInGroceryList };
}

module.exports = {
  fetchOFFWithBarcode,
  fetchOFFWithSearch,
  fetchSingleFoodsWithSearch,
  fetchSingleFoodsWithIvyId,
};
