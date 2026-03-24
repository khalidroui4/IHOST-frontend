import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchTickets } from '../../store/slices/supportSlice';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { list: users } = useSelector(state => state.users);
    const { items: orders } = useSelector(state => state.orders);
    const { tickets } = useSelector(state => state.support);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchUsers());
        dispatch(fetchTickets());
    }, [dispatch]);

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '0.5rem' }}>Espace Administrateur</h1>
                <p style={{ color: '#6B7280', fontSize: '1.2rem', marginBottom: '3rem' }}>Vue d'ensemble de la plateforme</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: '#6B7280', fontWeight: 600 }}>Total Utilisateurs</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1E6BFF', margin: '1rem 0' }}>{users.length}</p>
                        <Link to="/admin/users" style={{ color: '#1E6BFF', fontWeight: 600, textDecoration: 'none' }}>Gérer &rarr;</Link>
                    </div>
                    
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: '#6B7280', fontWeight: 600 }}>Commandes Globales</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10B981', margin: '1rem 0' }}>{orders.length}</p>
                        <Link to="/admin/orders" style={{ color: '#10B981', fontWeight: 600, textDecoration: 'none' }}>Gérer &rarr;</Link>
                    </div>

                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: '#6B7280', fontWeight: 600 }}>Tickets Support</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F59E0B', margin: '1rem 0' }}>{tickets.length}</p>
                        <Link to="/admin/support" style={{ color: '#F59E0B', fontWeight: 600, textDecoration: 'none' }}>Répondre &rarr;</Link>
                    </div>

                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: '#6B7280', fontWeight: 600 }}>Services</h3>
                        <p style={{ fontSize: '2.5rem', fontWeight: 800, color: '#8B5CF6', margin: '1rem 0' }}>Catalogue</p>
                        <Link to="/admin/services" style={{ color: '#8B5CF6', fontWeight: 600, textDecoration: 'none' }}>Gérer &rarr;</Link>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;
