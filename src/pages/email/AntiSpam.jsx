import React from 'react';
import { ShieldAlert, Eye, Filter, Ban, CheckCircle2, ShieldCheck, Mail, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const AntiSpam = () => {
    return (
        <PageTransition>
            <div className="email-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/email-hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Le Bouclier de Vos Boîtes Mail</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Éliminez 99.9% des emails indésirables, tentatives de phishing et malwares avant même qu'ils n'atteignent vos collaborateurs.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Sécuriser mes emails <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Nettoyage Intelligent en Temps Réel</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une technologie d'IA qui analyse chaque octet de vos emails entrants pour une protection sans compromis.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
                            {[
                                { icon: Eye, title: "Analyse Heuristique", desc: "Identification proactive des nouveaux modèles de spam grâce à la détection comportementale.", color: "#e11d48" },
                                { icon: ShieldAlert, title: "Anti-Phishing", desc: "Bloque instantanément les sites web trompeurs et les tentatives de vol d'identifiant.", color: "#f59e0b" },
                                { icon: Filter, title: "Algorithmes Bayes", desc: "Filtrage statistique qui apprend de vos habitudes pour une précision chirurgicale.", color: "#3b82f6" },
                                { icon: Ban, title: "Neutralisation Malware", desc: "Scanner de pièces jointes haute performance pour arrêter les ransomwares à la source.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'center',
                                    padding: '3.5rem 2rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.4s ease'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '50%',
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Bénéfices pour votre entreprise</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Plus que de la sécurité, un gain de productivité immédiat pour vos d'équipes.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Mail} title="Sérénité Quotidienne" desc="Gagnez jusqu'à 20 minutes par jour en ne traitant que des emails légitimes et importants." />
                            <LuxeCard icon={ShieldCheck} title="Hygiène Numérique" desc="Gardez votre réseau propre et sécurisé en éliminant le vecteur d'attaque n°1 en entreprise : l'email." />
                            <LuxeCard icon={Target} title="Délivrabilité Sortante" desc="Nos outils protègent aussi votre réputation en empêchant vos comptes d'envoyer du spam accidentellement." />
                            <LuxeCard icon={Zap} title="Filtres Personnalisés" desc="Gardez le contrôle avec des listes blanches et noires granulaires pour vos partenaires stratégiques." />
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
                            gap: '4rem'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Compatible avec tous les services</h2>
                                <p style={{ fontSize: '1.2rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    Notre solution Anti-Spam s'intercale de manière invisible entre internet et vos serveurs de messagerie, peu importe votre solution actuelle.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Exchange & Office 365",
                                        "Google Workspace / Gmail",
                                        "Serveurs cPanel / Plesk",
                                        "Infrastructures Zimbra / Linux"
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
                                    <ShieldCheck size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Testez 15 jours</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Évaluez l'efficacité sans engagement.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Démarrer l'Essai</button>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Dites adieu aux polluants numériques</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Récupérez le contrôle de votre productivité et sécurisez vos communications dès aujourd'hui.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#3b82f6',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Configurer Mon Bouclier <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default AntiSpam;
