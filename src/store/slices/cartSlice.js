import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/IHOST-backend/cart';

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
            let serviceId = service.idService || service.serviceId;

            // If idService is missing (e.g., from marketing pages), try to look it up by name
            if (!serviceId && service.nameService) {
                let errString = "";
                try {
                    const catalogRes = await axios.get('/IHOST-backend/services');
                    const catalog = catalogRes.data.data;
                    const queryName = String(service.nameService).trim().toLowerCase();
                    const matched = catalog.find(s => 
                        String(s.nameService).trim().toLowerCase() === queryName || String(s.nameService).trim().toLowerCase().includes(queryName)
                    );
                    if (matched) {
                        serviceId = matched.idService;
                    } else {
                        errString = "Not found in catalog of " + (catalog ? catalog.length : "0") + " items.";
                    }
                } catch (e) {
                    errString = e.message;
                    console.error("Could not look up service by name:", e);
                }

                if (!serviceId) {
                    const msg = `L'offre '${service.nameService || 'inconnue'}' n'est pas configurée (${errString}).`;
                    return rejectWithValue({ message: msg });
                }
            }

            if (!serviceId) {
                const msg = `L'offre n'a pas d'ID valide.`;
                return rejectWithValue({ message: msg });
            }

            const payload = {
                serviceId: serviceId,
                durationMonths: service.durationMonths || 1,
                domainName: service.domainName || null
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
            console.error("ADD ERROR:", error.response?.data || error.message);
            const errMsg = error.response?.data?.message || error.message || 'Erreur réseau';
            return rejectWithValue({ message: errMsg });
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

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ idCart, durationMonths }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.put(API_URL, { idCart, durationMonths }, authHeader());
            dispatch(fetchCart());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update item');
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
            })
            .addCase(updateCartItem.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message;
            });
    }
});

export default cartSlice.reducer;