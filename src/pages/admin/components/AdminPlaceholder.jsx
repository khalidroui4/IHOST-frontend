import React from 'react';
import PageTransition from '../../../pageTransition';

const AdminPlaceholder = ({ title }) => {
    return (
        <PageTransition>
            <div style={{ padding: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>{title}</h1>
                <div style={{ 
                    background: 'white', 
                    padding: '5rem', 
                    borderRadius: '16px', 
                    border: '1px solid #e2e8f0',
                    textAlign: 'center',
                    color: '#64748B'
                }}>
                    <p style={{ fontSize: '1.1rem' }}>Le module d'administration <strong>{title}</strong> est en cours d'implémentation.</p>
                </div>
            </div>
        </PageTransition>
    );
};

export default AdminPlaceholder;
