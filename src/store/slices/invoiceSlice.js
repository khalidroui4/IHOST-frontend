import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/IHOST-backend/factures';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchInvoices = createAsyncThunk('invoices/fetch', async (userId, { rejectWithValue }) => {
    try {
        const url = userId ? `${API_URL}/user/${userId}` : API_URL;
        const res = await axios.get(url, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const payInvoice = createAsyncThunk('invoices/pay', async (idFacture, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/pay`, { idFacture }, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Payment failed' });
    }
});

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.pending, (state) => { state.isLoading = true; })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload || [];
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default invoiceSlice.reducer;
