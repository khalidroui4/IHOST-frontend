import React from 'react';
import { ShieldAlert, Fingerprint, EyeOff, SearchCheck, GlobeLock, BookUser, ArrowRight, Zap, CheckCircle2, ShieldHalf } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const BrandProtection = () => {
    return (
        <PageTransition>
            <div className="marketing-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #EA580C 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/marketing-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Sanctuarisez Votre Marque</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Identifiez, surveillez et éliminez les contrefaçons, le phishing et les atteintes à votre réputation. Nous sommes les gardiens de votre capital confiance sur le web.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Audit de Risque Marque <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Défenses Contre l'Usurpation</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un écosystème de surveillance active pour contrer les fraudes liées à votre identité numérique.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {[
                                { icon: GlobeLock, title: "Anti-Typosquatting", desc: "Scan permanent des nouveaux domaines déposés (ex: amaz0n.com) pour détourner vos clients. Intervention légale ultra-rapide.", color: '#1E6BFF' },
                                { icon: Fingerprint, title: "Détection Phishing IA", desc: "Identification proactive des sites copiant votre charte graphique pour voler les identifiants de vos utilisateurs légitimes.", color: "#ec4899" },
                                { icon: BookUser, title: "E-Réputation 24/7", desc: "Analyse des sentiments sur forums, réseaux sociaux et plateformes d'avis pour contrer les campagnes de dénigrement massives.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    padding: '4rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '40px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out',
                                    textAlign: 'center'
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
                                        margin: '0 auto 2.5rem',
                                        border: `1px solid ${item.color}20`
                                    }}>
                                        <item.icon size={36} />
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.2rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.05rem', color: '#4B5563', lineHeight: '1.8' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi Protéger Sa Marque ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Votre image est votre actif le plus précieux. Ne le laissez pas sans surveillance.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={ShieldAlert} title="Prévention Fraude" desc="Stoppez les escrocs avant qu'ils ne ciblent vos clients avec de fausses promotions ou des produits contrefaits." />
                            <LuxeCard icon={EyeOff} title="Takedown Express" desc="Processus légaux (DMCA, UDRP) accélérés pour forcer les hébergeurs à supprimer le contenu illicite en moins de 24h." />
                            <LuxeCard icon={SearchCheck} title="Protection Revenus" desc="Assurez-vous que le trafic organique destiné à votre marque ne soit pas siphonné par des acteurs malveillants." />
                            <LuxeCard icon={ShieldHalf} title="Confidentialité" desc="Surveillance du Dark Web pour détecter les fuites de données clients ou de secrets industriels liés à votre marque." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#0B1F3A',
                            padding: '6rem',
                            borderRadius: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6rem',
                            color: 'white',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Assistance Légale & Technique</h2>
                                <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Nous ne nous contentons pas de détecter. Nos juristes spécialisés en propriété intellectuelle et nos ingénieurs sécurité travaillent main dans la main pour neutraliser les menaces et engager les procédures de récupération nécessaires.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Rapports Juridiques Certifiés",
                                        "Mise en Demeure Automatisée",
                                        "Récupération de Domaines",
                                        "Veille Logo & Copyright"
                                    ].map((benefit, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {benefit}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white', fontSize: '1.1rem' }}>Contacter un Consultant Brand</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    padding: '5rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '40px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'center'
                                }}>
                                    <ShieldAlert size={120} color="#ec4899" style={{ marginBottom: '2rem' }} />
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem' }}>Alerte Rouge</h3>
                                    <p style={{ opacity: 0.6, fontSize: '1.1rem' }}>Réponse rapide aux crises de réputation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #EA580C 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Ne laissez pas votre image au hasard</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Des milliers de marques sont la cible de fraudes chaque jour. Assurez-vous d'être parmi celles qui sont préparées.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#db2777',
                                padding: '1.4rem 5rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                fontSize: '1.3rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                textDecoration: 'none',
                                border: 'none'
                            }}>
                                Sécuriser Ma Marque <ArrowRight size={28} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default BrandProtection;
