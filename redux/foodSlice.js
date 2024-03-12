import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    // Current food should have an already described structure!
    // Like { processedScore: 0, ...}
    currentFood: {},
  },
  reducers: {
    setCurrentFood(state, action) {
      state.currentFood = action.payload;
    },
  },
});

export const { setCurrentFood } = foodSlice.actions;
export default foodSlice.reducer;
