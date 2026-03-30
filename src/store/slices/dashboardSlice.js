import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/dashboard';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(API_URL, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        stats: {
            activeServices: 0,
            domains: 0,
            unpaidInvoices: 0,
            totalOrders: 0
        },
        recentActivity: [],
        notifications: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload.stats;
                state.recentActivity = action.payload.recentActivity;
                state.notifications = action.payload.notifications;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default dashboardSlice.reducer;
