import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/services';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchServices = createAsyncThunk('services/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(API_URL);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const addService = createAsyncThunk('services/add', async (serviceData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL, serviceData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => { state.isLoading = true; })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default serviceSlice.reducer;
