import React from 'react';
import { Briefcase, CreditCard, LayoutTemplate, Zap, ArrowRight, Server, Repeat, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const ResellerDomains = () => {
    return (
        <PageTransition>
            <div className="domain-page">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: '#6366F1',
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
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Propulsez Votre Agence</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Devenez revendeur de domaines et offrez un service complet à vos clients. Prix de gros, marque blanche et automatisation totale via API.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Devenir expert revendeur <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>L'infrastructure au service de votre croissance</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une solution clé en main pour intégrer la vente de domaines dans votre offre commerciale.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            {[
                                { icon: CreditCard, title: "Prix de gros exclusifs", desc: "Bénéficiez de remises allant jusqu'à 40 % sur +500 extensions. Plus votre volume augmente, plus vos marges grimpent.", color: "#3B82F6" },
                                { icon: Server, title: "API RESTful Puissante", desc: "Automatisez tout : recherche, enregistrement, transfert et renouvellement. Intégrez-nous dans WHMCS, Blesta ou votre CRM maison.", color: "#10B981" },
                                { icon: LayoutTemplate, title: "Marque Blanche (White-label)", desc: "Gardez le contrôle total de votre image. Vos clients utilisent votre panel, voient votre logo et vos serveurs de noms personnalisés.", color: "#8B5CF6" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    gap: '2.5rem',
                                    alignItems: 'center',
                                    background: 'white',
                                    padding: '3.5rem',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        background: `${item.color}15`,
                                        color: item.color,
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <item.icon size={40} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h3 style={{ fontSize: '1.6rem', color: '#0B1F3A', marginBottom: '0.75rem', fontWeight: 800 }}>{item.title}</h3>
                                        <p style={{ color: '#4B5563', lineHeight: '1.8', margin: 0, fontSize: '1.1rem' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Avantages du Programme</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des outils pensés pour les bâtisseurs du web</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Zap} title="Activation Immédiate" desc="Commencez à revendre et à générer des profits dès l'ouverture de votre compte revendeur." />
                            <LuxeCard icon={Repeat} title="Gestion Centralisée" desc="Un tableau de bord unique pour piloter des milliers de domaines clients en toute simplicité." />
                            <LuxeCard icon={CreditCard} title="Zéro Frais d'Entrée" desc="Pas d'abonnement mensuel ni de frais cachés. Vous ne payez que ce que vous enregistrez." />
                            <LuxeCard icon={Briefcase} title="Support Prioritaire" desc="Bénéficiez d'une ligne d'assistance dédiée pour nos partenaires privilégiés." />
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Prêt à diversifier vos revenus ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Rejoignez plus de 500 agences et professionnels qui font confiance à l'infrastructure IHOST pour leurs clients.
                            </p>
                            <Link to="/signup" className="btn" style={{
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
                                Devenir Revendeur <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default ResellerDomains;
