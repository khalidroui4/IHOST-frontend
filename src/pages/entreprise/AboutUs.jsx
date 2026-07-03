import React from 'react';
import PageTransition from '../../pageTransition';
import { Users, Shield, Zap, Globe, Heart, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LuxeCard from '../../components/LuxeCard';

const AboutUs = () => {
    return (
        <PageTransition>
            <div className="about-page">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-background" style={{ 
                        background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', 
                        position: 'relative', 
                        border: '1px solid rgba(255,255,255,0.1)' 
                    }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="container-luxe hero-content" style={{ zIndex: 10, padding: '8rem 2rem' }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '4rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 900 }}>
                                    À PROPOS D'IHOST
                                </h1>
                                <p className="hero-subtext" style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', marginBottom: '3rem', lineHeight: '1.8', fontWeight: 400 }}>
                                    Pionnier de l'hébergement web et de l'enregistrement de domaines de nouvelle génération. Nous concevons les infrastructures souveraines de demain.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nos valeurs Section */}
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-1px' }}>
                                Nos Valeurs Fondamentales
                            </h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                                Des principes rigoureux qui orientent chacune de nos décisions technologiques et humaines.
                            </p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard variant="dark" icon={Shield} title="Intégrité & Sécurité" desc="Vos données sont sacrées. Nous mettons en œuvre les normes d'encryptions les plus rigoureuses et des systèmes de backup redondants." />
                            <LuxeCard variant="dark" icon={Zap} title="Innovation Continue" desc="Serveurs NVMe haute performance, réseau à latence ultra-faible et architectures auto-évolutives : nous gardons une longueur d'avance." />
                            <LuxeCard variant="dark" icon={Users} title="Humain Avant Tout" desc="Pas de chatbots robots pour les urgences. Notre équipe technique est composée d'experts locaux prêts à intervenir en direct." />
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                                Envie de propulser vos projets web ?
                            </h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                                Découvrez nos offres d'hébergement ou contactez notre équipe pour concevoir une solution sur-mesure répondant à vos exigences.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/pricing" className="btn" style={{
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
                                    Voir nos Tarifs <ArrowRight size={22} />
                                </Link>
                                <Link to="/contact" className="btn btn-secondary" style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    padding: '1.2rem 3rem',
                                    borderRadius: '100px',
                                    fontWeight: 800,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    textDecoration: 'none'
                                }}>
                                    Nous Contacter
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default AboutUs;
