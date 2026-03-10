import { FileText, ChevronRight, Scale, Shield, CreditCard, HelpCircle, Download, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

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
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="container-luxe hero-content">
                            <h1 className="font-tech">Cadre Légal & <br />Transparence</h1>
                            <p className="hero-subtext">
                                Consultez nos conditions de service et nos politiques de confidentialité.
                                Nous bâtissons une relation de confiance basée sur des engagements contractuels clairs.
                            </p>
                            <div className="hero-buttons">
                                <button className="btn btn-primary">Centre de Conformité</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documents Section */}
                <section className="section-premium bg-white">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem' }}>Documents de Référence</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto' }}>
                                L'ensemble des textes encadrant légalement votre utilisation d'IHOST.
                            </p>
                        </div>
                        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {docs.map((doc, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    padding: '2.5rem 3.5rem',
                                    borderRadius: '32px',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2.5rem',
                                    cursor: 'pointer',
                                    transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                                }} className="hover-lift">
                                    <div style={{
                                        background: `${doc.color}10`,
                                        padding: '1.2rem',
                                        borderRadius: '20px',
                                        color: doc.color,
                                        border: `1px solid ${doc.color}20`
                                    }}>
                                        <doc.icon size={32} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '0.5rem' }}>{doc.title}</h3>
                                        <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>{doc.desc}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button style={{
                                            background: '#F5F7FA',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '0.8rem',
                                            color: '#1E6BFF',
                                            cursor: 'pointer'
                                        }} className="hover-lift" title="Télécharger PDF">
                                            <Download size={20} />
                                        </button>
                                        <div style={{
                                            background: 'transparent',
                                            padding: '0.8rem',
                                            color: '#4B5563'
                                        }}>
                                            <ChevronRight size={24} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commitments Section */}
                <section className="section-premium bg-light">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem' }}>Engagements au Service du Client</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto' }}>
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem' }}>Relation de Confiance</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    IHOST s'engage à maintenir une transparence totale sur ses opérations. Nos documents légaux sont régulièrement mis à jour pour refléter les nouvelles réglementations et protéger au mieux les intérêts de nos clients.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4.5rem' }}>
                                    {[
                                        "Révision Annuelle",
                                        "Conformité CNDP/RGPD",
                                        "Protection du Consommateur",
                                        "Archives Historiques"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 800, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.1rem' }}>Historique des Changements</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '4rem',
                                    background: '#0B1F3A',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    textAlign: 'center',
                                    color: 'white'
                                }}>
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
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Des questions juridiques ?</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Notre équipe de conformité est à votre disposition pour vous expliquer tout point de nos conditions de service qui resterait obscur.
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
