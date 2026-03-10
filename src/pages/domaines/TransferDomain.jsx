import React, { useState } from 'react';
import { ArrowRightLeft, LockOpen, Key, CheckCircle2, CloudLightning, Shield, Layout, Headset, ArrowRight, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const TransferDomain = () => {
    const [domain, setDomain] = useState('');
    const [authCode, setAuthCode] = useState('');

    const handleTransfer = (e) => {
        e.preventDefault();
        console.log("Initiating transfer for:", domain, authCode);
    };

    const TransferForm = (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            padding: '2.5rem',
            borderRadius: '32px',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
            <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Nom de domaine (ex: monsite.com)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        style={{
                            padding: '1.2rem 1.5rem',
                            borderRadius: '16px',
                            border: 'none',
                            fontSize: '1.1rem',
                            width: '100%',
                            outline: 'none',
                            background: 'white',
                            color: '#0B1F3A'
                        }}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="password"
                        placeholder="Code EPP / Auth Code"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        style={{
                            padding: '1.2rem 1.5rem',
                            borderRadius: '16px',
                            border: 'none',
                            fontSize: '1.1rem',
                            width: '100%',
                            outline: 'none',
                            background: 'white',
                            color: '#0B1F3A'
                        }}
                    />
                </div>
                <button type="submit" className="btn" style={{
                    border: 'none',
                    cursor: 'pointer',
                    padding: '1.2rem',
                    fontSize: '1.1rem',
                    borderRadius: '16px',
                    fontWeight: 700,
                    background: 'white',
                    color: '#6366F1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginTop: '0.5rem'
                }}>
                    Lancer le transfert <ArrowRight size={20} />
                </button>
            </form>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', marginTop: '1.5rem', textAlign: 'center', fontWeight: 500 }}>
                💡 Le transfert ajoute automatiquement 1 an à la date d'expiration.
            </p>
        </div>
    );

    return (
        <PageTransition>
            <div className="domain-page">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: '#7c3aed',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/domain-hero.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    gap: '1rem',
                                    marginBottom: '2.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '4px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(5px)'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#00C2FF' }}>
                                        <Globe size={14} /> Network
                                    </span>
                                    <span style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#10b981' }}>
                                        <Zap size={14} /> Performance
                                    </span>
                                </div>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Transférez & Économisez</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Ramenez vos domaines chez IHOST et profitez d'une interface de gestion simplifiée, de tarifs transparents et d'une année gratuite.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Commencer <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem' }}>
                                {TransferForm}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Le transfert en 4 étapes simples</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un processus fluide et automatisé pour migrer vos domaines sans aucune interruption de vos services.</p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '2rem'
                        }}>
                            {[
                                { step: "1", icon: LockOpen, title: "Déverrouillez", desc: "Désactivez le verrouillage de transfert chez votre bureau d'enregistrement actuel." },
                                { step: "2", icon: Key, title: "Obtenez le code", desc: "Récupérez votre code EPP ou code d'autorisation auprès de votre ancien prestataire." },
                                { step: "3", icon: ArrowRightLeft, title: "Initiez", desc: "Entrez votre domaine et le code dans notre formulaire sécurisé ci-dessus." },
                                { step: "4", icon: CheckCircle2, title: "Confirmez", desc: "Validez l'e-mail de confirmation que nous vous enverrons pour finaliser l'opération." }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'left',
                                    padding: '3rem 2.5rem',
                                    background: 'white',
                                    borderRadius: '24px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '25px',
                                        fontSize: '4rem',
                                        fontWeight: 900,
                                        opacity: 0.05,
                                        color: '#1E6BFF'
                                    }}>{item.step}</span>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        background: 'rgba(124, 58, 237, 0.1)',
                                        color: '#7c3aed',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '2rem'
                                    }}>
                                        <item.icon size={30} />
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: '#0B1F3A' }}>{item.title}</h3>
                                    <p style={{ color: '#4B5563', lineHeight: '1.7', fontSize: '1.05rem' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi migrer vers IHOST ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Plus qu'un simple registraire, nous sommes votre partenaire pour une présence en ligne durable et sécurisée.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={CloudLightning} title="Zéro Interruption" desc="Vos DNS restent actifs pendant toute la durée du transfert. Votre site et vos mails ne s'arrêtent jamais." />
                            <LuxeCard icon={Shield} title="Sécurité Renforcée" desc="Bénéficiez du verrouillage contre le vol et de la protection WHOIS pour garder vos données privées." />
                            <LuxeCard icon={Layout} title="Interface Intuitive" desc="Gérez tous vos domaines, hébergements et certificats SSL depuis un seul tableau de bord moderne." />
                            <LuxeCard icon={Headset} title="Support d'Experts" desc="Notre équipe technique vous accompagne étape par étape pour assurer le succès de votre migration." />
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#6366F1',
                            borderRadius: '32px',
                            padding: '5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Besoin d'un coup de main ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                                Nos experts en migration sont disponibles 24/7 pour vous aider à transférer vos services en toute sérénité.
                            </p>
                            <Link to="/entreprise/partners" className="btn" style={{
                                background: 'white',
                                color: '#7c3aed',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Nous contacter <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default TransferDomain;
