import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import LogoutConfirmModal from './LogoutConfirmModal';
import './Navbar.css';
import { ArrowUpRight, ChevronDown, ShoppingCart, LayoutDashboard, Settings, Menu, X } from 'lucide-react';
import { navData } from '../data/navData';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const cartCount = useSelector(state => state.cart.items.length);

    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
                setProfileDropdown(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const toggleDropdown = (e, index) => {
        e.preventDefault();
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <nav className={`custom-navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
            <div className="navbar-container">
                <div className={`navbar-logo ${scrolled && !isMobileMenuOpen ? 'nav-hidden' : ''}`}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.jpeg" alt="IHOST Logo" style={{ height: '55px', objectFit: 'contain' }} />
                    </Link>
                </div>

                <div className={`navbar-links-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                    <ul className="navbar-links">
                        <li><Link to="/" className="active" onClick={() => setIsMobileMenuOpen(false)}>Accueil</Link></li>

                        {navData.map((category, index) => (
                            <li key={index} className={`nav-item-dropdown ${activeDropdown === index ? 'active' : ''}`}>
                                <a
                                    href="#"
                                    className="nav-link-with-icon"
                                    onClick={(e) => toggleDropdown(e, index)}
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
                                                onClick={() => {
                                                    setActiveDropdown(null);
                                                    setIsMobileMenuOpen(false);
                                                }}
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

                    {/* Sign-in / User actions rendered INSIDE the sidebar on mobile */}
                    <div className="navbar-action">
                        {isAuthenticated ? (
                            <>
                                <Link to={isAdmin ? '/admin/dashboard' : '/client/dashboard'}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', marginBottom: '0.5rem' }}
                                >
                                    <LayoutDashboard size={16} /> {isAdmin ? 'Admin Dashboard' : 'Espace Client'}
                                </Link>
                                <button
                                    onClick={() => { setShowLogoutModal(true); setIsMobileMenuOpen(false); }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', width: '100%', padding: '0.75rem 1rem', color: '#f87171', background: 'rgba(239,68,68,0.08)', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
                                >
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link to="/signUp" className="btn-client-area" onClick={() => setIsMobileMenuOpen(false)}>
                                S'inscrire <ArrowUpRight size={16} strokeWidth={3} />
                            </Link>
                        )}
                    </div>
                </div>

                <div className={`navbar-action ${scrolled ? 'nav-hidden' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {isAuthenticated ? (
                        <>
                            {/* Cart Icon with Badge */}
                            <Link
                                to="/client/cart"
                                style={{ position: 'relative', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s', textDecoration: 'none' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(30,107,255,0.2)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                title="Mon Panier"
                            >
                                <ShoppingCart size={18} />
                                {cartCount > 0 && (
                                    <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#ef4444', color: 'white', fontSize: '0.65rem', fontWeight: 800, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0B1F3A' }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Profile Dropdown */}
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setProfileDropdown(!profileDropdown)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.4rem 0.75rem', color: 'white', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(30,107,255,0.2)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                                    title="Mon compte"
                                >
                                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1E6BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, overflow: 'hidden' }}>
                                        {user?.avatar ? (
                                            <img src={`http://localhost${user.avatar}`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            user?.name ? user.name.charAt(0).toUpperCase() : (user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U')
                                        )}
                                    </div>
                                    <span>{user?.name?.split(' ')[0] || user?.first_name || 'Mon compte'}</span>
                                    <ChevronDown size={14} />
                                </button>

                                {profileDropdown && (
                                    <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, background: '#0B1F3A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', minWidth: '220px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 200, overflow: 'hidden', padding: '0.5rem' }}>
                                        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1E6BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 800, overflow: 'hidden', flexShrink: 0 }}>
                                                {user?.avatar ? (
                                                    <img src={`http://localhost${user.avatar}`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    user?.name ? user.name.charAt(0).toUpperCase() : (user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U')
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <p style={{ margin: 0, fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{user?.name || user?.first_name || 'Utilisateur'}</p>
                                                <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{isAdmin ? 'Administrateur' : 'Client'}</p>
                                            </div>
                                        </div>
                                        <Link
                                            to={isAdmin ? '/admin/dashboard' : '/client/dashboard'}
                                            onClick={() => setProfileDropdown(false)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, transition: 'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <LayoutDashboard size={16} /> {isAdmin ? 'Admin Dashboard' : 'Espace Client'}
                                        </Link>
                                        <Link
                                            to="/client/profile"
                                            onClick={() => setProfileDropdown(false)}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, transition: 'background 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <Settings size={16} /> Paramètres
                                        </Link>
                                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0.4rem 0' }} />
                                        <button
                                            onClick={() => { setShowLogoutModal(true); setProfileDropdown(false); }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.65rem 1rem', color: '#ff0000ff', background: 'none', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            Déconnexion
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/signUp" className="btn-client-area" onClick={() => setIsMobileMenuOpen(false)}>
                            S'inscrire <ArrowUpRight size={16} strokeWidth={3} />
                        </Link>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button 
                    className="mobile-menu-btn" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            <LogoutConfirmModal 
                isOpen={showLogoutModal} 
                onClose={() => setShowLogoutModal(false)} 
            />
        </nav>
    );
};

export default Navbar;
