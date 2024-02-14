// In your searchSlice.js or wherever you define your Redux slices

import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    openFoodFactsResults: [],
    IvyResults: [],
  },
  reducers: {
    setOpenFoodFactsResults: (state, action) => {
      state.openFoodFactsResults = action.payload;
    },
    setIvyResults: (state, action) => {
      state.IvyResults = action.payload;
    },
  },
});

export const { setOpenFoodFactsResults, setIvyResults } = searchSlice.actions;

export default searchSlice.reducer;
