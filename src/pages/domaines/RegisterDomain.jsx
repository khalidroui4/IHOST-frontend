import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Shield, Zap, Headphones, CheckCircle2, XCircle, ShoppingCart, ArrowRight, Loader2, Settings, ShieldCheck, ChevronDown } from 'lucide-react';
import DomainRegistrationModal from '../../components/DomainRegistrationModal';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { fetchServices } from '../../store/slices/serviceSlice';
import axios from 'axios';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import { useToast } from '../../context/ToastContext';



const RegisterDomain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [domainQuery, setDomainQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const { addToast } = useToast();

    const [selectedExtension, setSelectedExtension] = useState('.com');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { items: services, isLoading: isLoadingServices } = useSelector(state => state.services);
    const { isAuthenticated, user } = useSelector(state => state.auth);

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

    const dynamicDomainOptions = Array.from(new Set([
        ...services
            .filter(s => s.typeService === 'domain' && parseInt(s.isActive) === 1)
            .map(s => {
                const extMatch = s.nameService.match(/\.[a-zA-Z]+/);
                return extMatch ? extMatch[0].toLowerCase() : null;
            })
            .filter(Boolean),
        '.com', '.ma', '.net', '.org', '.tech', '.dev', '.store', '.co', '.info', '.me'
    ]));
    const domainOptionsList = dynamicDomainOptions;

    const fallbackExtensions = [
        { ext: '.ma', price: '139', trending: true, promo: false },
        { ext: '.com', price: '119', trending: true, promo: false },
        { ext: '.net', price: '129', trending: false, promo: false },
        { ext: '.org', price: '139', trending: false, promo: false },
        { ext: '.tech', price: '89', trending: false, promo: true },
        { ext: '.dev', price: '149', trending: false, promo: false },
        { ext: '.store', price: '79', trending: false, promo: true },
        { ext: '.co', price: '169', trending: false, promo: false },
        { ext: '.info', price: '99', trending: false, promo: true },
        { ext: '.me', price: '109', trending: false, promo: false }
    ];

    const dynamicExtensionsMap = new Map();

    fallbackExtensions.forEach(f => {
        const priceVal = parseFloat(f.price);
        dynamicExtensionsMap.set(f.ext, {
            ext: f.ext,
            price: f.price,
            oldPrice: (priceVal * 1.25).toFixed(0),
            trending: f.trending,
            promo: f.promo
        });
    });

    services
        .filter(s => s.typeService === 'domain' && parseInt(s.isActive) === 1)
        .forEach(s => {
            const extMatch = s.nameService.match(/\.[a-zA-Z]+/);
            if (extMatch) {
                const ext = extMatch[0].toLowerCase();
                const priceVal = parseFloat(s.price);
                dynamicExtensionsMap.set(ext, {
                    ext,
                    price: s.price,
                    oldPrice: (priceVal * 1.25).toFixed(0),
                    trending: ext === '.com' || ext === '.ma' || ext === '.dev' || ext === '.store',
                    promo: priceVal < 100
                });
            }
        });

    const popularExtensions = Array.from(dynamicExtensionsMap.values());

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
            setDomainQuery(query);
            performSearch(query);
        }
    }, [location.search]);

    const performSearch = async (query) => {
        if (!query.trim()) return;
        setIsSearching(true);
        setSearchResult(null);
        try {
            const res = await axios.get(`/IHOST-backend/domains/check/${query}`);
            setSearchResult({
                domain: res.data.domain || query,
                available: res.data.available
            });
        } catch (err) {
            addToast("Erreur lors de la vérification du domaine", "error");
            setSearchResult({
                domain: query,
                available: false,
                error: err.message
            });
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!domainQuery.trim()) return;
        const fullDomain = domainQuery.includes('.') ? domainQuery : `${domainQuery}${selectedExtension}`;
        performSearch(fullDomain);
    };

    const handleOpenModal = () => {
        if (!searchResult || !searchResult.available) return;
        
        if (!isAuthenticated) {
            addToast("Veuillez vous inscrire ou vous connecter pour enregistrer un domaine.", "info");
            navigate('/signUp');
            return;
        }

        if (user?.role === 'admin') {
            addToast("Les administrateurs ne peuvent pas acheter de services.", "error");
            return;
        }
        
        const ext = '.' + searchResult.domain.split('.').pop();
        const matchingExt = popularExtensions.find(p => p.ext === ext) || popularExtensions[0];
        
        setSelectedDomain({
            name: searchResult.domain,
            price: matchingExt.price
        });
        setShowModal(true);
    };

    const handleConfirmRegistration = async (config) => {
        setShowModal(false);
        const { domainName, durationYears, includePrivacy, totalPrice } = config;
        
        try {
            const ext = '.' + domainName.split('.').pop().toLowerCase();
            const domainService = services.find(s => {
                const sExt = s.nameService.toLowerCase().match(/\.[a-zA-Z]+/)?.[0];
                return sExt === ext;
            }) || services.find(s => s.nameService.toLowerCase().includes(ext)) || services.find(s => s.nameService.toLowerCase().includes('domaine'));

            if (!domainService) {
                addToast("Service d'enregistrement pour " + ext + " non trouvé.", "error");
                return;
            }

            await dispatch(addToCart({
                idService: domainService.idService,
                domainName: domainName,
                durationMonths: durationYears * 12,
                nameService: `Domaine: ${domainName} (${durationYears} ${durationYears > 1 ? 'Ans' : 'An'}${includePrivacy ? ' + Protection WHOIS' : ''})`,
                price: totalPrice,
                includePrivacy: includePrivacy
            })).unwrap();
            
            addToast(`${domainName} ajouté au panier`, 'success');
            navigate('/client/cart');
        } catch (err) {
            addToast(err.message || "Erreur lors de l'ajout au panier", "error");
        }
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
                <Search size={24} color="#4B5563" style={{ marginLeft: '1.5rem', flexShrink: 0 }} />
                <input
                    type="text"
                    placeholder="Tapez le nom de domaine de vos rêves..."
                    value={domainQuery}
                    onChange={(e) => {
                        setDomainQuery(e.target.value);
                        setSearchResult(null);
                    }}
                    style={{
                        flex: 1,
                        border: 'none',
                        padding: '1.2rem',
                        fontSize: '1.2rem',
                        outline: 'none',
                        color: '#1F2937',
                        background: 'transparent',
                        minWidth: 0
                    }}
                />
                
                {/* Custom Extension Dropdown */}
                <div style={{ position: 'relative', marginRight: '0.5rem' }} ref={dropdownRef}>
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
                            fontSize: '1.1rem',
                            whiteSpace: 'nowrap',
                            transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#1E3A5F'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                    >
                        {selectedExtension} <ChevronDown size={15} />
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
                                    onClick={() => { setSelectedExtension(opt); setIsDropdownOpen(false); }}
                                    style={{ padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600, color: selectedExtension === opt ? '#1E6BFF' : 'rgba(255,255,255,0.8)', borderRadius: '10px', transition: 'all 0.15s ease' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,107,255,0.15)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = selectedExtension === opt ? '#1E6BFF' : 'rgba(255,255,255,0.8)'; }}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

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
                    {isSearching ? <Loader2 className="spinner" size={20} /> : 'Rechercher'}
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
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'url(/man-selecting-domain.webp)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.35,
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Votre Identité Numérique Commence Ici</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Trouvez l'extension parfaite parmi plus de 500 options et assurez votre présence en ligne en quelques clics.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem', display: 'flex' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>Enregistrer maintenant <ArrowRight size={20} /></Link>
                                    <Link to="/domaines/pricing" className="btn" style={{
                                        padding: '1.2rem 3rem',
                                        fontSize: '1rem',
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        color: '#ffffff',
                                        borderRadius: '100px',
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                                    >
                                        Voir les tarifs des extensions
                                    </Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem' }}>
                                {SearchComponent}
                            </div>
                        </div>
                    </div>
                </section>

                {searchResult && (
                    <section className="section-premium" style={{ padding: '4rem 2rem', background: searchResult.available ? '#f0fdf4' : '#fff5f5' }}>
                        <div className="container-luxe" style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <div style={{
                                background: 'white',
                                borderRadius: '32px',
                                padding: '4rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                                border: searchResult.available ? '2px solid #22c55e' : '2px solid #ef4444'
                            }}>
                                {searchResult.available ? (
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
                                        <h3 style={{ fontSize: '2.5rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>{searchResult.domain}</h3>
                                        <p style={{ color: '#4B5563', marginBottom: '2.5rem', fontSize: '1.2rem' }}>Félicitations ! Ce nom est libre pour votre projet.</p>
                                        <button 
                                            onClick={handleOpenModal}
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.75rem', 
                                                background: '#10b981', 
                                                color: 'white', 
                                                border: 'none', 
                                                padding: '1.25rem 2.5rem', 
                                                borderRadius: '16px', 
                                                fontWeight: 800, 
                                                fontSize: '1.1rem',
                                                cursor: 'pointer',
                                                boxShadow: '0 10px 20px rgba(16,185,129,0.25)',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <ShoppingCart size={22} /> Choisir ce domaine
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
                                        <h3 style={{ fontSize: '2.5rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>{searchResult.domain} est déjà pris</h3>
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
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
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
                                color: '#1E6BFF',
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

            {selectedDomain && (
                <DomainRegistrationModal 
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirmRegistration}
                    initialDomain={selectedDomain.name}
                    popularExtensions={popularExtensions}
                />
            )}
        </PageTransition>
    );
};

export default RegisterDomain;
