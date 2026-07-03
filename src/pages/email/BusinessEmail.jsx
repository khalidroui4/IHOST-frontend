import React from 'react';
import { Users, Calendar, Replace, Shield, Network, Smartphone, ArrowRight, Share2, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const BusinessEmail = () => {
    return (
        <PageTransition>
            <div className="email-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/buisness.jfif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.35, zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Collaboration Sans Limites</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Propulsez votre équipe vers l'excellence avec une plateforme d'emailing qui favorise le partage, la cohésion et la productivité au quotidien.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/contact" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem', textDecoration: 'none' }}>Passer au niveau Business <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fait pour les grands projets Section */}
                <section className="section-premium" style={{ 
                    padding: '8rem 2rem', 
                    textAlign: 'center', 
                    background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                    position: 'relative'
                }}>
                    <div className="pattern-grid-tech" style={{ opacity: 0.08 }} />
                    <div className="container-luxe" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-1px' }}>Fait pour les grands projets</h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une infrastructure évolutive qui s'adapte à la structure complexe de votre organisation.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(12px)',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                transition: 'all 0.4s ease'
                            }} className="hover-lift reseller-feature-card">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    color: '#ffffff',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Replace size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }} className="reseller-feature-content">
                                    <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>Gestion d'Administration Centralisée</h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Prenez le contrôle total de votre écosystème numérique. Ajoutez des utilisateurs, gérez les quotas, et configurez les alias depuis une interface unique pensée pour les DSI.
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(12px)',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                transition: 'all 0.4s ease'
                            }} className="hover-lift reseller-feature-card">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    color: '#ffffff',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Smartphone size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }} className="reseller-feature-content">
                                    <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '1rem', fontWeight: 800 }}>Synchronisation PUSH Native</h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Ne manquez jamais un message crucial. Profitez d'une synchronisation ultra-rapide des emails, contacts et tâches sur Outlook, Apple Mail, Gmail et toutes les apps mobiles IMAP/ActiveSync.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pourquoi IHOST Section */}
                <section className="section-premium" style={{ 
                    padding: '8rem 2rem', 
                    textAlign: 'center', 
                    background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                }}>
                    <div className="pattern-grid-tech" style={{ opacity: 0.08 }} />
                    <div className="container-luxe" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi IHOST Business ?</h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'alternative professionnelle aux solutions complexes.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard variant="dark" icon={Share2} title="Zéro Conflit DNS" desc="Migration technique assistée par nos administrateurs système pour garantir une transition fluide." />
                            <LuxeCard variant="dark" icon={Target} title="Délivrabilité Boostée" desc="Utilisation de clusters IP premium pour s'assurer que vos messages n'atterrissent jamais en SPAM." />
                            <LuxeCard variant="dark" icon={Shield} title="Archives Illimitées" desc="Gardez une trace de toutes les communications de l'entreprise avec nos options d'archivage automatique." />
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
                            position: 'relative',
                            overflow: 'hidden'
                        }} className="email-cta-box">
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Besoins d'une solution sur-mesure ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Pour les besoins spécifiques excédant 500 boîtes mail, nos consultants Enterprise élaborent avec vous une infrastructure dédiée.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#1E6BFF',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Parler à un expert <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default BusinessEmail;
