import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// this file

const options = {
  "Content-Type": "application/json",
};
export const facebookSignUp = createAsyncThunk(
  "fb/sign-up",
  async (userData) => {
    //https://f8dd-184-147-26-46.ngrok.io
    const response = await axios.post(
      `https://api.chatsimple.ai/v0/users/${userData?.user_fb_id}/facebook-signin-signup`,
      userData,
      options
    );
    return response.data;
  }
);
export const facebookSignIn = createAsyncThunk(
  "fb/sign-in",
  async (userData) => {
    //https://f8dd-184-147-26-46.ngrok.io
    const response = await axios.post(
      "https://api.chatsimple.ai/v0/users/facebook-login",
      userData,
      options
    );
    return response.data;
  }
);
const initialState = {
  loading: false,
  fbUserID: null,
  fbToken: null,
  error: null,
  status: null,
};
const fbSlice = createSlice({
  name: "fb",
  initialState,
  reducers: {
    facebookToken: (state, action) => {
      state.fbToken = action.payload;
    },
  },
  extraReducers: {
    [facebookSignUp.pending]: (state, action) => {
      state.loading = true;
    },
    [facebookSignUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.fbUserID = action.payload.user_id;
    },
    [facebookSignUp.rejected]: (state, action) => {
      state.loading = false;
    },
    [facebookSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [facebookSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.fbUserID = action.payload.user_id;
    },
    [facebookSignIn.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { facebookToken } = fbSlice.actions;
export default fbSlice.reducer;