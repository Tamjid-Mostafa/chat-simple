import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// this files

const options = {
  "x-access-token": "skip_validation_for_admin",
  "Content-Type": "application/json",
};
export const allChannels = createAsyncThunk("channel/list", async (data) => {
  const response = await axios.post(
    `https://api.chatsimple.ai/v0/users/${data?.userID}/user_platforms`,
    data?.pageToken,
    { headers: options }
  );
  return response.data
});



export const createChannel = createAsyncThunk(
  "channel/create",
  async (data) => {
    const response = await axios.post(
      `https://api.chatsimple.ai/v0/users/${data?.userID}/user_platforms/${data?.platform_id}`,
      data?.platformDetails,
      { headers: options }
    );
    return response.data;
  }
);

const initialState = {
  loading: false,
  channels: null,
  error: null,
  status: null,
};

const userPlatformSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: {
    [allChannels.pending]: (state, action) => {
      state.loading = true;
    },
    [allChannels.fulfilled]: (state, action) => {
      state.loading = false;
      state.channels = action.payload;
    },
    [allChannels.rejected]: (state, action) => {
      state.loading = false;
    },
    [createChannel.pending]: (state, action) => {
      state.loading = true;
    },
    [createChannel.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createChannel.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});
export default userPlatformSlice.reducer;