// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrVqTjFZkPDLVnV_Kn4Cc3Q7ENM6kkb5E",
  authDomain: "foodscans-2c874.firebaseapp.com",
  projectId: "foodscans-2c874",
  storageBucket: "foodscans-2c874.appspot.com",
  messagingSenderId: "208553581890",
  appId: "1:208553581890:web:c488aa595af8e6e1857cdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// export const auth = getAuth(app)

