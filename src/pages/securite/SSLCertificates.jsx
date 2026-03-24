import React from 'react';
import { Lock, Search, ShieldCheck, ThumbsUp, CheckCircle2, ArrowRight, ShieldAlert, Zap, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import TechPricingCard from '../../components/TechPricingCard';

const SSLCertificates = () => {
    const plans = [
        {
            name: 'Standard SSL (DV)',
            price: '99',
            period: 'DH / an',
            highlight: false,
            features: [
                'Validation de domaine ultra-rapide',
                'Chiffrement 256 bits incassable',
                'Cadenas de sécurité navigateur',
                'Installation automatique IHOST',
                'Support technique 24/7'
            ]
        },
        {
            name: 'Business SSL (OV)',
            price: '199',
            period: 'DH / an',
            highlight: true,
            badge: 'RECOMMANDÉ',
            features: [
                'Validation de l\'organisation (OV)',
                'Garantie financière de 250,000$',
                'Outils anti-malware quotidiens',
                'Délai d\'émission : 24 à 48h',
                'Accélère la confiance client',
                'Support expert prioritaire'
            ]
        },
        {
            name: 'Enterprise SSL (EV)',
            price: '499',
            period: 'DH / an',
            highlight: false,
            features: [
                'Extended Validation (EV)',
                'Barre d\'adresse verte premium',
                'Garantie maximum de 1,5M$',
                'Audit complet de l\'entreprise',
                'Identité visuelle renforcée',
                'SLA de réponse < 1h'
            ]
        }
    ];

    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/ssl_certificate.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Confiance &amp; Intégrité Digitale</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Protégez vos transactions et les données de vos utilisateurs avec nos certificats SSL de renommée mondiale. Le standard de sécurité HTTPS pour votre succès.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Sécuriser mon site <ArrowRight size={20} /></Link>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Le bouclier invisible de votre site</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Pourquoi plus de 10,000 entreprises nous font confiance pour leur sécurité TLS/SSL.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Lock} title="Chiffrement Militaire" desc="Protégez les mots de passe et données bancaires contre toute interception grâce au cryptage AES-256." />
                            <LuxeCard icon={Search} title="Boost SEO Google" desc="HTTPS est un critère de classement officiel. Les sites sécurisés apparaissent plus haut dans les recherches." />
                            <LuxeCard icon={ShieldCheck} title="Protection Phishing" desc="Empêchez l'usurpation d'identité de votre domaine et assurez à vos clients qu'ils sont sur le bon site." />
                            <LuxeCard icon={ThumbsUp} title="Crédibilité Immédiate" desc="Le cadenas vert et le protocole HTTPS rassurent 85% des internautes avant un achat en ligne." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Niveaux de Protection SSL</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Choisissez la validation adaptée à la nature de votre projet web.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                            {plans.map((plan, index) => (
                                <TechPricingCard
                                    key={index}
                                    name={plan.name}
                                    price={plan.price}
                                    period={plan.period}
                                    features={plan.features}
                                    highlight={plan.highlight}
                                    badge={plan.badge}
                                    buttonText="Ajouter au panier"
                                    addToCartMode={true}
                                />
                            ))}
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
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Installation en 1-Clic</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Plus besoin d'être un expert en serveurs. Nos systèmes d'automatisation génèrent, valident et installent votre certificat SSL en quelques secondes sur nos hébergements.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Génération de CSR automatique",
                                        "Validation DNS transparente",
                                        "Renouvellement automatique",
                                        "Support multi-sous domaines"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, color: '#0B1F3A' }}>
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
                                    <LockKeyhole size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Certitude à 99.9%</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Reconnu par tous les navigateurs modernes.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Démarrer Maintenant</button>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Besoin d'un SSL pour plusieurs domaines ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Découvrez nos solutions Wildcard pour sécuriser l'ensemble de vos sous-domaines avec une seule licence.
                            </p>
                            <Link to="/securite/wildcard" className="btn" style={{
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
                                Voir les Certificats Wildcard <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div >
        </PageTransition >
    );
};

export default SSLCertificates;
