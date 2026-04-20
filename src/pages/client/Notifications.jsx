import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNotifications, markAllRead, clearUnread } from '../../store/slices/notificationSlice';
import {
    Bell, MessageSquare, ShoppingBag, AlertTriangle,
    User, ArrowRight
} from 'lucide-react';

/* ── Utility ── */
export const fmtDate = (raw) => {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return "À l'instant";
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// Returns category string: 'Today', 'Yesterday', or fallback day name e.g. 'Monday'
export const getDateGroup = (raw) => {
    if (!raw) return 'Autre';
    const d = new Date(raw);
    if (isNaN(d)) return 'Autre';
    const now = new Date();
    
    // Normalize to start of day for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    
    if (targetDate.getTime() === today.getTime()) return "Aujourd'hui";
    if (targetDate.getTime() === yesterday.getTime()) return "Hier";
    
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const diffTime = Math.abs(today - targetDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
        return days[targetDate.getDay()];
    }
    
    return targetDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
};

/* ── Detect notification type from message content ── */
export const detectType = (msg = '') => {
    const m = msg.toLowerCase();
    if (m.includes('message') || m.includes('support') || m.includes('ticket') || m.includes('réponse')) return 'support';
    if (m.includes('expir') || m.includes('renouvel') || m.includes('fin') || m.includes('term')) return 'expiring';
    if (m.includes('command') || m.includes('achat') || m.includes('service') || m.includes('abonnement')) return 'purchase';
    if (m.includes('profil') || m.includes('mot de passe') || m.includes('email') || m.includes('compte')) return 'profile';
    return 'general';
};

export const TYPE_CONFIG = {
    support:  { icon: MessageSquare, color: '#1E6BFF', label: 'Support',  link: '/client/support' },
    expiring: { icon: AlertTriangle, color: '#f59e0b', label: 'Service',  link: '/client/invoices' },
    purchase: { icon: ShoppingBag,   color: '#22c55e', label: 'Commande', link: '/client/invoices' },
    profile:  { icon: User,          color: '#a855f7', label: 'Profil',   link: '/client/profile' },
    general:  { icon: Bell,          color: '#64748b', label: 'Infos',    link: null },
};

const ClientNotifications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: notifications, isLoading, unread } = useSelector(state => state.notifications);
    const { user } = useSelector(state => state.auth);

    const [activeTab, setActiveTab] = useState('unread'); // unread, read, all

    useEffect(() => {
        if (user) dispatch(fetchNotifications(user.id));
    }, [dispatch, user]);

    const handleMarkAll = () => {
        if (user?.id) dispatch(markAllRead(user.id));
        dispatch(clearUnread());
    };

    const filteredNotifs = notifications.filter(n => {
        const isRead = n.isRead || n.is_read;
        if (activeTab === 'unread') return !isRead;
        if (activeTab === 'read') return isRead;
        return true; 
    });

    const groupedNotifs = filteredNotifs.reduce((acc, notif) => {
        const group = getDateGroup(notif.createdAt || notif.created_at);
        if (!acc[group]) acc[group] = [];
        acc[group].push(notif);
        return acc;
    }, {});

    // Sort order
    const groupOrder = ["Aujourd'hui", "Hier", 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche', 'Autre'];
    const groups = Object.keys(groupedNotifs).sort((a, b) => {
        let idxA = groupOrder.indexOf(a);
        let idxB = groupOrder.indexOf(b);
        if (idxA === -1) idxA = 999;
        if (idxB === -1) idxB = 999;
        return idxA - idxB;
    });

    return (
        <div style={{ margin: '-2rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div style={{
                background: '#0B1F3A', 
                borderRadius: '0',
                padding: '2rem',
                minHeight: 'calc(100vh - 64px)',
                color: '#fff',
            }}>
                {/* Header Title */}
                <h1 style={{ margin: '0 0 1.5rem 0', fontSize: '2rem', fontWeight: 600, color: '#fff' }}>
                    Notifications
                </h1>
                
                {/* Tabs */}
                <div style={{ 
                    display: 'flex', 
                    background: '#08162A',
                    borderRadius: '8px', 
                    padding: '4px',
                    marginBottom: '2rem'
                }}>
                    {['unread', 'read', 'all'].map(tab => {
                        const labels = { unread: 'Unread', read: 'Read', all: 'All' };
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    flex: 1,
                                    padding: '0.6rem 0',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: isActive ? '#1E6BFF' : 'transparent',
                                    color: isActive ? '#fff' : '#64748b',
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
                                }}
                            >
                                {labels[tab]}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[1,2,3].map(i => (
                            <div key={i} style={{ height: '80px', borderRadius: '12px', background: 'linear-gradient(90deg, #0F294D 25%, #13325B 50%, #0F294D 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                        ))}
                    </div>
                ) : filteredNotifs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Aucune notification à afficher.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {groups.map(group => (
                            <div key={group} style={{ display: 'flex', flexDirection: 'column' }}>
                                
                                {/* Group Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', padding: '0 0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>
                                            {group === "Aujourd'hui" ? "Today" : group === "Hier" ? "Yesterday" : group}
                                        </span>
                                        <span style={{ background: '#13325B', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '12px' }}>
                                            {groupedNotifs[group].length}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E6BFF', cursor: 'pointer' }}>
                                        See All
                                    </span>
                                </div>

                                {/* Group Items */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {groupedNotifs[group].map(n => {
                                        const isRead = n.isRead || n.is_read;
                                        const type = detectType(n.message);
                                        const cfg = TYPE_CONFIG[type];
                                        const IconComp = cfg.icon;

                                        return (
                                            <div
                                                key={n.idNotification}
                                                onClick={() => {
                                                    if (cfg.link) navigate(cfg.link);
                                                }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                                    padding: '1rem',
                                                    borderRadius: '12px',
                                                    background: '#0F294D',
                                                    border: '1px solid #163967',
                                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
                                                    cursor: cfg.link ? 'pointer' : 'default',
                                                    transition: 'all 0.2s',
                                                    position: 'relative'
                                                }}
                                                onMouseEnter={e => {
                                                    if (cfg.link) e.currentTarget.style.background = '#13325B';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.background = '#0F294D';
                                                }}
                                            >
                                                {/* Unread dot */}
                                                <div style={{ width: 14, display: 'flex', justifyContent: 'center' }}>
                                                    {!isRead && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38bdf8' }} />}
                                                </div>

                                                {/* Avatar / Icon */}
                                                <div style={{
                                                    width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                                                    background: '#08162A', border: '1px solid #163967', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#38bdf8'
                                                }}>
                                                    {type === 'profile' && user?.avatar ? (
                                                        <img src={user.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                                                    ) : (
                                                        <IconComp size={18} />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                    <p style={{
                                                        margin: 0,
                                                        fontSize: '0.9rem',
                                                        color: isRead ? '#94a3b8' : '#e2e8f0',
                                                        fontWeight: 500,
                                                        lineHeight: 1.4
                                                    }}>
                                                        {type === 'support' && <strong style={{ color: '#fff', fontWeight: 600 }}>Support IHOST </strong>}
                                                        {type === 'purchase' && <strong style={{ color: '#fff', fontWeight: 600 }}>Commande </strong>}
                                                        {n.message}
                                                    </p>
                                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                                        {fmtDate(n.createdAt || n.created_at)}
                                                    </span>
                                                </div>

                                                {/* Action Button */}
                                                {cfg.link && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <button 
                                                            style={{
                                                                background: '#1E6BFF', 
                                                                color: '#fff',
                                                                border: 'none',
                                                                padding: '6px 14px',
                                                                borderRadius: '8px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: 600,
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px'
                                                            }}
                                                        >
                                                            {type === 'support' ? 'Répondre' : type === 'purchase' ? 'Voir' : 'Vérifier'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
};

export default ClientNotifications;
