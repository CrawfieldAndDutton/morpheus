import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || null,
    userInfo: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
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

export const { setToken, setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;