import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    hapticsEnabled: null,
    isSubscribed: null
  },
  reducers: {
    setHapticSetting(state, action) {
      state.hapticsEnabled = action.payload;
    },
    setSubscribedStatus(state, action) {
      state.isSubscribed = action.payload
    }
  },
});

export const { setHapticSetting, setSubscribedStatus } = userSlice.actions;
export default userSlice.reducer;
