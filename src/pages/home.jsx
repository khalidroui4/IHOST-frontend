import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Search, ChevronDown, CheckCircle2, Zap, Shield, Headset, Globe, CloudDownload, Check, PhoneCall, CloudLightning, Lock, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../pageTransition';
import LuxeCard from '../components/LuxeCard';
import TechPricingCard from '../components/TechPricingCard';

const domainOptions = [
    '.ma', '.com', '.net', '.info', '.org',
    '.co.ma', '.org.ma', '.net.ma', '.edu.ma',
    '.press.ma', '.gov.ma', '.ac.ma'
];

const Home = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('.ma');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const domainSearchContent = (
        <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative' }}>
            {/* Search Bar Pill */}
            <div style={{
                background: '#e3eff6',
                borderRadius: '50px',
                padding: '6px 6px 6px 20px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                marginBottom: '2rem',
                gap: '0.5rem',
            }}>
                <Search size={20} color="#1E6BFF" style={{ flexShrink: 0, opacity: 0.7 }} />
                <input
                    type="text"
                    placeholder="exemple.ma"
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '0.75rem 0.5rem', fontSize: '1.05rem', color: '#1E6BFF', background: 'transparent', fontWeight: 600, minWidth: 0 }}
                />
                {/* Domain selector button */}
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
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
                        <ul style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(100% + 8px)',
                            background: '#0B1F3A',
                            width: '150px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            borderRadius: '16px',
                            padding: '0.5rem',
                            listStyle: 'none',
                            zIndex: 500,
                            border: '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'left'
                        }}>
                            {domainOptions.map(opt => (
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
            </div>

            {/* Feature Highlights */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', padding: '0 1rem', color: '#E2E8F0', fontSize: '1.05rem', fontWeight: 400 }}>
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
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Hébergez votre projet en<br />toute confiance avec IHOST</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Solutions d'hébergement fiables, noms de domaine et<br />support technique pour particuliers et entreprises au Maroc.</p>
                                <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" style={{ background: '#e3eff6', color: '#1E6BFF', padding: '1.2rem 2.5rem', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', transition: 'all 0.3s ease' }}>
                                        Commencer maintenant <ArrowUpRight size={20} strokeWidth={2.5} />
                                    </Link>
                                    <Link to="/pricing" style={{ background: '#e3eff6', color: '#1E6BFF', padding: '1.2rem 2.5rem', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', transition: 'all 0.3s ease' }}>
                                        Voir les offres <ArrowUpRight size={20} strokeWidth={2.5} />
                                    </Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem' }}>
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
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '2.5rem',
                            maxWidth: '1250px',
                            margin: '0 auto'
                        }}>
                            <TechPricingCard
                                name="CLOUD STARTER"
                                desc="Architecture mutualisée pour projets émergents."
                                price="39"
                                period="DH / HT / MOIS"
                                features={[
                                    "1 Site Web (LVE Restricted)",
                                    "10 GB Stockage (NVMe Gen4)",
                                    "Email Pro (Exim/IMAP)",
                                    "SSL Gratuit (Let's Encrypt)",
                                    "Support 24/7 (Ticket/Chat)"
                                ]}
                                highlight={false}
                                buttonText="CHOISIR CE PLAN"
                                buttonLink="/hebergement/mutualise"
                            />

                            <TechPricingCard
                                name="VPS PRO-X"
                                price="129"
                                period="DH / HT / MOIS"
                                features={[
                                    "4 vCore EPYC (Milan/Genoa)",
                                    "8 GB DDR4 RAM (ECC Registered)",
                                    "100 GB Stockage (Raid 10 NVMe)",
                                    "Snapshot (Daily Backup)",
                                    "Network (1 Gbps Port)"
                                ]}
                                highlight={true}
                                badge="HAUT RENDEMENT"
                                buttonText="DÉPLOYER MAINTENANT"
                                buttonLink="/hebergement/cloud"
                            />

                            <TechPricingCard
                                name="BUSINESS CORE"
                                desc="Solutions web complexes et E-commerce."
                                price="99"
                                period="DH / HT / MOIS"
                                features={[
                                    "Unlimited Sites (Apache/Nginx)",
                                    "Unlimited Space (Pure NVMe)",
                                    "WAF Protection (BitNinja/Luxe)",
                                    "Daily Backups (JetBackup)",
                                    "Dedicated IP (IPv4/IPv6)"
                                ]}
                                highlight={false}
                                buttonText="CHOISIR CE PLAN"
                                buttonLink="/hebergement/ecommerce"
                            />
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

