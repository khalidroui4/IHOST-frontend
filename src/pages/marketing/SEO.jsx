import React from 'react';
import { Search, TrendingUp, Key, FileSearch, LineChart, Globe, ArrowRight, Zap, CheckCircle2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './SEO.css';

const SEO = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background hero-background-orange">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/seo2.jfif)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">ALGORYTHMES &amp; VISIBILITÉ ORGANIQUE</h1>
                                <p className="hero-description">Propulsez votre infrastructure numérique en tête des moteurs de recherche. Notre expertise SEO technique transforme votre code en un aimant à trafic qualifié.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>LANCER UN AUDIT TECHNIQUE <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Méthodologie de Haute Précision</h2>
                            <p className="section-subtitle">Une approche chirurgicale combinant optimisation du crawl, structure sémantique et autorité de domaine.</p>
                        </div>
                        <div className="methodology-container">
                            <div className="tech-border methodology-card hover-lift">
                                <div className="methodology-icon-wrapper" style={{ background: 'rgba(30, 107, 255, 0.05)', color: '#1E6BFF' }}>
                                    <FileSearch size={45} />
                                </div>
                                <div className="methodology-content">
                                    <div className="methodology-phase" style={{ color: '#1E6BFF' }}>Phase 01: Analyse Systémique</div>
                                    <h3 className="font-tech methodology-title">Audit Core Web Vitals</h3>
                                    <p className="methodology-description">
                                        Optimisation chirurgicale du LCP, FID et CLS. Nous intervenons directement sur l'architecture de votre serveur et de votre frontend pour une indexabilité maximale.
                                    </p>
                                </div>
                            </div>

                            <div className="tech-border methodology-card hover-lift">
                                <div className="methodology-icon-wrapper" style={{ background: 'rgba(0, 194, 255, 0.05)', color: '#00C2FF' }}>
                                    <Key size={45} />
                                </div>
                                <div className="methodology-content">
                                    <div className="methodology-phase" style={{ color: '#00C2FF' }}>Phase 02: Intelligence Sémantique</div>
                                    <h3 className="font-tech methodology-title">Mapping de Mots-Clés</h3>
                                    <p className="methodology-description">
                                        Identification des opportunités à haute intention de conversion. Nous ciblons les requêtes transactionnelles qui génèrent un ROI direct et mesurable.
                                    </p>
                                </div>
                            </div>

                            <div className="tech-border methodology-card hover-lift">
                                <div className="methodology-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.05)', color: '#10b981' }}>
                                    <Globe size={45} />
                                </div>
                                <div className="methodology-content">
                                    <div className="methodology-phase" style={{ color: '#10b981' }}>Phase 03: Autorité Domaine</div>
                                    <h3 className="font-tech methodology-title">Netlinking Stratégique</h3>
                                    <p className="methodology-description">
                                        Déploiement d'une stratégie de backlinks de haute qualité. Propulsez votre Trust Flow et devenez l'autorité référente dans votre écosystème cloud.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Le ROI de l'Excellence SEO</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Investissez dans un actif numérique qui prend de la valeur chaque mois.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Search} title="Position Zéro" desc="Visez les snippets et les premières places pour capturer 80% du trafic sur vos mots-clés stratégiques." />
                            <LuxeCard icon={TrendingUp} title="Trafic Qualifié" desc="Attirez des prospects qui recherchent activement vos services au moment précis où ils en ont besoin." />
                            <LuxeCard icon={LineChart} title="Valeur Durable" desc="Contrairement au Ads, vos efforts SEO continuent de porter leurs fruits même sans investissement publicitaire direct." />
                            <LuxeCard icon={BarChart3} title="Reporting Transparent" desc="Suivez vos gains de positions et l'évolution de votre trafic organique via nos rapports mensuels détaillés." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">SEO Marrakech & National</h2>
                                <p className="mss-description">
                                    Nous maîtrisons les spécificités du marché local et international. Que vous cibliez une clientèle à Casablanca ou partout dans le monde, nous adaptons votre stratégie pour un impact maximal.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Référencement Local (Maps)",
                                        "SEO International Multi-langue",
                                        "E-commerce SEO (Shopify/WP)",
                                        "Content Marketing IA-Driven"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn mss-btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Voir nos Études de Cas</button>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
                                    <TrendingUp size={120} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>+300%</h3>
                                    <p style={{ color: '#4B5563', fontSize: '1.2rem' }}>Croissance moyenne du trafic organique de nos clients.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <div className="cta-content">
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Prêt à devenir le N°1 ?</h2>
                                <p style={{ fontSize: '1.4rem', opacity: 0.8, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                    Ne laissez plus vos concurrents capturer vos clients sur Google. Prenez le contrôle de votre visibilité dès aujourd'hui.
                                </p>
                                <Link to="/contact" className="btn" style={{
                                    background: '#ec4899',
                                    color: 'white',
                                    padding: '1.4rem 5rem',
                                    borderRadius: '100px',
                                    fontWeight: 800,
                                    fontSize: '1.3rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    textDecoration: 'none',
                                    border: 'none'
                                }}>
                                    Lancer mon Audit SEO <ArrowRight size={28} />
                                </Link>
                            </div>
                            <div className="cta-glow"></div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default SEO;
