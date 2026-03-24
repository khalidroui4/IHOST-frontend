import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, sendMessage } from '../../store/slices/supportSlice';
const AdminSupport = () => {
    const dispatch = useDispatch();
    const { tickets, isLoading } = useSelector(state => state.support);
    const [msgText, setMsgText] = useState('');
    const [activeTicket, setActiveTicket] = useState(null);

    useEffect(() => {
        dispatch(fetchTickets());
    }, [dispatch]);

    const handleSend = async (e) => {
        e.preventDefault();
        if(!msgText.trim() || !activeTicket) return;
        await dispatch(sendMessage({ ticketId: activeTicket, message: msgText }));
        setMsgText('');
        dispatch(fetchTickets());
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '2rem' }}>Support Administratif</h1>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', height: '600px', overflowY: 'auto' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Tous les Tickets</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {tickets.map(t => (
                                <button 
                                    key={t.idSupport} 
                                    onClick={() => setActiveTicket(t.idSupport)}
                                    style={{ 
                                        textAlign: 'left', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer',
                                        background: activeTicket === t.idSupport ? '#f0f7ff' : '#fff',
                                        color: activeTicket === t.idSupport ? '#1E6BFF' : '#4B5563',
                                        fontWeight: activeTicket === t.idSupport ? 700 : 500
                                    }}>
                                    <div>#{t.idSupport} - {t.subjectSupport}</div>
                                    <small style={{ color: t.statusSupport === 'open' ? '#10B981' : '#6B7280' }}>Utilisateur: {t.userId} | {t.statusSupport.toUpperCase()}</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '600px', overflow: 'hidden' }}>
                        {!activeTicket ? (
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
                                Sélectionnez un ticket pour voir la discussion
                            </div>
                        ) : (() => {
                            const t = tickets.find(x => x.idSupport === activeTicket);
                            return (
                                <>
                                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0B1F3A' }}>{t.subjectSupport}</h3>
                                    </div>
                                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {t.messages?.map(m => (
                                            <div key={m.idMessage} style={{ alignSelf: m.sender === 'admin' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                                <div style={{ 
                                                    background: m.sender === 'admin' ? '#1E6BFF' : '#f1f5f9', 
                                                    color: m.sender === 'admin' ? '#fff' : '#0B1F3A',
                                                    padding: '1rem', borderRadius: '12px' 
                                                }}>
                                                    {m.message}
                                                </div>
                                                <small style={{ color: '#9CA3AF', marginTop: '0.2rem', display: 'block', textAlign: m.sender === 'admin' ? 'right' : 'left' }}>
                                                    {m.sender === 'admin' ? 'Support IHOST (Vous)' : 'Client'} - {new Date(m.createdAt).toLocaleTimeString()}
                                                </small>
                                            </div>
                                        ))}
                                    </div>
                                    <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                                        <input 
                                            value={msgText} onChange={(e) => setMsgText(e.target.value)}
                                            placeholder="Réponse administrateur..." 
                                            style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <button type="submit" className="btn btn-primary" disabled={t.statusSupport === 'closed'}>
                                            Répondre
                                        </button>
                                    </form>
                                </>
                            );
                        })()}
                    </div>
                </div>
        </div>
    );};

export default AdminSupport;
