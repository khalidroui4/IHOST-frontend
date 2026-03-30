import React from 'react';
import { Handshake, TrendingUp, Presentation, Users, Briefcase, Code, BadgePercent, ArrowRight, Zap, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './Partners.css';

const Partners = () => {
    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/partners.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Célébrons la Collaboration</h1>
                                <p className="hero-description">Propulsez votre agence ou votre activité de freelance vers de nouveaux sommets. Devez partenaire officiel IHOST et accédez à des remises exclusives et un support d'élite.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Rejoindre le Programme <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Un Écosystème Dédié aux Pros</h2>
                            <p className="section-subtitle">Nous fournissons la puissance, vous créez l'innovation. Un partenariat gagnant-gagnant.</p>
                        </div>
                        <div className="partners-grid">
                            {[
                                { icon: Users, title: "Revendeurs Hosting", desc: "Opérez votre propre structure d'hébergement en marque blanche. Fixez vos propres prix et générez des revenus récurrents.", color: "#1E6BFF" },
                                { icon: Briefcase, title: "Agences Web", desc: "Hébergez tous vos projets sur une infrastructure infaillible. Regroupez votre facturation et profitez d'outils de gestion de parc.", color: "#8b5cf6" },
                                { icon: Code, title: "Développeurs & Freelances", desc: "Fournissez un service 'clé en main' de la création au déploiement. Touchez des commissions sur chaque achat d'infrastructure.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} className="partner-card hover-lift" style={{ borderTop: `6px solid ${item.color}` }}>
                                    <div className="partner-icon-wrapper" style={{ background: `${item.color}10`, color: item.color }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 className="partner-title">{item.title}</h3>
                                    <p className="partner-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Avantages Partenaires Exclusifs</h2>
                            <p className="section-subtitle">Plus que de l'hébergement, un véritable levier de croissance pour votre entreprise.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={BadgePercent} title="Marges Confortables" desc="Accédez à des remises volumétriques allant jusqu'à -40% sur l'ensemble de notre catalogue (Serveurs, Cloud, Domaines)." />
                            <LuxeCard icon={TrendingUp} title="Business Prévisible" desc="Transformez vos dépenses d'infrastructure en un centre de profit hautement rentable grâce à nos modèles de facturation flexibles." />
                            <LuxeCard icon={Presentation} title="Accès Early-Bird" desc="Soyez les premiers à tester et proposer nos nouvelles technologies Cloud à vos clients pour devancer la concurrence." />
                            <LuxeCard icon={Handshake} title="Support VIP Dédié" desc="Accès direct sans attente à nos ingénieurs de niveau 3. Nous intervenons en marque blanche pour résoudre vos incidents complexes." />
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="portal-container">
                            <div className="portal-content">
                                <h2 className="portal-title">Outils de Gestion Unifiés</h2>
                                <p className="portal-desc">
                                    Votre espace partenaire IHOST vous offre une console centralisée pour gérer des centaines de comptes clients, serveurs et domaines. Facturation, provisioning et monitoring, tout est à portée de clic.
                                </p>
                                <div className="portal-features">
                                    {[
                                        "Console Multi-Tenant",
                                        "API de Provisioning",
                                        "Facturation Consolidée",
                                        "Rapports de Performance"
                                    ].map((item, i) => (
                                        <div key={i} className="portal-feature">
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-wrap-fix">Explorer le portail</button>
                            </div>
                            <div className="portal-visual">
                                <div className="portal-visual-box">
                                    <ShieldCheck size={100} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Sceau Partenaire</h3>
                                    <p style={{ color: '#4B5563' }}>Affichez fièrement votre expertise certifiée IHOST.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 className="cta-title">Bâtissons le succès ensemble</h2>
                            <p className="cta-desc">
                                Rejoignez plus de 500 agences et partenaires qui ont déjà choisi l'excellence technique IHOST pour leurs projets.
                            </p>
                            <Link to="/contact" className="btn cta-link">
                                Devenir Partenaire Officiel <ArrowRight size={26} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Partners;
