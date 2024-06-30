import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { storage } from "../utils/MMKVStorage";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

const openFoodFactsAPI = axios.create({
  baseURL: BACKEND_URL + "/api/v1/open-food-facts/",
});

openFoodFactsAPI.interceptors.request.use(async(config) => {
  // const token = await AsyncStorage.getItem("firebaseToken");
  const token = storage.getString('firebaseToken') 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFoodWithBarcode = async (barcode, date) => {
  try {
    const res = await openFoodFactsAPI.get(`products/${barcode}/date/${date}`);
    return res.data;
  } catch (error) {
    throw error
  }
};

export const fetchFoodWithSearch = async (search_term) => {
  try {
    const res = await openFoodFactsAPI.get(`products/search/${search_term}`);
    return res.data;
  } catch (error) {
    //else jsut show we dont have that product in DB
    throw err
  }
};
