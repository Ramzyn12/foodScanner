import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { storage } from "../utils/MMKVStorage";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

const noteAPI = axios.create({
  baseURL: BACKEND_URL + "/api/v1/notes", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

noteAPI.interceptors.request.use(async (config) => {
  // const token = await AsyncStorage.getItem("firebaseToken");
  const token = storage.getString("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getNote = async ({ date }) => {
  try {
    const res = await noteAPI.get(`/date/${date}`);
    return res.data;
  } catch (error) {
    // console.log(error.res.message);
    throw error;
  }
};

export const updateNote = async ({ date, note }) => {
  try {
    const res = await noteAPI.post(`/date/${date}`, { note });
    return res.data;
  } catch (error) {
    throw error;
  }
};
