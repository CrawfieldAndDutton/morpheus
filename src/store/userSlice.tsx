import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    expiresAt: localStorage.getItem("expiresAt") || null,
    userInfo: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    setExpiresAt: (state, action) => {
      state.expiresAt = action.payload;
      localStorage.setItem("expiresAt", action.payload);
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setRefreshToken, setExpiresAt, setUserInfo, logout } =
  userSlice.actions;
export default userSlice.reducer;
