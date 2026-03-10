import React from 'react';
import { Database, Search, FileKey, Server, HardDrive, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const EmailArchiving = () => {
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
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Mémoire Digitale Infaillible</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Capturez, indexez et conservez l'intégralité de vos correspondances. Une solution d'archivage légale, immuable et instantanément consultable.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Plan d'Archivage <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Ne perdez plus jamais un seul mot</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une conservation inaltérable pour les entreprises exigeantes soucieuses de leur patrimoine informationnel.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                            {[
                                { icon: HardDrive, title: "Archivage Automatique", desc: "Dès qu'un email est émis ou reçu par vos collaborateurs, une copie chiffrée est stockée dans un coffre-fort numérique sécurisé.", color: "#1E6BFF" },
                                { icon: Search, title: "Recherche Ultra-Rapide", desc: "Retrouvez un email ou une pièce jointe datant de 10 ans en moins de 2 secondes grâce à notre moteur d'indexation plein texte.", color: "#3b82f6" },
                                { icon: FileKey, title: "Conformité & Légalité", desc: "Respectez les normes (RGPD, SOX) avec des preuves d'intégrité numérique. Vos archives sont infalsifiables devant la justice.", color: "#10b981" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'center',
                                    padding: '4rem 3rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out',
                                    gridColumn: idx === 2 ? '1 / -1' : 'auto'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 2.5rem',
                                        border: `1px solid ${item.color}20`
                                    }}>
                                        <item.icon size={45} />
                                    </div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1.15rem', color: '#4B5563', lineHeight: '1.8', maxWidth: item.gridColumn ? '700px' : 'none', margin: '0 auto' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Bénéfices Stratégiques</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Allégez votre infrastructure tout en renforçant votre sécurité.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Database} title="Données Immuables" desc="Technologie de stockage WORM (Write Once, Read Many). Impossible de supprimer ou modifier une archive intentionnellement." />
                            <LuxeCard icon={Server} title="Délestage Serveur" desc="Optimisez les performances de votre serveur mail principal en déplaçant les historiques massifs vers nos clusters d'archives." />
                            <LuxeCard icon={Clock} title="Restauration Express" desc="En cas de suppression accidentelle dans la boîte de réception active, restaurez n'importe quel message d'un simple clic." />
                            <LuxeCard icon={ShieldCheck} title="Chiffrement AES-256" desc="Toutes les données archivées sont chiffrées au repos avec des clés uniques, garantissant une confidentialité totale." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#F5F7FA',
                            padding: '5.5rem',
                            borderRadius: '40px',
                            border: '1px solid rgba(11, 31, 58, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>Prêt pour l'Audit ?</h2>
                                <p style={{ fontSize: '1.25rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                                    L'archivage n'est pas qu'une sécurité, c'est une nécessité légale pour de nombreuses industries. Ne soyez pas pris au dépourvu lors de votre prochain contrôle de conformité.
                                </p>
                                <button className="btn" style={{ padding: '1.2rem 3rem', borderRadius: '100px', fontWeight: 800 }}>Démarrer Mon Archivage</button>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    background: 'white',
                                    padding: '3rem',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(11, 31, 58, 0.1)' }}>
                                        <Zap size={24} color="#f59e0b" />
                                        <h4 style={{ margin: 0, fontWeight: 800 }}>Moteur de recherche Pro</h4>
                                    </div>
                                    <div style={{ background: '#F5F7FA', height: '40px', borderRadius: '8px', border: '1px solid rgba(11, 31, 58, 0.1)', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
                                        <Search size={16} color="#4B5563" style={{ marginRight: '0.5rem' }} />
                                        <span style={{ color: '#4B5563', fontSize: '0.9rem' }}>De: jean@partner.com | Avant: 2021...</span>
                                    </div>
                                    <div style={{ fontSize: '0.95rem', color: '#4B5563' }}>
                                        👉 Indexation automatique des textes DANS les PDFs, images et documents joints.
                                    </div>
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Conservez le savoir de votre entreprise</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem' }}>
                                Chaque email est un morceau de l'histoire de vos projets. Ne les laissez pas disparaître dans des suppressions accidentelles.
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
                                Configurer l'Archivage <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div >
        </PageTransition >
    );
};

export default EmailArchiving;
