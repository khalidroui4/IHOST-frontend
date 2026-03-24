import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, createTicket, sendMessage } from '../../store/slices/supportSlice';
import { MessageSquare, Send, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

const ClientSupport = () => {
    const dispatch = useDispatch();
    const { tickets, isLoading } = useSelector(state => state.support);
    const { user } = useSelector(state => state.auth);
    const [subject, setSubject] = useState('');
    const [msgText, setMsgText] = useState('');
    const [activeTicket, setActiveTicket] = useState(null);
    const chatRef = useRef(null);

    useEffect(() => {
        if(user?.id) dispatch(fetchTickets(user.id));
    }, [dispatch, user]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [tickets, activeTicket]);

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
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
            <h1 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Support Client</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
                {/* Tickets List Sidebar */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5eaf0', background: '#f8fafc' }}>
                        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 700, color: '#0B1F3A' }}>Mes Tickets</h3>
                        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                                value={subject} onChange={(e) => setSubject(e.target.value)}
                                placeholder="Nouveau sujet..." 
                                style={{ flex: 1, padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none' }}
                            />
                            <button type="submit" style={{ background: '#1E6BFF', color: 'white', border: 'none', borderRadius: '8px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#0043C0'} onMouseLeave={e => e.currentTarget.style.background = '#1E6BFF'}>
                                <Plus size={18} />
                            </button>
                        </form>
                    </div>
                    
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {tickets.length === 0 ? (
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>Aucun ticket ouvert.</p>
                        ) : (
                            tickets.map(t => (
                                <button 
                                    key={t.idSupport} 
                                    onClick={() => setActiveTicket(t.idSupport)}
                                    style={{ 
                                        textAlign: 'left', padding: '1rem', borderRadius: '10px', border: activeTicket === t.idSupport ? '1px solid #93c5fd' : '1px solid transparent', cursor: 'pointer',
                                        background: activeTicket === t.idSupport ? '#eff6ff' : '#f8fafc', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '0.4rem'
                                    }}
                                    onMouseEnter={e => { if (activeTicket !== t.idSupport) e.currentTarget.style.background = '#f1f5f9'; }}
                                    onMouseLeave={e => { if (activeTicket !== t.idSupport) e.currentTarget.style.background = '#f8fafc'; }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: activeTicket === t.idSupport ? 800 : 600, color: activeTicket === t.idSupport ? '#1E6BFF' : '#0B1F3A', lineHeight: 1.3 }}>{t.subjectSupport}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>#{t.idSupport}</span>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.2rem 0.5rem', borderRadius: '12px', background: t.statusSupport === 'open' ? '#ecfdf5' : '#f1f5f9', color: t.statusSupport === 'open' ? '#10b981' : '#64748b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                            {t.statusSupport === 'open' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                            {t.statusSupport}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Active Ticket Chat Area */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {!activeTicket ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                            <MessageSquare size={48} color="#cbd5e1" />
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>Sélectionnez un ticket pour voir la discussion</p>
                        </div>
                    ) : (() => {
                        const t = tickets.find(x => x.idSupport === activeTicket);
                        if (!t) return null;
                        return (
                            <>
                                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5eaf0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A' }}>{t.subjectSupport}</h3>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Créé le {new Date(t.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '20px', background: t.statusSupport === 'open' ? '#10b981' : '#64748b', color: 'white' }}>
                                        {t.statusSupport}
                                    </span>
                                </div>
                                <div ref={chatRef} style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#fafafa' }}>
                                    {t.messages?.map(m => (
                                        <div key={m.idMessage} style={{ alignSelf: m.sender === 'client' ? 'flex-end' : 'flex-start', maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <div style={{ 
                                                background: m.sender === 'client' ? '#1E6BFF' : '#fff', 
                                                color: m.sender === 'client' ? '#fff' : '#0B1F3A',
                                                border: m.sender === 'client' ? 'none' : '1px solid #e2e8f0',
                                                padding: '1rem 1.25rem', borderRadius: '16px',
                                                borderBottomRightRadius: m.sender === 'client' ? '4px' : '16px',
                                                borderBottomLeftRadius: m.sender !== 'client' ? '4px' : '16px',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                                fontSize: '0.9rem', lineHeight: 1.5
                                            }}>
                                                {m.message}
                                            </div>
                                            <small style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block', textAlign: m.sender === 'client' ? 'right' : 'left', padding: '0 0.25rem' }}>
                                                {m.sender === 'admin' ? 'Support Technique' : 'Vous'} • {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSend} style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5eaf0', display: 'flex', gap: '1rem', background: '#fff' }}>
                                    <input 
                                        value={msgText} onChange={(e) => setMsgText(e.target.value)}
                                        placeholder={t.statusSupport === 'closed' ? "Ce ticket est fermé." : "Écrivez votre message..."}
                                        disabled={t.statusSupport === 'closed'}
                                        style={{ flex: 1, padding: '0.8rem 1.2rem', borderRadius: '24px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: t.statusSupport === 'closed' ? '#f1f5f9' : '#fff' }}
                                    />
                                    <button type="submit" disabled={t.statusSupport === 'closed' || !msgText.trim()} style={{ background: t.statusSupport === 'closed' || !msgText.trim() ? '#cbd5e1' : '#1E6BFF', color: 'white', border: 'none', borderRadius: '24px', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, cursor: t.statusSupport === 'closed' || !msgText.trim() ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => { if(t.statusSupport !== 'closed' && msgText.trim()) e.currentTarget.style.background = '#0043C0'; }} onMouseLeave={e => { if(t.statusSupport !== 'closed' && msgText.trim()) e.currentTarget.style.background = '#1E6BFF'; }}>
                                        <span>Envoyer</span> <Send size={16} />
                                    </button>
                                </form>
                            </>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
};

export default ClientSupport;
