import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const usdaAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/usda/",
});

usdaAPI.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFoodWithSearchUSDA = async (search_term) => {
  try {
    const res = await usdaAPI.get(`products/search/${search_term}`);
    return res.data;
  } catch {
    console.error(error, "MY ERROR");
  }
};

export const fetchFoodWithFDCID = async (fdcId) => {
  try {
    const res = await usdaAPI.get(`products/${fdcId}`);
    return res.data;
  } catch {
    console.error(error, "MY ERROR");
  }
};
