import React from 'react';
import { MousePointerClick, LayoutDashboard, Smartphone, ServerCog, Briefcase, ShoppingBag, PenTool, LayoutTemplate, ArrowRight, Zap, CheckCircle2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './WebsiteBuilder.css';

const WebsiteBuilder = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background hero-background-pink">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/webBuild.jfif)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Créez Votre Site Web en Quelques Minutes</h1>
                                <p className="hero-description">Aucune ligne de code. Aucun stress technique. Juste de la créativité pure avec notre constructeur de sites intuitif de nouvelle génération.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Commencer Gratuitement <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Des Modèles pour Chaque Vision</h2>
                            <p className="section-subtitle">Démarrez avec un design de classe mondiale et personnalisez-le selon votre identité de marque.</p>
                        </div>
                        <div className="builder-grid">
                            {[
                                { icon: Briefcase, title: "Sites Corporate", desc: "Vitrines élégantes et professionnelles pour asseoir la crédibilité de votre entreprise." },
                                { icon: PenTool, title: "Portfolios Créatifs", desc: "Mettez en valeur vos travaux avec des galeries interactives et des mises en page fluides." },
                                { icon: ShoppingBag, title: "E-commerce Complet", desc: "Boutiques en ligne performantes avec gestion des stocks et paiements sécurisés intégrés." },
                                { icon: LayoutTemplate, title: "Landing Pages", desc: "Pages de capture optimisées pour transformer chaque visiteur en prospect qualifié." }
                            ].map((item, idx) => (
                                <div key={idx} className="builder-card hover-lift">
                                    <div className="builder-icon-wrapper">
                                        <item.icon size={40} />
                                    </div>
                                    <h3 className="builder-card-title">{item.title}</h3>
                                    <p className="builder-card-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>La Puissance de la Simplicité</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Tout ce dont vous avez besoin pour réussir en ligne, sans la complexité technique.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={MousePointerClick} title="Glisser-Déposer Intuitif" desc="Éditeur visuel WYSWYG : déplacez vos blocs, images et vidéos directement sur la page. Simple comme un jeu d'enfant." />
                            <LuxeCard icon={Smartphone} title="Mobile First" desc="Votre site s'ajuste automatiquement pour une expérience de navigation parfaite sur smartphones, tablettes et PC." />
                            <LuxeCard icon={ServerCog} title="Hébergement Cloud" desc="Ne vous souciez pas des serveurs. Votre site est propulsé par notre infrastructure haute performance et sécurisé par SSL." />
                            <LuxeCard icon={Rocket} title="SEO Prêt à l'Emploi" desc="Optimisation automatique pour Google afin que vos clients vous trouvent dès le premier jour sur le web." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">Votre Boutique en 3 Clics</h2>
                                <p className="mss-description">
                                    Transformez votre passion en business. IHOST Website Builder intègre tous les outils nécessaires pour vendre vos produits physiques ou numériques en toute simplicité.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Paiement par Carte Intégré",
                                        "Gestion Facile des Stocks",
                                        "Calcul de Frais de Port",
                                        "Coupons & Promotions"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Voir la Démo E-commerce</button>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
                                    <ShoppingBag size={120} color="#ec4899" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>E-commerce</h3>
                                    <p style={{ color: '#4B5563', fontSize: '1.2rem' }}>Vendez partout, tout le temps.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <div className="cta-content">
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Le web est à vous</h2>
                                <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                    Rejoignez des milliers d'entrepreneurs qui ont fait confiance à IHOST pour lancer leur aventure numérique.
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
                                    Démarrer Ma Création <ArrowRight size={28} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default WebsiteBuilder;
