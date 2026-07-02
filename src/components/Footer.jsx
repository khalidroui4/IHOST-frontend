import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Github, Linkedin,  } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer bg-primary-navy">
            <div className="pattern-grid-tech" style={{ opacity: 0.05 }} />
            <div className="container" style={{padding: '4rem 2rem', zIndex: 2 }}>
                <div className="footer-top">
                    <div className="footer-company">
                        <div className="font-tech">
                            <Link to="/" style={{ display: 'inline-block' }}>
                                <img src="/logo.jpeg" alt="IHOST Logo" style={{ height: '55px', objectFit: 'contain', marginBottom: '1rem' }} />
                            </Link>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '400px' }}>
                            Infrastructure cloud souveraine de haute performance. Nous concevons le socle technologique des entreprises leaders au Maroc et à l'international.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div className="footer-social-wrapper">
                                <a 
                                    href="mailto:rouibaa.khalid05@gmail.com" 
                                    className='footer-social footer-social-email' 
                                    target="blank"
                                >
                                    <Mail size={20} />
                                </a>
                                <span className="footer-social-name footer-name-email">Gmail</span>
                            </div>
                            <div className="footer-social-wrapper">
                                <a 
                                    href="https://www.instagram.com/khalid_roui4/" 
                                    className='footer-social footer-social-instagram' 
                                    target="blank"
                                >
                                    <Instagram size={20} />
                                </a>
                                <span className="footer-social-name footer-name-instagram">Instagram</span>
                            </div>
                            <div className="footer-social-wrapper">
                                <a 
                                    href="https://www.linkedin.com/in/mohamed-khalid-rouibaa-601411343/" 
                                    className='footer-social footer-social-linkedin' 
                                    target="blank"
                                >
                                    <Linkedin size={20} />
                                </a>
                                <span className="footer-social-name footer-name-linkedin">LinkedIn</span>
                            </div>
                            <div className="footer-social-wrapper">
                                <a 
                                    href="https://github.com/khalidroui4" 
                                    className='footer-social footer-social-github' 
                                    target="blank"
                                >
                                    <Github size={20} />
                                </a>
                                <span className="footer-social-name footer-name-github">GitHub</span>
                            </div>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-nav-heading">
                            <h4 className="font-tech">Infrastructure</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <Link to="/hebergement/mutualise" className="footer-nav-link">Hébergement Mutualisé</Link>
                            <Link to="/hebergement/cloud" className="footer-nav-link">Hébergement Cloud</Link>
                            <Link to="/hebergement/ecommerce" className="footer-nav-link">Hébergement E-Commerce</Link>
                            <Link to="/domaines/register" className="footer-nav-link">Register Domain</Link>
                            <Link to="/email-collaboration/pro" className="footer-nav-link">Professional Email</Link>
                            <Link to="/securite/ssl" className="footer-nav-link">SSL Certificates</Link>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-nav-heading">
                            <h4 className="font-tech">Compliance</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <Link to="/legal/conditions" className="footer-nav-link">Conditions Générales</Link>
                            <Link to="/legal/confidentialite" className="footer-nav-link">Confidentialité (RGPD)</Link>
                            <Link to="/legal/utilisation-acceptable" className="footer-nav-link">Usage Acceptable</Link>
                            <Link to="/legal/signaler-probleme" className="footer-nav-link">Signaler un problème</Link>
                            <Link to="/contact" className="footer-nav-link">Contact</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                        © 2026 IHOST TECHNOLOGY SYSTEMS. 
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                        Made by <a href="https://www.linkedin.com/in/mohamed-khalid-rouibaa-601411343/" target="blank" className='footer-link'>Mohamed-Khalid Rouibaa</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
