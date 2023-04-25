import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// this file

const options = {
  "x-access-token": "skip_validation_for_admin",
  "Content-Type": "application/json",
};
export const userDetails = createAsyncThunk("user/me", async (userID) => {
  //https://f8dd-184-147-26-46.ngrok.io
  const response = await axios.get(
    `https://api.chatsimple.ai/v0/users/${userID}`,
    {
      headers: options,
    }
  );
  return response.data;
});

const initialState = {
  loading: false,
  user: null,
  error: null,
  status: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [userDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [userDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.status = action.payload.status;
    },
    [userDetails.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default userSlice.reducer;