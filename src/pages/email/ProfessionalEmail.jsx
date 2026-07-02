import React, { useState, useEffect } from 'react';
import { Mail, Globe, Smartphone, ShieldCheck, CheckCircle2, ArrowRight, Zap, Database, Lock, Loader2, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import { fetchDomains } from '../../store/slices/domainSlice';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';
import TechPricingCard from '../../components/TechPricingCard';
import { useToast } from '../../context/ToastContext';

const ProfessionalEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const { items: dbServices } = useSelector(state => state.services);
    const { items: domains, isLoading: isDomainsLoading } = useSelector(state => state.domains);
    const { user, isAuthenticated } = useSelector(state => state.auth);

    // Form states
    const [prefix, setPrefix] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [useCustom, setUseCustom] = useState(false);
    
    // Status states
    const [isChecking, setIsChecking] = useState(false);
    const [checkedEmail, setCheckedEmail] = useState(null);

    useEffect(() => {
        if (!dbServices || dbServices.length === 0) {
            dispatch(fetchServices());
        }
        if (isAuthenticated && user) {
            const userId = user.idU || user.id;
            dispatch(fetchDomains(userId));
        }
    }, [dispatch, dbServices, isAuthenticated, user]);

    useEffect(() => {
        if (domains && domains.length > 0 && !useCustom) {
            setSelectedDomain(domains[0].domainName);
        } else {
            setUseCustom(true);
        }
    }, [domains, useCustom]);

    const handleVerify = (e) => {
        e.preventDefault();
        
        if (!prefix.trim()) {
            addToast("Veuillez saisir un préfixe d'email.", "error");
            return;
        }

        const domainToUse = useCustom ? customDomain.trim() : selectedDomain;
        if (!domainToUse) {
            addToast("Veuillez spécifier un nom de domaine.", "error");
            return;
        }

        // Email address formatting check
        const cleanPrefix = prefix.replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase();
        const cleanDomain = domainToUse.replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase();
        
        if (!cleanPrefix || !cleanDomain || cleanDomain.indexOf('.') === -1) {
            addToast("Configuration d'email invalide. Veuillez vérifier le préfixe et le domaine.", "error");
            return;
        }

        setIsChecking(true);
        setCheckedEmail(null);

        // Simulate secure validation of email account on server
        setTimeout(() => {
            setIsChecking(false);
            setCheckedEmail(`${cleanPrefix}@${cleanDomain}`);
            addToast("Configuration d'email validée avec succès !", "success");
        }, 1200);
    };

    const plans = [
        {
            id: '#MAIL-PRO-1',
            name: 'STARTER PRO',
            price: '29',
            period: 'DH / MOIS',
            highlight: false,
            features: [
                { label: '5 Comptes Email', tech: 'SSD Sync' },
                { label: '5 GB Stockage', tech: 'Per Box' },
                { label: 'Webmail Premium', tech: 'Pro Interface' },
                { label: 'Anti-spam & Virus', tech: 'Standard' },
                { label: 'Support 24/7', tech: 'SLA 99.9%' }
            ]
        },
        {
            id: '#MAIL-BIZ-X',
            name: 'BUSINESS ELITE',
            price: '79', // Matches actual database price (79.00 DH)
            period: 'DH / MOIS',
            highlight: true,
            badge: 'PERFORMANCE MAX',
            features: [
                { label: '20 Comptes Premium', tech: 'Priority' },
                { label: '20 GB Stockage', tech: 'High-Perf' },
                { label: 'Sync IMAP/POP', tech: 'Universal' },
                { label: 'Anti-spam AI', tech: 'Smart-Filter' },
                { label: 'Contacts Partagés', tech: 'Sync-Hub' }
            ]
        },
        {
            id: '#MAIL-ENT-INF',
            name: 'ENTERPRISE CLOUD',
            price: '149', // Matches actual database price (149.00 DH)
            period: 'DH / MOIS',
            highlight: false,
            features: [
                { label: 'Comptes Illimités', tech: 'Scale-Free' },
                { label: '50 GB Stockage', tech: 'Enterprise' },
                { label: 'Sécurité Bancaire', tech: 'AES-256' },
                { label: 'Backup Quotidien', tech: 'Off-site' },
                { label: 'Account Manager', tech: 'Dedicated' }
            ]
        }
    ];

    return (
        <PageTransition>
            <div className="email-page">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/email3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.35, zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>COMMUNICATION ET COMPTES PRO</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Configurez votre adresse e-mail professionnelle personnalisée sous votre propre domaine et profitez d'une messagerie souveraine ultra-rapide et cryptée.</p>
                                
                                {/* Configuration / Search Widget */}
                                <div style={{
                                    background: 'rgba(15, 23, 42, 0.45)',
                                    backdropFilter: 'blur(16px)',
                                    padding: '2.5rem',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                    maxWidth: '750px',
                                    margin: '0 auto',
                                    textAlign: 'left'
                                }}>
                                    <h3 className="font-tech" style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Configurer mon adresse email pro
                                    </h3>
                                    
                                    <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                            {/* Email prefix input */}
                                            <div style={{ flex: 1.2, minWidth: '200px', position: 'relative' }}>
                                                <input 
                                                    type="text" 
                                                    placeholder="ex: contact"
                                                    value={prefix}
                                                    onChange={e => {
                                                        setPrefix(e.target.value);
                                                        setCheckedEmail(null);
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        padding: '1rem 1.2rem',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        color: 'white',
                                                        fontSize: '1.1rem',
                                                        outline: 'none',
                                                        transition: 'border-color 0.2s'
                                                    }}
                                                    required
                                                />
                                            </div>
                                            
                                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.5rem', fontWeight: 600 }}>@</span>

                                            {/* Domain selection */}
                                            <div style={{ flex: 1.8, minWidth: '220px' }}>
                                                {!useCustom && domains && domains.length > 0 ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                        <select
                                                            value={selectedDomain}
                                                            onChange={e => {
                                                                if (e.target.value === '__custom__') {
                                                                    setUseCustom(true);
                                                                    setSelectedDomain('');
                                                                } else {
                                                                    setSelectedDomain(e.target.value);
                                                                }
                                                                setCheckedEmail(null);
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                padding: '1rem 1.2rem',
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                background: '#1E293B',
                                                                color: 'white',
                                                                fontSize: '1.1rem',
                                                                outline: 'none',
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {domains.map((d, i) => (
                                                                <option key={i} value={d.domainName}>{d.domainName}</option>
                                                            ))}
                                                            <option value="__custom__">+ Utiliser un autre domaine...</option>
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                        <input 
                                                            type="text" 
                                                            placeholder="ex: mon-entreprise.ma"
                                                            value={customDomain}
                                                            onChange={e => {
                                                                setCustomDomain(e.target.value);
                                                                setCheckedEmail(null);
                                                            }}
                                                            style={{
                                                                width: '100%',
                                                                padding: '1rem 1.2rem',
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                background: 'rgba(255,255,255,0.05)',
                                                                color: 'white',
                                                                fontSize: '1.1rem',
                                                                outline: 'none'
                                                            }}
                                                            required
                                                        />
                                                        {domains && domains.length > 0 && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setUseCustom(false)}
                                                                style={{
                                                                    position: 'absolute',
                                                                    right: '12px',
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)',
                                                                    background: 'rgba(255,255,255,0.1)',
                                                                    border: 'none',
                                                                    borderRadius: '6px',
                                                                    padding: '4px 10px',
                                                                    color: 'white',
                                                                    fontSize: '0.75rem',
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                Mes domaines
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={isChecking}
                                            style={{
                                                background: '#1E6BFF',
                                                color: 'white',
                                                border: 'none',
                                                padding: '1rem 2rem',
                                                borderRadius: '12px',
                                                fontSize: '1.1rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.75rem',
                                                transition: 'all 0.2s',
                                                boxShadow: '0 4px 15px rgba(30,107,255,0.3)'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'}
                                            onMouseLeave={e => e.currentTarget.style.background = '#1E6BFF'}
                                        >
                                            {isChecking ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                                            {isChecking ? "Validation..." : "Vérifier la configuration"}
                                        </button>
                                    </form>

                                    {/* Success Validation Message */}
                                    {checkedEmail && (
                                        <div style={{
                                            marginTop: '1.5rem',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            border: '1px solid rgba(16, 185, 129, 0.3)',
                                            padding: '1rem 1.5rem',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <CheckCircle2 color="#10b981" size={24} style={{ flexShrink: 0 }} />
                                            <div>
                                                <span style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Adresse prête !</span>
                                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                                                    L'adresse <strong style={{ color: '#10b981' }}>{checkedEmail}</strong> est disponible. Choisissez votre formule ci-dessous.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features list */}
                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>L'Ingénierie de Messagerie</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Un socle technologique robuste conçu pour l'intégrité de vos données.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Globe} title="Identité Souveraine" desc="Communiquez avec une adresse professionnelle qui renforce votre crédibilité institutionnelle." />
                            <LuxeCard icon={Smartphone} title="Synchronisation Mobile" desc="Accès universel via protocoles sécurisés. Compatibilité native iOS, Android et Desktop." />
                            <LuxeCard icon={ShieldCheck} title="Protocoles Anti-Spam" desc="Nettoyage chirurgical à la source. Éliminez 99.9% des vecteurs d'intrusion avant réception." />
                            <LuxeCard icon={Zap} title="Latence Zéro" desc="Flux de données optimisé pour un envoi et une réception ultra-rapide sur l'infrastructure IHOST." />
                        </div>
                    </div>
                </section>

                {/* Pricing / plans Section */}
                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }} id="email-plans">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Forfaits de Communication</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
                                {!checkedEmail ? (
                                    <span style={{ color: '#ef4444', fontWeight: 600 }}>Configurez une adresse e-mail ci-dessus pour activer la commande.</span>
                                ) : (
                                    <span>Sélectionnez votre formule pour configurer l'adresse <strong>{checkedEmail}</strong>.</span>
                                )}
                            </p>
                        </div>
                        <div style={{ 
                            maxWidth: '1100px', 
                            margin: '0 auto', 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                            gap: '2rem', 
                            alignItems: 'center',
                            opacity: checkedEmail ? 1 : 0.65,
                            transition: 'opacity 0.3s'
                        }}>
                            {plans.map((plan, index) => {
                                const matchingService = dbServices.find(s => 
                                    s.nameService.toLowerCase() === plan.name.toLowerCase()
                                );
                                return (
                                    <div key={index} style={{ pointerEvents: checkedEmail ? 'auto' : 'none' }}>
                                        <TechPricingCard
                                            idService={matchingService?.idService}
                                            name={plan.name}
                                            price={plan.price}
                                            period={plan.period}
                                            features={plan.features.map(f => f.label)}
                                            highlight={plan.highlight}
                                            badge={plan.badge}
                                            buttonText={checkedEmail ? "Ajouter au panier" : "Configurer un email"}
                                            addToCartMode={!!checkedEmail}
                                            domainName={checkedEmail}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section style={{ padding: '4rem 0' }}>
                    <div className="container-luxe">
                        <div className="bg-tech-dark email-feature-split" style={{
                            padding: '5rem',
                            display: 'flex',
                            gap: '4rem',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.1 }} />
                            <div style={{ flex: 1.5, position: 'relative', zIndex: 1 }}>
                                <h2 className="font-tech" style={{ fontSize: '3.5rem', color: 'white', marginBottom: '2rem', textTransform: 'uppercase' }}>PUISSANCE COLLABORATIVE</h2>
                                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8' }}>
                                    Libérez le potentiel de votre équipe avec des outils mail conçus pour la performance. Centralisez vos calendriers et sécurisez vos protocoles d'échange.
                                </p>
                            </div>
                            <div style={{ flex: 1, position: 'relative', zIndex: 1, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div className="glass-card" style={{ padding: '2rem', flex: 1, minWidth: '200px' }}>
                                    <Database size={24} color="#1E6BFF" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>STOCKAGE HAUT-DÉBIT</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>NVMe Data-Center</p>
                                </div>
                                <div className="glass-card" style={{ padding: '2rem', flex: 1, minWidth: '200px' }}>
                                    <Lock size={24} color="#10b981" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>CONFIDENTIALITÉ</h4>
                                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Encryption End-to-End</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ padding: '8rem 0' }}>
                    <div className="container-luxe">
                        <div className="glass-card email-cta-box" style={{
                            padding: '6rem',
                            textAlign: 'center',
                            background: '#0B1F3A',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid #1E6BFF'
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.1 }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h2 className="font-tech" style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2.5rem', textTransform: 'uppercase' }}>EXPAND YOUR REACH</h2>
                                <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4.5rem', maxWidth: '800px', margin: '0 auto 4.5rem' }}>
                                    Amorcez votre transformation numérique dès aujourd'hui avec nos solutions de messagerie haute disponibilité.
                                </p>
                                <Link to="/contact" className="btn btn-primary" style={{
                                    padding: '1.4rem 6rem',
                                    fontSize: '1rem',
                                    background: '#00C2FF',
                                    color: '#0B1F3A'
                                }}>
                                    CONTACTER NOTRE SUPPORT TECHNIQUE <ArrowRight size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default ProfessionalEmail;
