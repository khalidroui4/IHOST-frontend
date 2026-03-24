import React, { useState } from 'react';
import { Search as SearchIcon, ShieldAlert, CheckCircle2, Loader2, Globe, Database, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const WhoisLookup = () => {
    const [domainQuery, setDomainQuery] = useState('');
    const [searchState, setSearchState] = useState('idle'); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (!domainQuery.trim()) return;

        setSearchState('loading');

        setTimeout(() => {
            setSearchState('result');
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
                    placeholder="Entrez un domaine (ex: google.com)"
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
                        color: '#0B1F3A',
                        background: 'transparent'
                    }}
                />
                <button type="submit" className="btn" style={{
                    margin: '0',
                    padding: '1rem 2.5rem',
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
                    {searchState === 'loading' ? <Loader2 className="spinner" size={20} /> : 'Analyser'}
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
                            backgroundImage: 'url(/whois.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.15,
                            mixBlendMode: 'luminosity',
                            zIndex: 0
                        }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                 
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Anatomie des Domaines</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Accédez instantanément à la base de données WHOIS pour identifier le propriétaire, le registraire et les dates clés de n'importe quel domaine.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Enregistrer un domaine <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                            <div style={{ marginTop: '4rem' }}>
                                {SearchComponent}
                            </div>
                        </div>
                    </div>
                </section>

                {searchState === 'result' && (
                    <section className="section-premium" style={{ padding: '4rem 2rem', background: '#f8fafc' }}>
                        <div className="container-luxe" style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <div style={{
                                background: 'white',
                                borderRadius: '32px',
                                padding: '4rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                border: '1px solid rgba(11, 31, 58, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(11, 31, 58, 0.1)', paddingBottom: '2.5rem', marginBottom: '3rem' }}>
                                    <div>
                                        <p style={{ margin: '0 0 0.5rem 0', color: '#4B5563', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>Résultats pour le domaine</p>
                                        <h3 style={{ fontSize: '2.5rem', color: '#1E6BFF', margin: 0, fontWeight: 900 }}>{domainQuery}</h3>
                                    </div>
                                    {domainQuery.includes('.protected') ? (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', background: '#fffbeb', color: '#d97706', borderRadius: '100px', fontWeight: 800, fontSize: '0.9rem', border: '1px solid #fde68a' }}>
                                            <ShieldAlert size={20} /> WHOIS PROTÉGÉ
                                        </div>
                                    ) : (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', background: '#f0fdf4', color: '#16a34a', borderRadius: '100px', fontWeight: 800, fontSize: '0.9rem', border: '1px solid #bbf7d0' }}>
                                            <CheckCircle2 size={20} /> DONNÉES PUBLIQUES
                                        </div>
                                    )}
                                </div>

                                {domainQuery.includes('.protected') ? (
                                    <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#F5F7FA', borderRadius: '24px', border: '1px dashed rgba(11, 31, 58, 0.1)' }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: '#fef3c7',
                                            color: '#d97706',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 2rem'
                                        }}>
                                            <ShieldAlert size={40} />
                                        </div>
                                        <h4 style={{ fontSize: '1.5rem', color: '#0B1F3A', marginBottom: '1rem', fontWeight: 800 }}>Confidentialité Activée</h4>
                                        <p style={{ color: '#4B5563', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>Les coordonnées du propriétaire sont volontairement masquées par un service de protection WHOIS.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                                        <div style={{ background: '#F5F7FA', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(11, 31, 58, 0.1)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#1E6BFF', marginBottom: '1rem' }}>
                                                <Globe size={20} /> <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>BUREAU D'ENREGISTREMENT</h4>
                                            </div>
                                            <p style={{ margin: 0, color: '#0B1F3A', fontWeight: 700, fontSize: '1.2rem' }}>IHOST Registrar Inc.</p>
                                            <p style={{ margin: '0.5rem 0 0', color: '#4B5563', fontSize: '0.95rem' }}>IANA ID: 2948</p>
                                        </div>
                                        <div style={{ background: '#F5F7FA', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(11, 31, 58, 0.1)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#1E6BFF', marginBottom: '1rem' }}>
                                                <Calendar size={20} /> <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>PÉRIODE DE VALIDITÉ</h4>
                                            </div>
                                            <p style={{ margin: 0, color: '#0B1F3A', fontWeight: 700, fontSize: '1.2rem' }}>Création: <span style={{ color: '#4B5563', fontWeight: 500 }}>12 Oct 2021</span></p>
                                            <p style={{ margin: '0.5rem 0 0', color: '#0B1F3A', fontWeight: 700, fontSize: '1.2rem' }}>Expiration: <span style={{ color: '#ef4444' }}>12 Oct 2027</span></p>
                                        </div>
                                        <div style={{ background: '#F5F7FA', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(11, 31, 58, 0.1)', gridColumn: '1 / -1' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#1E6BFF', marginBottom: '1rem' }}>
                                                <Database size={20} /> <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1rem' }}>SERVEURS DE NOMS (DNS)</h4>
                                            </div>
                                            <div style={{ display: 'flex', gap: '2rem' }}>
                                                <p style={{ margin: 0, color: '#0B1F3A', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'monospace', background: 'white', padding: '0.5rem 1rem', borderRadius: '8px' }}>ns1.ihost.ma</p>
                                                <p style={{ margin: 0, color: '#0B1F3A', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'monospace', background: 'white', padding: '0.5rem 1rem', borderRadius: '8px' }}>ns2.ihost.ma</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>Transparence & Sécurité</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Pourquoi la base de données WHOIS est-elle essentielle pour l'écosystème internet ?</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={ShieldCheck} title="Protection WHOIS" desc="Nos services de confidentialité permettent de masquer vos données personnelles tout en restant conforme aux règles de l'ICANN." />
                            <LuxeCard icon={Calendar} title="Surveillance d'Expiration" desc="Ne perdez jamais votre domaine. Utilisez WHOIS pour suivre les dates d'échéance et configurer des alertes de renouvellement." />
                            <LuxeCard icon={Database} title="Vérification Technique" desc="Diagnostiquez les erreurs de configuration DNS et assurez-vous que vos serveurs de noms pointent vers les bonnes cibles." />
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
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Protéger vos données personnelles</h2>
                            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                                Activez la protection WHOIS sur vos domaines IHOST pour éviter le spam, les tentatives de phishing et le vol d'identité.
                            </p>
                            <Link to="/domaines/protection" className="btn" style={{
                                background: 'white',
                                color: '#7c3aed',
                                padding: '1.2rem 3rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Configurer la protection <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default WhoisLookup;
