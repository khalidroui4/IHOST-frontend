import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import { fetchSubscriptions } from '../../store/slices/subscriptionSlice';
import { addToCart } from '../../store/slices/cartSlice';
import ConfirmCartModal from '../../components/ConfirmCartModal';
import { useToast } from '../../context/ToastContext';
import { Server, ShoppingCart, CheckCircle2, Clock, Check, X, RefreshCw, Loader2, ChevronDown } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';
import { navData } from '../../data/navData';
import '../../components/Navbar.css';

const ClientServices = () => {
    const [confirmItem, setConfirmItem] = useState(null);
    const [isRenewing, setIsRenewing] = useState(false);
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { user } = useSelector(state => state.auth);
    const { items: services, isLoading: catalogLoading } = useSelector(state => state.services);
    const { items: subscriptions, isLoading: subsLoading } = useSelector(state => state.subscriptions);
    const [renewModal, setRenewModal] = useState({ show: false, id: null });
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropRef = useRef(null);

    useEffect(() => {
        dispatch(fetchServices());
        if (user?.id) dispatch(fetchSubscriptions(user.id));
        
        const handleClickOutside = (event) => {
            if (dropRef.current && !dropRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dispatch, user]);

    const toggleDropdown = (e, index) => {
        e.preventDefault();
        setActiveDropdown(activeDropdown === index ? null : index);
    };

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
                    <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Services Actifs</h2>
                    {isRenewing && <span style={{ fontSize: '0.85rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><RefreshCw size={14} className="animate-spin" /> Renouvellement en cours...</span>}
                </div>
                
                {subscriptions.length === 0 ? (
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '16px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                        <Server size={48} color="#e2e8f0" style={{ margin: '0 auto 1rem auto' }} />
                        <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>Vous n'avez aucun service actif.</p>
                        <Link to="/pricing" style={{ color: '#1E6BFF', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Parcourir nos offres</Link>
                    </div>
                ) : (
                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(11,31,58,0.03)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>Service</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>Statut</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>Date d'expiration</th>
                                    <th style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.map(sub => (
                                    <tr key={sub.idSub} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: '#0B1F3A', fontSize: '1rem' }}>{sub.nameService}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>#{sub.idSub}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{ background: sub.statusSub === 'active' ? '#ecfdf5' : '#fef2f2', color: sub.statusSub === 'active' ? '#10b981' : '#ef4444', fontSize: '0.7rem', fontWeight: 800, padding: '0.4rem 0.75rem', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                {sub.statusSub}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#0B1F3A' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Clock size={16} color="#64748b" />
                                                {new Date(sub.endDate).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <button 
                                                onClick={() => handleRenew(sub.idSub)}
                                                disabled={isRenewing}
                                                style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', background: '#0B1F3A', color: 'white', border: 'none', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s', opacity: isRenewing ? 0.7 : 1 }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                                            >
                                                <RefreshCw size={14} className={isRenewing ? 'animate-spin' : ''} /> Renouveler Service
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section ref={dropRef}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    background: '#0B1F3A', 
                    padding: '2.5rem 2rem', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(11,31,58,0.15)'
                }}>
                    <h3 style={{ 
                        margin: '0 0 1.5rem 0', 
                        color: 'white', 
                        fontSize: '1.35rem', 
                        fontWeight: 700, 
                        letterSpacing: '0.5px' 
                    }}>
                        Découvrir plus de services
                    </h3>
                    <ul className="navbar-links" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem', width: '100%' }}>
                        {navData.slice(0, 5).map((category, index) => (
                            <li key={index} className={`nav-item-dropdown ${activeDropdown === index ? 'active' : ''}`}>
                                <a
                                    href="#"
                                    className="nav-link-with-icon"
                                    onClick={(e) => toggleDropdown(e, index)}
                                    style={{ color: 'white' }}
                                >
                                    {category.title} <ChevronDown size={14} className="dropdown-arrow" />
                                </a>
                                <div className="nav-dropdown-menu">
                                    <div className="nav-dropdown-grid">
                                        {category.items.map((item, idx) => (
                                            <Link
                                                to={item.href}
                                                key={idx}
                                                className="nav-dropdown-item"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="nav-dropdown-icon">
                                                    {item.icon ? <item.icon size={20} /> : <div style={{ width: 20, height: 20 }} />}
                                                </div>
                                                <div className="nav-dropdown-desc-container">
                                                    <span className="nav-dropdown-title">{item.title}</span>
                                                    <span className="nav-dropdown-desc">{item.desc}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            
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
