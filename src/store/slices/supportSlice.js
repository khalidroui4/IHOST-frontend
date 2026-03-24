import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/support';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchTickets = createAsyncThunk('support/fetch', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(userId ? `${API_URL}/user/${userId}` : API_URL, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const createTicket = createAsyncThunk('support/create', async (ticketData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL, ticketData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const sendMessage = createAsyncThunk('support/sendMessage', async (msgData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/message`, msgData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const supportSlice = createSlice({
    name: 'support',
    initialState: {
        tickets: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => { state.isLoading = true; })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default supportSlice.reducer;
