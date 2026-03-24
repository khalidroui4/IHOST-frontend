import React from 'react';
import { Mail, Globe, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, Zap, Database, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import TechPricingCard from '../../components/TechPricingCard';

const ProfessionalEmail = () => {
    const plans = [
        {
            id: '#MAIL-PRO-1',
            name: 'STARTER PRO',
            price: '29',
            period: 'DH / HT / MOIS',
            highlight: false,
            features: [
                { label: '5 Comptes Email', tech: 'SSD Sync' },
                { label: '5 GB Stockage', tech: 'Per Box' },
                { label: 'Webmail Premium', tech: 'Pro Interface' },
                { label: 'Anti-spam & Virus', tech: 'Standard' },
                { label: 'Support 24/7', tech: 'SLA 99.9%' }
            ]
        },
        {
            id: '#MAIL-BIZ-X',
            name: 'BUSINESS ELITE',
            price: '59',
            period: 'DH / HT / MOIS',
            highlight: true,
            badge: 'PERFORMANCE MAX',
            features: [
                { label: '20 Comptes Premium', tech: 'Priority' },
                { label: '20 GB Stockage', tech: 'High-Perf' },
                { label: 'Sync IMAP/POP', tech: 'Universal' },
                { label: 'Anti-spam AI', tech: 'Smart-Filter' },
                { label: 'Contacts Partagés', tech: 'Sync-Hub' }
            ]
        },
        {
            id: '#MAIL-ENT-INF',
            name: 'ENTERPRISE CLOUD',
            price: '99',
            period: 'DH / HT / MOIS',
            highlight: false,
            features: [
                { label: 'Comptes Illimités', tech: 'Scale-Free' },
                { label: '50 GB Stockage', tech: 'Enterprise' },
                { label: 'Sécurité Bancaire', tech: 'AES-256' },
                { label: 'Backup Quotidien', tech: 'Off-site' },
                { label: 'Account Manager', tech: 'Dedicated' }
            ]
        }
    ];

    return (
        <PageTransition>
            <div className="email-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/email3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>ARCHITECTURE DE COMMUNICATION PRO</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Renforcez votre autorité numérique avec une infrastructure email souveraine. Performance, confidentialité absolue et synchronisation instantanée sur tous vos terminaux.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>INITIALISER MON SERVICE MAIL <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>L'Ingénierie de Messagerie</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un socle technologique robuste conçu pour l'intégrité de vos données.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Globe} title="Identité Souveraine" desc="Communiquez avec une adresse professionnelle qui renforce votre crédibilité institutionnelle." />
                            <LuxeCard icon={Smartphone} title="Synchronisation Mobile" desc="Accès universel via protocoles sécurisés. Compatibilité native iOS, Android et Desktop." />
                            <LuxeCard icon={ShieldCheck} title="Protocoles Anti-Spam" desc="Nettoyage chirurgical à la source. Éliminez 99.9% des vecteurs d'intrusion avant réception." />
                            <LuxeCard icon={Zap} title="Latence Zéro" desc="Flux de données optimisé pour un envoi et une réception ultra-rapide sur l'infrastructure IHOST." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Forfaits de Communication</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Solutions scalables calibrées pour chaque étape de votre développement d'entreprise.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                            {plans.map((plan, index) => (
                                <TechPricingCard
                                    key={index}
                                    name={plan.name}
                                    price={plan.price}
                                    period={plan.period}
                                    features={plan.features.map(f => f.label)}
                                    highlight={plan.highlight}
                                    badge={plan.badge}
                                    buttonText="SÉLECTIONNER"
                                    buttonLink="/signup"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ padding: '4rem 0' }}>
                    <div className="container-luxe">
                        <div className="bg-tech-dark" style={{
                            padding: '5rem',
                            display: 'flex',
                            gap: '4rem',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.1 }} />
                            <div style={{ flex: 1.5, position: 'relative', zIndex: 1 }}>
                                <h2 className="font-tech" style={{ fontSize: '3.5rem', color: 'white', marginBottom: '2rem', textTransform: 'uppercase' }}>PUISSANCE COLLABORATIVE</h2>
                                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8' }}>
                                    Libérez le potentiel de votre équipe avec des outils mail conçus pour la performance. Centralisez vos calendriers et sécurisez vos protocoles d'échange.
                                </p>
                            </div>
                            <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div className="glass-card" style={{ padding: '2rem', flex: 1, minWidth: '200px' }}>
                                    <Database size={24} color="#1E6BFF" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>STOCKAGE HAUT-DÉBIT</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>NVMe Data-Center</p>
                                </div>
                                <div className="glass-card" style={{ padding: '2rem', flex: 1, minWidth: '200px' }}>
                                    <Lock size={24} color="#10b981" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>CONFIDENTIALITÉ</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Encryption End-to-End</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="glass-card" style={{
                            padding: '6rem',
                            textAlign: 'center',
                            background: '#0B1F3A',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid #1E6BFF'
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.1 }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 className="font-tech" style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2.5rem', textTransform: 'uppercase' }}>EXPAND YOUR REACH</h2>
                                <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4.5rem', maxWidth: '800px', margin: '0 auto 4.5rem' }}>
                                    Amorcez votre transformation numérique dès aujourd'hui avec nos solutions de messagerie haute disponibilité.
                                </p>
                                <Link to="/email-collaboration/google-workspace" className="btn btn-primary" style={{
                                    padding: '1.4rem 6rem',
                                    fontSize: '1rem',
                                    background: '#00C2FF',
                                    color: '#0B1F3A'
                                }}>
                                    ACTIVER GOOGLE WORKSPACE <ArrowRight size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default ProfessionalEmail;
