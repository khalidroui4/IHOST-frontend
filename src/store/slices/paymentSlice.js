import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/IHOST-backend/payments';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const processPayment = createAsyncThunk('payments/process', async (paymentData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL, paymentData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const paymentSlice = createSlice({
    name: 'payments',
    initialState: {
        isLoading: false,
        error: null,
        success: false
    },
    reducers: {
        resetPaymentState: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(processPayment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(processPayment.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(processPayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
                state.success = false;
            });
    }
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
