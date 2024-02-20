import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const openFoodFactsAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/open-food-facts/",
});

openFoodFactsAPI.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFoodWithBarcode = async (barcode) => {
  try {
    const res = await openFoodFactsAPI.get(`products/${barcode}`);
    return res.data;
  } catch {
    //else jsut show we dont have that product in DB
    console.error(error, "MY ERROR");
  }
};

export const fetchFoodWithSearch = async (search_term) => {
  try {
    const res = await openFoodFactsAPI.get(`products/search/${search_term}`);
    return res.data;
  } catch {
    //else jsut show we dont have that product in DB
    console.error(error, "MY ERROR");
  }
};
