import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Search, ChevronDown, CheckCircle2, Zap, Shield, Headset, Globe, CloudDownload, Check, PhoneCall, CloudLightning, Lock, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../pageTransition';
import LuxeCard from '../components/LuxeCard';

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
        <div className="glass-card" style={{
            padding: '0.75rem',
            borderRadius: '8px',
            maxWidth: '700px',
            margin: '0 auto',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
            <div style={{ display: 'flex', background: 'white', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', color: '#0B1F3A' }}>
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Vérifier la disponibilité (ex: monentreprise.ma)"
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '1rem', fontSize: '1rem', fontFamily: 'Inter' }}
                />
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{ background: '#f8fafc', border: 'none', borderLeft: '1px solid #e2e8f0', color: '#0B1F3A', padding: '0 1.5rem', height: '100%', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {selectedDomain} <ChevronDown size={14} />
                    </button>
                    {isDropdownOpen && (
                        <ul style={{ position: 'absolute', top: '100%', right: 0, background: 'white', width: '120px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)', borderRadius: '4px', padding: '0.5rem', listStyle: 'none', zIndex: 100, border: '1px solid #e2e8f0' }}>
                            {domainOptions.map(opt => (
                                <li key={opt} onClick={() => { setSelectedDomain(opt); setIsDropdownOpen(false); }} style={{ padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: selectedDomain === opt ? '#1E6BFF' : '#0B1F3A' }}>{opt}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="btn btn-primary" style={{ borderRadius: 0, padding: '0 2.5rem' }}>RECHERCHER</button>
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
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Hébergez votre projet en<br />toute confiance avec IHOST</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Solutions d'hébergement fiables, noms de domaine et<br />support technique pour particuliers et entreprises au Maroc.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>DÉCOUVRIR LES SOLUTIONS <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem' }}>
                                {domainSearchContent}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Ingénierie de l'Hébergement</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Des plans structurés pour la scalabilité, conçus sur une infrastructure NVMe Gen4 redondante.</p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                            gap: '2.5rem',
                            maxWidth: '1250px',
                            margin: '0 auto'
                        }}>
                            <div className="tech-border" style={{
                                background: 'white',
                                padding: '3.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease-in-out'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                                    <CloudLightning size={32} color="#1E6BFF" />
                                </div>
                                <h3 className="font-tech" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>CLOUD STARTER</h3>
                                <p style={{ color: '#4B5563', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Architecture mutualisée pour projets émergents.</p>

                                <div style={{ marginBottom: '3rem', background: '#F8FAFC', padding: '2rem', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 700, color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>39</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#64748B' }}>DH / HT / MOIS</span>
                                    </div>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { label: "1 Site Web", tech: "LVE Restricted" },
                                        { label: "10 GB Stockage", tech: "NVMe Gen4" },
                                        { label: "Email Pro", tech: "Exim/IMAP" },
                                        { label: "SSL Gratuit", tech: "Let's Encrypt" },
                                        { label: "Support", tech: "24/7/365" }
                                    ].map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{feature.label}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#1E6BFF', fontWeight: 800, background: 'rgba(30, 107, 255, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{feature.tech}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/hebergement/mutualise" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>CONFIGURER</Link>
                            </div>

                            <div className="bg-tech-dark" style={{
                                padding: '4rem 3.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                border: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                                transform: 'scale(1.02)',
                                zIndex: 10
                            }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, background: '#1E6BFF', color: 'white', padding: '0.5rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>Haut Rendement</div>

                                <div style={{ marginBottom: '2.5rem' }}>
                                    <Zap size={40} color="#00C2FF" />
                                </div>
                                <h3 className="font-tech" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>VPS PRO-X</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Ressources isolées pour applications critiques.</p>

                                <div style={{ marginBottom: '3rem', background: 'rgba(255,255,255,0.05)', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 700, color: 'white', fontFamily: 'Space Grotesk' }}>149</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>DH / HT / MOIS</span>
                                    </div>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { label: "4 vCore EPYC", tech: "Milan/Genoa" },
                                        { label: "8 GB DDR4 RAM", tech: "ECC Registered" },
                                        { label: "100 GB Stockage", tech: "Raid 10 NVMe" },
                                        { label: "Snapshot", tech: "Daily Backup" },
                                        { label: "Network", tech: "1 Gbps Port" }
                                    ].map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{feature.label}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#00C2FF', fontWeight: 800 }}>{feature.tech}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#00C2FF', color: '#0B1F3A' }}>DÉPLOYER MAINTENANT</button>
                            </div>

                            <div className="tech-border" style={{
                                background: 'white',
                                padding: '3.5rem',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                                    <Shield size={32} color="#1E6BFF" />
                                </div>
                                <h3 className="font-tech" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>BUSINESS CORE</h3>
                                <p style={{ color: '#4B5563', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Solutions web complexes et E-commerce.</p>

                                <div style={{ marginBottom: '3rem', background: '#F8FAFC', padding: '2rem', border: '1px solid #E2E8F0' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '3rem', fontWeight: 700, color: '#0B1F3A', fontFamily: 'Space Grotesk' }}>99</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#64748B' }}>DH / HT / MOIS</span>
                                    </div>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {[
                                        { label: "Unlimited Sites", tech: "Apache/Nginx" },
                                        { label: "Unlimited Space", tech: "Pure NVMe" },
                                        { label: "WAF Protection", tech: "BitNinja/Luxe" },
                                        { label: "Daily Backups", tech: "JetBackup" },
                                        { label: "Dedicated IP", tech: "IPv4/IPv6" }
                                    ].map((feature, i) => (
                                        <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem' }}>
                                            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{feature.label}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#1E6BFF', fontWeight: 800, background: 'rgba(30, 107, 255, 0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{feature.tech}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/hebergement/ecommerce" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>CHOISIR CE PLAN</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light">
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Ingénierie de Performance</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Une infrastructure conçue pour éliminer les goulots d'étrangement et maximiser la disponibilité de vos services critiques.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={CloudLightning} title="Latence < 5ms" desc="Optimisation réseau directe au Maroc. Vos données circulent sur l'infrastructure la plus rapide du Royaume." />
                            <LuxeCard icon={Shield} title="Multi-Layer Security" desc="Protection Anti-DDoS de 2 Tbps, WAF personnalisés et isolation de ressources au niveau du noyau." />
                            <LuxeCard icon={Headset} title="Niveau de Service 24/7" desc="Accès direct à nos ingénieurs système. Pas de file d'attente, seulement des solutions immédiates." />
                            <LuxeCard icon={CheckCircle2} title="Disponibilité 99.99%" desc="Engagement contractuel (SLA) sur la continuité de service. Infrastructure redondante N+1." />
                            <LuxeCard icon={Globe} title="Souveraineté des Données" desc="Stockage localisé respectant les normes de conformité et garantissant une protection juridique totale." />
                            <LuxeCard icon={Zap} title="Stack Technologique" desc="NVMe Gen4, processeurs AMD EPYC™, et optimisation LSCache intégrée par défaut." />
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light">
                    <div className="container-luxe">
                        <div className="bg-tech-dark" style={{
                            padding: '6rem',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            width: '1000px',
                        }}>
                            <div className="pattern-grid-tech" style={{ opacity: 0.15 }} />

                            <h2 className="font-tech" style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '2rem', textTransform: 'uppercase' }}>PRÊT À DÉPLOYER ?</h2>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto' }}>
                                Activez votre infrastructure en moins de 60 secondes. Rejoignez les entreprises qui choisissent la performance et la sécurité marocaine.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                <Link to="/signUp" className="btn btn-primary" style={{ padding: '1.4rem 4rem', fontSize: '1rem' }}>INITIALISER MON COMPTE</Link>
                                <Link to="/entreprise/about" className="btn btn-outline" style={{ padding: '1.4rem 4rem', fontSize: '1rem', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>PARLER À UN EXPERT</Link>
                            </div>

                            <div style={{ position: 'absolute', bottom: 0, left: '10%', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, #00C2FF, transparent)', opacity: 0.3 }} />
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;

