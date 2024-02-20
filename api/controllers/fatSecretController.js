// Endpoint to fetch food details by barcode
const axios = require("axios");
const DiaryDay = require("../models/DiaryDay");

const fatSecretAPI = axios.create({
  baseURL: 'https://platform.fatsecret.com/rest/server.api',
});

let accessToken = null;
let tokenExpires = 0;

// Function to determine if the current access token is expired
const isTokenExpired = () => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime >= tokenExpires;
};

// Updated function to request an access token and manage its expiration
const requestAccessToken = async () => {
  if (!isTokenExpired() && accessToken) {
    return accessToken; // Return the current access token if it's still valid
  }
  
  try {
    const tokenResponse = await axios.post('https://oauth.fatsecret.com/connect/token', 'grant_type=client_credentials&scope=basic', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.FATSECRET_CLIENT_ID,
        password: process.env.FATSECRET_CLIENT_SECRET
      }
    });

    accessToken = tokenResponse.data.access_token; // Store the new access token
    const expiresIn = tokenResponse.data.expires_in; // Time in seconds until token expires
    tokenExpires = Math.floor(Date.now() / 1000) + expiresIn; // Calculate the future expiration time

    return accessToken;
  } catch (error) {
    console.error('Error requesting access token:', error);
    throw new Error('Failed to obtain access token');
  }
};

// Example function to fetch food details by search term using FatSecret API
const fetchFoodWithSearchFatSecret = async (req, res) => {
  const search_term = req.params.search_term;
  const accessToken = await requestAccessToken(); // Get the access token

  try {
    const response = await fatSecretAPI.post('', `method=foods.search&search_expression=${encodeURIComponent(search_term)}&format=json`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    });

    if (!response) throw new Error("No response?");

    // Process and return the data from FatSecret API
    // Note: Adjust the following according to the actual structure of FatSecret's response
    const foodList = response.data


    res.json(foodList);
  } catch (error) {
    console.error('Error fetching food with search:', error);
    res.status(500).send('Failed to fetch food details');
  }
};

module.exports = { fetchFoodWithSearchFatSecret };
