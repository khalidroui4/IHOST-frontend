import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import serviceReducer from './slices/serviceSlice';
import orderReducer from './slices/orderSlice';
import cartReducer from './slices/cartSlice';
import paymentReducer from './slices/paymentSlice';
import domainReducer from './slices/domainSlice';
import supportReducer from './slices/supportSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        services: serviceReducer,
        orders: orderReducer,
        cart: cartReducer,
        payments: paymentReducer,
        domains: domainReducer,
        support: supportReducer,
        notifications: notificationReducer
    }
});
