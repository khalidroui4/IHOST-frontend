import React from 'react';
import { MousePointerClick, LayoutDashboard, Smartphone, ServerCog, Briefcase, ShoppingBag, PenTool, LayoutTemplate, ArrowRight, Zap, CheckCircle2, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const WebsiteBuilder = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #DB2777 0%, #F472B6 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/marketing-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Créez Votre Site Web en Quelques Minutes</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Aucune ligne de code. Aucun stress technique. Juste de la créativité pure avec notre constructeur de sites intuitif de nouvelle génération.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Commencer Gratuitement <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Des Modèles pour Chaque Vision</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Démarrez avec un design de classe mondiale et personnalisez-le selon votre identité de marque.</p>
                        </div>
                        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                            {[
                                { icon: Briefcase, title: "Sites Corporate", desc: "Vitrines élégantes et professionnelles pour asseoir la crédibilité de votre entreprise." },
                                { icon: PenTool, title: "Portfolios Créatifs", desc: "Mettez en valeur vos travaux avec des galeries interactives et des mises en page fluides." },
                                { icon: ShoppingBag, title: "E-commerce Complet", desc: "Boutiques en ligne performantes avec gestion des stocks et paiements sécurisés intégrés." },
                                { icon: LayoutTemplate, title: "Landing Pages", desc: "Pages de capture optimisées pour transformer chaque visiteur en prospect qualifié." }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    padding: '3.5rem 2.5rem',
                                    borderRadius: '40px',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease-in-out',
                                    transition: 'all 0.3s ease-in-out',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'rgba(236, 72, 153, 0.1)',
                                        color: '#ec4899',
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2rem'
                                    }}>
                                        <item.icon size={40} />
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: '1.6' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Votre Boutique en 3 Clics</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Transformez votre passion en business. IHOST Website Builder intègre tous les outils nécessaires pour vendre vos produits physiques ou numériques en toute simplicité.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Paiement par Carte Intégré",
                                        "Gestion Facile des Stocks",
                                        "Calcul de Frais de Port",
                                        "Coupons & Promotions"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Voir la Démo E-commerce</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center'
                                }}>
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
