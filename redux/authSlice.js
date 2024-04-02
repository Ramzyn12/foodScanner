import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    waitingForBackend: null,
    authLoading: null
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setWaitingForBackend(state, action) {
      state.userCreated = action.payload
    },
    setLoadingAuth(state, action) {
      state.authLoading = action.payload
    },
  },
});

export const { setToken, setWaitingForBackend, setLoadingAuth } = authSlice.actions;
export default authSlice.reducer;
