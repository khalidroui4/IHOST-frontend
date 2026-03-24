import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost/IHOST-backend/cart';

const authHeader = () => {
    const token = localStorage.getItem('iHostToken');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const fetchCart = createAsyncThunk(
    'cart/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL, authHeader());
            return res.data.data;
        } catch (error) {
            console.log("FETCH ERROR:", error.response?.data);
            return rejectWithValue(
                error.response?.data || { message: 'Network error' }
            );
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/add',
    async (service, { rejectWithValue, dispatch }) => {
        try {
            let serviceId = service.idService;

            // If idService is missing (e.g., from marketing pages), try to look it up by name
            if (!serviceId && service.nameService) {
                try {
                    const catalogRes = await axios.get('http://localhost/IHOST-backend/services');
                    const catalog = catalogRes.data.data;
                    const matched = catalog.find(s => 
                        s.nameService.trim().toLowerCase() === service.nameService.trim().toLowerCase()
                    );
                    if (matched) {
                        serviceId = matched.idService;
                    }
                } catch (e) {
                    console.log("Could not look up service by name:", e);
                }
            }

            if (!serviceId) {
                return rejectWithValue({ message: `L'offre '${service.nameService}' n\'est pas encore configurée côté serveur.` });
            }

            const payload = {
                serviceId: serviceId,
                durationMonths: service.durationMonths || 1
            };

            console.log("SENDING DATA:", payload);

            const res = await axios.post(
                `${API_URL}/add`,
                payload,
                authHeader()
            );

            dispatch(fetchCart());
            return res.data;

        } catch (error) {
            console.log("ADD ERROR:", error.response?.data);
            return rejectWithValue(
                error.response?.data || { message: 'Network error' }
            );
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (idCart, { rejectWithValue, dispatch }) => {
        try {
            const res = await axios.delete(
                `${API_URL}/${idCart}`,
                authHeader()
            );

            dispatch(fetchCart());
            return res.data;

        } catch (error) {
            console.log("REMOVE ERROR:", error.response?.data);
            return rejectWithValue(
                error.response?.data || { message: 'Network error' }
            );
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clear',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await axios.delete(
                `${API_URL}/clear`,
                authHeader()
            );

            dispatch(fetchCart());
            return res.data;

        } catch (error) {
            console.log("CLEAR ERROR:", error.response?.data);
            return rejectWithValue(
                error.response?.data || { message: 'Network error' }
            );
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload?.items || [];
                state.total = action.payload?.total || 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })

            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })

            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            })

            .addCase(clearCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.isLoading = false;
                state.items = [];
                state.total = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default cartSlice.reducer;