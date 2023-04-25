// export const login = createAsyncThunk('auth/login', async (userData) => {
//     const response = await axios.post('/api/auth/login', userData);
//     return response.data;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const options = {
    'Content-Type': 'application/json',
};
export const login = createAsyncThunk('auth/login', async (userData) => {
    //https://f8dd-184-147-26-46.ngrok.io
    const response = await axios.post("https://f8dd-184-147-26-46.ngrok.io/v0/users/facebook-login", userData, options);
    return response.data;
})
const initialState = {
    loading: false,
    user: null,
    error: null,
    status: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.status = action.payload.status;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = action.payload.status;
        }
    }
})

export default authSlice.reducer;