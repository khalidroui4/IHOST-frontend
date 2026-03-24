import React from 'react';
import { Mail as Gmail, HardDrive as GoogleDrive, Video as GoogleMeet, FileText as GoogleDocs, Cloud, MonitorSmartphone, Share2, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const GoogleWorkspace = () => {
    return (
        <PageTransition>
            <div className="email-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/work.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>L'Innovation au Travail</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Propulsez votre équipe vers de nouveaux sommets avec Google Workspace. Les outils que vous aimez, certifiés pour votre entreprise.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Passer à Workspace <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>L'Écosystème de Productivité N°1</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une suite d'outils intelligents et interconnectés pour collaborer, créer et communiquer sans frontières.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
                            {[
                                { icon: Gmail, title: "Gmail Professionnel", desc: "La fluidité de Gmail sans publicité, avec votre nom de domaine personnalisé.", color: "#ea4335" },
                                { icon: GoogleDrive, title: "Google Drive", desc: "Stockage cloud sécurisé pour centraliser et partager vos fichiers en toute sécurité.", color: "#34a853" },
                                { icon: GoogleMeet, title: "Google Meet", desc: "Visioconférences HD sécurisées pour connecter vos équipes, peu importe où elles se trouvent.", color: "#4285f4" },
                                { icon: GoogleDocs, title: "Docs / Sheets / Slides", desc: "Création collaborative en temps réel pour des documents toujours à jour.", color: "#fbbc05" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'center',
                                    padding: '3.5rem 2rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
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
                                        margin: '0 auto 2rem',
                                        border: `1px solid ${item.color}20`
                                    }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1rem', color: '#4B5563', lineHeight: '1.7' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi via IHOST ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Bénéficiez de la puissance de Google avec le support et l'assistance de proximité d'IHOST.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Share2} title="Collaboration Native" desc="Travaillez simultanément sur les mêmes projets. Finis les multiples fichiers 'version finale_v2'." />
                            <LuxeCard icon={Cloud} title="Stockage Infini" desc="Profitez d'options de stockage cloud massives pour vos archives et vos documents haute résolution." />
                            <LuxeCard icon={MonitorSmartphone} title="Omniprésence Digitale" desc="Une expérience parfaitement fluide entre votre ordinateur, votre tablette et votre smartphone." />
                            <LuxeCard icon={ShieldCheck} title="Sécurité Google" desc="Bénéficiez du machine learning de Google pour bloquer proactivement les menaces et le phishing." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem',
                            background: '#F5F7FA',
                            padding: '5rem',
                            borderRadius: '40px',
                            border: '1px solid rgba(11, 31, 58, 0.1)'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Migration en Toute Sérénité</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Nos ingénieurs certifiés Google Cloud vous accompagnent dans le transfert de vos données actuelles (emails, Drive) vers Google Workspace sans aucune minute d'interruption.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Importation d'historique email",
                                        "Configuration DNS simplifiée",
                                        "Formation de vos administrateurs",
                                        "Support 24/7 en français/arabe"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: '#0B1F3A' }}>
                                            <CheckCircle2 size={20} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{
                                    background: 'white',
                                    padding: '4rem',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    display: 'inline-block'
                                }}>
                                    <Zap size={60} color="#ea4335" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Démarrez en 5 minutes</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Activation immédiate de vos licences Workspace.</p>
                                    <button className="btn" style={{ background: '#4285f4', color: 'white', padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800, border: 'none' }}>Activer Mes Licences</button>
                                </div>
                            </div>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Google Workspace + IHOST Support</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Profitez du meilleur de la technologie Google avec un accompagnement local de premier ordre.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#4285f4',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Parler à un conseiller <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default GoogleWorkspace;
