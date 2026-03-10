import React from 'react';
import { Search, TrendingUp, Key, FileSearch, LineChart, Globe, ArrowRight, Zap, CheckCircle2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const SEO = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #EA580C 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/tech_marketing_hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>ALGORYTHMES &amp; VISIBILITÉ ORGANIQUE</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Propulsez votre infrastructure numérique en tête des moteurs de recherche. Notre expertise SEO technique transforme votre code en un aimant à trafic qualifié.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>LANCER UN AUDIT TECHNIQUE <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Méthodologie de Haute Précision</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une approche chirurgicale combinant optimisation du crawl, structure sémantique et autorité de domaine.</p>
                        </div>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="tech-border" style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease-in-out',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(30, 107, 255, 0.05)',
                                    color: '#1E6BFF',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <FileSearch size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E6BFF', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Phase 01: Analyse Systémique</div>
                                    <h3 className="font-tech" style={{ fontSize: '2rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 700 }}>Audit Core Web Vitals</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.1rem' }}>
                                        Optimisation chirurgicale du LCP, FID et CLS. Nous intervenons directement sur l'architecture de votre serveur et de votre frontend pour une indexabilité maximale.
                                    </p>
                                </div>
                            </div>

                            <div className="tech-border" style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease-in-out',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(0, 194, 255, 0.05)',
                                    color: '#00C2FF',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Key size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#00C2FF', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Phase 02: Intelligence Sémantique</div>
                                    <h3 className="font-tech" style={{ fontSize: '2rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 700 }}>Mapping de Mots-Clés</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.1rem' }}>
                                        Identification des opportunités à haute intention de conversion. Nous ciblons les requêtes transactionnelles qui génèrent un ROI direct et mesurable.
                                    </p>
                                </div>
                            </div>

                            <div className="tech-border" style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease-in-out',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(16, 185, 129, 0.05)',
                                    color: '#10b981',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Globe size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Phase 03: Autorité Domaine</div>
                                    <h3 className="font-tech" style={{ fontSize: '2rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 700 }}>Netlinking Stratégique</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.1rem' }}>
                                        Déploiement d'une stratégie de backlinks de haute qualité. Propulsez votre Trust Flow et devenez l'autorité référente dans votre écosystème cloud.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
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
                        <div style={{
                            background: '#F5F7FA',
                            padding: '6rem',
                            borderRadius: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6rem',
                            border: '1px solid rgba(11, 31, 58, 0.1)'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>SEO Marrakech & National</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Nous maîtrisons les spécificités du marché local et international. Que vous cibliez une clientèle à Casablanca ou partout dans le monde, nous adaptons votre stratégie pour un impact maximal.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Référencement Local (Maps)",
                                        "SEO International Multi-langue",
                                        "E-commerce SEO (Shopify/WP)",
                                        "Content Marketing IA-Driven"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Voir nos Études de Cas</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center'
                                }}>
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
                        <div style={{
                            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                            borderRadius: '48px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
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
                            <div style={{
                                position: 'absolute',
                                top: '-20%',
                                right: '-10%',
                                width: '600px',
                                height: '600px',
                                background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }}></div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default SEO;
