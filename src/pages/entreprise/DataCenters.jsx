import React from 'react';
import { Server, ShieldAlert, Activity, Network, Lock, Globe, Zap, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const DataCenters = () => {
    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/about-hero.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    gap: '1rem',
                                    marginBottom: '2.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(5px)'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#00C2FF' }}>
                                        <Globe size={14} /> Network
                                    </span>
                                    <span style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#10b981' }}>
                                        <Zap size={14} /> Performance
                                    </span>
                                </div>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Forteresses de Données</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Des infrastructures Tier III+ & IV conçues pour la résilience. Nous opérons des centres de données ultra-modernes garantissant un uptime de 99.99% et une sécurité militaire.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Visite Virtuelle <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Présence Mondiale, Performance Locale</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Réduisez la latence au minimum en hébergeant vos applications au plus près de vos utilisateurs finaux.</p>
                        </div>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {[
                                { region: "Afrique", locations: ["Rabat", "Casablanca"], icon: Globe, color: "#1E6BFF" },
                                { region: "Europe", locations: ["Paris", "Francfort", "Londres"], icon: Globe, color: "#10b981" },
                                { region: "Amérique", locations: ["Montréal", "New York", "Silicon Valley"], icon: Globe, color: "#8b5cf6" }
                            ].map((node, i) => (
                                <div key={i} style={{
                                    padding: '4rem 3rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: `${node.color}10`,
                                        color: node.color,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2.5rem'
                                    }}>
                                        <node.icon size={48} />
                                    </div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>{node.region}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                                        {node.locations.map((loc, j) => (
                                            <span key={j} style={{
                                                padding: '0.6rem 1.2rem',
                                                background: '#F5F7FA',
                                                borderRadius: '100px',
                                                fontSize: '0.95rem',
                                                fontWeight: 700,
                                                color: '#4B5563'
                                            }}>{loc}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Standards Technologiques</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Plus que des serveurs, des sanctuaires de haute disponibilité.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Server} title="Uptime Tier IV" desc="Alimentation électrique 2N+1, générateurs industriels et systèmes de refroidissement haute densité pour une continuité de service totale." />
                            <LuxeCard icon={Network} title="Réseau Multi-Homing" desc="Connexions redondantes par fibre noire multi-opérateurs (BGP4) garantissant une latence ultra-faible et un débit massif." />
                            <LuxeCard icon={ShieldAlert} title="Mitigation DDoS d'État" desc="Protection matérielle intégrée filtrant jusqu'à 2 Tbit/s d'attaques volumétriques avant même qu'elles n'atteignent vos baies." />
                            <LuxeCard icon={Lock} title="Sécurité Physique" desc="Contrôles biométriques 3-facteurs, scan rétinien, caméras infrarouges et gardiennage humain permanent 24/7/365." />
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
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ flex: 1.5, position: 'relative', zIndex: 2 }}>
                                <h2 style={{ fontSize: '3.2rem', fontWeight: 900, marginBottom: '2rem', lineHeight: '1.1' }}>L'Énergie au service de la performance</h2>
                                <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Nous investissons massivement dans le Green Computing. Nos nouveaux data centers utilisent 100% d'énergie renouvelable et des technologies de Free Cooling pour réduire notre empreinte carbone.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        { icon: Zap, label: "PUE de 1.15", desc: "Efficacité énergétique record" },
                                        { icon: Cpu, label: "Hardware NVMe", desc: "Vitesse de stockage ultime" },
                                        { icon: Activity, label: "Monitoring SIEM", desc: "Surveillance réseau IA" },
                                        { icon: ShieldAlert, label: "SLA 99.999%", desc: "Garantie contractuelle" }
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1.25rem' }}>
                                            <div style={{ color: '#1E6BFF', flexShrink: 0 }}>
                                                <item.icon size={32} />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{item.label}</div>
                                                <div style={{ opacity: 0.6, fontSize: '1rem' }}>{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white', fontSize: '1.1rem' }}>Voir nos Certifications</button>
                            </div>
                            <div style={{ flex: 1, position: 'relative', height: '100%', display: 'none', lg: 'block' }}>
                                <div style={{
                                    width: '100%',
                                    height: '500px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '32px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <Server size={200} color="rgba(255,255,255,0.1)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Hébergez sur du roc solide</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Ne confiez pas vos données critiques à n'importe qui. Choisissez l'infrastructure qui ne plie jamais face à la demande.
                            </p>
                            <Link to="/hebergement" className="btn" style={{
                                background: 'white',
                                color: '#1E6BFF',
                                padding: '1.4rem 4rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                fontSize: '1.2rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                textDecoration: 'none'
                            }}>
                                Découvrir nos Offres <ArrowRight size={26} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default DataCenters;
