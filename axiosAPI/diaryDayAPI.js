import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { storage } from "../utils/MMKVStorage";

const diaryDayAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/diary-days", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

diaryDayAPI.interceptors.request.use(async(config) => {
  // const token = await AsyncStorage.getItem("firebaseToken");
  const token = storage.getString('firebaseToken') 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addFoodToDiaryDay = async ({ barcode, singleFoodId, name, brand, ingredients, additives, processedScore, processedState, image_url, date }) => {
  try {
    const res = await diaryDayAPI.post('/', { barcode, singleFoodId, name, brand, ingredients, additives, processedScore, processedState, image_url, date });
    return res.data
  } catch (error) {
    console.error("Error adding user info:", error);
    throw error;
  }
};

export const removeFoodFromDiaryDay = async ({ barcode, singleFoodId, date }) => {
  try {
    const res = await diaryDayAPI.post(`/remove`, {barcode, singleFoodId, date});
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
    console.error("Error getting diary DAy", error);
    throw error;
  }
};

export const getAllDiaryDays = async () => {
  try {
    const res = await diaryDayAPI.get(`/all`);
    return res.data
  } catch (error) {
    console.error("Error getting diary DAysss:", error);
    throw error;
  }
};