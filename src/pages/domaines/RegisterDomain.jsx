import React, { useState } from 'react';
import { Search as SearchIcon, Globe, CheckCircle2, ShieldCheck, Zap, Settings, ShoppingCart, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const popularExtensions = [
    { ext: '.com', price: '120', oldPrice: '150', trending: true },
    { ext: '.ma', price: '150', oldPrice: '200', trending: true },
    { ext: '.net', price: '140', oldPrice: '170' },
    { ext: '.org', price: '135', oldPrice: '160' },
    { ext: '.online', price: '40', oldPrice: '80', promo: true },
    { ext: '.store', price: '30', oldPrice: '60', promo: true },
];

const RegisterDomain = () => {
    const [domainQuery, setDomainQuery] = useState('');
    const [searchState, setSearchState] = useState('idle'); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (!domainQuery.trim()) return;

        setSearchState('loading');

        setTimeout(() => {
            if (domainQuery.includes('.taken')) {
                setSearchState('taken');
            } else {
                setSearchState('available');
            }
        }, 1500);
    };

    const SearchComponent = (
        <div className="domain-search-wrapper" style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            padding: '1rem',
            borderRadius: '100px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.3)'
        }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%', alignItems: 'center', background: 'white', borderRadius: '100px', padding: '0.25rem' }}>
                <SearchIcon size={24} color="#4B5563" style={{ marginLeft: '1.5rem' }} />
                <input
                    type="text"
                    placeholder="Tapez le nom de domaine de vos rêves..."
                    value={domainQuery}
                    onChange={(e) => {
                        setDomainQuery(e.target.value);
                        setSearchState('idle');
                    }}
                    style={{
                        flex: 1,
                        border: 'none',
                        padding: '1.2rem',
                        fontSize: '1.2rem',
                        outline: 'none',
                        color: '#1F2937',
                        background: 'transparent'
                    }}
                />
                <button type="submit" className="btn" style={{
                    margin: '0',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '100px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#6366F1',
                    color: 'white',
                    fontWeight: 700
                }}>
                    {searchState === 'loading' ? <Loader2 className="spinner" size={20} /> : 'Rechercher'}
                </button>
            </form>
        </div>
    );

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
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Votre Identité Numérique Commence Ici</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Trouvez l'extension parfaite parmi plus de 500 options et assurez votre présence en ligne en quelques clics.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Enregistrer maintenant <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem' }}>
                                {SearchComponent}
                            </div>
                        </div>
                    </div>
                </section>

                {searchState !== 'idle' && searchState !== 'loading' && (
                    <section className="section-premium" style={{ padding: '4rem 2rem', background: searchState === 'available' ? '#f0fdf4' : '#fff5f5' }}>
                        <div className="container-luxe" style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <div style={{
                                background: 'white',
                                borderRadius: '32px',
                                padding: '4rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                border: searchState === 'available' ? '2px solid #22c55e' : '2px solid #ef4444'
                            }}>
                                {searchState === 'available' ? (
                                    <>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.6rem 1.5rem',
                                            backgroundColor: '#dcfce7',
                                            color: '#166534',
                                            borderRadius: '9999px',
                                            fontWeight: 800,
                                            marginBottom: '1.5rem',
                                            fontSize: '1rem'
                                        }}>
                                            <CheckCircle2 size={20} /> Domaine Disponible
                                        </div>
                                        <h3 style={{ fontSize: '2.5rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>{domainQuery}</h3>
                                        <p style={{ color: '#4B5563', marginBottom: '2.5rem', fontSize: '1.2rem' }}>Félicitations ! Ce nom est libre pour votre projet.</p>
                                        <button className="btn" style={{
                                            padding: '1.2rem 3rem',
                                            borderRadius: '100px',
                                            background: '#22c55e',
                                            color: 'white',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)'
                                        }}>
                                            <ShoppingCart size={22} /> Ajouter au panier
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.6rem 1.5rem',
                                            background: '#fee2e2',
                                            color: '#991b1b',
                                            borderRadius: '9999px',
                                            fontWeight: 800,
                                            marginBottom: '1.5rem',
                                            fontSize: '1rem'
                                        }}>
                                            Indisponible
                                        </div>
                                        <h3 style={{ fontSize: '2.5rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>{domainQuery} est déjà pris</h3>
                                        <p style={{ color: '#4B5563', fontSize: '1.2rem' }}>Ne vous inquiétez pas, essayez une autre variante ou une extension différente ci-dessous.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Extensions Populaires</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Découvrez les extensions les plus prisées pour établir votre crédibilité locale ou internationale.</p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '2rem'
                        }}>
                            {popularExtensions.map((item, idx) => (
                                <div key={idx} className="feature-card" style={{
                                    background: 'white',
                                    padding: '3rem 2rem',
                                    borderRadius: '24px',
                                    textAlign: 'center',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    {item.trending && (
                                        <span style={{ position: 'absolute', top: '15px', right: '15px', background: '#3b82f6', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>POPULAIRE</span>
                                    )}
                                    {item.promo && (
                                        <span style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>PROMO</span>
                                    )}
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1E6BFF', margin: '0 0 1rem 0' }}>{item.ext}</h3>
                                    <p style={{ fontSize: '1rem', color: '#4B5563', textDecoration: 'line-through', margin: '0' }}>{item.oldPrice} DH</p>
                                    <p style={{ fontWeight: 800, color: '#0B1F3A', fontSize: '1.5rem', margin: '0.5rem 0 2rem' }}>{item.price} DH<span style={{ fontSize: '0.9rem', color: '#4B5563', fontWeight: 500 }}> / an</span></p>
                                    <button style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        borderRadius: '12px',
                                        background: '#F5F7FA',
                                        border: 'none',
                                        fontWeight: 700,
                                        color: '#1E6BFF',
                                        cursor: 'pointer'
                                    }}>Choisir</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Tout pour gérer vos domaines</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des outils professionnels inclus avec chaque enregistrement pour une sécurité et une flexibilité totales.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Zap} title="Enregistrement Immédiat" desc="Votre nom de domaine est activé et prêt à l'emploi quelques secondes seulement après votre commande." />
                            <LuxeCard icon={Settings} title="Gestion DNS Premium" desc="Contrôlez l'ensemble de vos enregistrements (A, MX, CNAME, TXT) depuis une interface puissante." />
                            <LuxeCard icon={Globe} title="Redirection Web & Mail" desc="Redirigez facilement vos visiteurs ou vos e-mails vers n'importe quelle adresse de votre choix." />
                            <LuxeCard icon={ShieldCheck} title="Protection WHOIS" desc="Gardez vos coordonnées personnelles privées et protégez-vous contre le spam et le vol d'identité." />
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Déjà propriétaire d'un domaine ?</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                                Transférez-le chez IHOST et profitez d'une année gratuite supplémentaire et d'un support technique d'exception.
                            </p>
                            <Link to="/domaines/transfer" className="btn" style={{
                                background: 'white',
                                color: '#6366F1',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Transférer mon domaine <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default RegisterDomain;
