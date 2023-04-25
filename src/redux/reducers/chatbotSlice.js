import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// this files

const options = {
  'x-access-token': 'skip_validation_for_admin',
  'Content-Type': 'application/json',
};

export const allChatbots = createAsyncThunk('chatbot/list', async (data) => {
  const response = await axios.post(
    `https://api.chatsimple.ai/v0/users/${data?.userID}/chatbots`,
    data?.pageToken,
    { headers: options }
  );
  return response.data;
});

export const createChatbot = createAsyncThunk(
  'chatbot/create',
  async (data) => {
    const response = await axios.post(
      `https://api.chatsimple.ai/v0/users/${data?.userID}/chatbots/${data?.chatbotID}`,
      data?.chatbotDetail,
      { headers: options }
    );
    return response.data;
    
  }
);

export const getChatbot = createAsyncThunk(
  'chatbot/get',
  async (data) => {
    const response = await axios.get(
      `https://api.chatsimple.ai/v0/users/${data?.userID}/chatbots/${data?.chatbotID}`,
      { headers: options }
    );
    return response.data;
  }
);

export const updateChatbot = createAsyncThunk(
  'chatbot/update',
  async (data) => {
    const response = await axios.put(
      `https://api.chatsimple.ai/v0/users/${data?.userID}/chatbots/${data?.chatbotID}?update_mask=${data?.update_mask}`,
      data?.update,
      { headers: options }
    );
    return response.data;
  }
);


export const deleteChatbot = createAsyncThunk(
  'chatbot/delete',
  async (data) => {
    const response = await axios.delete(
      `https://api.chatsimple.ai/v0/users/${data?.user_id}/chatbots/${data?.chatbot_id}`,
      { headers: options }
    );
    return response.data;
  }
);


const initialState = {
  loading: false,
  chatbots: null,
  loadingChatbot: false,
  chatbot: null,
  error: null,
  status: null,
};

const chatBotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {},
  extraReducers: {
    [allChatbots.pending]: (state, action) => {
      state.loading = true;
    },
    [allChatbots.fulfilled]: (state, action) => {
      state.loading = false;
      state.chatbots = action.payload;
    },
    [allChatbots.rejected]: (state, action) => {
      state.loading = false;
    },
    [createChatbot.pending]: (state, action) => {
      state.loading = true;
    },
    [createChatbot.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [createChatbot.rejected]: (state, action) => {
      state.loading = false;
    },
    [getChatbot.pending]: (state, action) => {
      state.loadingChatbot = true;
    },
    [getChatbot.fulfilled]: (state, action) => {
      state.loadingChatbot = false;
      state.chatbot = action.payload;
    },
    [getChatbot.rejected]: (state, action) => {
      state.loadingChatbot = false;
    },
    [updateChatbot.pending]: (state, action) => {
      state.loading = true;
    },
    [updateChatbot.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateChatbot.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteChatbot.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteChatbot.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteChatbot.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default chatBotSlice.reducer;
