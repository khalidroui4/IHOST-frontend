import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import PageTransition from '../../pageTransition';

const AdminOrders = () => {
    const dispatch = useDispatch();
    const { items: orders, isLoading } = useSelector(state => state.orders);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleApprove = async (idOrder) => {
        setUpdating(true);
        try {
            await axios.put(`http://localhost/IHOST-backend/orders/${idOrder}`, 
                { statusOrder: 'paid' }, 
                { headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` } }
            );
            dispatch(fetchOrders());
        } catch (error) {
            console.error("Failed to approve order", error);
        }
        setUpdating(false);
    };

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '2rem' }}>Gestion des Commandes</h1>
                
                {isLoading ? (
                    <p>Chargement des commandes...</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '1rem 1.5rem' }}>ID CMD</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Utilisateur</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Montant</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Statut</th>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.idOrder} style={{ borderTop: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0B1F3A' }}>#{o.idOrder}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>ID: {o.userId}</td>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{o.totalAmount} DH</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{ 
                                                background: o.statusOrder === 'paid' ? '#ecfdf5' : o.statusOrder === 'pending' ? '#fffbeb' : '#fef2f2', 
                                                color: o.statusOrder === 'paid' ? '#10b981' : o.statusOrder === 'pending' ? '#f59e0b' : '#ef4444', 
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 
                                            }}>
                                                {o.statusOrder.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            {o.statusOrder !== 'paid' && (
                                                <button 
                                                    onClick={() => handleApprove(o.idOrder)}
                                                    disabled={updating}
                                                    style={{ background: '#10B981', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                                                >
                                                    Approuver
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default AdminOrders;
