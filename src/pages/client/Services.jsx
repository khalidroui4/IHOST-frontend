import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import { fetchSubscriptions } from '../../store/slices/subscriptionSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { Server, ShoppingCart, CheckCircle2, Clock, Check, X } from 'lucide-react';

const ClientServices = () => {
    const [confirmItem, setConfirmItem] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { items: services, isLoading: catalogLoading } = useSelector(state => state.services);
    const { items: subscriptions, isLoading: subsLoading } = useSelector(state => state.subscriptions);

    useEffect(() => {
        dispatch(fetchServices());
        if (user?.id) dispatch(fetchSubscriptions(user.id));
    }, [dispatch, user]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* ── Active Subscriptions ── */}
            <section>
                <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Services Actifs</h2>
                {subsLoading ? (
                    <p style={{ color: '#94a3b8' }}>Chargement de vos services...</p>
                ) : subscriptions.length === 0 ? (
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                        <Server size={48} color="#e2e8f0" style={{ margin: '0 auto 1rem auto' }} />
                        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Vous n'avez aucun service actif.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                        {subscriptions.map(sub => (
                            <div key={sub.idSub} style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6e 100%)', padding: '1.75rem', borderRadius: '16px', color: 'white', boxShadow: '0 4px 15px rgba(11,31,58,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Server size={20} color="#93c5fd" />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{sub.nameService}</h3>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>#{sub.idSub}</p>
                                        </div>
                                    </div>
                                    <span style={{ background: sub.statusSub === 'active' ? '#10b981' : '#f59e0b', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {sub.statusSub}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem' }}>
                                    <div>
                                        <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date d'expiration</p>
                                        <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Clock size={14} color="#93c5fd" />
                                            {new Date(sub.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Catalog ── */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5eaf0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Catalogue des Services</h2>
                </div>
                {catalogLoading ? (
                    <p style={{ color: '#94a3b8' }}>Chargement du catalogue...</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {services.map(srv => {
                            // Optionally extract duration if backend sends it to specify price/month
                            const priceText = `${parseFloat(srv.price).toFixed(2)} DH`;
                            
                            return (
                                <div key={srv.idService} style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
                                >
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', color: '#1E6BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Server size={22} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A' }}>{srv.nameService}</h3>
                                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>{srv.descriptionS}</p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid #f1f5f9' }}>
                                        <div>
                                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>À partir de</span>
                                            <span style={{ fontWeight: 800, color: '#1E6BFF', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>{priceText}</span>
                                        </div>
                                        <button
                                            onClick={() => setConfirmItem(srv)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: '0 4px 12px rgba(30,107,255,0.3)' }}
                                            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                        >
                                            <ShoppingCart size={16} /> Ajouter
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── Confirmation Modal ── */}
            {confirmItem && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(11,31,58,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', background: '#eff6ff', color: '#1E6BFF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                            <ShoppingCart size={30} />
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 800, color: '#0B1F3A' }}>Confirmation</h3>
                        <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem', lineHeight: 1.5 }}>
                            Voulez-vous vraiment ajouter <strong>{confirmItem.nameService}</strong> à votre panier ?
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => setConfirmItem(null)}
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: '#f1f5f9', color: '#64748b', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                                onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
                            >
                                <X size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Annuler
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(addToCart({ idService: confirmItem.idService, nameService: confirmItem.nameService, price: confirmItem.price, durationMonths: confirmItem.durationMonths || 1 }));
                                    setConfirmItem(null);
                                }}
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(30,107,255,0.3)', transition: 'opacity 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <Check size={16} /> Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientServices;
