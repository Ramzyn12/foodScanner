import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    currentFood: null,
  },
  reducers: {
    setCurrentFood(state, action) {
      state.currentFood = action.payload;
    },
  },
});

export const { setCurrentFood } = foodSlice.actions;
export default foodSlice.reducer;