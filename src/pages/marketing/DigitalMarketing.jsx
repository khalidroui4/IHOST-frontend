import React from 'react';
import { Share2, Mail, Users, TrendingUp, Presentation, MessageSquareText, ArrowRight, Zap, CheckCircle2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const DigitalMarketing = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/marketing-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Marketing Digital Haute Performance</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Développez une présence omnicanale percutante. De la stratégie de contenu au Social Media, nous transformons votre audience en une communauté de clients fidèles.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Élaborer ma Stratégie <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Écosystème Marketing 360°</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une synergie parfaite entre vos canaux digitaux pour un impact décuplé.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {[
                                { icon: Share2, title: "Social Media & Community Management", desc: "Création de calendriers éditoriaux, design de visuels haut de gamme et animation de vos communautés sur LinkedIn, Instagram et TikTok.", color: "#ec4899" },
                                { icon: Mail, title: "Email Marketing & Automation", desc: "Séquences de bienvenue, relances de paniers abandonnés et newsletters segmentées pour maximiser la Lifetime Value de vos clients.", color: "#1E6BFF" },
                                { icon: Presentation, title: "Content Strategy (Inbound)", desc: "Rédaction d'articles experts, livres blancs et études de cas pour asseoir votre autorité et générer des leads qualifiés naturellement.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    gap: '3rem',
                                    alignItems: 'center',
                                    background: 'white',
                                    padding: '4rem',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <item.icon size={45} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 900 }}>{item.title}</h3>
                                        <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
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
                        <div style={{
                            background: '#F5F7FA',
                            padding: '6rem',
                            borderRadius: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6rem',
                            border: '1px solid rgba(11, 31, 58, 0.1)'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Audit de Votre Présence Digitale</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Nous analysons votre écosystème actuel pour identifier les silos de données et les opportunités de croissance manquées. Repartez avec une feuille de route claire et actionnable.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Audit Social Media",
                                        "Vérification Tunnel de Vente",
                                        "Analyse Qualité du Contenu",
                                        "Bilan Mailing List"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Demander Mon Bilan 360°</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center'
                                }}>
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
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '48px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
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
