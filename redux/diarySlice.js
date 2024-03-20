import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    chosenDate: null,
  },
  reducers: {
    setChosenDate(state, action) {
      state.chosenDate = action.payload;
    },
  },
});

export const { setChosenDate } = diarySlice.actions;
export default diarySlice.reducer;
