import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import { fetchSubscriptions } from '../../store/slices/subscriptionSlice';
import { addToCart } from '../../store/slices/cartSlice';
import ConfirmCartModal from '../../components/ConfirmCartModal';
import { useToast } from '../../context/ToastContext';
import { Server, ShoppingCart, CheckCircle2, Clock, Check, X, RefreshCw, Loader2 } from 'lucide-react';
import axios from 'axios';
import ConfirmModal from '../../components/ConfirmModal';

const ClientServices = () => {
    const [confirmItem, setConfirmItem] = useState(null);
    const [isRenewing, setIsRenewing] = useState(false);
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { user } = useSelector(state => state.auth);
    const { items: services, isLoading: catalogLoading } = useSelector(state => state.services);
    const { items: subscriptions, isLoading: subsLoading } = useSelector(state => state.subscriptions);
    const [renewModal, setRenewModal] = useState({ show: false, id: null });

    useEffect(() => {
        dispatch(fetchServices());
        if (user?.id) dispatch(fetchSubscriptions(user.id));
    }, [dispatch, user]);

    const handleAddToCart = async () => {
        if (!confirmItem) return;
        try {
            await dispatch(addToCart({ 
                idService: confirmItem.idService, 
                nameService: confirmItem.nameService, 
                price: confirmItem.price, 
                durationMonths: confirmItem.durationMonths || 1 
            })).unwrap();
            
            addToast("L'article a été ajouté à votre panier avec succès !", "success");
            setConfirmItem(null);
        } catch (error) {
            addToast(`Échec de l'ajout: ${error.message || "Erreur réseau"}`, "error");
            setConfirmItem(null);
        }
    };

    const handleRenew = (idSub) => {
        setRenewModal({ show: true, id: idSub });
    };

    const confirmRenew = async () => {
        const idSub = renewModal.id;
        setRenewModal({ show: false, id: null });
        setIsRenewing(true);
        try {
            const token = localStorage.getItem('iHostToken');
            await axios.post('/IHOST-backend/subscriptions/renew', 
                { idSub }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            addToast('Service renouvelé avec succès !', 'success');
            dispatch(fetchSubscriptions(user.id));
        } catch (err) {
            addToast('Erreur lors du renouvellement', 'error');
        } finally {
            setIsRenewing(false);
        }
    };

    if (subsLoading && subscriptions.length === 0) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem', color: '#64748b' }}>
                <Loader2 className="animate-spin" size={40} />
                <p style={{ fontWeight: 600 }}>Chargement de vos services...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Services Actifs</h2>
                    {isRenewing && <span style={{ fontSize: '0.85rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><RefreshCw size={14} className="animate-spin" /> Renouvellement en cours...</span>}
                </div>
                
                {subscriptions.length === 0 ? (
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                        <Server size={48} color="#e2e8f0" style={{ margin: '0 auto 1rem auto' }} />
                        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Vous n'avez aucun service actif.</p>
                        <Link to="/pricing" style={{ color: '#1E6BFF', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Parcourir nos offres</Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                        {subscriptions.map(sub => (
                            <div key={sub.idSub} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '1.75rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(11,31,58,0.03)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Server size={20} color="#3b82f6" />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0B1F3A' }}>{sub.nameService}</h3>
                                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>#{sub.idSub}</p>
                                        </div>
                                    </div>
                                    <span style={{ background: sub.statusSub === 'active' ? '#ecfdf5' : '#fef2f2', color: sub.statusSub === 'active' ? '#10b981' : '#ef4444', fontSize: '0.7rem', fontWeight: 800, padding: '0.3rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        {sub.statusSub}
                                    </span>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Date d'expiration</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B1F3A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Clock size={14} color="#64748b" />
                                            {new Date(sub.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => handleRenew(sub.idSub)}
                                    disabled={isRenewing}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', background: '#0B1F3A', color: 'white', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                                >
                                    <RefreshCw size={16} className={isRenewing ? 'animate-spin' : ''} /> Renouveler Service
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5eaf0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Catalogue des Services</h2>
                </div>
                {catalogLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}><Loader2 className="animate-spin" size={30} color="#94a3b8" /></div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {services.map(srv => (
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
                                        <span style={{ fontWeight: 800, color: '#1E6BFF', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>{parseFloat(srv.price).toFixed(2)} DH</span>
                                    </div>
                                    <button
                                        onClick={() => setConfirmItem({ ...srv, name: srv.nameService })}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: '0 4px 12px rgba(30,107,255,0.3)' }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        <ShoppingCart size={16} /> Ajouter
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {confirmItem && (
                <ConfirmCartModal 
                    item={confirmItem}
                    onConfirm={handleAddToCart}
                    onCancel={() => setConfirmItem(null)}
                />
            )}
            {renewModal.show && (
                <ConfirmModal 
                    title="Renouveler le service"
                    message="Voulez-vous vraiment renouveler ce service pour une période supplémentaire ?"
                    onConfirm={confirmRenew}
                    onCancel={() => setRenewModal({ show: false, id: null })}
                    confirmText="Renouveler"
                    cancelText="Annuler"
                />
            )}
        </div>
    );
};

export default ClientServices;
