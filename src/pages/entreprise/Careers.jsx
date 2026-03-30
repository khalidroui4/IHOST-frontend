import React from 'react';
import { Briefcase, ArrowRight, Lightbulb, TrendingUp, Users, Zap, CheckCircle2, MapPin, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './Careers.css';

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
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/tech-company.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">Bâtissons le Futur du Cloud</h1>
                                <p className="hero-description">Rejoignez une équipe d'élite passionnée par l'innovation, la performance et la cybersécurité. Donnez une nouvelle dimension à votre carrière chez IHOST.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Voir les Postes Ouverts <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Pourquoi Rejoindre IHOST ?</h2>
                            <p className="section-subtitle">Une culture d'excellence, d'apprentissage continu et d'impact réel sur l'écosystème numérique.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Lightbulb} title="Innovation Constante" desc="Travaillez avec les dernières stacks technologiques (Kubernetes, Terraform, React) et relevez des défis techniques stimulants au quotidien." />
                            <LuxeCard icon={TrendingUp} title="Épanouissement Pro" desc="Bénéficiez de budgets de formation certifiante (AWS, GCP, Cisco) et d'un plan de carrière clair orienté vers le leadership ou l'expertise." />
                            <LuxeCard icon={Users} title="Mindset Collaboratif" desc="Évoluez dans un environnement bienveillant avec une hiérarchie plate où chaque idée est écoutée, du stagiaire au CEO." />
                            <LuxeCard icon={Zap} title="Impact Direct" desc="Vos développements et vos décisions d'architecture impactent directement des milliers d'entreprises et des millions d'utilisateurs." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Postes Ouverts Actuellement</h2>
                            <p className="section-subtitle">Trouvez la mission qui résonne avec vos ambitions.</p>
                        </div>
                        <div className="jobs-list">
                            {jobs.map((job, idx) => (
                                <div key={idx} className="job-card hover-lift">
                                    <div>
                                        <div className="job-title-group">
                                            <div className="job-icon">
                                                <job.icon size={20} />
                                            </div>
                                            <h3 className="job-title">{job.role}</h3>
                                        </div>
                                        <div className="job-meta">
                                            <div className="job-meta-item">
                                                <Briefcase size={16} /> {job.department}
                                            </div>
                                            <div className="job-meta-item">
                                                <MapPin size={16} /> {job.location}
                                            </div>
                                            <div className="job-meta-item">
                                                <Clock size={16} /> {job.type}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="job-btn hover-lift">
                                        Détails <ArrowRight size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="culture-container">
                            <div className="culture-content">
                                <h2 className="culture-title">La Vie chez IHOST</h2>
                                <p className="culture-desc">
                                    Au-delà du code et des serveurs, IHOST c'est une communauté vibrante. Nous croyons en l'équilibre vie pro/vie privée, dans le partage de connaissances et dans le plaisir de travailler ensemble sur des projets d'envergure.
                                </p>
                                <div className="culture-grid">
                                    {[
                                        "Setup Hardware Premium",
                                        "Assurance Santé Top",
                                        "Teambuildings Réguliers",
                                        "Télétravail Flexible"
                                    ].map((benefit, i) => (
                                        <div key={i} className="culture-item">
                                            <CheckCircle2 size={24} color="#10b981" /> {benefit}
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-wrap-fix">Candidature Spontanée</button>
                            </div>
                            <div className="culture-visual">
                                <div className="culture-visual-grid">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="culture-visual-box">
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
                        <div className="cta-container">
                            <h2 className="cta-title">Rejoignez l'élite technologique</h2>
                            <p className="cta-desc">
                                Votre prochain défi professionnel commence ici. Faites partie de ceux qui façonnent le paysage digital de demain.
                            </p>
                            <Link to="/contact" className="btn cta-link">
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
