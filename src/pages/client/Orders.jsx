import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';

const ClientOrders = () => {
    const dispatch = useDispatch();
    const { items: orders, isLoading } = useSelector(state => state.orders);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) dispatch(fetchOrders(user.id));
    }, [dispatch, user]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Historique des Commandes</h1>
                
                {isLoading ? (
                    <p>Chargement des commandes...</p>
                ) : orders.length === 0 ? (
                    <div style={{ padding: '3rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <p style={{ color: '#6B7280' }}>Aucune commande trouvée.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '1rem 1.5rem' }}>ID CMD</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Montant</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.idOrder} style={{ borderTop: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0B1F3A' }}>#{o.idOrder}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
    );
};

export default ClientOrders;
