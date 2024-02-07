import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/auth/",
});

export const signUpApple = async ({ email, uid, idToken }) => {
  try {
    const response = await authAPI.post("signUpApple", {
      email,
      uid,
      idToken
    });
    return response.data;
  } catch (error) {
    
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during sign up:", error.response.data);
    }
    console.log("Error during sign up:", error);
    throw new Error(error.response.data)
  }
};

export const signUp = async ({ email, password }) => {
  if (password.length < 6) {
    console.log("Password needs to be at least 6 characters.");
    return;
  }

  try {
    const response = await authAPI.post("signUp", {
      email: email,
      password: password,
    });

    const data = response.data;

    if (data.token) {
      const userCredential = await signInWithCustomToken(auth, data.token);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get Firebase token
      await AsyncStorage.setItem('firebaseToken', token); // Store token
      return { user, token };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during sign up axios:", error.response.data);
    }
    console.log("Error during sign up:", error);
  }
};


