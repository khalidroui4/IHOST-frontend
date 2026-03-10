import React from 'react';
import { Code2, Braces, Rocket, CheckCircle2, Layout, Database, Terminal, ArrowRight, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const WebDevelopment = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #EA580C 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/marketing-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Ingénierie Web sur Mesure</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>De la conception à l'architecture cloud, nous bâtissons des solutions digitales robustes, scalables et sécurisées pour propulser votre croissance métier.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Devis Personnalisé <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Notre Expertise Full-Stack</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des architectures modernes conçues par nos ingénieurs pour répondre à vos enjeux de demain.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div style={{
                                display: 'flex',
                                gap: '4rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '5rem',
                                borderRadius: '48px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{ flex: 1.2 }}>
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Ce Que Nous Bâtissons</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                        {[
                                            'Sites Vitrines Haute Performance',
                                            'Plateformes E-commerce Complexes',
                                            'Applications Métier (ERP / CRM)',
                                            'Portails Intranet d\'Entreprise',
                                            'Architecture API REST & GraphQL',
                                            'Optimisation Core Web Vitals'
                                        ].map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, color: '#0B1F3A', fontSize: '1.1rem' }}>
                                                <CheckCircle2 size={24} color="#ec4899" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn" style={{ marginTop: '4rem', padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800 }}>Voir Notre Portfolio</button>
                                </div>
                                <div style={{ flex: 0.8, display: 'none', lg: 'block' }}>
                                    <div style={{
                                        padding: '4rem',
                                        background: '#F5F7FA',
                                        borderRadius: '40px',
                                        textAlign: 'center',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <Code2 size={120} color="#ec4899" style={{ marginBottom: '2rem' }} />
                                        <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>Clean Code</h4>
                                        <p style={{ color: '#4B5563' }}>Standard de développement OWASP / SOLID.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi Nous Choisir ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'excellence technologique au service de votre vision.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Braces} title="Architecture Scalable" desc="Des bases de données et microservices pensés dès le premier jour pour supporter des pointes de trafic massives." />
                            <LuxeCard icon={Rocket} title="Performance Native" desc="Zéro compromis sur la vitesse. Nous utilisons les frameworks les plus rapides (NextJS, Go, Rust) pour un chargement instantané." />
                            <LuxeCard icon={Database} title="Ingénierie de Données" desc="Conception de modèles de données optimisés pour la lecture et l'analyse en temps réel de vos KPIs métiers." />
                            <LuxeCard icon={Terminal} title="DevOps & CI/CD" desc="Déploiement automatisé et tests unitaires systématiques pour une stabilité de production garantie à 100%." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#0B1F3A',
                            padding: '6rem',
                            borderRadius: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6rem',
                            color: 'white',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Audit & Conseil Technique</h2>
                                <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Vous avez déjà une application mais elle est lente ou instable ? Nos experts réalisent un audit de code profond et une analyse d'architecture pour vous fournir un plan de modernisation concret.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Audit de Sécurité OWASP",
                                        "Analyse de Performance",
                                        "Revue de l'Architecture",
                                        "Plan de Scalabilité"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                            <Zap size={24} color="#1E6BFF" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white' }}>Réserver un Audit Tech</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '5rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'center'
                                }}>
                                    <Globe size={100} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Modern Web</h3>
                                    <p style={{ opacity: 0.6, fontSize: '1.1rem' }}>Des solutions pensées pour le futur du Web 3.0.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Bâtissons votre projet ensemble</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Nos architectes et développeurs sont prêts à transformer vos idées en une réalité technologique puissante.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#db2777',
                                padding: '1.4rem 5rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                fontSize: '1.2rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                textDecoration: 'none',
                                border: 'none'
                            }}>
                                Démarrer la Discussion <ArrowRight size={28} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default WebDevelopment;
