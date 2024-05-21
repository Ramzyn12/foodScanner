import axios from "axios";
import { storage } from "../utils/MMKVStorage";

const healthMetricAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/health-metrics", // Replace with your API's base URL
  // withCredentials: true,
  // You can add more configurations like headers here
});

healthMetricAPI.interceptors.request.use(async (config) => {
  // const token = await AsyncStorage.getItem("firebaseToken");
  const token = storage.getString("firebaseToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const updateHealthMetric = async ({ metric, date, metricValue, unitOfMeasure }) => {
  try {
    const res = await healthMetricAPI.post(`/${date}/${metric}`, {
      metricValue,
      unitOfMeasure
    });
    return res.data;
  } catch (error) {
    console.error("Error adding user info:", error);
    throw error;
  }
};

export const getRecentMetric = async ({ metric }) => {
  try {
    const res = await healthMetricAPI.get(`/recent?metric=${metric}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDataForMetric = async ({ metric, timeFrame }) => {
  try {
    const res = await healthMetricAPI.get(`/?metric=${metric}&timeFrame=${timeFrame}`);
    return res.data;
  } catch (error) {
    console.error("Error adding user info:", error);
    throw error;
  }
};
