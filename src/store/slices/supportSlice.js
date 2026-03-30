import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/support';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

// Admin: fetch all tickets
export const fetchTickets = createAsyncThunk('support/fetch', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(API_URL, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

// Client: fetch only their own tickets (stored separately in myTickets)
export const fetchMyTickets = createAsyncThunk('support/fetchMy', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/user/${userId}`, authHeader());
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

export const createAnonymousTicket = createAsyncThunk('support/createAnonymous', async (ticketData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/anonymous`, ticketData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const closeTicket = createAsyncThunk('support/close', async ({ ticketId, status }, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${API_URL}/${ticketId}/status`, { status }, authHeader());
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
        tickets: [],      // admin: all tickets
        myTickets: [],    // client: only own tickets
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Admin fetch
            .addCase(fetchTickets.pending, (state) => { state.isLoading = true; })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = action.payload || [];
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            // Client fetch (own tickets only)
            .addCase(fetchMyTickets.pending, (state) => { state.isLoading = true; })
            .addCase(fetchMyTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myTickets = action.payload || [];
            })
            .addCase(fetchMyTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default supportSlice.reducer;
