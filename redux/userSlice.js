import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    hapticsEnabled: null
  },
  reducers: {
    setHapticSetting(state, action) {
      state.hapticsEnabled = action.payload;
    },
  },
});

export const { setHapticSetting } = userSlice.actions;
export default userSlice.reducer;
