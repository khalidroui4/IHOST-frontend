import React from 'react';
import { ShoppingCart, Crown, Star, ArrowRight, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const premiumDomainsList = [
    { name: 'hosting.ma', price: '45,000 DH', category: 'Technologie' },
    { name: 'startup.ma', price: '32,500 DH', category: 'Business' },
    { name: 'cloudhost.com', price: '85,000 DH', category: 'Technologie' },
    { name: 'businesssite.com', price: '50,000 DH', category: 'Business' },
    { name: 'maroc-voyage.com', price: '18,000 DH', category: 'Tourisme' },
    { name: 'auto-ecole.ma', price: '25,000 DH', category: 'Services' },
];

const PremiumDomains = () => {
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
                            backgroundImage: 'url(/domain-hero.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    gap: '1rem',
                                    marginBottom: '2.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(5px)'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#00C2FF' }}>
                                        <Globe size={14} /> Network
                                    </span>
                                    <span style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#10b981' }}>
                                        <Zap size={14} /> Performance
                                    </span>
                                </div>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>L'Excellence Numérique</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Acquérez des noms de domaine courts, mémorables et à fort impact. L'atout stratégique ultime pour votre leadership sur le marché.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Voir le catalogue <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Marketplace d'exception</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une sélection rigoureuse de domaines premium pour les entreprises qui ne font aucun compromis sur leur image.</p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            {premiumDomainsList.map((domain, index) => (
                                <div key={index} className="feature-card" style={{
                                    background: 'white',
                                    borderRadius: '32px',
                                    padding: '3rem 2.5rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out',
                                    position: 'relative',
                                    textAlign: 'left'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '25px',
                                        right: '25px',
                                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                        color: 'white',
                                        padding: '0.4rem 1.2rem',
                                        borderRadius: '100px',
                                        fontSize: '0.75rem',
                                        fontWeight: 900,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        boxShadow: '0 4px 12px rgba(255, 165, 0, 0.4)'
                                    }}>
                                        <Crown size={14} /> PREMIUM
                                    </div>
                                    <div style={{
                                        display: 'inline-block',
                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                        color: '#2563EB',
                                        padding: '0.3rem 1rem',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        marginBottom: '1.5rem'
                                    }}>
                                        {domain.category}
                                    </div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>{domain.name}</h3>

                                    <div style={{
                                        borderTop: '1px solid rgba(11, 31, 58, 0.1)',
                                        paddingTop: '2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'baseline'
                                    }}>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#4B5563', fontWeight: 500 }}>Prix d'acquisition</p>
                                            <p style={{ margin: 0, fontWeight: 900, fontSize: '1.8rem', color: '#1E6BFF' }}>{domain.price}</p>
                                        </div>
                                        <button className="btn" style={{
                                            padding: '1rem 2rem',
                                            borderRadius: '16px',
                                            background: '#F5F7FA',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}>
                                            Acheter <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi un domaine premium ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Plus qu'un nom, c'est un investissement stratégique pour la valeur de votre marque sur le long terme.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Star} title="Mémorisation Immédiate" desc="Un nom court et descriptif permet à vos clients de se souvenir de vous instantanément, boostant votre trafic direct." />
                            <LuxeCard icon={Crown} title="Autorité instantanée" desc="Établissez une crédibilité immédiate dans votre secteur d'activité dès le premier jour de votre lancement." />
                            <LuxeCard icon={ShoppingCart} title="Valeur de Revente" desc="Les domaines premium sont des actifs numériques qui prennent de la valeur avec le temps, sécurisant votre investissement." />
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Vous cherchez un nom spécifique ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                                Notre service de courtage négocie pour vous l'acquisition de domaines déjà enregistrés, en toute confidentialité.
                            </p>
                            <Link to="/entreprise/about" className="btn" style={{
                                background: 'white',
                                color: '#7c3aed',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Contacter un courtier <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default PremiumDomains;
