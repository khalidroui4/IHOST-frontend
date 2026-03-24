import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import {
    LayoutDashboard, Users, Server, Package,
    HelpCircle, Search, LogOut, Shield, ChevronRight
} from 'lucide-react';

const sidebarGroups = [
    {
        label: 'Administration',
        items: [
            { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
        ]
    },
    {
        label: 'Gestion',
        items: [
            { path: '/admin/users', icon: Users, label: 'Utilisateurs' },
            { path: '/admin/orders', icon: Package, label: 'Commandes' },
            { path: '/admin/services', icon: Server, label: 'Catalogue Services' },
        ]
    },
    {
        label: 'Support',
        items: [
            { path: '/admin/support', icon: HelpCircle, label: 'Tickets' },
        ]
    }
];

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', background: '#f0f4f8', zIndex: 9999, overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
            
            {/* ═══════════ FIXED SIDEBAR ═══════════ */}
            <aside style={{ width: '240px', background: '#2B2B2B', height: '100%', display: 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
                
                {/* Logo */}
                <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <Link to="/admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Shield size={22} color="#10B981" strokeWidth={2.5} />
                        <span style={{ color: 'white', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.5px' }}>
                            IHOST<span style={{ color: '#10B981' }}>.</span>
                        </span>
                    </Link>
                </div>

                {/* Nav Groups */}
                <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sidebarGroups.map((group) => (
                        <div key={group.label}>
                            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>
                                {group.label}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {group.items.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '0.65rem',
                                                padding: '0.6rem 0.75rem', borderRadius: '8px',
                                                textDecoration: 'none', fontWeight: isActive ? 700 : 500,
                                                fontSize: '0.875rem', transition: 'all 0.15s',
                                                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                                                background: isActive ? 'rgba(16,185,129,0.15)' : 'transparent',
                                                borderLeft: isActive ? '3px solid #10B981' : '3px solid transparent',
                                            }}
                                        >
                                            <Icon size={17} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Logout */}
                <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', background: 'transparent', border: 'none', color: '#f87171', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <LogOut size={17} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* ═══════════ MAIN AREA ═══════════ */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* ── TOPBAR ── */}
                <header style={{ height: '64px', background: 'white', borderBottom: '1px solid #e5eaf0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    {/* Search */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f3f6fb', padding: '0.55rem 1rem', borderRadius: '10px', width: '320px', border: '1.5px solid transparent', transition: 'border 0.2s' }}
                        onFocus={e => (e.currentTarget.style.borderColor = '#10B981')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'transparent')}
                    >
                        <Search size={16} color="#94a3b8" />
                        <input
                            placeholder="Recherche générale..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem', color: '#1e293b' }}
                        />
                    </div>

                    {/* Right Side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

                        {/* User Avatar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.3rem 0.6rem', borderRadius: '10px', transition: 'background 0.15s' }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>
                                {user?.name?.charAt(0).toUpperCase() || user?.first_name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B1F3A' }}>{user?.name?.split(' ')[0] || user?.first_name || 'Admin'}</span>
                                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>IHOST ROOT</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── CONTENT (Outlet renders child pages here) ── */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: '#f0f4f8' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
