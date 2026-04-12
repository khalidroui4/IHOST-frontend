import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard, Globe, Server, CreditCard, Bell,
    ShoppingCart, CheckCircle2, AlertCircle, Activity, Clock,
    Plus, ChevronRight, Shield, ArrowUpRight, Loader2
} from 'lucide-react';

const ClientDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { stats, recentActivity, notifications, isLoading, error } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    const displayName = user?.username || user?.first_name || 'Client';

    const statCards = [
        { label: 'Services Actifs', value: stats.activeServices, icon: Server, color: '#3b82f6', bg: '#eff6ff', accent: '#3b82f6' },
        { label: 'Domaines', value: stats.domains, icon: Globe, color: '#8b5cf6', bg: '#f5f3ff', accent: '#8b5cf6' },
        { label: 'Commandes', value: stats.totalOrders, icon: ShoppingCart, color: '#10b981', bg: '#ecfdf5', accent: '#10b981' },
        { label: 'Factures Impayées', value: stats.unpaidInvoices, icon: CreditCard, color: '#ef4444', bg: '#fef2f2', accent: '#ef4444' },
    ];

    /* ─── Shared Styles ─── */
    const cardStyle = { background: 'white', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' };
    const sectionTitleStyle = { margin: '0 0 1.25rem 0', fontSize: '1rem', fontWeight: 800, color: '#0B1F3A' };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem', color: '#64748b' }}>
                <Loader2 className="animate-spin" size={40} />
                <p style={{ fontWeight: 600 }}>Chargement de votre tableau de bord...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ position: 'relative', overflow: 'hidden', padding: '2rem 2.5rem', borderRadius: '20px', background: 'linear-gradient(135deg, #0B1F3A 0%, #1a3a6e 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ position: 'absolute', top: '-60px', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(30,107,255,0.5) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px' }}>Tableau de Bord</p>
                    <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                        Bonjour, <span style={{ color: '#60a5fa' }}>{displayName}</span>  
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                {statCards.map(({ label, value, icon: Icon, bg, color, accent }) => (
                    <div key={label} style={{ ...cardStyle, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: `3px solid ${accent}`, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem' }}>

                <div style={{ ...cardStyle, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h3 style={sectionTitleStyle}>Activité Récente</h3>
                        <Link to="/client/orders" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E6BFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Tout voir <ChevronRight size={14} />
                        </Link>
                    </div>
                    {recentActivity.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
                            <Activity size={40} strokeWidth={1.5} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ fontSize: '0.9rem' }}>Aucune activité récente à afficher.</p>
                        </div>
                    ) : (
                        <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid #f1f5f9', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {recentActivity.map((act, i) => (
                                <div key={i} style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-1.85rem', top: '0.25rem', width: '10px', height: '10px', borderRadius: '50%', background: act.type === 'order' ? '#3b82f6' : act.type === 'payment' ? '#10b981' : '#f59e0b', border: '2px solid white', boxShadow: '0 0 0 4px white' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.9rem', fontWeight: 700, color: '#0B1F3A' }}>{act.title}</p>
                                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Statut: <span style={{ fontWeight: 600, color: '#334155' }}>{act.status}</span></p>
                                        </div>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
                                            <Clock size={12} /> {new Date(act.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div style={{ ...cardStyle, padding: '1.5rem', background: 'linear-gradient(to bottom right, #ffffff, #f0f9ff)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Shield size={18} />
                            </div>
                            <h3 style={{ ...sectionTitleStyle, marginBottom: 0 }}>Support Technique</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                            Besoin d'aide ? Nos experts sont disponibles 24/7 pour vous accompagner.
                        </p>
                        <Link to="/client/support" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem', borderRadius: '10px', background: '#0B1F3A', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'}
                            onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                        >
                            Ouvrir un Ticket
                        </Link>
                    </div>

                    <div style={{ ...cardStyle, padding: '1.5rem' }}>
                        <h3 style={sectionTitleStyle}>État des Services</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { name: 'Infrastructure Cloud', status: 'Opérationnel' },
                                { name: 'Réseau & DNS', status: 'Opérationnel' },
                                { name: 'Serveurs Mail', status: 'Opérationnel' }
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>{s.name}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                        {s.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ ...cardStyle, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                            <h3 style={{ ...sectionTitleStyle, marginBottom: 0 }}>Notifications</h3>
                            <Link to="/client/notifications" style={{ fontSize: '0.8rem', color: '#1E6BFF', textDecoration: 'none', fontWeight: 600 }}>Voir tout</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {!notifications || notifications.length === 0 ? (
                                <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', margin: '1rem 0' }}>Aucune nouvelle notification.</p>
                            ) : (
                                notifications.map(n => (
                                    <div key={n.idNotification} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', paddingBottom: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                                        <div style={{ minWidth: '8px', minHeight: '8px', background: n.isRead ? '#cbd5e1' : '#3b82f6', borderRadius: '50%', marginTop: '5px' }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.85rem', color: n.isRead ? '#64748b' : '#0B1F3A', fontWeight: n.isRead ? 400 : 600, lineHeight: 1.4 }}>{n.message}</p>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{new Date(n.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ClientDashboard;
