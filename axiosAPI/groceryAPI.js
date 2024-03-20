import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const groceryAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/groceries", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

groceryAPI.interceptors.request.use(async(config) => {
  const token = await AsyncStorage.getItem("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addFoodToGroceryList = async ({ barcode, singleFoodId, name, brand, ingredients, additives, processedScore, processedState, image_url }) => {
  try {
    const res = await groceryAPI.post('/', { barcode, singleFoodId, name, brand, ingredients, additives, processedScore, processedState, image_url });
    return res.data
  } catch (error) {
    console.error("Error adding user info:", error);
    throw error;
  }
};

export const removeFoodFromGroceryList = async ({barcode, singleFoodId}) => {
  try {
    const res = await groceryAPI.post(`/remove`, {barcode, singleFoodId});
    return res.data
  } catch (error) {
    console.error("Error deleting user info:", error);
    throw error;
  }
};

export const toggleCheckedState = async ({groceryItemId}) => {
  try {
    const res = await groceryAPI.patch(`/${groceryItemId}/toggle`);
    return res.data
  } catch (error) {
    console.error("Error deleting user info:", error);
    throw error;
  }
};

export const uncheckAllItems = async () => {
  try {
    const res = await groceryAPI.post(`/uncheck-all`);
    return res.data
  } catch (error) {
    console.error("Error deleting user info:", error);
    throw error;
  }
};

export const getGroceryList = async () => {
  try {
    const res = await groceryAPI.get(`/`);
    return res.data
  } catch (error) {
    console.error("Error fetching user info:", error.response.data.message);
    throw error;
  }
};

export const updateSortPreference = async ({sortPreference}) => {
  try {
    const res = await groceryAPI.post(`/sort`, {sortPreference});
    return res.data
  } catch (error) {
    console.error("Error fetching user info:", error.response.data.message);
    throw error;
  }
};

export const updateOrder = async ({itemOrder}) => {

  try {
    const res = await groceryAPI.post(`/updateOrder`, {itemOrder});
    return res.data
  } catch (error) {
    console.error("Error fetching user info:", error.response.data.message);
    throw error;
  }
};