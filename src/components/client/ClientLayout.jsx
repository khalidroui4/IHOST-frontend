import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { fetchNotifications, markAllRead, clearUnread } from '../../store/slices/notificationSlice';
import {
    LayoutDashboard, Server, Globe, ShoppingCart, CreditCard,
    HelpCircle, Bell, Search, LogOut, User, Shield, ChevronRight,
    Package, FileText, Menu,
    Home,
    Hand,
    Indent,
    Pointer,
    LayoutDashboardIcon,
    BellOff,
    Clock
} from 'lucide-react';
import LogoutConfirmModal from '../LogoutConfirmModal';
import { GrDashboard } from 'react-icons/gr';
import { fmtDate, detectType, TYPE_CONFIG } from '../../pages/client/Notifications.jsx';

const sidebarGroups = [
    {
        label: 'Général',
        items: [
            { path: '/client/dashboard', icon: LayoutDashboardIcon, label: "Vue d'ensemble" },
            { path: '/client/services', icon: Server, label: 'Mes Services' },
            { path: '/client/domains', icon: Globe, label: 'Domaines' },
            { path: '/client/orders', icon: Package, label: 'Commandes' },

            { path: '/client/invoices', icon: FileText, label: 'Factures' },
            { path: '/client/cart', icon: ShoppingCart, label: 'Panier' },
            { path: '/client/support', icon: HelpCircle, label: 'Tickets' },
            { path: '/client/notifications', icon: Bell, label: 'Notifications' },
            { path: '/client/profile', icon: User, label: 'Mon Profil' },
        ]
    }
];

const ClientLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const cartCount = useSelector(state => state.cart.items.length);
    const notifCount = useSelector(state => state.notifications?.unread || 0);

    const [searchQuery, setSearchQuery] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showNotifPopup, setShowNotifPopup] = useState(false);
    const notifRef = useRef(null);
    const { items: allNotifications } = useSelector(state => state.notifications);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchCart());
            dispatch(fetchNotifications(user.id));

            // Poll for new notifications every 30 seconds
            const interval = setInterval(() => {
                dispatch(fetchNotifications(user.id));
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [dispatch, user]);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', background: '#f0f4f8', zIndex: 9999, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
            
            <div 
                className={`sidebar-overlay ${isSidebarOpen ? '' : 'hidden'}`} 
                onClick={() => setIsSidebarOpen(false)}
            />

            <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ width: '240px', background: '#0B1F3A', height: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
                
                {/* Logo */}
                <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <img src='/logo.jpeg' alt="logo" style={{ width: '160px', height: '80px',margin:'auto' }} />
                    </Link>
                </div>

                <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column' }}>
                    {sidebarGroups.map((group) => (
                        <div key={group.label} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-evenly' }}>
                                {group.items.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => {
                                                if (item.path === '/client/notifications') {
                                                    if (user?.id) dispatch(markAllRead(user.id));
                                                    dispatch(clearUnread());
                                                }
                                            }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.65rem',
                                                padding: '0.6rem 0.75rem', borderRadius: '8px',
                                                textDecoration: 'none', fontWeight: isActive ? 700 : 500,
                                                fontSize: '0.875rem', transition: 'all 0.15s',
                                                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                                                background: isActive ? 'rgba(30,107,255,0.15)' : 'transparent',
                                            }}
                                        >
                                            <Icon size={17} />
                                            <span>{item.label}</span>
                                            {item.path === '/client/cart' && cartCount > 0 && (
                                                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {cartCount}
                                                </span>
                                            )}
                                            {item.path === '/client/notifications' && notifCount > 0 && (
                                                <span style={{ marginLeft: 'auto', background: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {notifCount}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'transparent', border: 'none', color: '#ff0000ff', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <LogOut size={17} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                <header className="dashboard-header" style={{ height: '64px', background: '#e3eff6', borderBottom: '1px solid #cbcbcbff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button className="mobile-header-toggle" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} color="#0B1F3A" />
                        </button>

                        <Link to="/" style={{ color: '#2e6ec2ff', fontWeight: 600, fontSize: '1.2rem', marginLeft: '0.5rem',marginTop: '0.5rem',textDecoration: 'none'}}>
                            {'->'}  Découvrir notre site web    
                        </Link>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div ref={notifRef} style={{ position: 'relative' }}>
                            <button
                                onClick={() => {
                                    setShowNotifPopup(!showNotifPopup);
                                    if (!showNotifPopup && user?.id && notifCount > 0) {
                                        dispatch(markAllRead(user.id));
                                        dispatch(clearUnread());
                                    }
                                }}
                                style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '10px', background: '#f3f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none', border: '1px solid #e5eaf0', transition: 'all 0.2s', cursor: 'pointer', outline: 'none' }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#eff3fb'; e.currentTarget.style.color = '#0B1F3A'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#f3f6fb'; e.currentTarget.style.color = '#64748b'; }}
                            >
                                <Bell size={18} />
                                {notifCount > 0 && (
                                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                                        {notifCount}
                                    </span>
                                )}
                            </button>

                            {/* Popup des Notifications */}
                            {showNotifPopup && (
                                <div style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    width: '380px',
                                    background: '#0B1F3A',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                                    border: '1px solid #163967',
                                    zIndex: 1000,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px solid #163967', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>Notifications</h3>
                                    </div>
                                    
                                    <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                                        {allNotifications && allNotifications.length > 0 ? (
                                            allNotifications.slice(0, 5).map(n => {
                                                const type = detectType(n.message);
                                                const cfg = TYPE_CONFIG[type];
                                                const IconComp = cfg.icon;
                                                const isRead = n.isRead || n.is_read;

                                                return (
                                                    <div 
                                                        key={n.idNotification}
                                                        onClick={() => {
                                                            setShowNotifPopup(false);
                                                            if (cfg.link) navigate(cfg.link);
                                                        }}
                                                        style={{
                                                            display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
                                                            padding: '1rem', borderBottom: '1px solid #163967',
                                                            cursor: cfg.link ? 'pointer' : 'default',
                                                            background: isRead ? '#0B1F3A' : '#0F294D',
                                                            transition: 'background 0.2s'
                                                        }}
                                                        onMouseEnter={e => {
                                                            if (cfg.link) e.currentTarget.style.background = '#13325B';
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.background = isRead ? '#0B1F3A' : '#0F294D';
                                                        }}
                                                    >
                                                        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: '#08162A', border: '1px solid #163967', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <IconComp size={16} color="#38bdf8" />
                                                        </div>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', fontWeight: isRead ? 500 : 600, color: isRead ? '#94a3b8' : '#e2e8f0', lineHeight: 1.4 }}>
                                                                {n.message}
                                                            </p>
                                                            <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                <Clock size={10} /> {fmtDate(n.createdAt || n.created_at)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#08162A', border: '1px solid #163967', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                                                    <BellOff size={20} color="#64748b" />
                                                </div>
                                                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>Aucune notification</p>
                                            </div>
                                        )}
                                    </div>

                                    <Link 
                                        to="/client/notifications" 
                                        onClick={() => setShowNotifPopup(false)}
                                        style={{ display: 'block', padding: '0.75rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#38bdf8', textDecoration: 'none', background: '#08162A', borderTop: '1px solid #163967', transition: 'background 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#0F294D'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#08162A'}
                                    >
                                        Voir toutes les notifications
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link to="/client/cart" style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '10px', background: '#f3f6fb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textDecoration: 'none', border: '1px solid #e5eaf0', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#eff3fb'; e.currentTarget.style.color = '#0B1F3A'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f3f6fb'; e.currentTarget.style.color = '#64748b'; }}
                        >
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <div style={{ width: '1px', height: '24px', background: '#e5eaf0' }} />

                        <Link to="/client/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', padding: '0.3rem 0.6rem', borderRadius: '10px', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f3f6fb'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0, overflow: 'hidden' }}>
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <img src="/user.avif" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B1F3A' }}>{user?.username || user?.first_name || 'Client'}</span>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{user?.role === 'admin' ? 'Administrateur IHOST' : 'Client IHOST'}</span>
                            </div>
                            <ChevronRight size={14} color="#94a3b8" />
                        </Link>
                    </div>
                </header>

                <main className="dashboard-main" style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: '#e3eff6' }}>
                    <Outlet />
                </main>
            </div>
            <LogoutConfirmModal 
                isOpen={showLogoutModal} 
                onClose={() => setShowLogoutModal(false)} 
            />
        </div>
    );
};

export default ClientLayout;
