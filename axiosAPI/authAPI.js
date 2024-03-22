import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth'
const authAPI = axios.create({
  baseURL: "http://192.168.0.145:3000/api/v1/auth/",
});

export const signUpApple = async ({ email, uid, idToken, userInformation }) => {
  try {
    const response = await authAPI.post("signUpApple", {
      email,
      uid,
      idToken,
      userInformation
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during sign up:", error.response.data);
    }
    console.log("Error during sign up:", error);
    throw new Error(error.response.data);
  }
};

export const signUp = async ({ email, password, userInfo }) => {
  if (password.length < 6) {
    throw new Error('Password needs to be at least 6 characters.')
  }

  try {
    const response = await authAPI.post("signUp", {
      email: email,
      password: password,
      userInfo
    });

    const data = response.data;

    if (data.token) {
      const userCredential = await auth().signInWithCustomToken(data.token);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get Firebase token
      await AsyncStorage.setItem("firebaseToken", token); // Store token
      return { user, token, firebaseId: data.firebaseId };
    }
  } catch (error) {
    console.log("Error during sign up: authAPI", error);
    throw error;

  }
};

// export const addFirstLastName = async ({ firstName, lastName, firebaseId }) => {
//   try {
//     const response = await authAPI.post("names", {
//       firstName,
//       lastName,
//       firebaseId
//     });
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.log("Error during adding first and last name:", error);
//   }
// };
