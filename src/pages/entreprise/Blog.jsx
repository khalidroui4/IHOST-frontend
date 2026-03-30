import React from 'react';
import { Newspaper, ChevronRight, Tags, Calendar, User, ArrowRight, Search, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import './Blog.css';

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
                    <div className="hero-background-dark">
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div className="hero-image-overlay" style={{ backgroundImage: 'url(/tech-company.jpg)' }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div className="hero-text-container">
                                <h1 className="font-tech hero-title">L'Actualité du Cloud</h1>
                                <p className="hero-description">Tendances technologiques, guides d'expert et visions du futur. Le blog IHOST est votre boussole dans l'écosystème numérique en constante évolution.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>S'abonner à la Newsletter <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-luxe">
                        <div className="blog-container">
                            <div className="blog-filters">
                                {['Tous', 'Hébergement', 'Sécurité', 'Cloud', 'DevOps'].map((cat, i) => (
                                    <span key={i} className={`blog-filter hover-lift ${i === 0 ? 'active' : ''}`}>
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            <div className="blog-grid">
                                {articles.map((article, idx) => (
                                    <div key={idx} className="article-card hover-lift">
                                        <div className="article-image-container">
                                            <img src={article.image} alt={article.title} className="article-image" />
                                            <span className="article-category">{article.category}</span>
                                        </div>
                                        <div className="article-content">
                                            <div className="article-meta">
                                                <div className="article-meta-item">
                                                    <Calendar size={14} /> {article.date}
                                                </div>
                                                <div className="article-meta-item">
                                                    <User size={14} /> Par {article.author}
                                                </div>
                                            </div>
                                            <h3 className="article-title">{article.title}</h3>
                                            <p className="article-excerpt">{article.excerpt}</p>
                                            <button className="article-btn">
                                                Lire l'article <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light section-padding">
                    <div className="container-luxe">
                        <div className="section-header-container">
                            <h2 className="section-title">Plus de Ressources</h2>
                            <p className="section-subtitle">Explorez nos guides techniques pour maîtriser votre infrastructure.</p>
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
                        <div className="newsletter-container">
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 className="newsletter-title">Soyez au courant des évolutions</h2>
                                <p className="newsletter-desc">
                                    Recevez chaque mois les meilleurs articles techniques et les nouveautés de l'infrastructure Cloud directement dans votre boîte mail.
                                </p>
                                <div className="newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="Votre adresse email"
                                        className="newsletter-input"
                                    />
                                    <button className="newsletter-btn hover-lift">OK</button>
                                </div>
                            </div>
                            <div className="newsletter-glow"></div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Blog;
