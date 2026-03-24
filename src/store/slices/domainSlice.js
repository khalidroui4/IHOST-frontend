import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/domains';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchDomains = createAsyncThunk('domains/fetch', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(userId ? `${API_URL}/user/${userId}` : API_URL, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const registerDomain = createAsyncThunk('domains/register', async (domainData, { rejectWithValue }) => {
    try {
        const res = await axios.post(API_URL, domainData, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const checkDomainAvailability = createAsyncThunk('domains/check', async (domainName, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/check/${domainName}`, authHeader());
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const domainSlice = createSlice({
    name: 'domains',
    initialState: {
        items: [],
        availabilityCheck: null,
        isLoading: false,
        error: null
    },
    reducers: {
        resetAvailability: (state) => {
            state.availabilityCheck = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDomains.pending, (state) => { state.isLoading = true; })
            .addCase(fetchDomains.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchDomains.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            .addCase(checkDomainAvailability.pending, (state) => { state.isLoading = true; })
            .addCase(checkDomainAvailability.fulfilled, (state, action) => {
                state.isLoading = false;
                state.availabilityCheck = action.payload;
            })
            .addCase(checkDomainAvailability.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export const { resetAvailability } = domainSlice.actions;
export default domainSlice.reducer;
