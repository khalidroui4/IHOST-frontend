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
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/buisness.jfif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Collaboration Sans Limites</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Propulsez votre équipe vers l'excellence avec une plateforme d'emailing qui favorise le partage, la cohésion et la productivité au quotidien.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Passer au niveau Business <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>L'Espace de Travail de Demain</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des outils de collaboration sophistiqués pour transformer votre communication d'entreprise en un moteur de croissance.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Calendar} title="Calendriers Partagés" desc="Visualisez les disponibilités de toute votre équipe en un coup d'œil. Planifiez des réunions sans allers-retours interminables." />
                            <LuxeCard icon={Users} title="Répertoires Unifiés" desc="Un carnet d'adresses centralisé contenant tous vos collaborateurs et partenaires stratégiques, accessible d'un clic." />
                            <LuxeCard icon={Network} title="Listes de Diffusion" desc="Créez des groupes illimités (support@, ventes@). Une gestion simplifiée pour une communication client fluide." />
                            <LuxeCard icon={Shield} title="Gouvernance de Données" desc="Audit complet des accès, archivage légal et contrôles de sécurité granulaires pour protéger votre patrimoine informationnel." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Fait pour les grands projets</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une infrastructure évolutive qui s'adapte à la structure complexe de votre organisation.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.4s ease'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: '#3b82f6',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Replace size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Gestion d'Administration Centralisée</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Prenez le contrôle total de votre écosystème numérique. Ajoutez des utilisateurs, gérez les quotas, et configurez les alias depuis une interface unique pensée pour les DSI.
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.4s ease'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Smartphone size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Synchronisation PUSH Native</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Ne manquez jamais un message crucial. Profitez d'une synchronisation ultra-rapide des emails, contacts et tâches sur Outlook, Apple Mail, Gmail et toutes les apps mobiles IMAP/ActiveSync.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi IHOST Business ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'alternative professionnelle aux solutions complexes.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Share2} title="Zéro Conflit DNS" desc="Migration technique assistée par nos administrateurs système pour garantir une transition fluide." />
                            <LuxeCard icon={Target} title="Délivrabilité Boostée" desc="Utilisation de clusters IP premium pour s'assurer que vos messages n'atterrissent jamais en SPAM." />
                            <LuxeCard icon={Shield} title="Archives Illimitées" desc="Gardez une trace de toutes les communications de l'entreprise avec nos options d'archivage automatique." />
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Besoins d'une solution sur-mesure ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Pour les besoins spécifiques excédant 500 boîtes mail, nos consultants Enterprise élaborent avec vous une infrastructure dédiée.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#3b82f6',
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
