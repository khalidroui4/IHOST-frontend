import React from 'react';
import { Megaphone, Target, BarChart2, MousePointerClick, Zap, Banknote, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const GoogleAds = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #EA580C 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/marketing-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Propulsez Vos Ventes Instantanément</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Capturez l'intention de vos clients au moment précis où ils recherchent vos services. Des campagnes Google Ads (SEA) ultra-ciblées pour un ROI immédiat.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Lancer Ma Campagne <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Maîtrisez Votre Acquisition Client</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une gestion experte de vos enchères et de vos annonces pour maximiser chaque centime investi.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {[
                                { icon: Target, title: "Ciblage Chirurgical", desc: "Configuration précise par mots-clés, zones géographiques et segments d'audience pour toucher les bons profils.", color: "#1E6BFF" },
                                { icon: Banknote, title: "Optimisation du Budget", desc: "Stratégies d'enchères intelligentes (CPA/ROAS cible) pour réduire votre coût d'acquisition et augmenter vos marges.", color: "#10b981" },
                                { icon: BarChart2, title: "Analyse & A/B Testing", desc: "Amélioration continue de vos annonces et landing pages pour identifier les combinaisons gagnantes qui convertissent le mieux.", color: "#ec4899" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'center',
                                    padding: '4rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2.5rem',
                                        border: `1px solid ${item.color}20`
                                    }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.2rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: '1.8' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Audit de Vos Campagnes Existantes</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Vous dépensez déjà en Google Ads mais les résultats sont mitigés ? Nos experts certifiés analysent votre compte pour identifier les fuites de budget et les opportunités de croissance inexploitées.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Analyse Score de Qualité",
                                        "Audit Structure de Compte",
                                        "Vérification Tracking Conversion",
                                        "Conseils Landing Page"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Demander Mon Audit</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center'
                                }}>
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
