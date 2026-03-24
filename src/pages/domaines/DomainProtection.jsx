import React from 'react';
import { Shield, Lock, EyeOff, Server, ArrowRight, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const DomainProtection = () => {
    return (
        <PageTransition>
            <div className="domain-page">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: '#6366F1',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/doamainpro.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Forteresse de Domaines</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Érigez une barrière infranchissable autour de votre identité numérique. Confidentialité WHOIS, DNSSEC et protection multiniveaux inclus.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Activer la protection <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Sécurité Totale pour Votre Domaine</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des couches de protection avancées conçues pour neutraliser les cybermenaces et préserver votre vie privée.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard
                                icon={EyeOff}
                                title="Confidentialité WHOIS"
                                desc="Évitez le spam et les tentatives de phishing. Masquez vos coordonnées personnelles de la base de données publique WHOIS sans frais supplémentaires."
                            />
                            <LuxeCard
                                icon={Lock}
                                title="Verrouillage de Transfert"
                                desc="Empêchez toute tentative de transfert non autorisé. Votre nom de domaine reste solidement ancré dans votre compte IHOST."
                            />
                            <LuxeCard
                                icon={Shield}
                                title="Protection Contre le Vol"
                                desc="Mesures de sécurité renforcées incluant l'authentification à double facteur (2FA) pour toutes les modifications critiques de propriété."
                            />
                            <LuxeCard
                                icon={Server}
                                title="Sécurité DNSSEC"
                                desc="Protections cryptographiques pour vos enregistrements DNS, garantissant à vos visiteurs qu'ils atteignent bien votre site authentique."
                            />
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#6366F1',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Prêt à sécuriser votre domaine ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                                Ne laissez pas votre marque exposée. Activez nos outils de protection premium et dormez sur vos deux oreilles.
                            </p>
                            <Link to="/signup" className="btn" style={{
                                background: '#F5F7FA',
                                color: '#7c3aed',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Commencer maintenant <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default DomainProtection;
