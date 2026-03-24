import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart, clearCart } from '../../store/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { items: cart, total: cartTotal } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mon Panier</h1>

            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid #e5eaf0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <ShoppingCart size={48} color="#cbd5e1" />
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>Votre panier est vide.</p>
                    <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                        Découvrir nos offres <ArrowRight size={16} />
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 340px', alignItems: 'start' }}>
                    {/* Cart Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {cart.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', fontWeight: 700, color: '#0B1F3A' }}>{item.nameService}</h3>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>{item.durationMonths} Mois</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E6BFF' }}>{item.price} DH</span>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.idCart))}
                                        style={{ background: '#fef2f2', border: '1px solid #fecaca', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.15s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => dispatch(clearCart())}
                            style={{ background: 'transparent', border: 'none', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer', alignSelf: 'flex-start', fontSize: '0.85rem' }}
                        >
                            Vider le panier
                        </button>
                    </div>

                    {/* Summary Card */}
                    <div style={{ background: 'white', padding: '1.75rem', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#0B1F3A' }}>Résumé de la commande</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b', fontSize: '0.9rem' }}>
                            <span>Sous-total</span>
                            <span>{cartTotal.toFixed(2)} DH</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                            <span>TVA (20%)</span>
                            <span>{(cartTotal * 0.20).toFixed(2)} DH</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5eaf0', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: 700, color: '#0B1F3A' }}>Total TTC</span>
                            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E6BFF' }}>{(cartTotal * 1.20).toFixed(2)} DH</span>
                        </div>
                        <button
                            onClick={() => navigate('/client/checkout')}
                            style={{ width: '100%', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.85rem', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'opacity 0.2s', boxShadow: '0 4px 12px rgba(30,107,255,0.3)' }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            Passer à la caisse <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

