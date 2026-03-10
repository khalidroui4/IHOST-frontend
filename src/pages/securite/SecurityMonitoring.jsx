import React from 'react';
import { Network, Activity, Eye, BellRing, ChartCandlestick, Radar, ArrowRight, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const SecurityMonitoring = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: '', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Vigie Numérique 24/7</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Un Security Operations Center (SOC) dédié à votre infrastructure. Surveillance proactive et détection de menaces en temps réel par nos experts.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Demander un Audit SOC <ArrowRight size={20} /></Link>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Visibilité Intégrale sur Vos Flux</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Le contrôle absolu sur chaque octet transitant par vos serveurs et applications.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: '#1E6BFF',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Radar size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Analyse SIEM & Logs massive</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Nous collectons et corrélons en temps réel des millions de journaux d'événements (logs) pour repérer les cyber-menaces furtives que les outils classiques ne voient pas.
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <ChartCandlestick size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Analyse Comportementale (UBA)</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Toute anomalie de connexion ou transfert massif de données inhabituel déclenche une alerte immédiate vers nos analystes SOC pour une levée de doute.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Service de Sécurité Gérée (MSSP)</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'expertise humaine alliée à la puissance des outils de monitoring dernière génération.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Eye} title="SOC 24/7/365" desc="Une équipe d'experts certifiés qui veille sur vos tableaux de bord à toute heure du jour et de la nuit." />
                            <LuxeCard icon={BellRing} title="Alertes Multi-Canal" desc="Soyez prévenu instantanément par SMS, Email ou via vos outils de collaboration (Slack, Teams) en cas d'alerte rouge." />
                            <LuxeCard icon={Activity} title="Réponse aux Incidents" desc="En cas de brèche confirmée, nous intervenons immédiatement pour contenir l'attaque et protéger vos actifs." />
                            <LuxeCard icon={ShieldCheck} title="Conformité & Reporting" desc="Des rapports mensuels détaillés sur votre posture de sécurité pour satisfaire vos audits internes et externes." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#F5F7FA',
                            padding: '5rem',
                            borderRadius: '40px',
                            border: '1px solid rgba(11, 31, 58, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Intelligence sur les Menaces</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Nous injectons des flux de "Threat Intelligence" mondiaux dans notre monitoring. Si un pirate est repéré ailleurs dans le monde, son adresse IP et sa signature sont déjà bloquées chez vous.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Collecte de logs illimitée",
                                        "Tableau de bord client temps réel",
                                        "Analyse de vulnérabilité régulière",
                                        "SLA de réponse < 15 min"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: '#0B1F3A' }}>
                                            <CheckCircle2 size={20} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{
                                    background: 'white',
                                    padding: '4rem',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    display: 'inline-block'
                                }}>
                                    <Radar size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Visibilité Totale</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Audit initial de votre périmètre offert.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Démarrer la Surveillance</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Externalisez votre sérénité</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Ne laissez plus votre sécurité au hasard. Confiez votre surveillance à une équipe d'élite dédiée à votre protection.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#0ea5e9',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Parler à un Consultant SOC <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default SecurityMonitoring;
