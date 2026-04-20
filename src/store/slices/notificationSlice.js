import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/IHOST-backend/notifications';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchNotifications = createAsyncThunk('notifications/fetch', async (userId, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/${userId}`, authHeader());
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
});

export const markAllRead = createAsyncThunk('notifications/markAllRead', async (userId, { rejectWithValue }) => {
    try {
        await axios.put(`${API_URL}/${userId}/read-all`, {}, authHeader());
        return true;
    } catch (error) {
        // Even if backend fails, still clear locally
        return true;
    }
});

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: {
        items: [],
        unread: 0,
        isLoading: false,
        error: null
    },
    reducers: {
        clearUnread(state) {
            state.unread = 0;
            state.items = state.items.map(n => ({ ...n, isRead: true, is_read: 1 }));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => { state.isLoading = true; })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload || [];
                // Count unread — backend may use isRead or is_read
                state.unread = (action.payload || []).filter(n => !n.isRead && !n.is_read).length;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })
            .addCase(markAllRead.fulfilled, (state) => {
                state.unread = 0;
                state.items = state.items.map(n => ({ ...n, isRead: true, is_read: 1 }));
            });
    }
});

export const { clearUnread } = notificationSlice.actions;
export default notificationSlice.reducer;
