import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import foodReducer from "./foodSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    search: searchReducer
  },
});

export default store;
