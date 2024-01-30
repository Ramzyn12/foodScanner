import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebaseConfig";

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
      await signInWithCustomToken(auth, data.token);
      console.log("User signed in with custom token");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during sign up:", error.response.data);
    }
    console.log("Error during sign up:", error);
  }
};

export const loginUser = async (userData) => {
  return authAPI.post("/login", userData);
};
