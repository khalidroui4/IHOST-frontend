import React from 'react';
import { Share2, Mail, Users, TrendingUp, Presentation, MessageSquareText, ArrowRight, Zap, CheckCircle2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './DigitalMarketing.css';

const DigitalMarketing = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background hero-background-blue">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/marketing-hero.png)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Marketing Digital Haute Performance</h1>
                                <p className="hero-description">Développez une présence omnicanale percutante. De la stratégie de contenu au Social Media, nous transformons votre audience en une communauté de clients fidèles.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Élaborer ma Stratégie <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Écosystème Marketing 360°</h2>
                            <p className="section-subtitle">Une synergie parfaite entre vos canaux digitaux pour un impact décuplé.</p>
                        </div>
                        <div className="eco-container">
                            {[
                                { icon: Share2, title: "Social Media & Community Management", desc: "Création de calendriers éditoriaux, design de visuels haut de gamme et animation de vos communautés sur LinkedIn, Instagram et TikTok.", color: "#ec4899" },
                                { icon: Mail, title: "Email Marketing & Automation", desc: "Séquences de bienvenue, relances de paniers abandonnés et newsletters segmentées pour maximiser la Lifetime Value de vos clients.", color: "#1E6BFF" },
                                { icon: Presentation, title: "Content Strategy (Inbound)", desc: "Rédaction d'articles experts, livres blancs et études de cas pour asseoir votre autorité et générer des leads qualifiés naturellement.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} className="eco-card hover-lift">
                                    <div className="eco-icon-wrapper" style={{ background: `${item.color}10`, color: item.color }}>
                                        <item.icon size={45} />
                                    </div>
                                    <div className="eco-content">
                                        <h3 className="eco-card-title">{item.title}</h3>
                                        <p className="eco-card-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Bénéfices de l'Omnicanalité</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Fini les actions isolées, place à la cohérence stratégique.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Users} title="Portée Décuplée" desc="Ciblez de nouveaux segments d'audience là où ils passent réellement leur temps, avec le bon message au bon moment." />
                            <LuxeCard icon={MessageSquareText} title="Engagement Profond" desc="Créez une véritable conversation avec vos clients, transformant de simples acheteurs en ambassadeurs passionnés." />
                            <LuxeCard icon={TrendingUp} title="Voix Unifiée" desc="Toutes vos communications (Site, Ads, Social, Email) parlent d'une seule voix pour une reconnaissance de marque instantanée." />
                            <LuxeCard icon={Heart} title="Fidélisation Accrue" desc="Réduisez votre coût d'acquisition client sur le long terme en misant sur une relation durable et automatisée." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">Audit de Votre Présence Digitale</h2>
                                <p className="mss-description">
                                    Nous analysons votre écosystème actuel pour identifier les silos de données et les opportunités de croissance manquées. Repartez avec une feuille de route claire et actionnable.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Audit Social Media",
                                        "Vérification Tunnel de Vente",
                                        "Analyse Qualité du Contenu",
                                        "Bilan Mailing List"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Demander Mon Bilan 360°</button>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
                                    <Presentation size={120} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem' }}>Stratégie</h3>
                                    <p style={{ color: '#4B5563', fontSize: '1.1rem' }}>L'excellence créative au service de vos indicateurs de performance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <div className="cta-content">
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Prêt à accélérer votre croissance ?</h2>
                                <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                    Confiez votre marketing à une équipe qui comprend votre business et vos enjeux technologiques.
                                </p>
                                <Link to="/contact" className="btn" style={{
                                    background: 'white',
                                    color: '#db2777',
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
                                    Parler à un Stratège Marketing <ArrowRight size={28} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default DigitalMarketing;
