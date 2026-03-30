import React from 'react';
import { Lock, Cpu, Eye, UserCheck, ShieldCheck, MailWarning, Network, ArrowRight, ShieldAlert, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const EmailSecurity = () => {
    return (
        <PageTransition>
            <div className="email-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/email_ssecurity.jfif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Forteresse de Communication</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Équipez votre entreprise d'une défense cybernétique de pointe. Chiffrement, détection des menaces et authentification forte pour chaque message envoyé.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Plan de Sécurité <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Défense Multicouche Avancée</h2>
                            <p style={{ fontSize: '1.1rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une approche globale de la sécurité email pour neutraliser les menaces avant qu'elles ne s'infiltrent dans votre organisation.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Cpu} title="Protection Malware" desc="Analyse comportementale et scans rigoureux des pièces jointes pour identifier les ransomwares et chevaux de Troie." />
                            <LuxeCard icon={Lock} title="Chiffrement Fort" desc="Protocoles PGP/TLS bout-en-bout pour garantir que vos secrets industriels et contrats ne soient lus que par leurs destinataires." />
                            <LuxeCard icon={Eye} title="Surveillance 24/7" desc="Un centre opérationnel de sécurité (SOC) veille sur l'intégrité de vos flux de communication en temps réel." />
                            <LuxeCard icon={UserCheck} title="Authentification SPF/DKIM" desc="Configuration complète des enregistrements de légitimité pour éradiquer l'usurpation d'identité de votre marque." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi la sécurité est vitale ?</h2>
                            <p style={{ fontSize: '1.1rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Comprendre les risques pour mieux les anticiper.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                            <div className="threat-row hover-lift" style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: '#fff5f5',
                                padding: '3.5rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #fee2e2',
                                transition: 'all 0.3s ease-in-out'
                            }}>
                                <div className="threat-row-icon" style={{
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
                                    <MailWarning size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ color: '#991b1b', marginBottom: '1rem', fontWeight: 800 }}>Prévention Contre l'Espionnage</h3>
                                    <p style={{ color: '#b91c1c', lineHeight: '1.8', margin: 0, opacity: 0.9 }}>
                                        L'interception de communications sensibles (RIB, devis, contrats) est la menace n°1. Notre chiffrement de niveau militaire rend vos données totalement illisibles en cas de détournement.
                                    </p>
                                </div>
                            </div>

                            <div className="threat-row hover-lift" style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: '#f0fdf4',
                                padding: '3.5rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                border: '1px solid #dcfce7',
                                transition: 'all 0.3s ease-in-out'
                            }}>
                                <div className="threat-row-icon" style={{
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
                                    <Network size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ color: '#166534', marginBottom: '1rem', fontWeight: 800 }}>Imperméabilité au Phishing</h3>
                                    <p style={{ color: '#15803d', lineHeight: '1.8', margin: 0, opacity: 0.9 }}>
                                        Nos filtres analysent l'origine et la réputation des serveurs pour détecter les domaines frauduleux imitant votre banque ou vos partenaires, protégeant vos employés de l'erreur humaine.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Outils de Sécurité Inclus</h2>
                            <p style={{ fontSize: '1.1rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>La panoplie complète pour votre tranquillité d'esprit.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={ShieldAlert} title="Alerte Intrusion" desc="Notification immédiate par SMS ou appel en cas de connexion suspecte depuis une IP géographique inhabituelle." />
                            <LuxeCard icon={Zap} title="Filtrage Sortant" desc="Bloque automatiquement l'envoi d'emails si votre compte semble avoir été piraté, protégeant votre réputation." />
                            <LuxeCard icon={ShieldCheck} title="Backup Immuable" desc="Vos emails sécurisés sont sauvegardés dans des coffres-forts numériques chiffrés et physiquement isolés." />
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '4rem 1rem' }}>
                    <div className="container-luxe">
                        <div className="email-cta-box" style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '32px',
                            padding: '4rem 2.5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Dormez tranquille, IHOST veille</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
                                Ne laissez pas la sécurité de votre entreprise au hasard. Contactez nos auditeurs pour un bilan de sécurité complet.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#3b82f6',
                                padding: '1rem 2.5rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Évaluer Ma Sécurité <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default EmailSecurity;
