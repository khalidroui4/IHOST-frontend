import React from 'react';
import { Target, Eye, ShieldCheck, Zap, HeadphonesIcon, Award, Users, Globe, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const AboutUs = () => {
    return (
        <PageTransition>
            <div className="entreprise-page">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/tech-company.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                 
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>L'Excellence Numérique</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Découvrez l'histoire, la mission et l'engagement d'IHOST. Nous bâtissons l'infrastructure de demain pour propulser votre succès aujourd'hui.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Notre Histoire <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Mission & Vision</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'étoile polaire qui guide chacune de nos innovations technologiques.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                            <div style={{
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '40px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }} className="hover-lift">
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '120px',
                                    height: '120px',
                                    background: 'rgba(59, 130, 246, 0.05)',
                                    borderRadius: '50%'
                                }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: '#1E6BFF',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Target size={36} />
                                    </div>
                                    <h2 style={{ fontSize: '2.2rem', color: '#0B1F3A', margin: 0, fontWeight: 900 }}>Notre Mission</h2>
                                </div>
                                <p style={{ color: '#4B5563', lineHeight: '1.8', fontSize: '1.2rem', margin: 0 }}>
                                    Démocratiser l'accès aux infrastructures de pointe. Nous accompagnons les entreprises dans leur transition vers le Cloud en offrant des solutions robustes, souveraines et accessibles, sans compromis sur la performance.
                                </p>
                            </div>

                            <div style={{
                                background: 'white',
                                padding: '4rem',
                                borderRadius: '40px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }} className="hover-lift">
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '120px',
                                    height: '120px',
                                    background: 'rgba(16, 185, 129, 0.05)',
                                    borderRadius: '50%'
                                }}></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        color: '#10b981',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Eye size={36} />
                                    </div>
                                    <h2 style={{ fontSize: '2.2rem', color: '#0B1F3A', margin: 0, fontWeight: 900 }}>Notre Vision</h2>
                                </div>
                                <p style={{ color: '#4B5563', lineHeight: '1.8', fontSize: '1.2rem', margin: 0 }}>
                                    Devenir le leader technologique incontesté en Afrique et au Moyen-Orient. Nous aspirons à construire l'écosystème numérique de demain en misant sur le Green Computing et l'innovation constante.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Nos Valeurs Fondamentales</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>L'ADN qui définit notre culture d'entreprise et nos engagements clients.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={ShieldCheck} title="Fiabilité Absolue" desc="Nous concevons des infrastructures redondantes pour garantir un uptime de 99.9%, parce que votre business ne s'arrête jamais." />
                            <LuxeCard icon={Award} title="Qualité Premium" desc="La satisfaction client n'est pas un objectif, c'est notre standard. Chaque service est audité pour répondre aux normes les plus strictes." />
                            <LuxeCard icon={Zap} title="Agilité Constante" desc="Dans un monde qui change vite, nous adaptons nos technologies en temps réel pour vous offrir un avantage compétitif majeur." />
                            <LuxeCard icon={HeadphonesIcon} title="Humain & Réactif" desc="Un support local, expert et passionné. Nous ne sommes pas juste un fournisseur, nous sommes votre extension technique." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '1.5rem' }}>IHOST en Chiffres</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto' }}>Une croissance soutenue par la confiance de nos partenaires et clients fidèles.</p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            {[
                                { icon: Users, label: "Clients Actifs", value: "15,000+" },
                                { icon: Globe, label: "Pays Couverts", value: "35+" },
                                { icon: ShieldCheck, label: "Uptime Moyen", value: "99.99%" },
                                { icon: Rocket, label: "Projets Cloud", value: "5,000+" }
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    padding: '3.5rem 2rem',
                                    background: '#F5F7FA',
                                    borderRadius: '32px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                                }} className="hover-lift">
                                    <div style={{ color: '#1E6BFF', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                                        <stat.icon size={45} />
                                    </div>
                                    <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '0.5rem' }}>{stat.value}</div>
                                    <div style={{ fontSize: '1.1rem', color: '#4B5563', fontWeight: 600 }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: '#F5F7FA' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'white',
                            padding: '6rem',
                            borderRadius: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(11, 31, 58, 0.1)'
                        }}>
                            <div style={{ flex: 1.2 }}>
                                <h2 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0B1F3A', marginBottom: '2rem', lineHeight: '1.1' }}>Rejoignez l'aventure technologique</h2>
                                <p style={{ fontSize: '1.3rem', color: '#4B5563', lineHeight: '1.8', marginBottom: '3rem' }}>
                                    Nous sommes constamment à la recherche de talents passionnés pour repousser les limites du Cloud au Maroc et en Afrique. Prêt à transformer le futur ?
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3.5rem' }}>
                                    {[
                                        "Environnement Innovant",
                                        "Culture de l'Excellence",
                                        "Impact Reèl",
                                        "Formation Continue"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem', color: '#0B1F3A' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                                <Link to="/entreprise/careers" className="btn" style={{ padding: '1.4rem 3.5rem', borderRadius: '100px', fontWeight: 800, fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                                    Voir nos opportunités <ArrowRight size={24} />
                                </Link>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    width: '100%',
                                    height: '500px',
                                    background: 'linear-gradient(135deg, #1E6BFF 0%, #1d4ed8 100%)',
                                    borderRadius: '40px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Users size={200} color="rgba(255,255,255,0.1)" style={{ position: 'absolute' }} />
                                    <div style={{ color: 'white', textAlign: 'center', position: 'relative', zIndex: 1, padding: '3rem' }}>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>+50</h3>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Experts Dédiés</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: '#0B1F3A',
                            borderRadius: '48px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Prêt à accélérer votre croissance ?</h2>
                                <p style={{ fontSize: '1.4rem', opacity: 0.8, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                    Des milliers d'entreprises font déjà confiance à notre infrastructure pour propulser leurs services digitaux. Pourquoi pas vous ?
                                </p>
                                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                                    <Link to="/contact" className="btn" style={{
                                        padding: '1.4rem 4rem',
                                        borderRadius: '100px',
                                        fontWeight: 800,
                                        fontSize: '1.2rem',
                                        background: 'white',
                                        color: '#0B1F3A',
                                        textDecoration: 'none'
                                    }}>Nous Contacter</Link>
                                    <Link to="/hebergement" className="btn btn-outline" style={{
                                        padding: '1.4rem 4rem',
                                        borderRadius: '100px',
                                        fontWeight: 800,
                                        fontSize: '1.2rem',
                                        color: 'white',
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        textDecoration: 'none'
                                    }}>Nos Solutions</Link>
                                </div>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '-50%',
                                right: '-10%',
                                width: '600px',
                                height: '600px',
                                background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }}></div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default AboutUs;
