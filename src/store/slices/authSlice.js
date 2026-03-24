import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/auth';
const USERS_API_URL = 'http://localhost/IHOST-backend/users';

const authHeader = (isMultipart = false) => {
    const token = localStorage.getItem('iHostToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json'
        }
    };
};

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

export const updateUserProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/update`, profileData, authHeader());
        if (response.data.status === 'success') {
            localStorage.setItem('iHostUser', JSON.stringify(response.data.user));
            return response.data.user;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const updateUserAvatar = createAsyncThunk('auth/updateAvatar', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/avatar`, formData, authHeader(true));
        if (response.data.status === 'success') {
            localStorage.setItem('iHostUser', JSON.stringify(response.data.user));
            return response.data.user;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const updateUserPassword = createAsyncThunk('auth/updatePassword', async (passwords, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/password`, passwords, authHeader());
        if (response.data.status === 'success') {
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const updateUserEmail = createAsyncThunk('auth/updateEmail', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${USERS_API_URL}/email`, data, authHeader());
        if (response.data.status === 'success') {
            localStorage.setItem('iHostUser', JSON.stringify(response.data.user));
            return response.data.user;
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
            })
            // Update Profile
            .addCase(updateUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Update failed';
            })
            // Update Avatar
            .addCase(updateUserAvatar.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Update failed';
            })
            // Update Email
            .addCase(updateUserEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateUserEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Email update failed';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
