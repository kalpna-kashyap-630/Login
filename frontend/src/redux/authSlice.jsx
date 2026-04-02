import { createSlice } from "@reduxjs/toolkit";


// Get token from localStorage if it exists
const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: null,
    isAuthenticated: !!token
  },
  reducers: {
    // Login success
    setCredentials: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Save token in localStorage
      localStorage.setItem("token", token);
    },

    // Logout
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;