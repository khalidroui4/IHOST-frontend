import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../store/slices/invoiceSlice';
import { FileText, Download } from 'lucide-react';

const ClientInvoices = () => {
    const dispatch = useDispatch();
    const { items: invoices, isLoading } = useSelector(state => state.invoices);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user?.id) dispatch(fetchInvoices(user.id));
    }, [dispatch, user]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Factures</h1>

            {isLoading ? (
                <p style={{ color: '#94a3b8' }}>Chargement des factures...</p>
            ) : invoices.length === 0 ? (
                <div style={{ padding: '4rem 2rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <FileText size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
                    <p style={{ margin: 0, fontSize: '1.1rem', color: '#64748b' }}>Vous n'avez encore aucune facture.</p>
                </div>
            ) : (
                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e5eaf0' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>N° Facture</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Montant</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Statut</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => (
                                <tr key={inv.idFacture} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#0B1F3A' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', color: '#1E6BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FileText size={18} />
                                            </div>
                                            {inv.invoiceNumber || `FAC-${inv.idFacture.toString().padStart(4, '0')}`}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#0B1F3A', fontSize: '1rem' }}>{parseFloat(inv.amount).toFixed(2)} DH</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                            background: inv.statusFacture === 'paid' ? '#ecfdf5' : '#fef2f2',
                                            color: inv.statusFacture === 'paid' ? '#10b981' : '#ef4444',
                                            padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px'
                                        }}>
                                            {inv.statusFacture}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <button style={{ background: 'transparent', color: '#64748b', border: '1px solid #e5eaf0', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.color = '#1E6BFF'; e.currentTarget.style.borderColor = '#1E6BFF'; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e5eaf0'; }}
                                        >
                                            <Download size={14} /> PDF
                                        </button>
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

