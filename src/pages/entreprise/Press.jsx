import React from 'react';
import { Rss, Newspaper, Calendar, ArrowUpRight, Download, Share2, Mail, ArrowRight, Zap, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

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
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Salle de Presse & Média</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Retrouvez toutes les annonces officielles d'IHOST. Restez informé sur nos expansions, nos innovations technologiques et nos engagements sociétaux.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Kit Média (ZIP) <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Communiqués de Presse</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Suivez le rythme de notre croissance à travers nos annonces majeures.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {pressReleases.map((press, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    padding: '3.5rem',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '4rem',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#4B5563', fontWeight: 700 }}>
                                                <Calendar size={16} /> {press.date}
                                            </div>
                                            <span style={{
                                                background: '#F5F7FA',
                                                color: '#1E6BFF',
                                                fontSize: '0.75rem',
                                                padding: '0.4rem 1.2rem',
                                                borderRadius: '100px',
                                                fontWeight: 900,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                {press.type}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1rem', lineHeight: '1.3' }}>{press.title}</h3>
                                        <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>{press.description}</p>
                                    </div>
                                    <button style={{
                                        background: '#F5F7FA',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '70px',
                                        height: '70px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#1E6BFF',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        transition: 'all 0.3s ease-in-out'
                                    }} className="hover-lift">
                                        <ArrowUpRight size={32} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Ressources Journalistiques</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Tout ce dont vous avez besoin pour vos articles et reportages.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Download} title="Logos & Assets" desc="Accédez aux logotypes officiels, polices et guides de style IHOST en haute résolution." />
                            <LuxeCard icon={Newspaper} title="Fiches Produits" desc="Téléchargez nos fiches PDF détaillées sur nos infrastructures Data Centers et solutions Cloud." />
                            <LuxeCard icon={Share2} title="Photos Officielles" desc="Banque d'images haute qualité de nos équipes, de nos bureaux et de nos infrastructures serveurs." />
                            <LuxeCard icon={Mail} title="Contact Presse" desc="Une ligne directe pour vos demandes d'interviews ou d'informations exclusives." />
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
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Abonnement Media</h2>
                                <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Inscrivez-vous à notre liste de diffusion exclusive pour les journalistes et analystes. Recevez nos communiqués sous embargo 24h avant leur diffusion publique.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Accès Invité aux Événements",
                                        "Interviews avec le Board",
                                        "Visites de Data Centers",
                                        "Études de Marché Cloud"
                                    ].map((benefit, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {benefit}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white', fontSize: '1.1rem' }}>M'inscrire au flux Media</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '4rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'center'
                                }}>
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
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Besoin d'un expert ?</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Nos experts en cybersécurité et infrastructure Cloud sont disponibles pour des interviews, des analyses de marché ou des participations à des conférences.
                            </p>
                            <Link to="/contact" className="btn" style={{
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
