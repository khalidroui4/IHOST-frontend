import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, createTicket, sendMessage } from '../../store/slices/supportSlice';
import PageTransition from '../../pageTransition';

const ClientSupport = () => {
    const dispatch = useDispatch();
    const { tickets, isLoading } = useSelector(state => state.support);
    const { user } = useSelector(state => state.auth);
    const [subject, setSubject] = useState('');
    const [msgText, setMsgText] = useState('');
    const [activeTicket, setActiveTicket] = useState(null);

    useEffect(() => {
        if(user) dispatch(fetchTickets(user.id));
    }, [dispatch, user]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if(!subject.trim()) return;
        await dispatch(createTicket({ subjectSupport: subject }));
        setSubject('');
        dispatch(fetchTickets(user.id));
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if(!msgText.trim() || !activeTicket) return;
        await dispatch(sendMessage({ ticketId: activeTicket, message: msgText }));
        setMsgText('');
        dispatch(fetchTickets(user.id));
    };

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '2rem' }}>Support Client</h1>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    {/* Tickets List */}
                    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', height: 'fit-content' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Mes Tickets</h3>
                        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <input 
                                value={subject} onChange={(e) => setSubject(e.target.value)}
                                placeholder="Nouveau sujet..." 
                                style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>+</button>
                        </form>
                        
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
                                    <small style={{ color: t.statusSupport === 'open' ? '#10B981' : '#6B7280' }}>{t.statusSupport.toUpperCase()}</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active Ticket Chat */}
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
                                            <div key={m.idMessage} style={{ alignSelf: m.sender === 'client' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                                <div style={{ 
                                                    background: m.sender === 'client' ? '#1E6BFF' : '#f1f5f9', 
                                                    color: m.sender === 'client' ? '#fff' : '#0B1F3A',
                                                    padding: '1rem', borderRadius: '12px' 
                                                }}>
                                                    {m.message}
                                                </div>
                                                <small style={{ color: '#9CA3AF', marginTop: '0.2rem', display: 'block', textAlign: m.sender === 'client' ? 'right' : 'left' }}>
                                                    {m.sender === 'admin' ? 'Support IHOST' : 'Vous'} - {new Date(m.createdAt).toLocaleTimeString()}
                                                </small>
                                            </div>
                                        ))}
                                    </div>
                                    <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '1rem' }}>
                                        <input 
                                            value={msgText} onChange={(e) => setMsgText(e.target.value)}
                                            placeholder="Votre message..." 
                                            style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <button type="submit" className="btn btn-primary" disabled={t.statusSupport === 'closed'}>
                                            Envoyer
                                        </button>
                                    </form>
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ClientSupport;
