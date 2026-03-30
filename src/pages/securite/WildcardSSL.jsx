import React from 'react';
import { Globe, Layers, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './WildcardSSL.css';

const WildcardSSL = () => {
    return (
        <PageTransition>
            <div className="security-page wildcard-page">

                {/* ── Hero ── */}
                <section className="hero">
                    <div className="hero-background" style={{
                        background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)',
                        position: 'relative',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: 'url(/subdomain_security.jpg)',
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat', opacity: 0.15,
                            mixBlendMode: 'luminosity', zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech hero-title">Une Protection Sans Limite</h1>
                                <p className="hero-subtext">
                                    Sécurisez votre domaine principal et une infinité de sous-domaines avec un seul
                                    certificat SSL Wildcard. La solution ultime pour les infrastructures complexes.
                                </p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>
                                        Commander mon Wildcard <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #00C2FF', borderLeft: '2px solid #00C2FF', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #00C2FF', borderRight: '2px solid #00C2FF', opacity: 0.3 }} />
                    </div>
                </section>

                {/* ── Benefits ── */}
                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 className="section-title">Gagnez en Temps et en Efficacité</h2>
                            <p className="section-subtitle">
                                Simplifiez la gestion de votre sécurité web tout en réduisant vos coûts opérationnels.
                            </p>
                        </div>

                        <div className="wc-benefits-list">
                            {/* Card 1 */}
                            <div className="wc-benefit-card hover-lift">
                                <div className="wc-benefit-icon wc-benefit-icon-blue">
                                    <Globe size={45} />
                                </div>
                                <div className="wc-benefit-body">
                                    <h3 className="wc-benefit-title">Couverture Illimitée (*.domaine.com)</h3>
                                    <p className="wc-benefit-desc">
                                        Sécurisez <code>shop.site.com</code>, <code>blog.site.com</code>,{' '}
                                        <code>api.site.com</code> et tout autre sous-domaine présent ou futur.
                                        Payez une fois, protégez tout votre écosystème sans frais additionnels.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="wc-benefit-card hover-lift">
                                <div className="wc-benefit-icon wc-benefit-icon-green">
                                    <Zap size={45} />
                                </div>
                                <div className="wc-benefit-body">
                                    <h3 className="wc-benefit-title">Administration Centralisée</h3>
                                    <p className="wc-benefit-desc">
                                        Finis les tableurs pour suivre des dizaines de certificats. Avec Wildcard,
                                        vous n'avez qu'un seul fichier à déployer et une seule date de renouvellement
                                        annuelle à mémoriser.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Technical features ── */}
                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 className="section-title">Caractéristiques Techniques</h2>
                            <p className="section-subtitle">
                                Une sécurité de haut niveau appliquée uniformément sur tout votre réseau.
                            </p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Layers} title="Sous-domaines Dynamiques" desc="Ajoutez de nouveaux services sur des sous-domaines à la volée. Ils sont protégés instantanément sans réémission." />
                            <LuxeCard icon={Shield} title="Chiffrement 256 Bits" desc="Le standard TLS le plus robuste du marché appliqué à chaque point d'entrée de votre infrastructure web." />
                            <LuxeCard icon={Globe} title="Compatibilité Totale" desc="Certificat reconnu par 99.9% des navigateurs, systèmes mobiles et serveurs mail (Exchange, Postfix, etc.)." />
                            <LuxeCard icon={Zap} title="Validation Express" desc="Processus DV (Domain Validation) entièrement automatisé pour une émission en moins de 10 minutes." />
                        </div>
                    </div>
                </section>

                {/* ── Dev choice section ── */}
                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="wc-dev-wrapper">
                            <div className="wc-dev-content">
                                <h2 className="wc-dev-title">Le choix des développeurs</h2>
                                <p className="wc-dev-desc">
                                    Idéal pour les architectures micro-services ou les plateformes SaaS.
                                    Wildcard SSL vous offre la flexibilité dont vous avez besoin pour
                                    innover sans contrainte de sécurité.
                                </p>
                                <div className="wc-dev-checklist">
                                    {[
                                        "Réémission gratuite illimitée",
                                        "Garantie financière incluse",
                                        "Sceau de site dynamique",
                                        "Support installation multi-serveur"
                                    ].map((item, i) => (
                                        <div key={i} className="wc-dev-check-item">
                                            <CheckCircle2 size={20} color="#10b981" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="wc-dev-visual">
                                <div className="wc-dev-card">
                                    <Shield size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Protection Totale</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>La solution la plus rentable du marché.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>
                                        Activer mon Wildcard
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="cta-split" style={{ padding: '6rem 2rem' }}>
                    <div className="container-luxe">
                        <div className="wc-cta-box">
                            <h2 className="wc-cta-title">Prêt à simplifier votre sécurité ?</h2>
                            <p className="wc-cta-desc">
                                Ne perdez plus de temps à gérer des dizaines de certificats. Passez à la vitesse
                                supérieure avec le Wildcard SSL.
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
                                Parler à un expert Sécurité <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default WildcardSSL;
