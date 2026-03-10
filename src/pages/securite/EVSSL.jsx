import React from 'react';
import { Award, Building2, SearchCheck, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const EVSSL = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0EA5E9 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>AUDIT D'IDENTITÉ &amp; VALIDATION ÉTENDUE</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Établissez le plus haut niveau de confiance numérique. Soumettez votre organisation à un protocole de vérification rigoureux pour arborer le sceau d'authenticité suprême.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>INITIALISER L'AUDIT EV <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #00C2FF', borderLeft: '2px solid #00C2FF', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #00C2FF', borderRight: '2px solid #00C2FF', opacity: 0.3 }} />
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Le Standard d'Or de la Confiance</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un protocole de validation strict conçu pour les institutions financières et les leaders du e-commerce mondial.</p>
                        </div>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="tech-border" style={{
                                display: 'flex',
                                gap: '5rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '5rem',
                                borderRadius: '4px',
                                transition: 'all 0.3s ease-in-out',
                                position: 'relative'
                            }}>
                                <div className="pattern-grid-tech" style={{ opacity: 0.03, pointerEvents: 'none' }} />

                                <div style={{ flex: 1.5, position: 'relative', zIndex: 2 }}>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        color: '#22C55E',
                                        marginBottom: '1.5rem',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px'
                                    }}>
                                        <CheckCircle2 size={18} /> IDENTITÉ VÉRIFIÉE PROTOCOLE EV
                                    </div>
                                    <h3 className="font-tech" style={{ fontSize: '2.5rem', color: '#0B1F3A', marginBottom: '1.5rem', fontWeight: 700 }}>VÉRIFICATION MULTI-COUCHE</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                                        Avant l'émission, nos experts procèdent à une analyse exhaustive de votre existence légale, physique et opérationnelle. Ce processus rend toute usurpation techniquement impossible.
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        {[
                                            "Audit d'existence légale",
                                            "Validation de structure physique",
                                            "Protocole d'appel direct",
                                            "Garantie SSL de 1.5M$"
                                        ].map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, color: '#0B1F3A', fontSize: '0.9rem' }}>
                                                <ShieldCheck size={20} color="#2563EB" /> {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ flex: 1, display: 'none', md: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                                    <div className="glass-card" style={{ padding: '3rem', border: '1px solid #2563EB' }}>
                                        <Building2 size={120} style={{ color: '#2563EB' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Avantages Stratégiques</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Maximisez votre taux de conversion en éliminant les barrières de confiance.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Award} title="Sceau de Prestige" desc="Affichez les badges de sécurité les plus reconnus au monde sur vos interfaces critiques." />
                            <LuxeCard icon={SearchCheck} title="Validation Visuelle" desc="Le cadenas de sécurité premium et le nom de l'entreprise affichés dans les navigateurs." />
                            <LuxeCard icon={ShieldCheck} title="Anti-Abandon Panier" desc="Réduisez drastiquement les abandons au paiement en rassurant vos clients à chaque étape." />
                            <LuxeCard icon={Zap} title="Avantage Algorithmique" desc="Le plus haut niveau de validation favorise la confiance des moteurs et des utilisateurs." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 0', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="bg-tech-dark" style={{
                            padding: '6rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6rem',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.1 }} />

                            <div style={{ flex: 1.2, position: 'relative', zIndex: 10 }}>
                                <h2 className="font-tech" style={{ fontSize: '3.5rem', color: 'white', marginBottom: '2rem', textTransform: 'uppercase' }}>ACCOMPAGNEMENT VIP</h2>
                                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '4rem' }}>
                                    Le processus de validation EV demande une précision extrême. Nos consultants vous assistent dans la préparation de chaque document pour une émission prioritaire.
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <button className="btn btn-primary" style={{ padding: '1.4rem 4rem' }}>DÉMARRER L'AUDIT</button>
                                    <button className="btn btn-outline" style={{ padding: '1.4rem 4rem', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>VOIR LES DOCUMENTS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="glass-card" style={{
                            padding: '6rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid #2563EB'
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.1 }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 className="font-tech" style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2.5rem', textTransform: 'uppercase' }}>SÉCURISEZ VOTRE CROISSANCE</h2>
                                <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4.5rem', maxWidth: '800px', margin: '0 auto 4.5rem' }}>
                                    Donnez à votre organisation la stature numérique qu'elle mérite. Activez le protocole de validation étendue aujourd'hui.
                                </p>
                                <Link to="/contact" className="btn btn-primary" style={{
                                    padding: '1.4rem 6rem',
                                    fontSize: '1rem',
                                    background: '#00C2FF',
                                    color: '#0B1F3A'
                                }}>
                                    CONTACTER UN CONSULTANT <ArrowRight size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default EVSSL;
