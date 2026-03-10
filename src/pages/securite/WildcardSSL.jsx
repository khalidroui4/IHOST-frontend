import React from 'react';
import { Globe, Layers, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const WildcardSSL = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #2563EB 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/security-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Une Protection Sans Limite</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Sécurisez votre domaine principal et une infinité de sous-domaines avec un seul certificat SSL Wildcard. La solution ultime pour les infrastructures complexes.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Commander mon Wildcard <ArrowRight size={20} /></Link>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Gagnez en Temps et en Efficacité</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Simplifiez la gestion de votre sécurité web tout en réduisant vos coûts opérationnels.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    color: '#1E6BFF',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Globe size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Couverture Illimitée (*.domaine.com)</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Sécurisez <code>shop.site.com</code>, <code>blog.site.com</code>, <code>api.site.com</code> et tout autre sous-domaine présent ou futur. Payez une fois, protégez tout votre écosystème sans frais additionnels.
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'center',
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '32px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                transition: 'all 0.3s ease-in-out'
                            }} className="hover-lift">
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Zap size={45} />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Administration Centralisée</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.15rem' }}>
                                        Finis les tableurs pour suivre des dizaines de certificats. Avec Wildcard, vous n'avez qu'un seul fichier à déployer et une seule date de renouvellement annuelle à mémoriser.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Caractéristiques Techniques</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une sécurité de haut niveau appliquée uniformément sur tout votre réseau.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Layers} title="Sous-domaines Dynamiques" desc="Ajoutez de nouveaux services sur des sous-domaines à la volée. Ils sont protégés instantanément sans réémission." />
                            <LuxeCard icon={Shield} title="Chiffrement 256 Bits" desc="Le standard TLS le plus robuste du marché appliqué à chaque point d'entrée de votre infrastructure web." />
                            <LuxeCard icon={Globe} title="Compatibilité Totale" desc="Certificat reconnu par 99.9% des navigateurs, systèmes mobiles et serveurs mail (Exchange, Postfix, etc.)." />
                            <LuxeCard icon={Zap} title="Validation Express" desc="Processus DV (Domain Validation) entièrement automatisé pour une émission en moins de 10 minutes." />
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
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Le choix des développeurs</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Idéal pour les architectures micro-services ou les plateformes SaaS. Wildcard SSL vous offre la flexibilité dont vous avez besoin pour innover sans contrainte de sécurité.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Réémission gratuite illimitée",
                                        "Garantie financière incluse",
                                        "Sceau de site dynamique",
                                        "Support installation multi-serveur"
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
                                    <Shield size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Protection Totale</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>La solution la plus rentable du marché.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Activer mon Wildcard</button>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Prêt à simplifier votre sécurité ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Ne perdez plus de temps à gérer des dizaines de certificats. Passez à la vitesse supérieure avec le Wildcard SSL.
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
