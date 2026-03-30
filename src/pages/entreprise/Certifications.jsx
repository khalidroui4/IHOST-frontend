import React from 'react';
import { Award, ShieldCheck, CheckSquare, FileKey, Shield, Scale, ArrowRight, Zap, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './Certifications.css';

const Certifications = () => {
    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/certifications.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Excellence Certifiée</h1>
                                <p className="hero-description">Nous ne nous contentons pas de promettre la sécurité, nous la prouvons. IHOST s'appuie sur les standards internationaux les plus exigeants pour garantir l'intégrité de vos données.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Nos Rapports d'Audit <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Standards de Sécurité Internationaux</h2>
                            <p className="section-subtitle">Des audits rigoureux et réguliers par des organismes tiers indépendants.</p>
                        </div>
                        <div className="cert-list">
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
                                <div key={idx} className="cert-card hover-lift">
                                    <div className="cert-icon-wrapper" style={{ background: `${cert.color}10`, border: `2px solid ${cert.color}20` }}>
                                        <cert.icon size={60} color={cert.color} />
                                    </div>
                                    <div>
                                        <h3 className="cert-title">{cert.title}</h3>
                                        <p className="cert-desc">{cert.desc}</p>
                                        <div className="cert-points">
                                            {cert.points.map((p, i) => (
                                                <div key={i} className="cert-point">
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

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Engagements Complémentaires</h2>
                            <p className="section-subtitle">La sécurité n'est pas un état, c'est un processus continu.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={CheckSquare} title="Pentesters Externes" desc="Des sociétés de cybersécurité indépendantes effectuent des tests d'intrusion trimestriels sur toute notre infrastructure logicielle." />
                            <LuxeCard icon={FileKey} title="TLS 1.3 & Chiffrement" desc="Toutes nos communications API et panneaux de gestion sont chiffrés avec les dernières suites cryptographiques de pointe." />
                            <LuxeCard icon={Shield} title="Protection SOC 24/7" desc="Notre Security Operations Center surveille en permanence nos backbones réseaux pour détecter toute anomalie immédiatement." />
                            <LuxeCard icon={Scale} title="Conformité PCI-DSS" desc="Nos architectures sont conçues pour faciliter votre mise en conformité avec les standards de paiement bancaire." />
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="transparency-container">
                            <div className="transparency-content">
                                <h2 className="transparency-title">Transparence Infaillible</h2>
                                <p className="transparency-desc">
                                    Nous mettons à disposition de nos clients Premium et Entreprise l'accès complet à nos rapports d'audit et à nos plans de continuité d'activité (PCA/PRA). Parce que votre confiance se mérite chaque jour.
                                </p>
                                <button className="btn btn-wrap-fix">Espace Conformité</button>
                            </div>
                            <div className="transparency-visual">
                                <div className="transparency-visual-box">
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
                        <div className="cta-container">
                            <h2 className="cta-title">Prêt pour un hébergement serein ?</h2>
                            <p className="cta-desc">
                                Ne laissez plus la sécurité de vos données au hasard. Choisissez le partenaire certifié qui place votre protection au cœur de son ADN.
                            </p>
                            <Link to="/contact" className="btn cta-link">
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
