import React, { useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Globe, Zap, ArrowRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const HostingTemplate = ({ data }) => {
    if (!data) return <Navigate to="/" />;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data.id]);

    return (
        <PageTransition>
            <div className="hosting-page">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/hosting-hero.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '4rem',
                                alignItems: 'center'
                            }}>
                                <div style={{ textAlign: 'left' }}>
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
                                    <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem', lineHeight: '1.1' }}>{data.hero.title}</h1>
                                    <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>{data.hero.subtitle}</p>
                                    <div className="hero-buttons" style={{ justifyContent: 'flex-start', gap: '1.5rem' }}>
                                        <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>{data.hero.ctaText} <ArrowRight size={20} /></Link>
                                    </div>
                                </div>
                                <div style={{ position: 'relative', display: 'none', lg: 'block' }}>
                                    {/* Abstract Visual for Hosting */}
                                    <div style={{
                                        width: '100%',
                                        height: '400px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '32px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Zap size={120} color="#00C2FF" opacity={0.2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Une architecture pensée pour la performance</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des infrastructures de pointe pour propulser vos projets web vers de nouveaux sommets.</p>
                        </div>
                        <div className="features-grid">
                            {data.benefits.map((benefit, index) => (
                                <LuxeCard
                                    key={index}
                                    icon={benefit.icon}
                                    title={benefit.title}
                                    desc={benefit.desc}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Nos Offres et Tarifs</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une tarification transparente et sans frais cachés, adaptée à chaque étape de votre croissance.</p>
                        </div>
                        <div className="pricing-cards">
                            {data.plans.map((plan, index) => (
                                <div key={index} className={`pricing-card ${plan.highlight ? 'popular' : ''}`}>
                                    {plan.badge && <div className="popular-badge">{plan.badge}</div>}
                                    <h3>{plan.name}</h3>

                                    <div className="price">
                                        <span className="from">A partir de</span>
                                        <span className="amount">{plan.price}</span>
                                        <span className="period">{plan.period}</span>
                                    </div>

                                    <ul className="features-list">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex}>
                                                <CheckCircle2 size={18} color="#2563EB" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/signup" className="btn-plan">
                                        {plan.highlight ? 'Commencer maintenant' : 'Choisir ce plan'}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Prêt à passer à la vitesse supérieure ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                                Rejoignez l'écosystème IHOST et bénéficiez du support d'experts 24/7 pour votre réussite en ligne.
                            </p>
                            <Link to="/signup" className="btn" style={{
                                background: 'white',
                                color: '#1E6BFF',
                                padding: '1.2rem 3rem',
                                borderRadius: '9999px',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Créer mon compte <ArrowUpRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Questions Fréquentes</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Tout ce que vous devez savoir sur nos solutions d'hébergement.</p>
                        </div>
                        <div className="faq-list" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
                            {data.faq.map((q, index) => (
                                <div key={index} style={{
                                    backgroundColor: 'white',
                                    padding: '2.5rem',
                                    borderRadius: '20px',
                                    marginBottom: '1.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    borderLeft: '6px solid #2563EB'
                                }}>
                                    <h4 style={{ color: '#1E6BFF', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700 }}>{q.question}</h4>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.1rem' }}>{q.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default HostingTemplate;
