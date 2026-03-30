import React from 'react';
import { ShieldAlert, Fingerprint, EyeOff, SearchCheck, GlobeLock, BookUser, ArrowRight, Zap, CheckCircle2, ShieldHalf } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './BrandProtection.css';

const BrandProtection = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background hero-background-orange">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/brand2.webp)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Sanctuarisez Votre Marque</h1>
                                <p className="hero-description">Identifiez, surveillez et éliminez les contrefaçons, le phishing et les atteintes à votre réputation. Nous sommes les gardiens de votre capital confiance sur le web.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Audit de Risque Marque <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Défenses Contre l'Usurpation</h2>
                            <p className="section-subtitle">Un écosystème de surveillance active pour contrer les fraudes liées à votre identité numérique.</p>
                        </div>
                        <div className="brand-grid">
                            {[
                                { icon: GlobeLock, title: "Anti-Typosquatting", desc: "Scan permanent des nouveaux domaines déposés (ex: amaz0n.com) pour détourner vos clients. Intervention légale ultra-rapide.", color: '#1E6BFF' },
                                { icon: Fingerprint, title: "Détection Phishing IA", desc: "Identification proactive des sites copiant votre charte graphique pour voler les identifiants de vos utilisateurs légitimes.", color: "#ec4899" },
                                { icon: BookUser, title: "E-Réputation 24/7", desc: "Analyse des sentiments sur forums, réseaux sociaux et plateformes d'avis pour contrer les campagnes de dénigrement massives.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} className="brand-card hover-lift">
                                    <div className="brand-icon-wrapper" style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 className="brand-card-title">{item.title}</h3>
                                    <p className="brand-card-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi Protéger Sa Marque ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Votre image est votre actif le plus précieux. Ne le laissez pas sans surveillance.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={ShieldAlert} title="Prévention Fraude" desc="Stoppez les escrocs avant qu'ils ne ciblent vos clients avec de fausses promotions ou des produits contrefaits." />
                            <LuxeCard icon={EyeOff} title="Takedown Express" desc="Processus légaux (DMCA, UDRP) accélérés pour forcer les hébergeurs à supprimer le contenu illicite en moins de 24h." />
                            <LuxeCard icon={SearchCheck} title="Protection Revenus" desc="Assurez-vous que le trafic organique destiné à votre marque ne soit pas siphonné par des acteurs malveillants." />
                            <LuxeCard icon={ShieldHalf} title="Confidentialité" desc="Surveillance du Dark Web pour détecter les fuites de données clients ou de secrets industriels liés à votre marque." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="legal-container">
                            <div className="legal-content">
                                <h2 className="legal-title">Assistance Légale & Technique</h2>
                                <p className="legal-description">
                                    Nous ne nous contentons pas de détecter. Nos juristes spécialisés en propriété intellectuelle et nos ingénieurs sécurité travaillent main dans la main pour neutraliser les menaces et engager les procédures de récupération nécessaires.
                                </p>
                                <div className="legal-grid">
                                    {[
                                        "Rapports Juridiques Certifiés",
                                        "Mise en Demeure Automatisée",
                                        "Récupération de Domaines",
                                        "Veille Logo & Copyright"
                                    ].map((benefit, i) => (
                                        <div key={i} className="legal-item">
                                            <CheckCircle2 size={24} color="#10b981" /> {benefit}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn legal-btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white', fontSize: '1.1rem' }}>Contacter un Consultant Brand</button>
                            </div>
                            <div className="legal-visual-wrapper">
                                <div className="legal-visual-card">
                                    <ShieldAlert size={120} color="#ec4899" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem' }}>Alerte Rouge</h3>
                                    <p style={{ opacity: 0.6, fontSize: '1.1rem' }}>Réponse rapide aux crises de réputation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Ne laissez pas votre image au hasard</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Des milliers de marques sont la cible de fraudes chaque jour. Assurez-vous d'être parmi celles qui sont préparées.
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
                                Sécuriser Ma Marque <ArrowRight size={28} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default BrandProtection;
