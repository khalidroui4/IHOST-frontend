import React from 'react';
import { Shovel, ShieldCheck, Cog, Search, Activity, Trash2, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './SiteLock.css';

const SiteLock = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background hero-background-gradient">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/security-hero.png)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Garde du Corps de Votre Site</h1>
                                <p className="hero-description">Votre agent de sécurité virtuel 24/7. Détectez, bloquez et supprimez automatiquement les malwares dissimulés avant qu'ils ne paralysent votre activité.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Activer SiteLock <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #00C2FF', borderLeft: '2px solid #00C2FF', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #00C2FF', borderRight: '2px solid #00C2FF', opacity: 0.3 }} />
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Le Processus de Nettoyage Intelligent</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un cycle de sécurité proactif et autonome pour une sérénité numérique totale.</p>
                        </div>
                        <div className="process-grid">
                            {[
                                { icon: Search, title: "Scan de Précision", desc: "Analyse quotidienne de l'intégralité de vos fichiers, CMS (WP, Joomla) et bases de données pour débusquer les backdoors.", color: "#1E6BFF" },
                                { icon: Activity, title: "Détection de Failles", desc: "Identification proactive des injections SQL et XSS avant que les robots ne les exploitent.", color: "#eab308" },
                                { icon: Trash2, title: "Remédiation SMART", desc: "Télécharge, assainit et remet en ligne vos fichiers compromis automatiquement, sans interruption de service.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} className="process-card hover-lift" style={{ borderTop: `6px solid ${item.color}` }}>
                                    <div className="process-icon-wrapper" style={{ background: `${item.color}10`, color: item.color }}>
                                        <item.icon size={45} />
                                    </div>
                                    <h3 className="process-card-title">{item.title}</h3>
                                    <p className="process-card-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi choisir SiteLock via IHOST ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>La technologie n°1 mondiale de protection de sites Web, intégrée à votre infrastructure.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={ShieldCheck} title="Zéro Blacklist Google" desc="Évitez la redoutable liste noire des moteurs de recherche qui peut ruiner votre SEO en quelques heures." />
                            <LuxeCard icon={Cog} title="Cloud Natif" desc="Aucun logiciel à installer sur votre poste. La protection tourne silencieusement dans le nuage IHOST." />
                            <LuxeCard icon={Shovel} title="Badge de Confiance" desc="Affichez le sceau dynamique SiteLock pour certifier à vos clients que votre site est analysé en temps réel." />
                            <LuxeCard icon={Zap} title="Vitesse Optimisée" desc="SiteLock inclut une option CDN pour accélérer le chargement de vos pages tout en les sécurisant." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">Prêt pour le combat ?</h2>
                                <p className="mss-description">
                                    Les attaques automatisées ne dorment jamais. Offrez-vous la technologie qui a déjà protégé plus de 12 millions de sites à travers le monde.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Audit initial gratuit",
                                        "Pare-feu applicatif (WAF)",
                                        "Réparation automatique SMART",
                                        "Rapports détaillés quotidiens"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={20} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
                                    <ShieldCheck size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Sérénité Garantie</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Activation et scan initial en moins de 10 min.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Sécuriser Mon Site</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Ne devenez pas une statistique</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Chaque seconde, un site est piraté. Soyez celui qui possède la meilleure forteresse.
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
                                Parler à un Expert Anti-Malware <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default SiteLock;
