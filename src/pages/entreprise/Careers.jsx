import React from 'react';
import { Briefcase, ArrowRight, Lightbulb, TrendingUp, Users, Zap, CheckCircle2, MapPin, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const Careers = () => {
    const jobs = [
        { role: 'Ingénieur Cloud Infrastructure (DevOps)', department: 'Ingénierie', type: 'CDI', location: 'Casablanca (Hybride)', icon: Zap },
        { role: 'Développeur Fullstack React / Node.js', department: 'Produit', type: 'CDI', location: 'Rabat (Hybride)', icon: Users },
        { role: 'Expert Cybersécurité (SOC Analyst)', department: 'Sécurité', type: 'CDI', location: 'Casablanca', icon: TrendingUp },
        { role: 'Responsable Marketing Digital B2B', department: 'Growth', type: 'CDI', location: 'Rabat', icon: Lightbulb },
    ];

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
                                 
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Bâtissons le Futur du Cloud</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Rejoignez une équipe d'élite passionnée par l'innovation, la performance et la cybersécurité. Donnez une nouvelle dimension à votre carrière chez IHOST.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn" style={{ padding: '1.2rem 3rem', fontSize: '1rem', background: '#1E6BFF', color: 'white', border: 'none' }}>Voir les Postes Ouverts <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi Rejoindre IHOST ?</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une culture d'excellence, d'apprentissage continu et d'impact réel sur l'écosystème numérique.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Lightbulb} title="Innovation Constante" desc="Travaillez avec les dernières stacks technologiques (Kubernetes, Terraform, React) et relevez des défis techniques stimulants au quotidien." />
                            <LuxeCard icon={TrendingUp} title="Épanouissement Pro" desc="Bénéficiez de budgets de formation certifiante (AWS, GCP, Cisco) et d'un plan de carrière clair orienté vers le leadership ou l'expertise." />
                            <LuxeCard icon={Users} title="Mindset Collaboratif" desc="Évoluez dans un environnement bienveillant avec une hiérarchie plate où chaque idée est écoutée, du stagiaire au CEO." />
                            <LuxeCard icon={Zap} title="Impact Direct" desc="Vos développements et vos décisions d'architecture impactent directement des milliers d'entreprises et des millions d'utilisateurs." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Postes Ouverts Actuellement</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Trouvez la mission qui résonne avec vos ambitions.</p>
                        </div>
                        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {jobs.map((job, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    padding: '2.5rem 3rem',
                                    borderRadius: '32px',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.3s ease-in-out',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                                }} className="hover-lift">
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <div style={{ padding: '0.6rem', background: 'rgba(59, 130, 246, 0.1)', color: '#1E6BFF', borderRadius: '12px' }}>
                                                <job.icon size={20} />
                                            </div>
                                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A', margin: 0 }}>{job.role}</h3>
                                        </div>
                                        <div style={{ display: 'flex', gap: '2rem', color: '#4B5563', fontSize: '1rem', fontWeight: 600 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Briefcase size={16} /> {job.department}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={16} /> {job.location}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} /> {job.type}
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{
                                        background: '#F5F7FA',
                                        border: 'none',
                                        color: '#1E6BFF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        fontWeight: 800,
                                        padding: '1rem 2rem',
                                        borderRadius: '100px',
                                        fontSize: '1rem'
                                    }} className="hover-lift">
                                        Détails <ArrowRight size={18} />
                                    </button>
                                </div>
                            ))}
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>La Vie chez IHOST</h2>
                                <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: '1.8', marginBottom: '3.5rem' }}>
                                    Au-delà du code et des serveurs, IHOST c'est une communauté vibrante. Nous croyons en l'équilibre vie pro/vie privée, dans le partage de connaissances et dans le plaisir de travailler ensemble sur des projets d'envergure.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                    {[
                                        "Setup Hardware Premium",
                                        "Assurance Santé Top",
                                        "Teambuildings Réguliers",
                                        "Télétravail Flexible"
                                    ].map((benefit, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                            <CheckCircle2 size={24} color="#10b981" /> {benefit}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn" style={{ padding: '1.4rem 4rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white', fontSize: '1.1rem' }}>Candidature Spontanée</button>
                            </div>
                            <div style={{ flex: 1, display: 'none', lg: 'block' }}>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1.5rem',
                                    transform: 'rotate(-5deg)'
                                }}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} style={{
                                            aspectRatio: '1',
                                            background: `rgba(255,255,255,0.05)`,
                                            borderRadius: '32px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Users size={40} color="rgba(255,255,255,0.2)" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #475569 100%)',
                            borderRadius: '40px',
                            padding: '6rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem' }}>Rejoignez l'élite technologique</h2>
                            <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
                                Votre prochain défi professionnel commence ici. Faites partie de ceux qui façonnent le paysage digital de demain.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#1E6BFF',
                                padding: '1.4rem 4rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                fontSize: '1.2rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                textDecoration: 'none'
                            }}>
                                Envoyer mon CV <ArrowRight size={26} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Careers;
