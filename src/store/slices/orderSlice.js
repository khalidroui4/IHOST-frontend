import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/IHOST-backend/orders';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchOrders = createAsyncThunk('orders/fetch', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(userId ? `${API_URL}/user/${userId}` : API_URL, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const createOrder = createAsyncThunk('orders/create', async (orderData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL, orderData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => { state.isLoading = true; })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default orderSlice.reducer;
