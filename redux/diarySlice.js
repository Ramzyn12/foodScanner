import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: {
    chosenDate: null,
    currentDiaryDay: null,
  },
  reducers: {
    setChosenDate(state, action) {
      state.chosenDate = action.payload;
    },
    setCurrentDiaryDay(state, action) {
      state.currentDiaryDay = action.payload;
    },
  },
});

export const { setChosenDate, setCurrentDiaryDay } = diarySlice.actions;
export default diarySlice.reducer;
