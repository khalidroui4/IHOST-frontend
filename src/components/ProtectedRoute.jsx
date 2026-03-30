import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f0f4f8' }}>
                <div style={{ padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                    <p style={{ fontWeight: 600, color: '#0B1F3A' }}>Chargement de votre session...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/signIn" />;
    }

    if (requireAdmin && user?.role?.toLowerCase() !== 'admin') {
        return <Navigate to="/client/dashboard" />;
    }

    return children;
};

export default ProtectedRoute;
