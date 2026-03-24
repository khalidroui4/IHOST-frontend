import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/auth';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.status === 'success') {
            localStorage.setItem('iHostToken', response.data.token);
            localStorage.setItem('iHostUser', JSON.stringify(response.data.user));
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data.status === 'success') {
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

const initialState = {
    user: JSON.parse(localStorage.getItem('iHostUser')) || null,
    token: localStorage.getItem('iHostToken') || null,
    isAuthenticated: !!localStorage.getItem('iHostToken'),
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('iHostToken');
            localStorage.removeItem('iHostUser');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Login failed';
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Registration failed';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
