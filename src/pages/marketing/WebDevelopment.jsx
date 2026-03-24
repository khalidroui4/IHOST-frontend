import React from 'react';
import { Code2, Braces, Rocket, CheckCircle2, Layout, Database, Terminal, ArrowRight, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './WebDevelopment.css';

const WebDevelopment = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background hero-background-orange">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/webDev3.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Ingénierie Web sur Mesure</h1>
                                <p className="hero-description">De la conception à l'architecture cloud, nous bâtissons des solutions digitales robustes, scalables et sécurisées pour propulser votre croissance métier.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Devis Personnalisé <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Notre Expertise Full-Stack</h2>
                            <p className="section-subtitle">Des architectures modernes conçues par nos ingénieurs pour répondre à vos enjeux de demain.</p>
                        </div>
                        <div className="expertise-container">
                            <div className="expertise-card hover-lift">
                                <div className="expertise-content">
                                    <h3 className="expertise-title">Ce Que Nous Bâtissons</h3>
                                    <div className="expertise-grid">
                                        {[
                                            'Sites Vitrines Haute Performance',
                                            'Plateformes E-commerce Complexes',
                                            'Applications Métier (ERP / CRM)',
                                            'Portails Intranet d\'Entreprise',
                                            'Architecture API REST & GraphQL',
                                            'Optimisation Core Web Vitals'
                                        ].map((item, idx) => (
                                            <div key={idx} className="expertise-item">
                                                <CheckCircle2 size={24} color="#ec4899" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn" style={{ marginTop: '4rem', padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800 }}>Voir Notre Portfolio</button>
                                </div>
                                <div className="expertise-visual-wrapper">
                                    <div className="expertise-visual-card">
                                        <Code2 size={120} color="#ec4899" style={{ marginBottom: '2rem' }} />
                                        <h4 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>Clean Code</h4>
                                        <p style={{ color: '#4B5563' }}>Standard de développement OWASP / SOLID.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
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
                        <div className="audit-container">
                            <div className="audit-content">
                                <h2 className="audit-title">Audit & Conseil Technique</h2>
                                <p className="audit-description">
                                    Vous avez déjà une application mais elle est lente ou instable ? Nos experts réalisent un audit de code profond et une analyse d'architecture pour vous fournir un plan de modernisation concret.
                                </p>
                                <div className="audit-grid">
                                    {[
                                        "Audit de Sécurité OWASP",
                                        "Analyse de Performance",
                                        "Revue de l'Architecture",
                                        "Plan de Scalabilité"
                                    ].map((item, i) => (
                                        <div key={i} className="audit-item">
                                            <Zap size={24} color="#1E6BFF" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white' }}>Réserver un Audit Tech</button>
                            </div>
                            <div className="audit-visual-wrapper">
                                <div className="audit-visual-card">
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
                        <div className="cta-container">
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
