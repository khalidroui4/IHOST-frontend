import React from 'react';
import { Code, FileBadge, LockKeyhole, MonitorCheck, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const CodeSigning = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0EA5E9 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/security-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Authenticité de Votre Code</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Certifiez vos logiciels, scripts et exécutables pour offrir une expérience d'installation fluide et sécurisée à vos utilisateurs finaux.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Signer Mon Code <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #00C2FF', borderLeft: '2px solid #00C2FF', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #00C2FF', borderRight: '2px solid #00C2FF', opacity: 0.3 }} />
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Éliminez la Peur du Téléchargement</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Transformez les avertissements de sécurité en gages de confiance pour booster vos volumes d'installation.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: '#fff5f5',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #fee2e2',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: '#ef4444',
                                    color: 'white',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <AlertTriangle size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#991b1b', marginBottom: '1rem', fontWeight: 800 }}>Sans Signature Code Signing</h3>
                                    <p style={{ color: '#b91c1c', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Des alertes stressantes comme "Éditeur Inconnu" ou "SmartScreen bloqué" s'affichent, dissuadant 80% des utilisateurs de poursuivre l'installation de votre application.
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: '#f0fdf4',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #dcfce7',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: '#10b981',
                                    color: 'white',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <MonitorCheck size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#166534', marginBottom: '1rem', fontWeight: 800 }}>Avec Code Signing IHOST</h3>
                                    <p style={{ color: '#15803d', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        L'expérience est limpide. Votre nom d'entreprise apparaît fièrement comme éditeur vérifié. Windows, macOS et les navigateurs reconnaissent votre code comme sain et légitime.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Puissance Technique &amp; Légitimité</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'outil indispensable pour tout éditeur de logiciel professionnel.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Code} title="Compatibilité Multi-OS" desc="Signez nativement pour Windows (.exe, .msi), macOS (.app), Java (.jar) et bien d'autres environnements." />
                            <LuxeCard icon={LockKeyhole} title="Hash Inaltérable" desc="Si un octet de votre code est modifié après la signature, le certificat devient invalide, protégeant l'utilisateur final." />
                            <LuxeCard icon={FileBadge} title="Réputation Immédiate" desc="Accélérez votre gain de confiance avec Microsoft SmartScreen en utilisant nos certificats EV de haut niveau." />
                            <LuxeCard icon={ShieldCheck} title="Horodatage (Timestamp)" desc="Vos signatures restent valides indéfiniment, même après l'expiration du certificat de signature lui-même." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#F5F7FA',
                            padding: '5rem',
                            borderRadius: '40px',
                            border: '1px solid rgba(11, 31, 58, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Protégez l'image de votre marque</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Chaque logiciel non signé est une opportunité pour les cybercriminels d'injecter du code malveillant au nom de votre entreprise. Prenez vos responsabilités d'éditeur dès aujourd'hui.
                                </p>
                                <button className="btn" style={{ padding: '1.2rem 3rem', borderRadius: '100px', fontWeight: 800 }}>Demander Ma Signature</button>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{
                                    background: 'white',
                                    padding: '4rem',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    display: 'inline-block'
                                }}>
                                    <Zap size={60} color="#f59e0b" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Support Développeur</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Guides pour Visual Studio, Xcode et CLI.</p>
                                    <button className="btn btn-outline" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Documentation API</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Éditez en toute sécurité</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Donnez à vos applications la légitimité qu'elles méritent. Nos certificats Code Signing sont reconnus mondialement.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#0ea5e9',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Parler à un Expert Technique <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default CodeSigning;
