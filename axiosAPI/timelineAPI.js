import axios from "axios";
import { storage } from "../utils/MMKVStorage";

const timelineAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/timeline-weeks", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

timelineAPI.interceptors.request.use(async (config) => {
  // const token = await AsyncStorage.getItem("firebaseToken");
  const token = storage.getString("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRecentTimelineWeek = async () => {
  try {
    const res = await timelineAPI.get(`/recent`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTimelineWeeks = async () => {
  try {
    const res = await timelineAPI.get(`/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTimelineWeek = async ({ week }) => {
  try {
    const res = await timelineAPI.get(`/week/${week}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
