import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import {
    LayoutDashboard, Globe, Server, CreditCard, Bell,
    ShoppingCart, CheckCircle2, AlertCircle, Activity, Clock,
    Plus, ChevronRight, Shield, ArrowUpRight, Loader2,
    MessageCircle, ThumbsUp
} from 'lucide-react';

const ClientDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { stats, recentActivity, notifications, isLoading, error } = useSelector(state => state.dashboard);
    const { items: cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchDashboardData());
        dispatch(fetchCart());
    }, [dispatch]);

    const displayName = user?.username || user?.first_name || 'Client';

    const statCards = [
        { label: 'MES SERVICES', value: stats.activeServices || 0, icon: Server },
        { label: 'MES DOMAINES', value: stats.domains || 0, icon: Globe },
        { label: 'MES DEMANDES', value: stats.totalOrders || 0, icon: MessageCircle },
        { label: 'FACTURES', value: stats.unpaidInvoices || 0, icon: CreditCard },
    ];

    /* ─── Shared Styles ─── */
    const cardStyle = { background: 'white', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' };
    const sectionTitleStyle = { margin: '0 0 1.25rem 0', fontSize: '1.5rem', fontWeight: 800, color: '#0B1F3A' };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '1rem', color: '#64748b' }}>
                <Loader2 className="animate-spin" size={40} />
                <p style={{ fontWeight: 600 }}>Chargement de votre tableau de bord...</p>
            </div>
        );
    }


    const historyActivityLog = (recentActivity || []).map(act => {
        if (act.type === 'order' || (act.title && act.title.toLowerCase().startsWith('commande'))) {
            return {
                ...act,
                status: 'unpaid'
            };
        }
        return act;
    });

    const combinedActivities = [
        ...historyActivityLog.filter(act => !['ticket', 'message', 'support'].includes((act.type || '').toLowerCase()))
    ];

    const groupedActivities = combinedActivities.sort((a, b) => new Date(b.date) - new Date(a.date)).reduce((acc, act) => {
        const d = new Date(act.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const isToday = d.toDateString() === today.toDateString();
        const isYesterday = d.toDateString() === yesterday.toDateString();

        let frDateStr = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        frDateStr = frDateStr.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); 
        
        let prefix = "";
        if (isToday) prefix = "Aujourd'hui - ";
        else if (isYesterday) prefix = "Hier - ";
        
        const finalKey = `${prefix}${frDateStr}`;
        if (!acc[finalKey]) acc[finalKey] = [];
        acc[finalKey].push(act);
        return acc;
    }, {});

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0 0.5rem 0' }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#0B1F3A', letterSpacing: '-0.5px' }}>
                    Bonjour <span style={{ background: 'linear-gradient(to right, rgba(29, 89, 172, 1) 0%, rgba(14, 47, 103, 1) 25%, rgba(17, 62, 142, 1) 50%, rgba(21, 73, 170, 1) 75%, rgba(21, 80, 188, 1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{displayName}</span> à l'espace client
                </h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                {statCards.map(({ label, value, icon: Icon }) => (
                    <div key={label} style={{ ...cardStyle, borderRadius: '16px', position: 'relative', overflow: 'hidden', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '130px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
                    >
                        <div style={{ position: 'absolute', top: '-15%', right: '-10%', color: '#f1f5f9', zIndex: 0 }}>
                            <Icon size={130} strokeWidth={2} fill="#f1f5f9" color="#e2e8f0" />
                        </div>
                        
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                            {label === 'FACTURES' && value === 0 ? (
                                <ThumbsUp size={50} fill="#1a4260" color="#1a4260" strokeWidth={1} style={{ marginBottom: '0.2rem' }} />
                            ) : (
                                <p style={{ margin: 0, fontSize: '3.5rem', fontWeight: 500, color: '#1a4260', lineHeight: 1, fontFamily: 'serif' }}>{value}</p> 
                            )}
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400, letterSpacing: '0.5px', fontFamily: 'serif' }}>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem' }}>

                <div style={{ ...cardStyle, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <h1 style={sectionTitleStyle}>Activité Récente</h1>
                    </div>
                    {Object.keys(groupedActivities).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
                            <Activity size={40} strokeWidth={1.5} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ fontSize: '0.9rem' }}>Aucune activité récente à afficher.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {Object.entries(groupedActivities).map(([dateLabel, activities]) => (
                                <div key={dateLabel}>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', margin: '0 0 1rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                        {dateLabel}
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        {activities.map((act, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '6px', cursor: 'default', transition: 'background 0.2s' }}
                                                 onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                 onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{ width: '80px', fontSize: '0.85rem', color: '#64748b', flexShrink: 0 }}>
                                                    {new Date(act.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden', flex: 1 }}>
                                                    <span style={{ fontSize: '0.9rem', color: '#0B1F3A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {act.title}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>


                    <div style={{ ...cardStyle, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                            <h3 style={{ ...sectionTitleStyle, marginBottom: 0 }}>État de commande</h3>
                            <Link to="/client/orders" style={{ fontSize: '0.8rem', color: '#1E6BFF', textDecoration: 'none', fontWeight: 600 }}>Voir plus</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {(() => {
                                const orderList = [
                                    ...(cartItems || []).map(item => ({
                                        name: item.service?.nameService || item.nameService || 'Commande en panier',
                                        status: 'Unpaid',
                                        isPaid: false
                                    })),
                                    ...(recentActivity || [])
                                        .filter(act => act.type === 'order' || act.type === 'payment')
                                        .map(act => ({
                                            name: act.title || 'Commande',
                                            status: 'Paid',
                                            isPaid: true
                                        }))
                                ].slice(0, 4);

                                if (orderList.length === 0) {
                                    return <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', margin: '1rem 0' }}>Aucune commande.</p>;
                                }

                                return orderList.map((s, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '65%' }} title={s.name}>{s.name}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: s.isPaid ? '#10b981' : '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.isPaid ? '#10b981' : '#ef4444' }} />
                                            {s.status}
                                        </span>
                                    </div>
                                ));
                            })()}
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
