import { FileText, ChevronRight, Scale, Shield, CreditCard, HelpCircle, Download, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './LegalDocuments.css';

const LegalDocuments = () => {
    const docs = [
        { title: 'Conditions Générales (CGS)', icon: Scale, desc: 'Le contrat cadre régissant l\'utilisation globale de nos infrastructures et services Cloud.', color: '#1E6BFF' },
        { title: 'Politique de Confidentialité', icon: Shield, desc: 'Comment nous collectons, stockons et protégeons vos données personnelles selon la loi.', color: '#10b981' },
        { title: 'Garanties & Remboursements', icon: CreditCard, desc: 'Conditions de garantie "Satisfait ou Remboursé", délais de rétractation et modalités d\'annulation.', color: '#8b5cf6' },
        { title: 'Charte d\'Utilisation (AUP)', icon: HelpCircle, desc: 'Règles de déontologie, interdiction du spam, malwares et contenus illégaux sur notre réseau.', color: '#f59e0b' }
    ];

    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Cadre Légal & <br />Transparence</h1>
                                <p className="hero-description">
                                    Consultez nos conditions de service et nos politiques de confidentialité.
                                    Nous bâtissons une relation de confiance basée sur des engagements contractuels clairs.
                                </p>
                                <div className="hero-buttons" style={{ justifyContent: 'center' }}>
                                    <button className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Centre de Conformité</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Documents de Référence</h2>
                            <p className="section-subtitle">
                                L'ensemble des textes encadrant légalement votre utilisation d'IHOST.
                            </p>
                        </div>
                        <div className="docs-list">
                            {docs.map((doc, idx) => (
                                <div key={idx} className="doc-card hover-lift">
                                    <div className="doc-icon-wrapper" style={{ background: `${doc.color}10`, color: doc.color, border: `1px solid ${doc.color}20` }}>
                                        <doc.icon size={32} />
                                    </div>
                                    <div className="doc-content">
                                        <h3 className="doc-title">{doc.title}</h3>
                                        <p className="doc-desc">{doc.desc}</p>
                                    </div>
                                    <div className="doc-actions">
                                        <button className="doc-download-btn hover-lift" title="Télécharger PDF">
                                            <Download size={20} />
                                        </button>
                                        <div className="doc-arrow">
                                            <ChevronRight size={24} />
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
                            <h2 className="section-title">Engagements au Service du Client</h2>
                            <p className="section-subtitle">
                                Au-delà du cadre légal, nos promesses de performance.
                            </p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Shield} title="Protection des Données" desc="Audit semestriel de nos méthodes de stockage and de chiffrement pour garantir une confidentialité totale." />
                            <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <LuxeCard icon={Zap} title="SLA de Disponibilité" desc="Un engagement contractuel de 99.9% de disponibilité réseau avec indemnisations en cas de défaut." />
                            </Link>
                            <LuxeCard icon={Scale} title="Équité & Justice" desc="Des conditions de services rédigées en langage clair, sans petits caractères cachés ou clauses abusives." />
                            <LuxeCard icon={HelpCircle} title="Assistance Juridique" desc="Une équipe dédiée pour répondre à vos demandes d'informations ou de conformité spécifiques." />
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="trust-container">
                            <div className="trust-content">
                                <h2 className="trust-title">Relation de Confiance</h2>
                                <p className="trust-desc">
                                    IHOST s'engage à maintenir une transparence totale sur ses opérations. Nos documents légaux sont régulièrement mis à jour pour refléter les nouvelles réglementations et protéger au mieux les intérêts de nos clients.
                                </p>
                                <div className="trust-features">
                                    {[
                                        "Révision Annuelle",
                                        "Conformité CNDP/RGPD",
                                        "Protection du Consommateur",
                                        "Archives Historiques"
                                    ].map((item, i) => (
                                        <div key={i} className="trust-feature">
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-wrap-fix">Historique des Changements</button>
                            </div>
                            <div className="trust-visual">
                                <div className="trust-visual-box">
                                    <FileText size={100} color="#1E6BFF" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Souveraineté</h3>
                                    <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>Données protégées par la loi marocaine & internationale.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 className="cta-title">Des questions juridiques ?</h2>
                            <p className="cta-desc">
                                Notre équipe de conformité est à votre disposition pour vous expliquer tout point de nos conditions de service qui resterait obscur.
                            </p>
                            <Link to="/contact" className="btn cta-link">
                                Contacter notre Legal Team <ArrowRight size={26} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default LegalDocuments;
