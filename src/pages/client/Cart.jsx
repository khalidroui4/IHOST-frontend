import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, ShoppingCart, ArrowRight, Edit2 } from 'lucide-react';
import { fetchCart, removeFromCart, clearCart, updateCartItem } from '../../store/slices/cartSlice';
import DomainRegistrationModal from '../../components/DomainRegistrationModal';
import { Link, useNavigate } from 'react-router-dom';
import { fetchServices } from '../../store/slices/serviceSlice';

const Cart = () => {
    const { items: cart, total: cartTotal } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editingItem, setEditingItem] = React.useState(null);

    const { items: services } = useSelector(state => state.services);

    const dynamicExtensions = Array.from(new Map(
        services
            .filter(s => s.typeService === 'domain' && parseInt(s.isActive) === 1)
            .map(s => {
                const extMatch = s.nameService.match(/\.[a-zA-Z]+/);
                const ext = extMatch ? extMatch[0].toLowerCase() : '.com';
                const priceVal = parseFloat(s.price);
                return [ext, {
                    ext,
                    price: s.price,
                    oldPrice: (priceVal * 1.25).toFixed(0),
                    trending: ext === '.com' || ext === '.ma',
                    promo: priceVal < 50
                }];
            })
    ).values());

    const popularExtensions = dynamicExtensions;

    useEffect(() => {
        dispatch(fetchCart());
        if (!services || services.length === 0) {
            dispatch(fetchServices());
        }
    }, [dispatch, services]);

    const handleEditConfirm = (data) => {
        if (editingItem) {
            dispatch(updateCartItem({
                idCart: editingItem.idCart,
                durationMonths: data.duration
            }));
            setEditingItem(null);
        }
    };

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
                                    <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', fontWeight: 700, color: '#0B1F3A' }}>
                                        {item.nameService} {item.domainName ? `: ${item.domainName}` : ''}
                                    </h3>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>
                                        {item.domainName ? (item.durationMonths / 12) + (item.durationMonths / 12 > 1 ? ' Ans' : ' An') : item.durationMonths + ' Mois'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E6BFF' }}>
                                            {item.domainName 
                                                ? (item.price * (item.durationMonths / 12)).toFixed(2)
                                                : (item.price * item.durationMonths).toFixed(2)} DH
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {item.price} DH x {item.domainName ? (item.durationMonths / 12) + ' An(s)' : item.durationMonths + ' Mois'}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {item.domainName && (
                                            <button
                                                onClick={() => setEditingItem(item)}
                                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                                                title="Modifier"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.idCart))}
                                            style={{ background: '#fef2f2', border: '1px solid #fecaca', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                                            title="Supprimer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5eaf0', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: 700, color: '#0B1F3A' }}>Total</span>
                            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E6BFF' }}>{cartTotal.toFixed(2)} DH</span>
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

            {editingItem && (
                <DomainRegistrationModal
                    isOpen={true}
                    onClose={() => setEditingItem(null)}
                    onConfirm={handleEditConfirm}
                    initialDomain={editingItem.domainName}
                    popularExtensions={popularExtensions}
                    initialDuration={editingItem.durationMonths / (editingItem.domainName ? 12 : 1)}
                    isEdit={true}
                />
            )}
        </div>
    );
};

export default Cart;

