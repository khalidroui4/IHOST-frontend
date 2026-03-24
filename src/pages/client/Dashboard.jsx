import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchDomains } from '../../store/slices/domainSlice';
import { fetchSubscriptions } from '../../store/slices/subscriptionSlice';
import { fetchInvoices } from '../../store/slices/invoiceSlice';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard, Globe, Server, CreditCard, Bell,
    ShoppingCart, CheckCircle2, AlertCircle, Activity, Clock,
    Plus, ChevronRight, Shield, ArrowUpRight
} from 'lucide-react';

const ClientDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { items: orders } = useSelector(state => state.orders);
    const { items: domains } = useSelector(state => state.domains);
    const { items: subscriptions } = useSelector(state => state.subscriptions);
    const { items: invoices } = useSelector(state => state.invoices);
    const { items: notifications } = useSelector(state => state.notifications);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            Promise.all([
                dispatch(fetchOrders(user.id)),
                dispatch(fetchDomains(user.id)),
                dispatch(fetchSubscriptions(user.id)),
                dispatch(fetchInvoices(user.id))
            ]).finally(() => setIsLoading(false));
        }
    }, [dispatch, user]);

    const firstName = user?.name?.split(' ')[0] || user?.first_name || 'Client';

    const activeSubscriptions = subscriptions.filter(s => s.statusSub === 'active' || s.statusSub === 'active');
    const unpaidInvoices = invoices.filter(i => i.statusFacture !== 'paid');

    const stats = [
        { label: 'Services Actifs', value: activeSubscriptions.length || '0', icon: Server, color: '#3b82f6', bg: '#eff6ff', accent: '#3b82f6' },
        { label: 'Domaines', value: domains.length || '0', icon: Globe, color: '#8b5cf6', bg: '#f5f3ff', accent: '#8b5cf6' },
        { label: 'Commandes', value: orders.length || '0', icon: ShoppingCart, color: '#10b981', bg: '#ecfdf5', accent: '#10b981' },
        { label: 'Factures Impayées', value: unpaidInvoices.length || '0', icon: CreditCard, color: '#ef4444', bg: '#fef2f2', accent: '#ef4444' },
    ];

    /* ─── Shared Styles ─── */
    const card = { background: 'white', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' };
    const sectionTitle = { margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 800, color: '#0B1F3A' };

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* ── Welcome Banner ── */}
            <div style={{ position: 'relative', overflow: 'hidden', padding: '2rem 2.5rem', borderRadius: '20px', background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6e 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ position: 'absolute', top: '-60px', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(30,107,255,0.5) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px' }}>Tableau de Bord</p>
                    <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                        Bonjour, <span style={{ color: '#60a5fa' }}>{firstName}</span>  
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '440px' }}>
                        Bienvenue dans votre espace client IHOST. Gérez vos services et infrastructures en toute simplicité.
                    </p>
                </div>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '0.75rem' }}>
                    <Link to="/pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '0.65rem 1.25rem', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem', backdropFilter: 'blur(6px)', transition: 'background 0.2s' }}>
                        <Plus size={16} /> Nouveau Service
                    </Link>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                {stats.map(({ label, value, icon: Icon, bg, color, accent }) => (
                    <div key={label} style={{ ...card, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: `3px solid ${accent}`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
                    >
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                            <Icon size={20} />
                        </div>
                        <div>
                            <p style={{ margin: '0 0 0.15rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>{label}</p>
                            <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A', lineHeight: 1 }}>{value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main Grid: Services + Sidebar ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem' }}>

                {/* Services Table */}
                <div style={{ ...card, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 style={sectionTitle}>Mes Services Récents</h3>
                        <Link to="/client/services" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E6BFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Tout voir <ChevronRight size={14} />
                        </Link>
                    </div>
                    {isLoading ? (
                        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0', fontSize: '0.9rem' }}>Chargement des services...</p>
                    ) : subscriptions.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', borderRadius: '12px', border: '1px dashed #e2e8f0', background: '#fafafa' }}>
                            <Server size={32} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#64748b' }}>Vous n'avez pas encore de services actifs.</p>
                            <Link to="/pricing" style={{ color: '#1E6BFF', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                Parcourir nos offres <ArrowUpRight size={13} />
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {subscriptions.slice(0, 3).map((s) => (
                                <div key={s.idSub} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, #3b82f6, #0043C0)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                                            <Server size={20} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 700, color: '#0B1F3A', fontSize: '0.9rem' }}>{s.nameService}</p>
                                            <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{s.descriptionS?.substring(0, 40)}...</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: s.statusSub === 'active' ? '#ecfdf5' : '#fef2f2', color: s.statusSub === 'active' ? '#10b981' : '#ef4444', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '9999px', textTransform: 'capitalize' }}>
                                            {s.statusSub === 'active' && <CheckCircle2 size={11} strokeWidth={3} />} {s.statusSub}
                                        </span>
                                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>Expire le {s.endDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Domains */}
                    <div style={{ ...card, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Domaines</h3>
                            <Link to="/client/domains" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E6BFF', textDecoration: 'none' }}>Gérer</Link>
                        </div>
                        {domains.length === 0 ? (
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Aucun domaine enregistré.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {domains.slice(0, 3).map(d => {
                                    const isExpiring = new Date(d.expirationDate) < new Date(new Date().setDate(new Date().getDate() + 30));
                                    return (
                                        <div key={d.idDomaine} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.9rem', borderRadius: '10px', background: isExpiring ? '#fff7ed' : '#f8fafc', border: `1px solid ${isExpiring ? '#fed7aa' : '#f1f5f9'}` }}>
                                            <div>
                                                <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#0B1F3A' }}>{d.domainName}</p>
                                                <p style={{ margin: 0, fontSize: '0.72rem', color: isExpiring ? '#ea580c' : '#94a3b8' }}>
                                                    {isExpiring ? `⚠ Expire bientôt` : `Expire le ${new Date(d.expirationDate).toLocaleDateString()}`}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Activity Timeline */}
                    <div style={{ ...card, padding: '1.5rem', flex: 1 }}>
                        <h3 style={sectionTitle}>Notifications</h3>
                        {notifications.length === 0 ? (
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Aucune notification récente.</p>
                        ) : (
                            <div style={{ position: 'relative', paddingLeft: '1.25rem', borderLeft: '2px solid #e5eaf0', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                {notifications.slice(0, 4).map((n, i) => (
                                    <div key={i} style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '-1.55rem', top: '0.15rem', width: '12px', height: '12px', borderRadius: '50%', background: '#1E6BFF', border: '2px solid white', boxShadow: `0 0 0 3px rgba(30,107,255,0.2)` }} />
                                        <p style={{ margin: '0 0 0.1rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#0B1F3A' }}>{n.message}</p>
                                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Clock size={11} /> {new Date(n.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ClientDashboard;
