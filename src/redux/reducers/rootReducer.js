import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import facebookSlice from "./facebookSlice";
import userSlice from "./userSlice";
import chatbotSlice from "./chatbotSlice";
import userPlatformSlice from "./userPlatformSlice";

// this file

const rootReducer = combineReducers({
  auth: authSlice,
  fb: facebookSlice,
  user: userSlice,
  chatbot: chatbotSlice,
  channel: userPlatformSlice
});

export default rootReducer;