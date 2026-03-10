import React from 'react';
import { Shovel, ShieldCheck, Cog, Search, Activity, Trash2, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const SiteLock = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/security-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Garde du Corps de Votre Site</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Votre agent de sécurité virtuel 24/7. Détectez, bloquez et supprimez automatiquement les malwares dissimulés avant qu'ils ne paralysent votre activité.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Activer SiteLock <ArrowRight size={20} /></Link>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Le Processus de Nettoyage Intelligent</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un cycle de sécurité proactif et autonome pour une sérénité numérique totale.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                            {[
                                { icon: Search, title: "Scan de Précision", desc: "Analyse quotidienne de l'intégralité de vos fichiers, CMS (WP, Joomla) et bases de données pour débusquer les backdoors.", color: "#1E6BFF" },
                                { icon: Activity, title: "Détection de Failles", desc: "Identification proactive des injections SQL et XSS avant que les robots ne les exploitent.", color: "#eab308" },
                                { icon: Trash2, title: "Remédiation SMART", desc: "Télécharge, assainit et remet en ligne vos fichiers compromis automatiquement, sans interruption de service.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'center',
                                    padding: '4rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    borderTop: `6px solid ${item.color}`,
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '90px',
                                        height: '90px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2.5rem'
                                    }}>
                                        <item.icon size={45} />
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.1rem', color: '#4B5563', lineHeight: '1.8' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
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
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Prêt pour le combat ?</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Les attaques automatisées ne dorment jamais. Offrez-vous la technologie qui a déjà protégé plus de 12 millions de sites à travers le monde.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Audit initial gratuit",
                                        "Pare-feu applicatif (WAF)",
                                        "Réparation automatique SMART",
                                        "Rapports détaillés quotidiens"
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
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
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
