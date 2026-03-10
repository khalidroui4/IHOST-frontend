import React from 'react';
import { Activity, Shield, Filter, BarChart3, CloudLightning, RefreshCcw, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const DDoSProtection = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0EA5E9 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/security-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Rempart Anti-DDoS Massif</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Gardez votre infrastructure en ligne, même sous des attaques massives de plusieurs Térabits. Une atténuation intelligente qui sépare le trafic légitime du chaos numérique.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Sécuriser Mon Réseau <ArrowRight size={20} /></Link>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Atténuation Intelligente en Temps Réel</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Découvrez comment notre réseau global de Scrubbing Centers protège vos services sans ajouter de latence.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {[
                                {
                                    icon: CloudLightning,
                                    step: "01",
                                    title: "Détection Ultra-Rapide",
                                    desc: "Analyse télémétrique constante pour identifier les anomalies sur les couches L3, L4 et L7 en moins de 3 secondes.",
                                    color: "#3b82f6"
                                },
                                {
                                    icon: RefreshCcw,
                                    step: "02",
                                    title: "Routage Automatisé",
                                    desc: "Dès l'alerte, le trafic est instantanément redirigé vers nos clusters de nettoyage haute performance (Anycast).",
                                    color: "#8b5cf6"
                                },
                                {
                                    icon: Filter,
                                    step: "03",
                                    title: "Lavage du Trafic",
                                    desc: "Filtrage chirurgical des botnets, UDP/SYN floods. Seul le trafic 'propre' atteint votre serveur final.",
                                    color: "#10b981"
                                }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '4rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    position: 'relative',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <span style={{
                                        position: 'absolute',
                                        top: '2rem',
                                        right: '2.5rem',
                                        fontSize: '3rem',
                                        fontWeight: 900,
                                        opacity: 0.05,
                                        color: item.color
                                    }}>{item.step}</span>
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '2rem'
                                    }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.2rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: '1.8' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>L'Hégémonie Réseau IHOST</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une capacité d'absorption dépassant vos besoins les plus critiques.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Shield} title="Réseau Multi-Térabit" desc="Accédez à une bande passante globale colossale capable de diluer les attaques DDoS les plus volumétriques au monde." />
                            <LuxeCard icon={Activity} title="Disponibilité 100% Garantie" desc="Assurez la pérennité de votre e-commerce et de votre image de marque, même face à des concurrents malveillants." />
                            <LuxeCard icon={BarChart3} title="Latence Zéro" desc="Grâce au routage Anycast, vos utilisateurs sont connectés au centre de nettoyage le plus proche d'eux." />
                            <LuxeCard icon={Zap} title="Protection Applicative L7" desc="Allez au-delà du réseau. Nous bloquons aussi les attaques HTTP complexes simulant des comportements humains via WAF." />
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
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Pour les infrastructures de mission critique</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Qu'il s'agisse de serveurs de jeux, de plateformes de trading ou de sites gouvernementaux, notre protection DDoS est taillée pour les environnements où chaque seconde d'indisponibilité coûte cher.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Protection UDP/ICMP illimitée",
                                        "Audit post-attaque détaillé",
                                        "Ingénieurs SOC dédiés 24/7",
                                        "Support tunnel GRE & BGP"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: '#0B1F3A' }}>
                                            <CheckCircle2 size={20} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{
                                    background: '#0B1F3A',
                                    padding: '4rem',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    color: 'white',
                                    display: 'inline-block'
                                }}>
                                    <Activity size={60} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Test de Pression</h3>
                                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>Évaluez la résistance de votre setup actuel.</p>
                                    <button className="btn" style={{ background: '#3b82f6', color: 'white', padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800, border: 'none' }}>Demander un Audit Reseau</button>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Dites NON au chantage numérique</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Ne laissez pas les attaques par déni de service dicter la disponibilité de vos services. Armez-vous dès maintenant.
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
                                Parler à un Ingénieur Réseau <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default DDoSProtection;
