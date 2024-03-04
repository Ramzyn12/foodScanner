import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import foodReducer from "./foodSlice";
import searchReducer from "./searchSlice";
import groceryReducer from "./grocerySlice";
import onboardingReducer from "./onboardingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    search: searchReducer,
    grocery: groceryReducer,
    onboarding: onboardingReducer
  },
});

export default store;
