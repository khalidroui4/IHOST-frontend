import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyTickets, createTicket, sendMessage } from '../../store/slices/supportSlice';
import {
    MessageSquare, Send, Plus, CheckCircle2, XCircle,
    Clock, Tag, ChevronRight, Inbox, Shield, X, Loader2
} from 'lucide-react';

const timeAgo = (d) => {
    if (!d) return '';
    const m = Math.floor((Date.now() - new Date(d)) / 60000);
    if (m < 1) return 'À l\'instant';
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    return `${Math.floor(h / 24)}j`;
};

const fmt = (d) => d ? new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '';
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

const StatusBadge = ({ status }) => {
    const isOpen = status === 'open';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 999, fontSize: '0.68rem', fontWeight: 700,
            background: isOpen ? '#dcfce7' : '#f1f5f9',
            color: isOpen ? '#15803d' : '#64748b',
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isOpen ? '#22c55e' : '#94a3b8', display: 'inline-block' }} />
            {isOpen ? 'Ouvert' : 'Fermé'}
        </span>
    );
};

const NewTicketModal = ({ onClose, onSubmit, isCreating }) => {
    const [subject, setSubject] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject.trim()) return;
        onSubmit(subject.trim(), msg.trim());
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(11,31,58,0.45)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
        }}>
            <div style={{
                background: 'white', borderRadius: 20, width: '100%', maxWidth: 480,
                boxShadow: '0 25px 60px rgba(0,0,0,0.18)', overflow: 'hidden',
                animation: 'slideUp 0.2s ease'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: 0, fontWeight: 800, color: '#0B1F3A', fontSize: '1.1rem' }}>Nouveau Ticket Support</h3>
                        <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>Décrivez votre problème en détail</p>
                    </div>
                    <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#64748b', display: 'flex' }}>
                        <X size={16} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>Sujet *</label>
                        <input
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="Ex: Problème de connexion FTP..."
                            required
                            style={{
                                width: '100%', padding: '0.7rem 1rem', borderRadius: 10,
                                border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none',
                                boxSizing: 'border-box', transition: 'border-color 0.2s'
                            }}
                            onFocus={e => e.target.style.borderColor = '#1E6BFF'}
                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 6 }}>Message initial (optionnel)</label>
                        <textarea
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            placeholder="Décrivez votre problème en détail..."
                            rows={4}
                            style={{
                                width: '100%', padding: '0.7rem 1rem', borderRadius: 10,
                                border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none',
                                resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                                transition: 'border-color 0.2s', lineHeight: 1.6
                            }}
                            onFocus={e => e.target.style.borderColor = '#1E6BFF'}
                            onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '0.7rem 1.25rem', borderRadius: 10, border: '1.5px solid #e2e8f0',
                            background: 'white', color: '#64748b', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem'
                        }}>
                            Annuler
                        </button>
                        <button type="submit" disabled={!subject.trim() || isCreating} style={{
                            padding: '0.7rem 1.5rem', borderRadius: 10, border: 'none',
                            background: !subject.trim() || isCreating ? '#e2e8f0' : 'linear-gradient(135deg,#1E6BFF,#0043C0)',
                            color: !subject.trim() || isCreating ? '#94a3b8' : 'white',
                            fontWeight: 700, cursor: !subject.trim() || isCreating ? 'not-allowed' : 'pointer', fontSize: '0.875rem',
                            display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            {isCreating ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Création...</> : <><Plus size={14} /> Créer le ticket</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ClientSupport = () => {
    const dispatch = useDispatch();
    const { myTickets: tickets, isLoading } = useSelector(state => state.support);
    const { user } = useSelector(state => state.auth);
    const [activeId, setActiveId] = useState(null);
    const [msgText, setMsgText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        const userId = user?.id || user?.idU;
        if (!userId) return;
        
        dispatch(fetchMyTickets(userId));
        
        const interval = setInterval(() => {
            dispatch(fetchMyTickets(userId));
        }, 8000);
        
        return () => clearInterval(interval);
    }, [dispatch, user]);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeId, tickets]);


    const handleCreate = async (subject, msg) => {
        setIsCreating(true);
        const userId = user?.id || user?.idU;
        await dispatch(createTicket({ subjectSupport: subject, message: msg || undefined }));
        if (userId) await dispatch(fetchMyTickets(userId));
        setIsCreating(false);
        setShowModal(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const userId = user?.id || user?.idU;
        if (!msgText.trim() || !activeId) return;
        setIsSending(true);
        await dispatch(sendMessage({ ticketId: activeId, message: msgText }));
        setMsgText('');
        if (userId) await dispatch(fetchMyTickets(userId));
        setIsSending(false);
    };

    const activeTicket = tickets.find(t => t.idSupport === activeId);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
            {showModal && (
                <NewTicketModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleCreate}
                    isCreating={isCreating}
                />
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexShrink: 0 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>Support Client</h1>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>Vos demandes d'assistance technique</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.25rem', flex: 1, minHeight: 0 }}>

                <div style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                            {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
                        {isLoading && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', opacity: 0.5 }} />
                            </div>
                        )}
                        {!isLoading && tickets.length === 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                                <Inbox size={36} style={{ marginBottom: '0.75rem', opacity: 0.3 }} />
                                <p style={{ margin: 0, fontWeight: 600, color: '#64748b', fontSize: '0.875rem' }}>Aucun ticket</p>
                                <p style={{ margin: '4px 0 0', fontSize: '0.78rem' }}>Créez votre premier ticket support</p>
                            </div>
                        )}
                        {tickets.map(t => {
                            const isActive = t.idSupport === activeId;
                            const lastMsg = t.messages?.[t.messages.length - 1];
                            const hasAdminReply = t.messages?.some(m => m.sender === 'admin');
                            return (
                                <div
                                    key={t.idSupport}
                                    onClick={() => setActiveId(t.idSupport)}
                                    style={{
                                        padding: '0.875rem 0.875rem', borderRadius: 12, marginBottom: 4, cursor: 'pointer',
                                        background: isActive ? '#eff6ff' : 'transparent',
                                        borderLeft: `3px solid ${isActive ? '#1E6BFF' : 'transparent'}`,
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f8fafc'; }}
                                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                        <span style={{
                                            fontSize: '0.875rem', fontWeight: 700,
                                            color: isActive ? '#1E6BFF' : '#0B1F3A',
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                            maxWidth: '170px'
                                        }}>
                                            {t.subjectSupport}
                                        </span>
                                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', flexShrink: 0, marginLeft: 4 }}>{timeAgo(t.createdAt)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: lastMsg ? 5 : 0 }}>
                                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>#{t.idSupport}</span>
                                        <StatusBadge status={t.statusSupport} />
                                        {hasAdminReply && (
                                            <span style={{ fontSize: '0.65rem', background: '#eff6ff', color: '#1E6BFF', padding: '1px 7px', borderRadius: 999, fontWeight: 700 }}>
                                                Réponse admin
                                            </span>
                                        )}
                                    </div>
                                    {lastMsg && (
                                        <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {lastMsg.sender === 'admin' ? '🔵 Support: ' : '→ '}{lastMsg.message}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    {!activeTicket ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: '1rem' }}>
                            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MessageSquare size={32} strokeWidth={1.5} style={{ opacity: 0.4 }} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0, fontWeight: 700, color: '#475569', fontSize: '1rem' }}>Sélectionnez un ticket</p>
                                <p style={{ margin: '6px 0 0', fontSize: '0.875rem' }}>Ou créez-en un nouveau pour contacter le support</p>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                style={{
                                    marginTop: '0.5rem', padding: '0.65rem 1.25rem', borderRadius: 10, border: 'none',
                                    background: '#0B1F3A', color: 'white', fontWeight: 700, fontSize: '0.875rem',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
                                }}
                            >
                                <Plus size={15} /> Nouveau Ticket
                            </button>
                        </div>
                    ) : (
                        <>
                            <div style={{ padding: '1.1rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                            <Shield size={15} color="#1E6BFF" />
                                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0B1F3A' }}>
                                                {activeTicket.subjectSupport}
                                            </h3>
                                            <StatusBadge status={activeTicket.statusSupport} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Tag size={11} /> #{activeTicket.idSupport}
                                            </span>
                                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Clock size={11} /> Créé le {fmtDate(activeTicket.createdAt)}
                                            </span>
                                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                                                {activeTicket.messages?.length || 0} message{(activeTicket.messages?.length || 0) !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#F5F7FA', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(!activeTicket.messages || activeTicket.messages.length === 0) && (
                                    <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
                                        <MessageSquare size={32} style={{ opacity: 0.25, marginBottom: '0.5rem' }} />
                                        <p style={{ fontSize: '0.875rem' }}>Aucun message dans ce ticket</p>
                                    </div>
                                )}

                                {activeTicket.messages?.map((m, i) => {
                                    const isClient = m.sender === 'client';
                                    return (
                                        <div key={m.idMessage || i} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: isClient ? 'flex-end' : 'flex-start'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                                {!isClient && (
                                                    <div style={{
                                                        width: 24, height: 24, borderRadius: '50%',
                                                        background: 'linear-gradient(135deg,#0B1F3A,#1a3a6e)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: 'white', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0
                                                    }}>S</div>
                                                )}
                                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isClient ? '#1E6BFF' : '#475569' }}>
                                                    {isClient ? 'Vous' : 'Support Technique IHOST'}
                                                </span>
                                                <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{fmt(m.createdAt)}</span>
                                                {isClient && (
                                                    <div style={{
                                                        width: 24, height: 24, borderRadius: '50%',
                                                        background: 'linear-gradient(135deg,#1E6BFF,#0043C0)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: 'white', fontSize: '0.6rem', fontWeight: 800, flexShrink: 0
                                                    }}>
                                                        {(user?.username || user?.first_name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{
                                                maxWidth: '68%',
                                                padding: '0.85rem 1.1rem',
                                                borderRadius: 16,
                                                borderBottomRightRadius: isClient ? 4 : 16,
                                                borderBottomLeftRadius: isClient ? 16 : 4,
                                                background: isClient
                                                    ? 'linear-gradient(135deg,#1E6BFF,#0043C0)'
                                                    : 'white',
                                                color: isClient ? 'white' : '#0B1F3A',
                                                boxShadow: isClient
                                                    ? '0 4px 12px rgba(30,107,255,0.25)'
                                                    : '0 2px 8px rgba(0,0,0,0.06)',
                                                border: isClient ? 'none' : '1px solid #e2e8f0',
                                                fontSize: '0.875rem',
                                                lineHeight: 1.6,
                                            }}>
                                                {m.message}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={chatRef} />
                            </div>

                            <div style={{ padding: '1.1rem 1.5rem', borderTop: '1px solid #f1f5f9', background: 'white', flexShrink: 0 }}>
                                {activeTicket.statusSupport === 'closed' ? (
                                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: 10, color: '#94a3b8', fontSize: '0.85rem' }}>
                                        Ce ticket est fermé. Contactez le support pour le rouvrir.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                                        <div
                                            style={{ flex: 1, background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '0.8rem 1rem', transition: 'border-color 0.2s' }}
                                            onFocusCapture={e => e.currentTarget.style.borderColor = '#1E6BFF'}
                                            onBlurCapture={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                                        >
                                            <textarea
                                                value={msgText}
                                                onChange={e => setMsgText(e.target.value)}
                                                placeholder="Écrivez votre message..."
                                                rows={2}
                                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
                                                style={{
                                                    border: 'none', outline: 'none', background: 'transparent',
                                                    fontSize: '0.875rem', color: '#0B1F3A', resize: 'none',
                                                    fontFamily: 'inherit', lineHeight: 1.5, width: '100%'
                                                }}
                                            />
                                            <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: '#94a3b8', textAlign: 'right' }}>
                                                Entrée pour envoyer · Shift+Entrée pour nouvelle ligne
                                            </p>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSending || !msgText.trim()}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                padding: '0.85rem 1.4rem', borderRadius: 14, border: 'none',
                                                background: isSending || !msgText.trim()
                                                    ? '#e2e8f0'
                                                    : 'linear-gradient(135deg,#1E6BFF,#0043C0)',
                                                color: isSending || !msgText.trim() ? '#94a3b8' : 'white',
                                                fontWeight: 700, fontSize: '0.875rem',
                                                cursor: isSending || !msgText.trim() ? 'not-allowed' : 'pointer',
                                                alignSelf: 'stretch', transition: 'all 0.2s',
                                            }}
                                        >
                                            {isSending
                                                ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                                : <Send size={16} />
                                            }
                                            {isSending ? 'Envoi...' : 'Envoyer'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
            `}</style>
        </div>
    );
};

export default ClientSupport;
