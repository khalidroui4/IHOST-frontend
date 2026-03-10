import React from 'react';
import PageTransition from '../../../pageTransition';

const ClientPlaceholder = ({ title }) => {
    return (
        <PageTransition>
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>{title}</h1>
                <div style={{ 
                    background: 'white', 
                    padding: '4rem', 
                    borderRadius: '20px', 
                    border: '1px solid #E2E8F0',
                    textAlign: 'center',
                    color: '#64748B'
                }}>
                    <p style={{ fontSize: '1.2rem' }}>La page <strong>{title}</strong> est en cours de développement.</p>
                </div>
            </div>
        </PageTransition>
    );
};

export default ClientPlaceholder;
