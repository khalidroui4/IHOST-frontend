import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Search, ChevronDown, CheckCircle2, Zap, Shield, Headset, Globe, CloudDownload, Check, PhoneCall, CloudLightning, Lock, ArrowRight, Star } from 'lucide-react';
import { Link , useNavigate } from 'react-router-dom';
import PageTransition from '../pageTransition';
import LuxeCard from '../components/LuxeCard';
import TechPricingCard from '../components/TechPricingCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../store/slices/serviceSlice';

const Home = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const { items: services, isLoading } = useSelector(state => state.services);

    const dynamicDomainOptions = Array.from(new Set(
        services
            .filter(s => s.typeService === 'domain' && parseInt(s.isActive) === 1)
            .map(s => {
                const extMatch = s.nameService.match(/\.[a-zA-Z]+/);
                return extMatch ? extMatch[0].toLowerCase() : null;
            })
            .filter(Boolean)
    ));
    const domainOptionsList = dynamicDomainOptions;
    const [selectedDomain, setSelectedDomain] = useState('.ma');
    const [domainQuery, setDomainQuery] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!services || services.length === 0) {
            dispatch(fetchServices());
        }
    }, [dispatch, services]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        if (!domainQuery.trim()) return;
        const fullDomain = domainQuery.includes('.') ? domainQuery : `${domainQuery}${selectedDomain}`;
        navigate(`/domaines/register?q=${encodeURIComponent(fullDomain)}`);
    };

    const domainSearchContent = (
        <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative', width: '100%', padding: '0 1rem', overflow: 'visible' }}>
            <form 
                className="domain-search-form"
                onSubmit={handleSearch}
                style={{ overflow: 'visible' }}
            >
                <Search size={20} color="#1E6BFF" style={{ flexShrink: 0, opacity: 0.7 }} className="search-icon-mobile" />
                <input
                    type="text"
                    placeholder="exemple.ma"
                    value={domainQuery}
                    onChange={(e) => setDomainQuery(e.target.value)}
                    className="domain-search-input"
                />
                {/* Domain selector button */}
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            background: '#0B1F3A',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '50px',
                            color: '#fff',
                            padding: '0.75rem 1.4rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            fontSize: '1rem',
                            whiteSpace: 'nowrap',
                            transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1E3A5F'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                    >
                        {selectedDomain} <ChevronDown size={15} />
                    </button>
                    {isDropdownOpen && (
                        <ul className="domain-dropdown-list" style={{
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#0B1F3A',
                            width: '140px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            borderRadius: '16px',
                            padding: '0.5rem',
                            listStyle: 'none',
                            zIndex: 500,
                            border: '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'left'
                        }}>
                            {domainOptionsList.map(opt => (
                                <li
                                    key={opt}
                                    onClick={() => { setSelectedDomain(opt); setIsDropdownOpen(false); }}
                                    style={{ padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: selectedDomain === opt ? '#1E6BFF' : 'rgba(255,255,255,0.8)', borderRadius: '10px', transition: 'all 0.15s ease' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,107,255,0.15)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = selectedDomain === opt ? '#1E6BFF' : 'rgba(255,255,255,0.8)'; }}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button 
                    type="submit"
                    className="domain-search-btn"
                >
                    Rechercher
                </button>
            </form>

            {/* Feature Highlights */}
            <div className="hero-feature-highlights">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={20} color="#FBBF24" fill="#FBBF24" /> Activation rapide
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={20} color="#FBBF24" fill="#FBBF24" /> Protection avancée
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PhoneCall size={20} color="#A1A1AA" fill="#A1A1AA" /> Support 24/7
                </div>
            </div>
        </div>
    );

    return (
        <PageTransition>
            <div className="home">
                <section className="hero">
                    <div className="hero-background"
                        style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/dist/cloud-storage-background-business-network-design.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10, width: '100%' }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '1rem' }}>
                                <h1 className="font-tech hero-title">Hébergez votre projet en<br className="desktop-br"/>toute confiance avec IHOST</h1>
                                <p className="hero-subtext">Solutions d'hébergement fiables, noms de domaine et<br className="desktop-br"/>support technique pour particuliers et entreprises au Maroc.</p>
                                <div className="hero-buttons">
                                    <Link to="/signup" className="hero-btn">
                                        Commencer maintenant <ArrowUpRight size={20} strokeWidth={2.5} />
                                    </Link>
                                    <Link to="/pricing" className="hero-btn hero-btn-outline">
                                        Voir les offres <ArrowUpRight size={20} strokeWidth={2.5} />
                                    </Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem', overflow: 'visible' }}>
                                {domainSearchContent}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium ">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-1px' }}>Nos Offres d’Hébergement</h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des solutions adaptées à chaque type de projet</p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                            gap: '2.5rem',
                            maxWidth: '1250px',
                            margin: '0 auto'
                        }}>
                            {isLoading ? (
                                <div style={{ textAlign: 'center', width: '100%', padding: '4rem', color: 'rgba(255,255,255,0.7)' }}>Chargement des offres...</div>
                            ) : (
                                services
                                    .filter(s => ['CLOUD STARTER', 'VPS PRO-X', 'BUSINESS CORE'].includes(s.nameService) && parseInt(s.isActive) === 1)
                                    .sort((a, b) => {
                                        const order = ['CLOUD STARTER', 'VPS PRO-X', 'BUSINESS CORE'];
                                        return order.indexOf(a.nameService) - order.indexOf(b.nameService);
                                    })
                                    .map(plan => {
                                        let extraInfo = {};
                                        if (plan.nameService === 'CLOUD STARTER') extraInfo = { desc: 'Architecture mutualisée pour projets émergents.', highlight: false };
                                        if (plan.nameService === 'VPS PRO-X') extraInfo = { highlight: true, badge: 'HAUT RENDEMENT' };
                                        if (plan.nameService === 'BUSINESS CORE') extraInfo = { desc: 'Solutions web complexes et E-commerce.', highlight: false };

                                        return (
                                            <TechPricingCard
                                                key={plan.idService}
                                                id={plan.idService}
                                                name={plan.nameService}
                                                desc={extraInfo.desc}
                                                price={plan.price}
                                                period="DH / MOIS"
                                                features={plan.descriptionS ? plan.descriptionS.split(',').map(f => f.trim()) : []}
                                                highlight={extraInfo.highlight}
                                                badge={extraInfo.badge}
                                                buttonText="Ajouter au panier"
                                                addToCartMode={true}
                                            />
                                        );
                                    })
                            )}
                        </div>
                    </div>
                </section>

                <section className="section-premium">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1rem', letterSpacing: '-1px' }}>Pourquoi choisir IHOST ?</h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une infrastructure fiable, sécurisée et performante pour vos projets web.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard variant="dark" icon={CloudLightning} title="Latence < 5ms" desc="Optimisation réseau directe au Maroc. Vos données circulent sur l'infrastructure la plus rapide du Royaume." />
                            <LuxeCard variant="dark" icon={Shield} title="Multi-Layer Security" desc="Protection Anti-DDoS de 2 Tbps, WAF personnalisés et isolation de ressources au niveau du noyau." />
                            <LuxeCard variant="dark" icon={Headset} title="Niveau de Service 24/7" desc="Accès direct à nos ingénieurs système. Pas de file d'attente, seulement des solutions immédiates." />
                            <LuxeCard variant="dark" icon={CheckCircle2} title="Disponibilité 99.99%" desc="Engagement contractuel (SLA) sur la continuité de service. Infrastructure redondante N+1." />
                            <LuxeCard variant="dark" icon={Globe} title="Souveraineté des Données" desc="Stockage localisé respectant les normes de conformité et garantissant une protection juridique totale." />
                            <LuxeCard variant="dark" icon={Zap} title="Stack Technologique" desc="NVMe Gen4, processeurs AMD EPYC™, et optimisation LSCache intégrée par défaut." />
                        </div>
                    </div>
                </section>

                <section className="section-premium" style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    padding: '8rem 2rem', 
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div className="pattern-grid-tech" style={{ opacity: 0.2 }} />
                    <div className="container-luxe" style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'auto', padding: 0 }}>
                        <h2 className="font-tech" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '-2px', color: 'white' }}>PRÊT À DÉPLOYER ?</h2>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', maxWidth: '800px', lineHeight: '1.6' }}>
                            Activez votre infrastructure en moins de 60 secondes. Rejoignez les entreprises qui choisissent la performance et la sécurité marocaine.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/signUp" className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1rem' }}>INITIALISER MON COMPTE</Link>
                            <Link to="/entreprise/about" className="btn btn-outline" style={{ padding: '1.5rem 4rem', fontSize: '1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>PARLER À UN EXPERT</Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;

