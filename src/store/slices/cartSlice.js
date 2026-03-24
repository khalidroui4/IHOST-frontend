import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find(i => i.idService === action.payload.idService);
            if (!existing) {
                state.items.push(action.payload);
                state.total += parseFloat(action.payload.price);
            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(i => i.idService === action.payload);
            if (index !== -1) {
                state.total -= parseFloat(state.items[index].price);
                state.items.splice(index, 1);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
