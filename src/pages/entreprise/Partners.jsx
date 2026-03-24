import React from 'react';
import { Handshake, TrendingUp, Presentation, Users, Briefcase, Code, BadgePercent, ArrowRight, Zap, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const Partners = () => {
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
                            backgroundImage: 'url(/partners.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                 
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Célébrons la Collaboration</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Propulsez votre agence ou votre activité de freelance vers de nouveaux sommets. Devez partenaire officiel IHOST et accédez à des remises exclusives et un support d'élite.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Rejoindre le Programme <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Un Écosystème Dédié aux Pros</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Nous fournissons la puissance, vous créez l'innovation. Un partenariat gagnant-gagnant.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {[
                                { icon: Users, title: "Revendeurs Hosting", desc: "Opérez votre propre structure d'hébergement en marque blanche. Fixez vos propres prix et générez des revenus récurrents.", color: "#1E6BFF" },
                                { icon: Briefcase, title: "Agences Web", desc: "Hébergez tous vos projets sur une infrastructure infaillible. Regroupez votre facturation et profitez d'outils de gestion de parc.", color: "#8b5cf6" },
                                { icon: Code, title: "Développeurs & Freelances", desc: "Fournissez un service 'clé en main' de la création au déploiement. Touchez des commissions sur chaque achat d'infrastructure.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '4rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    borderTop: `6px solid ${item.color}`,
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
                                        marginBottom: '2rem'
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Avantages Partenaires Exclusifs</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Plus que de l'hébergement, un véritable levier de croissance pour votre entreprise.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={BadgePercent} title="Marges Confortables" desc="Accédez à des remises volumétriques allant jusqu'à -40% sur l'ensemble de notre catalogue (Serveurs, Cloud, Domaines)." />
                            <LuxeCard icon={TrendingUp} title="Business Prévisible" desc="Transformez vos dépenses d'infrastructure en un centre de profit hautement rentable grâce à nos modèles de facturation flexibles." />
                            <LuxeCard icon={Presentation} title="Accès Early-Bird" desc="Soyez les premiers à tester et proposer nos nouvelles technologies Cloud à vos clients pour devancer la concurrence." />
                            <LuxeCard icon={Handshake} title="Support VIP Dédié" desc="Accès direct sans attente à nos ingénieurs de niveau 3. Nous intervenons en marque blanche pour résoudre vos incidents complexes." />
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Outils de Gestion Unifiés</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3rem' }}>
                                    Votre espace partenaire IHOST vous offre une console centralisée pour gérer des centaines de comptes clients, serveurs et domaines. Facturation, provisioning et monitoring, tout est à portée de clic.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Console Multi-Tenant",
                                        "API de Provisioning",
                                        "Facturation Consolidée",
                                        "Rapports de Performance"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 3.5rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Explorer le portail</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    background: 'white',
                                    padding: '4rem',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center'
                                }}>
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
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Bâtissons le succès ensemble</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Rejoignez plus de 500 agences et partenaires qui ont déjà choisi l'excellence technique IHOST pour leurs projets.
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
