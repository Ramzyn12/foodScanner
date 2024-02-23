import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import foodReducer from "./foodSlice";
import searchReducer from "./searchSlice";
import groceryReducer from "./grocerySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    search: searchReducer,
    grocery: groceryReducer
  },
});

export default store;
