import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDomains } from '../../store/slices/domainSlice';

const ClientDomains = () => {
    const dispatch = useDispatch();
    const { items: domains, isLoading } = useSelector(state => state.domains);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) dispatch(fetchDomains(user.id));
    }, [dispatch, user]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Domaines</h1>

            {isLoading ? (
                <p>Chargement des domaines...</p>
            ) : domains.length === 0 ? (
                <div style={{ padding: '3rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <p style={{ color: '#6B7280' }}>Vous n'avez aucun domaine enregistré.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {domains.map(dom => (
                        <div key={dom.idDomaine} style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0B1F3A', marginBottom: '0.5rem' }}>{dom.domainName}</h3>
                            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Expire le: {dom.expirationDate}</p>
                            <span style={{
                                background: dom.statusDomaine === 'active' ? '#ecfdf5' : '#fef2f2',
                                color: dom.statusDomaine === 'active' ? '#10b981' : '#ef4444',
                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600
                            }}>
                                {dom.statusDomaine.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientDomains;

