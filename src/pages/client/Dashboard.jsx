import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
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
    const { items: cartItems } = useSelector(state => state.cart);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) dispatch(fetchOrders(user.id));
        const t = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(t);
    }, [dispatch, user]);

    const firstName = user?.name?.split(' ')[0] || user?.first_name || 'Client';

    const stats = [
        { label: 'Services Actifs', value: '2', icon: Server, color: '#3b82f6', bg: '#eff6ff', accent: '#3b82f6' },
        { label: 'Domaines', value: '1', icon: Globe, color: '#8b5cf6', bg: '#f5f3ff', accent: '#8b5cf6' },
        { label: 'Commandes', value: orders.length || '0', icon: ShoppingCart, color: '#10b981', bg: '#ecfdf5', accent: '#10b981' },
        { label: 'Factures Impayées', value: '0', icon: CreditCard, color: '#ef4444', bg: '#fef2f2', accent: '#ef4444' },
    ];

    const demoServices = [
        { name: 'Hébergement Mutualisé Pro', host: 'web-cluster-ihost.ma', specs: '20 GB SSD', status: 'active', expires: '01 Nov 2026', color: '#3b82f6' },
        { name: 'VPS Cloud Performance', host: 'vps-99234.ihost.ma', specs: '4 vCore · 8 GB RAM', status: 'active', expires: '15 Jul 2026', color: '#8b5cf6' },
    ];

    const demoDomains = [
        { name: 'mon-projet.ma', expires: '14 Apr 2026', status: 'expiring', daysLeft: 21 },
        { name: 'ihost-store.com', expires: '03 Dec 2026', status: 'active', daysLeft: 254 },
    ];

    const timeline = [
        { label: 'Connexion réussie', time: "Aujourd'hui, 06:02", icon: Shield, color: '#1E6BFF' },
        { label: 'Paiement reçu — Hébergement Pro', time: 'Hier, 14:30', icon: CheckCircle2, color: '#10b981' },
        { label: 'Ticket #1482 — Réponse reçue', time: '21 Mars 2026', icon: Bell, color: '#f59e0b' },
        { label: 'Commande #8823 créée', time: '15 Mars 2026', icon: ShoppingCart, color: '#8b5cf6' },
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
                        Bonjour, <span style={{ color: '#60a5fa' }}>{firstName}</span> 👋
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
                        <h3 style={sectionTitle}>Mes Services</h3>
                        <Link to="/client/services" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1E6BFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            Tout voir <ChevronRight size={14} />
                        </Link>
                    </div>
                    {isLoading ? (
                        <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem 0', fontSize: '0.9rem' }}>Chargement...</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {demoServices.map((s) => (
                                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                                            <Server size={20} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 700, color: '#0B1F3A', fontSize: '0.9rem' }}>{s.name}</p>
                                            <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{s.host} · {s.specs}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#ecfdf5', color: '#10b981', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.6rem', borderRadius: '9999px' }}>
                                            <CheckCircle2 size={11} strokeWidth={3} /> Actif
                                        </span>
                                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>Expire le {s.expires}</p>
                                    </div>
                                </div>
                            ))}
                            <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '10px', border: '1.5px dashed #e2e8f0', background: '#fafafa' }}>
                                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>Besoin de plus de puissance ?</p>
                                <Link to="/pricing" style={{ color: '#1E6BFF', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                    Voir le catalogue <ArrowUpRight size={13} />
                                </Link>
                            </div>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {demoDomains.map(d => (
                                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.9rem', borderRadius: '10px', background: d.status === 'expiring' ? '#fff7ed' : '#f8fafc', border: `1px solid ${d.status === 'expiring' ? '#fed7aa' : '#f1f5f9'}` }}>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#0B1F3A' }}>{d.name}</p>
                                        <p style={{ margin: 0, fontSize: '0.72rem', color: d.status === 'expiring' ? '#ea580c' : '#94a3b8' }}>
                                            {d.status === 'expiring' ? `⚠ Expire dans ${d.daysLeft} jours` : `Expire le ${d.expires}`}
                                        </p>
                                    </div>
                                    {d.status === 'expiring' && (
                                        <Link to="/client/domains" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ea580c', textDecoration: 'none', background: '#ffedd5', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                                            Renouveler
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Timeline */}
                    <div style={{ ...card, padding: '1.5rem', flex: 1 }}>
                        <h3 style={sectionTitle}>Activité Récente</h3>
                        <div style={{ position: 'relative', paddingLeft: '1.25rem', borderLeft: '2px solid #e5eaf0', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            {timeline.map((t, i) => {
                                const Icon = t.icon;
                                return (
                                    <div key={i} style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '-1.55rem', top: '0.15rem', width: '12px', height: '12px', borderRadius: '50%', background: t.color, border: '2px solid white', boxShadow: `0 0 0 3px ${t.color}30` }} />
                                        <p style={{ margin: '0 0 0.1rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#0B1F3A' }}>{t.label}</p>
                                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Clock size={11} /> {t.time}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ClientDashboard;
