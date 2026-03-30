import React from 'react';
import { Rss, Newspaper, Calendar, ArrowUpRight, Download, Share2, Mail, ArrowRight, Zap, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './Press.css';

const Press = () => {
    const pressReleases = [
        { title: 'IHOST ouvre son troisième Data Center écologique à Casablanca (Maroc)', date: '12 Janvier 2024', type: 'Infrastructure', description: 'Une nouvelle forteresse numérique de 2500m² alimentée à 100% par des énergies renouvelables.' },
        { title: 'Partenariat Stratégique entre IHOST et Cloudflare pour la protection Edge', date: '05 Novembre 2023', type: 'Partenariat', description: 'Une alliance majeure pour offrir une protection DDoS de niveau mondial à tous nos clients.' },
        { title: 'Lancement de l\'offre "Cloud Souverain" dédiée aux administrations', date: '22 Septembre 2023', type: 'Produit', description: 'Une réponse aux enjeux de souveraineté des données pour le secteur public marocain.' },
        { title: 'IHOST annonce la neutralité carbone intégrale sur ses serveurs', date: '18 Août 2023', type: 'RSE', description: 'Un engagement fort pour un numérique plus durable et respectueux de l\'environnement.' }
    ];

    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/tech-company.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Salle de Presse & Média</h1>
                                <p className="hero-description">Retrouvez toutes les annonces officielles d'IHOST. Restez informé sur nos expansions, nos innovations technologiques et nos engagements sociétaux.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Kit Média (ZIP) <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Communiqués de Presse</h2>
                            <p className="section-subtitle">Suivez le rythme de notre croissance à travers nos annonces majeures.</p>
                        </div>
                        <div className="press-list">
                            {pressReleases.map((press, idx) => (
                                <div key={idx} className="press-card hover-lift">
                                    <div className="press-content">
                                        <div className="press-meta">
                                            <div className="press-date">
                                                <Calendar size={16} /> {press.date}
                                            </div>
                                            <span className="press-type">{press.type}</span>
                                        </div>
                                        <h3 className="press-title">{press.title}</h3>
                                        <p className="press-desc">{press.description}</p>
                                    </div>
                                    <button className="press-link-btn hover-lift">
                                        <ArrowUpRight size={32} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Ressources Journalistiques</h2>
                            <p className="section-subtitle">Tout ce dont vous avez besoin pour vos articles et reportages.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Download} title="Logos & Assets" desc="Accédez aux logotypes officiels, polices et guides de style IHOST en haute résolution." />
                            <LuxeCard icon={Newspaper} title="Fiches Produits" desc="Téléchargez nos fiches PDF détaillées sur nos infrastructures Data Centers et solutions Cloud." />
                            <LuxeCard icon={Share2} title="Photos Officielles" desc="Banque d'images haute qualité de nos équipes, de nos bureaux et de nos infrastructures serveurs." />
                            <LuxeCard icon={Mail} title="Contact Presse" desc="Une ligne directe pour vos demandes d'interviews ou d'informations exclusives." />
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="media-container">
                            <div className="media-content">
                                <h2 className="media-title">Abonnement Media</h2>
                                <p className="media-desc">
                                    Inscrivez-vous à notre liste de diffusion exclusive pour les journalistes et analystes. Recevez nos communiqués sous embargo 24h avant leur diffusion publique.
                                </p>
                                <div className="media-benefits">
                                    {[
                                        "Accès Invité aux Événements",
                                        "Interviews avec le Board",
                                        "Visites de Data Centers",
                                        "Études de Marché Cloud"
                                    ].map((benefit, i) => (
                                        <div key={i} className="media-benefit">
                                            <CheckCircle2 size={24} color="#10b981" /> {benefit}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-wrap-fix">M'inscrire au flux Media</button>
                            </div>
                            <div className="media-visual">
                                <div className="media-visual-box">
                                    <Rss size={100} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>Flux RSS</h3>
                                    <p style={{ opacity: 0.6 }}>Intégrez nos actualités en temps réel.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 className="cta-title">Besoin d'un expert ?</h2>
                            <p className="cta-desc">
                                Nos experts en cybersécurité et infrastructure Cloud sont disponibles pour des interviews, des analyses de marché ou des participations à des conférences.
                            </p>
                            <Link to="/contact" className="btn cta-link">
                                Demander une Interview <ArrowRight size={26} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Press;
