import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //login
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); 
    },
    //logout
    logout: (state, action) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;