import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const searchSingleAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/ivy/",
});

searchSingleAPI.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFoodWithSearchIvy = async (search_term) => {
  try {
    const res = await searchSingleAPI.get(`search/${search_term}`);
    return res.data;
  } catch {
    console.error(error, "MY ERROR");
  }
};

export const fetchFoodWithIvyId = async (IvyId) => {
  try {
    const res = await searchSingleAPI.get(`${IvyId}`);
    return res.data;
  } catch {
    console.error(error, "MY ERROR");
  }
};

