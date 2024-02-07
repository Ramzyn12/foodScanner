import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const diaryDayAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/diary-days", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

diaryDayAPI.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addFoodToDiaryDay = async ({ barcode, name, brand = 'Tesco', ingredients, additives, processedScore, image_url }) => {
  try {
    const res = await diaryDayAPI.post('/', { barcode, name, brand, ingredients, additives, processedScore, image_url });
    return res.data
  } catch (error) {
    console.error("Error adding user info:", error);
    throw error;
  }
};

export const removeFoodFromDiaryDay = async ({ barcode }) => {
  try {
    const res = await diaryDayAPI.delete(`/${barcode}`);
    return res.data
  } catch (error) {
    console.error("Error deleting user info:", error);
    throw error;
  }
};

export const getDiaryDay = async ({ date }) => {
  try {
    const res = await diaryDayAPI.get(`/${date}`);
    return res.data
  } catch (error) {
    console.error("Error fetching user info:", error.response.data.message);
    throw error;
  }
};