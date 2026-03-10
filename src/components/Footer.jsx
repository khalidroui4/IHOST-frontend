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
                            IHOST
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1rem', maxWidth: '400px' }}>
                            Infrastructure cloud souveraine de haute performance. Nous concevons le socle technologique des entreprises leaders au Maroc et à l'international.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="mailto:rouibaa.khalid05@gmail.com" className='footer-social' target="blank"><Mail size={20} /></a>
                            <a href="https://www.instagram.com/khalid_roui4/" className='footer-social' target="blank"><Instagram size={20} /></a>
                            <a href="https://www.linkedin.com/in/mohamed-khalid-rouibaa-601411343/" className='footer-social' target="blank"><Linkedin size={20} /></a>
                            <a href="https://github.com/khalidroui4" className='footer-social' target="blank"><Github size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <h4 className="font-tech" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#00C2FF', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Infrastructure</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/" className="footer-link">Accueil</Link>
                            <Link to="/securite/ev" className="footer-link">Sécurité Réseau</Link>
                            <Link to="/hebergement/cloud" className="footer-link">Cloud Architecture</Link>
                            <Link to="/entreprise/datacenters" className="footer-link">Data Centers</Link>
                            <Link to="/client/dashboard" className="footer-link">Console de Gestion</Link>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <h4 className="font-tech" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#00C2FF', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Compliance</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/legal/conditions" className="footer-link">Conditions Générales</Link>
                            <Link to="/legal/confidentialite" className="footer-link">Confidentialité (RGPD)</Link>
                            <Link to="/legal/utilisation-acceptable" className="footer-link">Usage Acceptable</Link>
                            <Link to="/legal/signaler-probleme" className="footer-link">Report Vulnerability</Link>
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
