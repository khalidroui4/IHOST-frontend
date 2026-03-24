import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ClientInvoices = () => {
    const { user } = useSelector(state => state.auth);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost/IHOST-backend/factures/user/${user.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` }
            }).then(res => {
                setInvoices(res.data.data);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [user]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Factures</h1>

            {loading ? (
                <p>Chargement des factures...</p>
            ) : invoices.length === 0 ? (
                <div style={{ padding: '3rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <p style={{ color: '#6B7280' }}>Aucune facture disponible.</p>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                            <tr>
                                <th style={{ padding: '1rem 1.5rem' }}>N° Facture</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Montant</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => (
                                <tr key={inv.idFacture} style={{ borderTop: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#0B1F3A' }}>{inv.invoiceNumber}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: 800 }}>{inv.amount} DH</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            background: inv.statusFacture === 'paid' ? '#ecfdf5' : '#fef2f2',
                                            color: inv.statusFacture === 'paid' ? '#10b981' : '#ef4444',
                                            padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600
                                        }}>
                                            {inv.statusFacture.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClientInvoices;

