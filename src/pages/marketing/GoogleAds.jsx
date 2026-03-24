import React from 'react';
import { Megaphone, Target, BarChart2, MousePointerClick, Zap, Banknote, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './GoogleAds.css';

const GoogleAds = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background hero-background-orange">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/ads3.avif)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Propulsez Vos Ventes Instantanément</h1>
                                <p className="hero-description">Capturez l'intention de vos clients au moment précis où ils recherchent vos services. Des campagnes Google Ads (SEA) ultra-ciblées pour un ROI immédiat.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Lancer Ma Campagne <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Maîtrisez Votre Acquisition Client</h2>
                            <p className="section-subtitle">Une gestion experte de vos enchères et de vos annonces pour maximiser chaque centime investi.</p>
                        </div>
                        <div className="ads-grid">
                            {[
                                { icon: Target, title: "Ciblage Chirurgical", desc: "Configuration précise par mots-clés, zones géographiques et segments d'audience pour toucher les bons profils.", color: "#1E6BFF" },
                                { icon: Banknote, title: "Optimisation du Budget", desc: "Stratégies d'enchères intelligentes (CPA/ROAS cible) pour réduire votre coût d'acquisition et augmenter vos marges.", color: "#10b981" },
                                { icon: BarChart2, title: "Analyse & A/B Testing", desc: "Amélioration continue de vos annonces et landing pages pour identifier les combinaisons gagnantes qui convertissent le mieux.", color: "#ec4899" }
                            ].map((item, idx) => (
                                <div key={idx} className="ads-card hover-lift">
                                    <div className="ads-icon-wrapper" style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 className="ads-card-title">{item.title}</h3>
                                    <p className="ads-card-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>La Puissance du SEA</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Pourquoi Google Ads est le levier de croissance le plus rapide du digital.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Zap} title="Résultats Immédiats" desc="Dès l'activation, vos annonces apparaissent en haut de la page 1 de Google, générant du trafic qualifié en quelques minutes." />
                            <LuxeCard icon={MousePointerClick} title="Paiement au Clic" desc="Vous ne payez que lorsqu'un utilisateur réellement intéressé clique sur votre annonce. Un contrôle total de vos dépenses." />
                            <LuxeCard icon={Megaphone} title="Remarketing Avancé" desc="Recapturez les visiteurs ayant quitté votre site sans convertir via des bannières display stratégiquement placées." />
                            <LuxeCard icon={TrendingUp} title="Scalabilité Totale" desc="Augmentez votre budget sur les campagnes rentables pour scaler votre chiffre d'affaires sans limites techniques." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">Audit de Vos Campagnes Existantes</h2>
                                <p className="mss-description">
                                    Vous dépensez déjà en Google Ads mais les résultats sont mitigés ? Nos experts analysent votre compte pour identifier les fuites de budget et les opportunités de croissance inexploitées.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Analyse Score de Qualité",
                                        "Audit Structure de Compte",
                                        "Vérification Tracking Conversion",
                                        "Conseils Landing Page"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Demander Mon Audit</button>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
                                    <BarChart2 size={120} color="#ec4899" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>+45%</h3>
                                    <p style={{ color: '#4B5563', fontSize: '1.2rem' }}>Baisse moyenne du coût par acquisition (CPA) après optimisation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <div className="cta-content">
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Ouvrez les vannes du succès</h2>
                                <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                    Ne laissez plus vos prospects s'échapper chez vos concurrents. Prenez la première place dès maintenant.
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
                                    Parler à un Expert SEA <ArrowRight size={28} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default GoogleAds;
