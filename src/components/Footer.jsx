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
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="mailto:rouibaa.khalid05@gmail.com" className='footer-social' target="blank"><Mail size={20} /></a>
                            <a href="https://www.instagram.com/khalid_roui4/" className='footer-social' target="blank"><Instagram size={20} /></a>
                            <a href="https://www.linkedin.com/in/mohamed-khalid-rouibaa-601411343/" className='footer-social' target="blank"><Linkedin size={20} /></a>
                            <a href="https://github.com/khalidroui4" className='footer-social' target="blank"><Github size={20} /></a>
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
                            <Link to="/entreprise/datacenters" className="footer-nav-link">Data Centers</Link>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <div className="footer-nav-heading">
                            <h4 className="font-tech">Compliance</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            <Link to="/entreprise/about" className="footer-nav-link">À propos</Link>
                            <Link to="/entreprise/partners" className="footer-nav-link">Partenaires</Link>
                            <Link to="/entreprise/certifications" className="footer-nav-link">Certifications</Link>
                            <Link to="/legal/conditions" className="footer-nav-link">Conditions Générales</Link>
                            <Link to="/legal/confidentialite" className="footer-nav-link">Confidentialité (RGPD)</Link>
                            <Link to="/legal/utilisation-acceptable" className="footer-nav-link">Usage Acceptable</Link>
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
