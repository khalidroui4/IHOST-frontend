import React from 'react';
import { Award, ShieldCheck, CheckSquare, FileKey, Shield, Scale, ArrowRight, Zap, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const Certifications = () => {
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
                            backgroundImage: 'url(/certifications.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                 
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Excellence Certifiée</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Nous ne nous contentons pas de promettre la sécurité, nous la prouvons. IHOST s'appuie sur les standards internationaux les plus exigeants pour garantir l'intégrité de vos données.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Nos Rapports d'Audit <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Standards de Sécurité Internationaux</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des audits rigoureux et réguliers par des organismes tiers indépendants.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {[
                                {
                                    icon: Award,
                                    title: "ISO/IEC 27001:2022",
                                    color: "#1E6BFF",
                                    desc: "La norme d'excellence pour le Management de la Sécurité de l'Information (ISMS). Cette certification atteste de la mise en œuvre de processus stricts pour protéger vos données contre toute perte, vol ou altération, tant sur le plan physique que logique.",
                                    points: ["Gestion des risques proactive", "Protection physique des DC", "Sécurité des réseaux et systèmes"]
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Conformité RGPD / GDPR",
                                    color: "#10b981",
                                    desc: "Nous respectons scrupuleusement le Règlement Général sur la Protection des Données. Bien que basés au Maroc, nos architectures permettent de traiter les données de vos utilisateurs européens en toute légalité et transparence.",
                                    points: ["Droit à l'oubli assuré", "Traitement des données chiffré", "DPA contractuel strict"]
                                }
                            ].map((cert, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    gap: '4rem',
                                    alignItems: 'center',
                                    background: 'white',
                                    padding: '5rem',
                                    borderRadius: '48px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '140px',
                                        height: '140px',
                                        background: `${cert.color}10`,
                                        borderRadius: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        border: `2px solid ${cert.color}20`
                                    }}>
                                        <cert.icon size={60} color={cert.color} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>{cert.title}</h3>
                                        <p style={{ color: '#4B5563', lineHeight: '1.8', fontSize: '1.2rem', marginBottom: '2.5rem' }}>{cert.desc}</p>
                                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                            {cert.points.map((p, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#0B1F3A', fontSize: '0.95rem' }}>
                                                    <CheckCircle2 size={18} color="#10b981" /> {p}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Engagements Complémentaires</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>La sécurité n'est pas un état, c'est un processus continu.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={CheckSquare} title="Pentesters Externes" desc="Des sociétés de cybersécurité indépendantes effectuent des tests d'intrusion trimestriels sur toute notre infrastructure logicielle." />
                            <LuxeCard icon={FileKey} title="TLS 1.3 & Chiffrement" desc="Toutes nos communications API et panneaux de gestion sont chiffrés avec les dernières suites cryptographiques de pointe." />
                            <LuxeCard icon={Shield} title="Protection SOC 24/7" desc="Notre Security Operations Center surveille en permanence nos backbones réseaux pour détecter toute anomalie immédiatement." />
                            <LuxeCard icon={Scale} title="Conformité PCI-DSS" desc="Nos architectures sont conçues pour faciliter votre mise en conformité avec les standards de paiement bancaire." />
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Transparence Infaillible</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Nous mettons à disposition de nos clients Premium et Entreprise l'accès complet à nos rapports d'audit et à nos plans de continuité d'activité (PCA/PRA). Parce que votre confiance se mérite chaque jour.
                                </p>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Espace Conformité</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '4rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center'
                                }}>
                                    <ShieldCheck size={100} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Sceau IHOST</h3>
                                    <p style={{ color: '#4B5563', fontSize: '1.1rem' }}>Hébergement Certifié & Audité</p>
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
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Prêt pour un hébergement serein ?</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Ne laissez plus la sécurité de vos données au hasard. Choisissez le partenaire certifié qui place votre protection au cœur de son ADN.
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
                                Parler à un Expert Compliance <ArrowRight size={26} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Certifications;
