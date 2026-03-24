import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/signIn" />;
    }

    if (requireAdmin && user?.role !== 'admin') {
        return <Navigate to="/client/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
