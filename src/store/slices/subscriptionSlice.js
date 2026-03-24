import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/subscriptions';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchSubscriptions = createAsyncThunk('subscriptions/fetch', async (userId, { rejectWithValue }) => {
    try {
        const url = userId ? `${API_URL}/user/${userId}` : API_URL;
        const res = await axios.get(url, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const subscriptionSlice = createSlice({
    name: 'subscriptions',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscriptions.pending, (state) => { state.isLoading = true; })
            .addCase(fetchSubscriptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload || [];
            })
            .addCase(fetchSubscriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default subscriptionSlice.reducer;
