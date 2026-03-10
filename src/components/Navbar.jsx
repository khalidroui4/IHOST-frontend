import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import {
    ArrowUpRight, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { navData } from '../data/navData';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [scrolled]);

    const toggleDropdown = (e, index) => {
        e.preventDefault();
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <nav className={`custom-navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
            <div className="navbar-container">
                <div className={`navbar-logo ${scrolled ? 'nav-hidden' : ''}`}>
                    IHOST
                </div>
                <div className="navbar-links-wrapper">
                    <ul className="navbar-links">
                        <li><Link to="/" className="active">Accueil</Link></li>

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
                <div className={`navbar-action ${scrolled ? 'nav-hidden' : ''}`}>
                    <Link to="/signUp" className="btn-client-area">
                        S'inscrire <ArrowUpRight size={16} strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
