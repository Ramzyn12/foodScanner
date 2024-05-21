import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { storage } from "../utils/MMKVStorage";

const userAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/users", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

userAPI.interceptors.request.use(async (config) => {
  // const token = await AsyncStorage.getItem("firebaseToken");
  const token = storage.getString('firebaseToken') 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addUserNames = async ({ firstName, lastName }) => {
  try {
    const res = await userAPI.post("/names", { firstName, lastName });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserNames = async () => {
  try {
    const res = await userAPI.get("/names");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeUserAccount = async ({ firebaseId }) => {
  try {
    const res = await userAPI.delete(`/removeUser/${firebaseId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const toggleUserHaptics = async () => {
  try {
    const res = await userAPI.post(`haptics/toggle`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getUserHaptics = async () => {
  try {
    const res = await userAPI.get(`haptics`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
