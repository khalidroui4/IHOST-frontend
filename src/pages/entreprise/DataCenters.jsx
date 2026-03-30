import React from 'react';
import { Server, ShieldAlert, Activity, Network, Lock, Globe, Zap, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './DataCenters.css';

const DataCenters = () => {
    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/AdobeStock_87909563.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Forteresses de Données</h1>
                                <p className="hero-description">Des infrastructures Tier III+ & IV conçues pour la résilience. Nous opérons des centres de données ultra-modernes garantissant un uptime de 99.99% et une sécurité militaire.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Visite Virtuelle <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Présence Mondiale, Performance Locale</h2>
                            <p className="section-subtitle">Réduisez la latence au minimum en hébergeant vos applications au plus près de vos utilisateurs finaux.</p>
                        </div>
                        <div className="locations-grid">
                            {[
                                { region: "Afrique", locations: ["Rabat", "Casablanca"], icon: Globe, color: "#1E6BFF" },
                                { region: "Europe", locations: ["Paris", "Francfort", "Londres"], icon: Globe, color: "#10b981" },
                                { region: "Amérique", locations: ["Montréal", "New York", "Silicon Valley"], icon: Globe, color: "#8b5cf6" }
                            ].map((node, i) => (
                                <div key={i} className="location-card hover-lift">
                                    <div className="location-icon" style={{ background: `${node.color}10`, color: node.color }}>
                                        <node.icon size={48} />
                                    </div>
                                    <h3 className="location-region">{node.region}</h3>
                                    <div className="location-tags">
                                        {node.locations.map((loc, j) => (
                                            <span key={j} className="location-tag">{loc}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Standards Technologiques</h2>
                            <p className="section-subtitle">Plus que des serveurs, des sanctuaires de haute disponibilité.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Server} title="Uptime Tier IV" desc="Alimentation électrique 2N+1, générateurs industriels et systèmes de refroidissement haute densité pour une continuité de service totale." />
                            <LuxeCard icon={Network} title="Réseau Multi-Homing" desc="Connexions redondantes par fibre noire multi-opérateurs (BGP4) garantissant une latence ultra-faible et un débit massif." />
                            <LuxeCard icon={ShieldAlert} title="Mitigation DDoS d'État" desc="Protection matérielle intégrée filtrant jusqu'à 2 Tbit/s d'attaques volumétriques avant même qu'elles n'atteignent vos baies." />
                            <LuxeCard icon={Lock} title="Sécurité Physique" desc="Contrôles biométriques 3-facteurs, scan rétinien, caméras infrarouges et gardiennage humain permanent 24/7/365." />
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="energy-container">
                            <div className="energy-content">
                                <h2 className="energy-title">L'Énergie au service de la performance</h2>
                                <p className="energy-desc">
                                    Nous investissons massivement dans le Green Computing. Nos nouveaux data centers utilisent 100% d'énergie renouvelable et des technologies de Free Cooling pour réduire notre empreinte carbone.
                                </p>
                                <div className="energy-grid">
                                    {[
                                        { icon: Zap, label: "PUE de 1.15", desc: "Efficacité énergétique record" },
                                        { icon: Cpu, label: "Hardware NVMe", desc: "Vitesse de stockage ultime" },
                                        { icon: Activity, label: "Monitoring SIEM", desc: "Surveillance réseau IA" },
                                        { icon: ShieldAlert, label: "SLA 99.999%", desc: "Garantie contractuelle" }
                                    ].map((item, i) => (
                                        <div key={i} className="energy-item">
                                            <div className="energy-item-icon"><item.icon size={32} /></div>
                                            <div>
                                                <div className="energy-item-label">{item.label}</div>
                                                <div className="energy-item-desc">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-wrap-fix">Voir nos Certifications</button>
                            </div>
                            <div className="energy-visual">
                                <div className="energy-visual-box">
                                    <Server size={200} color="rgba(255,255,255,0.1)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 className="cta-title">Hébergez sur du roc solide</h2>
                            <p className="cta-desc">
                                Ne confiez pas vos données critiques à n'importe qui. Choisissez l'infrastructure qui ne plie jamais face à la demande.
                            </p>
                            <Link to="/hebergement" className="btn cta-link">
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
