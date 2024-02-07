// In your searchSlice.js or wherever you define your Redux slices

import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    openFoodFactsResults: [],
    usdaResults: [],
  },
  reducers: {
    setOpenFoodFactsResults: (state, action) => {
      state.openFoodFactsResults = action.payload;
    },
    setUsdaResults: (state, action) => {
      state.usdaResults = action.payload;
    },
  },
});

export const { setOpenFoodFactsResults, setUsdaResults } = searchSlice.actions;

export default searchSlice.reducer;
