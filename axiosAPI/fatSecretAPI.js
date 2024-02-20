import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const fatSecretAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/fat-secret/",
});

fatSecretAPI.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFoodWithSearchFS = async (search_term) => {
  try {
    const res = await fatSecretAPI.get(`products/search/${search_term}`);
    return res.data;
  } catch {
    console.error(error, "MY ERROR");
  }
};
