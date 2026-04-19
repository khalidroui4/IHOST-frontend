import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, ShoppingCart, ArrowRight, Edit2, Globe, Server } from 'lucide-react';
import { fetchCart, removeFromCart, clearCart, updateCartItem, addToCart } from '../../store/slices/cartSlice';
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

    const handleEditConfirm = async (data) => {
        if (editingItem) {
            const currentItem = editingItem;
            setEditingItem(null); // Ferme la modale instantanément pour la fluidité

            try {
                await dispatch(removeFromCart(currentItem.idCart)).unwrap();
                
                const ext = '.' + data.domainName.split('.').pop();
                const domainService = services.find(s => s.nameService.toLowerCase().includes(ext)) || services.find(s => s.nameService.toLowerCase().includes('domaine'));

                if (domainService) {
                    await dispatch(addToCart({
                        idService: domainService.idService,
                        domainName: data.domainName,
                        durationMonths: data.durationYears * 12,
                        nameService: `Domaine: ${data.domainName} (${data.durationYears} ${data.durationYears > 1 ? 'Ans' : 'An'}${data.includePrivacy ? ' + Protection WHOIS' : ''})`,
                        price: data.totalPrice
                    })).unwrap();
                }
            } catch (err) {
                console.error("Erreur lors de la modification:", err);
            }
        }
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>Mon Panier</h1>

            {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid #e5eaf0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <ShoppingCart size={48} color="#cbd5e1" />
                    <p style={{ fontSize: '1.1rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>Votre panier est vide.</p>
                    <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>
                        Découvrir nos offres <ArrowRight size={16} />
                    </Link>
                </div>
            ) : (
                <div className="cart-layout" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 340px', alignItems: 'start' }}>
                    {/* Cart Items */}
                    <div style={{ background: 'white', borderRadius: '4px', border: '1px solid #e5eaf0', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5eaf0' }}>
                            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 600, color: '#282828' }}>Panier ({cart.length})</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {cart.map((item, idx) => (
                                <div key={idx} className="cart-item-row" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: idx === cart.length - 1 ? 'none' : '1px solid #e5eaf0' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 500, color: '#282828', lineHeight: 1.4 }}>
                                                    {item.domainName ? item.domainName : item.nameService}
                                                </h3>
                                                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#282828' }}>
                                                        {item.domainName 
                                                            ? (item.price * (item.durationMonths / 12)).toFixed(2)
                                                            : (item.price * item.durationMonths).toFixed(2)} Dhs
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    
                                    {/* Bottom half: Trash + Quantity/Edit */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.idCart))}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'red', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', padding: '0.4rem 0' }}
                                        >
                                            <Trash2 size={18} /> Supprimer
                                        </button>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            {item.domainName && (
                                                <button
                                                    onClick={() => setEditingItem(item)}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'green', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}
                                                >
                                                    <Edit2 size={16} /> Modifier
                                                </button>
                                            )}
                                            <div style={{ background: '#f8fafc', padding: '0.4rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.95rem', fontWeight: 600, color: '#282828' }}>
                                                {item.domainName ? (item.durationMonths / 12) + (item.durationMonths / 12 > 1 ? ' Ans' : ' An') : item.durationMonths + ' Mois'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5eaf0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <button
                                onClick={() => dispatch(clearCart())}
                                style={{ background: 'transparent', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                                Vider le panier
                            </button>
                            <Link
                                to="/pricing"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#0B1F3A', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}
                            >
                                Découvrir d'autres offres <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div style={{ background: 'white', borderRadius: '4px', border: '1px solid #e5eaf0', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 700, color: '#282828', textTransform: 'uppercase', borderBottom: '1px solid #e5eaf0', paddingBottom: '0.75rem' }}>
                            Résumé du panier
                        </h3>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.95rem', color: '#64748b' }}>
                            <span>Total articles ({cart.length})</span>
                            <span style={{ fontWeight: 600, color: '#282828' }}>{cartTotal.toFixed(2)} Dhs</span>
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5eaf0', paddingTop: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, color: '#282828', fontSize: '1.1rem' }}>Sous-total</span>
                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#282828' }}>{cartTotal.toFixed(2)} Dhs</span>
                        </div>
                        
                        <button
                            onClick={() => navigate('/client/checkout')}
                            style={{ width: '100%', background: '#0B1F3A', color: 'white', border: 'none', padding: '1rem', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 8px rgba(11,31,58,0.2)', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#15335c'}
                            onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                        >
                            COMMANDER ({cartTotal.toFixed(2)} Dhs)
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

