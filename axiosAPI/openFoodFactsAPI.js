import axios from "axios";

const openFoodFactsAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org",
});

export const fetchFoodWithBarcode = async (barcode) => {
  try {
    const res = await openFoodFactsAPI.get(`/api/v2/product/${barcode}`);
    return res.data;
  } catch {
    //else jsut show we dont have that product in DB
    console.error(error, "MY ERROR");
  }
};
