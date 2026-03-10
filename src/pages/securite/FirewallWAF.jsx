import React from 'react';
import { Server, ShieldAlert, Filter, AlertOctagon, Terminal, FileCode2, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './FirewallWAF.css';

const FirewallWAF = () => {
    return (
        <PageTransition>
            <div className="security-page">
                <section className="hero">
                    <div className="hero-background hero-background-blue">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/security-hero.png)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Pare-Feu Applicatif de Pointe</h1>
                                <p className="hero-description">Bloquez les injections SQL, le Cross-Site Scripting (XSS) et les bots malveillants avant qu'ils n'atteignent votre code. La sentinelle intelligente de votre backend.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Activer le WAF <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', borderTop: '2px solid #00C2FF', borderLeft: '2px solid #00C2FF', opacity: 0.3 }} />
                        <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '40px', height: '40px', borderBottom: '2px solid #00C2FF', borderRight: '2px solid #00C2FF', opacity: 0.3 }} />
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Inspection Profonde du Trafic (DPI)</h2>
                            <p className="section-subtitle">Une analyse contextuelle et granulaire de chaque requête HTTP/HTTPS pour une sécurité sans faille.</p>
                        </div>
                        <div className="benefits-container">
                            <div className="benefit-card hover-lift">
                                <div className="benefit-icon-wrapper benefit-icon-blue">
                                    <Terminal size={45} />
                                </div>
                                <div className="benefit-content">
                                    <h3 className="benefit-title">Protection Anti-Injection (SQLi)</h3>
                                    <p className="benefit-desc">
                                        Notre WAF identifie et neutralise les requêtes contenant du code SQL malveillant destiné à lire ou détruire vos bases de données via vos formulaires de recherche ou de connexion.
                                    </p>
                                </div>
                            </div>

                            <div className="benefit-card hover-lift">
                                <div className="benefit-icon-wrapper benefit-icon-pink">
                                    <FileCode2 size={45} />
                                </div>
                                <div className="benefit-content">
                                    <h3 className="benefit-title">Défense Cross-Site Scripting (XSS)</h3>
                                    <p className="benefit-desc">
                                        Empêchez l'exécution de scripts malveillants côté client. Vos utilisateurs sont protégés contre le vol de cookies de session et les redirections frauduleuses.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Avantages d'un WAF IHOST</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une barrière intelligente qui apprend et s'adapte aux nouvelles menaces.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Server} title="Rulesets Optimisés CMS" desc="Des ensembles de règles spécifiques pour colmater instantanément les vulnérabilités de WordPress, Magento ou PrestaShop." />
                            <LuxeCard icon={Filter} title="Gestion des Bots" desc="Distinguez les 'bons bots' (Google, Bing) des scanners agressifs qui tentent de forcer vos accès administrateurs." />
                            <LuxeCard icon={AlertOctagon} title="Patching Virtuel" desc="Dès qu'une faille Zero-Day est découverte, nous déployons une règle de blocage globale avant même que vous n'ayez à patcher." />
                            <LuxeCard icon={ShieldAlert} title="Filtrage IP Géo" desc="Restreignez l'accès à votre console d'administration par pays ou par plages d'adresses IP spécifiques pour réduire l'exposition." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="mss-card-container">
                            <div className="mss-content">
                                <h2 className="mss-title">Indispensable pour le E-commerce</h2>
                                <p className="mss-description">
                                    Respectez les standards PCI-DSS en protégeant les données de paiement de vos clients. Notre WAF assure la conformité technique nécessaire pour les commerçants exigeants.
                                </p>
                                <div className="mss-checklist">
                                    {[
                                        "Audit de trafic en temps réel",
                                        "Rapports de menaces détaillés",
                                        "Accélération via CDN intégrée",
                                        "SLA de disponibilité 99.99%"
                                    ].map((item, i) => (
                                        <div key={i} className="mss-check-item">
                                            <CheckCircle2 size={20} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mss-visual-wrapper">
                                <div className="mss-visual-card">
                                    <ShieldAlert size={60} color="#1E6BFF" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Protection L7</h3>
                                    <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Neutralisez les menaces avant qu'elles frappent.</p>
                                    <button className="btn" style={{ padding: '1.2rem 2.5rem', borderRadius: '100px', fontWeight: 800 }}>Déployer Ma Sentinelle</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '6rem 0' }}>
                    <div className="container-luxe">
                        <div className="cta-container">
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Sécurisez votre expérience utilisateur</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Ne laissez pas une faille applicative détruire des années de travail. Activez votre Firewall WAF dès aujourd'hui.
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
                                Consulter un Expert Cloud Security <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default FirewallWAF;
