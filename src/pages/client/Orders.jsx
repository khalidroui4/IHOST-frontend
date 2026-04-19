import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';

const ClientOrders = () => {
    const dispatch = useDispatch();
    const { items: orders, isLoading: isOrdersLoading } = useSelector(state => state.orders);
    const { items: cartItems, isLoading: isCartLoading } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    const isLoading = isOrdersLoading || isCartLoading;

    useEffect(() => {
        if (user?.id) dispatch(fetchOrders(user.id));
        dispatch(fetchCart());
    }, [dispatch, user]);

    const combinedList = [
        ...(cartItems || []).map(item => ({
            idOrder: 'PANIER',
            createdAt: item.createdAt || new Date().toISOString(),
            totalAmount: item.price || (item.service?.priceMonthly * (item.durationMonths || 1)) || 0,
            statusOrder: 'unpaid',
            isCartItem: true
        })),
        ...(orders || []).map(o => ({
            ...o,
            statusOrder: o.statusOrder === 'pending' ? 'unpaid' : o.statusOrder
        }))
    ];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>Historique des Commandes</h1>
                
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 className="animate-spin" size={30} color="#94a3b8" /></div>
                ) : combinedList.length === 0 ? (
                    <div style={{ padding: '4rem 2rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <ShoppingBag size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
                        <p style={{ margin: 0, fontSize: '1.1rem', color: '#64748b' }}>Aucune commande trouvée.</p>
                        <Link to="/pricing" style={{ color: '#1E6BFF', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Commencer vos achats</Link>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e5eaf0' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>ID CMD</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Désignation</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Montant</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Statut</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combinedList.map((o, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#0B1F3A' }}>
                                            {o.idOrder === 'PANIER' ? <span style={{fontSize: '0.8rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#64748b'}}>PANIER</span> : `#${o.idOrder}`}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#334155', fontSize: '0.9rem', fontWeight: 600 }}>
                                            {o.label || (o.isCartItem ? 'Article en attente' : `Commande #${o.idOrder}`)}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#0B1F3A' }}>{parseFloat(o.totalAmount || 0).toFixed(2)} DH</td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{ 
                                                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                                background: o.statusOrder === 'paid' ? '#ecfdf5' : '#fef2f2', 
                                                color: o.statusOrder === 'paid' ? '#10b981' : '#ef4444', 
                                                padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px'
                                            }}>
                                                {o.statusOrder === 'paid' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                                                {o.statusOrder}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            {o.statusOrder === 'unpaid' && (
                                                <Link 
                                                    to={o.isCartItem ? "/client/cart" : "/client/invoices"} 
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#1E6BFF', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}
                                                >
                                                    Payer <ExternalLink size={14} />
                                                </Link>
                                            )}
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
