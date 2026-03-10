import React from 'react';
import { Network, Activity, Eye, BellRing, ChartCandlestick, Radar, ArrowRight, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './SecurityMonitoring.css';

const SecurityMonitoring = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background hero-background-gradient">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: '' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Vigie Numérique 24/7</h1>
                                <p className="hero-description">Un Security Operations Center (SOC) dédié à votre infrastructure. Surveillance proactive et détection de menaces en temps réel par nos experts.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Demander un Audit SOC <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #00C2FF', borderLeft: '2px solid #00C2FF', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #00C2FF', borderRight: '2px solid #00C2FF', opacity: 0.3 }} />
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Visibilité Intégrale sur Vos Flux</h2>
                            <p className="section-subtitle">Le contrôle absolu sur chaque octet transitant par vos serveurs et applications.</p>
                        </div>
                        <div className="benefits-container">
                            <div className="benefit-card hover-lift">
                                <div className="benefit-icon-wrapper benefit-icon-blue">
                                    <Radar size={45} />
                                </div>
                                <div className="benefit-content">
                                    <h3 className="benefit-title">Analyse SIEM & Logs massive</h3>
                                    <p className="benefit-desc">
                                        Nous collectons et corrélons en temps réel des millions de journaux d'événements (logs) pour repérer les cyber-menaces furtives que les outils classiques ne voient pas.
                                    </p>
                                </div>
                            </div>

                            <div className="benefit-card hover-lift">
                                <div className="benefit-icon-wrapper benefit-icon-green">
                                    <ChartCandlestick size={45} />
                                </div>
                                <div className="benefit-content">
                                    <h3 className="benefit-title">Analyse Comportementale (UBA)</h3>
                                    <p className="benefit-desc">
                                        Toute anomalie de connexion ou transfert massif de données inhabituel déclenche une alerte immédiate vers nos analystes SOC pour une levée de doute.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Service de Sécurité Gérée (MSSP)</h2>
                            <p className="section-subtitle">L'expertise humaine alliée à la puissance des outils de monitoring dernière génération.</p>
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
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">Intelligence sur les Menaces</h2>
                                <p className="mss-description">
                                    Nous injectons des flux de "Threat Intelligence" mondiaux dans notre monitoring. Si un pirate est repéré ailleurs dans le monde, son adresse IP et sa signature sont déjà bloquées chez vous.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Collecte de logs illimitée",
                                        "Tableau de bord client temps réel",
                                        "Analyse de vulnérabilité régulière",
                                        "SLA de réponse < 15 min"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={20} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
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
                        <div className="cta-container">
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
