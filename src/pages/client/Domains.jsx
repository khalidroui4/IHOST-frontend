import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDomains } from '../../store/slices/domainSlice';
import { Globe, Clock, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientDomains = () => {
    const dispatch = useDispatch();
    const { items: domains, isLoading } = useSelector(state => state.domains);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user?.id) dispatch(fetchDomains(user.id));
    }, [dispatch, user]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Domaines</h1>

            {isLoading ? (
                <p style={{ color: '#94a3b8' }}>Chargement de vos domaines...</p>
            ) : domains.length === 0 ? (
                <div style={{ padding: '4rem 2rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <Globe size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
                    <p style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#64748b' }}>Vous n'avez aucun domaine enregistré.</p>
                    <Link to="/domains" style={{ color: '#1E6BFF', fontWeight: 700, textDecoration: 'none' }}>Rechercher un domaine</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {domains.map(dom => {
                        const expireDate = new Date(dom.expirationDate);
                        const isExpiring = expireDate < new Date(new Date().setDate(new Date().getDate() + 30));
                        
                        return (
                            <div key={dom.idDomaine} style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${isExpiring ? '#fed7aa' : '#e5eaf0'}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isExpiring ? '#fff7ed' : '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Globe size={20} color={isExpiring ? '#ea580c' : '#8b5cf6'} />
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0B1F3A' }}>{dom.domainName}</h3>
                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>#{dom.idDomaine}</span>
                                        </div>
                                    </div>
                                    <span style={{ background: dom.statusDomaine === 'active' ? '#ecfdf5' : '#fef2f2', color: dom.statusDomaine === 'active' ? '#10b981' : '#ef4444', padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' }}>
                                        {dom.statusDomaine}
                                    </span>
                                </div>
                                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ margin: '0 0 0.2rem 0', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expiration</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: isExpiring ? '#ea580c' : '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            {isExpiring ? <ShieldAlert size={14} /> : <Clock size={14} />}
                                            {expireDate.toLocaleDateString()}
                                        </p>
                                    </div>
                                    {isExpiring && (
                                        <button style={{ background: '#ffedd5', color: '#ea580c', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                                            Renouveler
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ClientDomains;

