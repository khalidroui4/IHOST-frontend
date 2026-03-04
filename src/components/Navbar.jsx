import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className={`navbar-logo ${scrolled ? 'hidden' : ''}`}>
                    IHOST
                </div>
                <div className="navbar-links-wrapper">
                    <ul className="navbar-links">
                        <li><a href="/" className="active">Accueil</a></li>
                        <li><a href="/">Hébergement</a></li>
                        <li><a href="/">Domaines</a></li>
                        <li><a href="/">Email & Collaboration</a></li>
                        <li><a href="/">Sécurité</a></li>
                        <li><a href="/">Web & Marketing</a></li>
                        <li><a href="/">Entreprise</a></li>
                    </ul>
                </div>
                <div className={`navbar-action ${scrolled ? 'hidden' : ''}`}>
                    <Link to="/signup" className="btn-client-area">
                        Espace Client <ArrowUpRight size={16} strokeWidth={3} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

