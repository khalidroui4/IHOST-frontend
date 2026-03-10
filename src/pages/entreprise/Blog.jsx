import React from 'react';
import { Newspaper, ChevronRight, Tags, Calendar, User, ArrowRight, Search, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const Blog = () => {
    const articles = [
        {
            category: 'Hébergement Web',
            title: 'VPS vs Hébergement Mutualisé : Lequel choisir pour votre e-commerce ?',
            excerpt: 'Découvrez les différences majeures en termes de performances, sécurité et flexibilité pour soutenir la croissance de votre boutique.',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
            date: '15 Octobre 2023',
            author: 'Amine R.'
        },
        {
            category: 'Sécurité Web',
            title: 'Les 5 failles de sécurité WordPress les plus courantes en 2024',
            excerpt: 'Protégez votre CMS préféré avec ces correctifs simples : mots de passe faibles, plugins obsolètes et brèches d\'injection SQL.',
            image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
            date: '02 Novembre 2023',
            author: 'Sarah M.'
        },
        {
            category: 'Développement Web',
            title: 'Transition vers React 19 : Améliorez les Web Vitals de votre site',
            excerpt: 'Comment le Concurrent Rendering et les Server Components peuvent diviser votre First Contentful Paint (FCP) par deux.',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
            date: '28 Novembre 2023',
            author: 'Yassine K.'
        },
        {
            category: 'Marketing Digital',
            title: 'Impact du "Helpful Content Update" de Google sur les sites locaux',
            excerpt: 'Les anciennes stratégies SEO sont mortes. Voici comment créer un contenu qui plaira aux algorithmes et aux humains en 2024.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            date: '10 Décembre 2023',
            author: 'Laila B.'
        }
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
                            backgroundImage: 'url(/about-hero.png)',
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
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>L'Actualité du Cloud</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Tendances technologiques, guides d'expert et visions du futur. Le blog IHOST est votre boussole dans l'écosystème numérique en constante évolution.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>S'abonner à la Newsletter <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div style={{
                            maxWidth: '1200px',
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                padding: '1rem',
                                background: '#F5F7FA',
                                borderRadius: '100px',
                                width: 'fit-content',
                                margin: '0 auto'
                            }}>
                                {['Tous', 'Hébergement', 'Sécurité', 'Cloud', 'DevOps'].map((cat, i) => (
                                    <span key={i} style={{
                                        padding: '0.8rem 2rem',
                                        background: i === 0 ? '#1E6BFF' : 'white',
                                        color: i === 0 ? 'white' : '#4B5563',
                                        borderRadius: '999px',
                                        cursor: 'pointer',
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        boxShadow: i === 0 ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)' : 'none',
                                        transition: 'all 0.3s ease-in-out'
                                    }} className="hover-lift">
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                gap: '3rem'
                            }}>
                                {articles.map((article, idx) => (
                                    <div key={idx} style={{
                                        background: 'white',
                                        borderRadius: '40px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                        border: '1px solid rgba(11, 31, 58, 0.1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease-in-out'
                                    }} className="hover-lift">
                                        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                                            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <span style={{
                                                position: 'absolute',
                                                top: '1.5rem',
                                                left: '1.5rem',
                                                background: 'white',
                                                padding: '0.5rem 1.2rem',
                                                borderRadius: '100px',
                                                fontSize: '0.75rem',
                                                fontWeight: 900,
                                                color: '#1E6BFF',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                            }}>
                                                {article.category}
                                            </span>
                                        </div>
                                        <div style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', gap: '1.5rem', color: '#4B5563', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <Calendar size={14} /> {article.date}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <User size={14} /> Par {article.author}
                                                </div>
                                            </div>
                                            <h3 style={{ fontSize: '1.6rem', color: '#0B1F3A', marginBottom: '1.5rem', fontWeight: 900, lineHeight: '1.3' }}>{article.title}</h3>
                                            <p style={{ color: '#4B5563', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem', flex: 1 }}>{article.excerpt}</p>
                                            <button style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#1E6BFF',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                padding: 0,
                                                cursor: 'pointer',
                                                fontSize: '1rem'
                                            }}>
                                                Lire l'article <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Plus de Ressources</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Explorez nos guides techniques pour maîtriser votre infrastructure.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Zap} title="Guides de Migration" desc="Passez d'un autre hébergeur vers IHOST sans aucune interruption grâce à nos checklists détaillées." />
                            <LuxeCard icon={Search} title="Ebook SEO 2024" desc="Téléchargez gratuitement notre guide blanc sur l'optimisation des Core Web Vitals pour votre boutique." />
                            <Link to="/contact" style={{ textDecoration: 'none' }}>
                                <LuxeCard icon={Newspaper} title="Webinaires Experts" desc="Inscrivez-vous à nos sessions Live mensuelles avec nos ingénieurs Cloud sur les architectures scalables." />
                            </Link>
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
                                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>Soyez au courant des évolutions</h2>
                                <p style={{ fontSize: '1.3rem', opacity: 0.8, marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem' }}>
                                    Recevez chaque mois les meilleurs articles techniques et les nouveautés de l'infrastructure Cloud directement dans votre boîte mail.
                                </p>
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    justifyContent: 'center',
                                    maxWidth: '500px',
                                    margin: '0 auto'
                                }}>
                                    <input
                                        type="email"
                                        placeholder="Votre adresse email"
                                        style={{
                                            flex: 1,
                                            padding: '1.2rem 2rem',
                                            borderRadius: '100px',
                                            border: 'none',
                                            fontSize: '1.1rem',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                        }}
                                    />
                                    <button className="btn" style={{ padding: '1.2rem 3rem', borderRadius: '100px', fontWeight: 800, background: '#1E6BFF', border: 'none', color: 'white' }}>OK</button>
                                </div>
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '-30%',
                                left: '-10%',
                                width: '500px',
                                height: '500px',
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

export default Blog;
