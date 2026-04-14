import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, sendMessage, closeTicket } from '../../store/slices/supportSlice';
import {
    Search, MessageSquare, Clock, CheckCircle, XCircle,
    User, Mail, Send, RefreshCcw, Inbox, Tag, ChevronDown,
    AlertCircle, Circle
} from 'lucide-react';

const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'À l\'instant';
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    return `${Math.floor(h / 24)}j`;
};

const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const StatusBadge = ({ status }) => {
    const isOpen = status === 'open';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '3px 10px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700,
            background: isOpen ? '#dcfce7' : '#f1f5f9',
            color: isOpen ? '#15803d' : '#64748b',
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: isOpen ? '#22c55e' : '#94a3b8',
                display: 'inline-block'
            }} />
            {isOpen ? 'OUVERT' : 'FERMÉ'}
        </span>
    );
};

const UserAvatar = ({ user, size = 40 }) => {
    const name = user?.username || user?.first_name || 'U';
    const letter = name.charAt(0).toUpperCase();
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
            overflow: 'hidden', border: '2px solid white', boxShadow: '0 2px 8px rgba(220,38,38,0.2)'
        }}>
            {user?.avatar
                ? <img src={user.avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : letter
            }
        </div>
    );
};

const AdminSupport = () => {
    const dispatch = useDispatch();
    const { tickets, isLoading } = useSelector(state => state.support);
    const [activeId, setActiveId] = useState(null);
    const [msgText, setMsgText] = useState('');
    const [filter, setFilter] = useState('all'); 
    const [search, setSearch] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => { dispatch(fetchTickets()); }, [dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeId, tickets]);

    const filteredTickets = tickets.filter(t => {
        const matchFilter = filter === 'all' || t.statusSupport === filter;
        const q = search.toLowerCase();
        const matchSearch = !q || t.subjectSupport?.toLowerCase().includes(q)
            || t.username?.toLowerCase().includes(q)
            || t.email?.toLowerCase().includes(q)
            || String(t.idSupport).includes(q);
        return matchFilter && matchSearch;
    });

    const activeTicket = tickets.find(t => t.idSupport === activeId);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!msgText.trim() || !activeId) return;
        setIsSending(true);
        await dispatch(sendMessage({ ticketId: activeId, message: msgText }));
        setMsgText('');
        await dispatch(fetchTickets());
        setIsSending(false);
    };

    const handleToggleStatus = async () => {
        if (!activeTicket) return;
        const newStatus = activeTicket.statusSupport === 'open' ? 'closed' : 'open';
        await dispatch(closeTicket({ ticketId: activeId, status: newStatus }));
        dispatch(fetchTickets());
    };

    /* -- counts -- */
    const openCount = tickets.filter(t => t.statusSupport === 'open').length;
    const closedCount = tickets.filter(t => t.statusSupport === 'closed').length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0 }}>
            {/* ── Page Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexShrink: 0 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#1B0606' }}>Support Tickets</h1>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.875rem' }}>Gérez et répondez aux demandes clients</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {[
                        { label: 'Ouverts', value: openCount, color: '#22c55e', bg: '#dcfce7' },
                        { label: 'Fermés', value: closedCount, color: '#64748b', bg: '#f1f5f9' },
                        { label: 'Total', value: tickets.length, color: '#DC2626', bg: '#fef2f2' },
                    ].map(s => (
                        <div key={s.label} style={{ textAlign: 'center', background: s.bg, padding: '0.5rem 1rem', borderRadius: '10px' }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: s.color }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1.25rem', flex: 1, minHeight: 0 }}>

                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    {/* Search + Filters */}
                    <div style={{ padding: '1rem 1rem 0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }}>
                            <Search size={15} color="#94a3b8" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher ticket, utilisateur..."
                                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.875rem', color: '#1B0606', width: '100%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                            {[['all', 'Tous'], ['open', 'Ouverts'], ['closed', 'Fermés']].map(([val, label]) => (
                                <button
                                    key={val}
                                    onClick={() => setFilter(val)}
                                    style={{
                                        padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
                                        border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                                        background: filter === val ? '#1B0606' : '#f1f5f9',
                                        color: filter === val ? '#fff' : '#64748b'
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                            <button onClick={() => dispatch(fetchTickets())} style={{ marginLeft: 'auto', background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '4px 8px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}>
                                <RefreshCcw size={13} />
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
                        {isLoading && (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.875rem' }}>Chargement...</div>
                        )}
                        {!isLoading && filteredTickets.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                                <Inbox size={36} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
                                <p style={{ fontSize: '0.875rem' }}>Aucun ticket trouvé</p>
                            </div>
                        )}
                        {filteredTickets.map(t => {
                            const isActive = t.idSupport === activeId;
                            const lastMsg = t.messages?.[t.messages.length - 1];
                            const unread = t.messages?.filter(m => m.sender === 'client').length || 0;
                            const userName = t.username || t.first_name || `User #${t.userId}`;
                            return (
                                <div
                                    key={t.idSupport}
                                    onClick={() => setActiveId(t.idSupport)}
                                    style={{
                                        padding: '0.9rem 1rem', borderRadius: '12px', marginBottom: '4px', cursor: 'pointer',
                                        background: isActive ? '#fef2f2' : 'transparent',
                                        borderLeft: isActive ? '3px solid #DC2626' : '3px solid transparent',
                                        transition: 'all 0.15s',
                                        boxShadow: isActive ? '0 2px 8px rgba(220,38,38,0.08)' : 'none',
                                    }}
                                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f8fafc'; }}
                                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                        <UserAvatar user={t} size={36} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1B0606', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '130px' }}>
                                                    {userName}
                                                </span>
                                                <span style={{ fontSize: '0.68rem', color: '#94a3b8', flexShrink: 0 }}>{timeAgo(t.createdAt)}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>#{t.idSupport}</span>
                                                <StatusBadge status={t.statusSupport} />
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, color: isActive ? '#DC2626' : '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {t.subjectSupport}
                                            </p>
                                            {lastMsg && (
                                                <p style={{ margin: '3px 0 0', fontSize: '0.72rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {lastMsg.sender === 'admin' ? '🔵 Admin: ' : '👤 '}{lastMsg.message}
                                                </p>
                                            )}
                                        </div>
                                        {unread > 0 && !isActive && (
                                            <span style={{ background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 800, minWidth: '18px', height: '18px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', flexShrink: 0 }}>
                                                {unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

                    {!activeTicket ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: '1rem' }}>
                            <MessageSquare size={48} strokeWidth={1.5} style={{ opacity: 0.3 }} />
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: '#64748b' }}>Sélectionnez un ticket</p>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>La conversation apparaîtra ici</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc', flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <UserAvatar user={activeTicket} size={48} />
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#1B0606' }}>
                                                    {activeTicket.userId === null
                                                        ? 'Utilisateur Anonyme'
                                                        : (activeTicket.username || activeTicket.first_name || `Utilisateur #${activeTicket.userId}`)}
                                                    {activeTicket.last_name && activeTicket.userId !== null ? ` ${activeTicket.last_name}` : ''}
                                                </h3>
                                                <StatusBadge status={activeTicket.statusSupport} />
                                                {activeTicket.userId === null && (
                                                    <span style={{
                                                        fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
                                                        borderRadius: 999, background: '#fef3c7', color: '#92400e',
                                                        border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: 4
                                                    }}>
                                                        👤 Anonyme
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '4px' }}>
                                                {activeTicket.email && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#64748b' }}>
                                                        <Mail size={12} /> {activeTicket.email}
                                                    </span>
                                                )}
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#64748b' }}>
                                                    <Tag size={12} /> Ticket #{activeTicket.idSupport}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#64748b' }}>
                                                    <Clock size={12} /> {new Date(activeTicket.createdAt).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                        <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.82rem', color: '#1B0606', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {activeTicket.subjectSupport}
                                            </p>
                                            <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#94a3b8' }}>Sujet du ticket</p>
                                        </div>
                                        <button
                                            onClick={handleToggleStatus}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                padding: '8px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                                fontWeight: 700, fontSize: '0.8rem', transition: 'all 0.2s',
                                                background: activeTicket.statusSupport === 'open' ? '#fee2e2' : '#dcfce7',
                                                color: activeTicket.statusSupport === 'open' ? '#dc2626' : '#15803d',
                                            }}
                                        >
                                            {activeTicket.statusSupport === 'open'
                                                ? <><XCircle size={15} /> Fermer</>
                                                : <><CheckCircle size={15} /> Rouvrir</>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: '#F5F7FA', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(!activeTicket.messages || activeTicket.messages.length === 0) && (
                                    <div style={{ textAlign: 'center', padding: '3rem 0', color: '#94a3b8' }}>
                                        <AlertCircle size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                                        <p style={{ fontSize: '0.875rem' }}>Aucun message dans ce ticket</p>
                                    </div>
                                )}

                                {activeTicket.messages?.map((m, i) => {
                                    const isAdmin = m.sender === 'admin';
                                    const senderName = isAdmin
                                        ? 'Admin IHOST'
                                        : (activeTicket.username || activeTicket.first_name || 'Client');

                                    return (
                                        <div key={m.idMessage || i} style={{ display: 'flex', flexDirection: 'column', alignItems: isAdmin ? 'flex-end' : 'flex-start' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                {!isAdmin && <UserAvatar user={activeTicket} size={22} />}
                                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isAdmin ? '#DC2626' : '#475569' }}>
                                                    {senderName}
                                                </span>
                                                <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{formatTime(m.createdAt)}</span>
                                                {isAdmin && (
                                                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#1B0606,#DC2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.6rem', fontWeight: 800 }}>A</div>
                                                )}
                                            </div>
                                            <div style={{
                                                maxWidth: '70%', padding: '0.85rem 1.1rem', borderRadius: '16px',
                                                borderBottomLeftRadius: isAdmin ? '16px' : '4px',
                                                borderBottomRightRadius: isAdmin ? '4px' : '16px',
                                                background: isAdmin
                                                    ? 'linear-gradient(135deg, #DC2626, #991B1B)'
                                                    : 'white',
                                                color: isAdmin ? 'white' : '#1B0606',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                fontSize: '0.875rem', lineHeight: 1.55,
                                                border: isAdmin ? 'none' : '1px solid #e2e8f0',
                                            }}>
                                                {m.message}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #f1f5f9', background: 'white', flexShrink: 0 }}>
                                {activeTicket.userId === null ? (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                                        padding: '0.85rem 1.1rem', background: '#fef3c7', borderRadius: '10px',
                                        border: '1px solid #fde68a'
                                    }}>
                                        <span style={{ fontSize: '1.1rem' }}>👤</span>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 700, color: '#92400e', fontSize: '0.85rem' }}>Ticket Anonyme — Réponse impossible</p>
                                            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#b45309' }}>Ce ticket provient d'un visiteur non connecté. Aucune réponse ne peut lui être envoyée.</p>
                                        </div>
                                    </div>
                                ) : activeTicket.statusSupport === 'closed' ? (
                                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>
                                        Ce ticket est fermé. Rouvrez-le pour répondre.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                                        <div style={{ flex: 1, background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' }}
                                            onFocusCapture={e => e.currentTarget.style.borderColor = '#DC2626'}
                                            onBlurCapture={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                                        >
                                            <textarea
                                                value={msgText}
                                                onChange={e => setMsgText(e.target.value)}
                                                placeholder="Répondre au ticket..."
                                                rows={2}
                                                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
                                                style={{
                                                    border: 'none', outline: 'none', background: 'transparent',
                                                    fontSize: '0.9rem', color: '#1B0606', resize: 'none',
                                                    fontFamily: 'inherit', lineHeight: 1.5
                                                }}
                                            />
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Shift+Enter pour nouvelle ligne</span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSending || !msgText.trim()}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                padding: '0.85rem 1.5rem', borderRadius: '14px',
                                                background: isSending || !msgText.trim() ? '#e2e8f0' : 'linear-gradient(135deg, #DC2626, #991B1B)',
                                                color: isSending || !msgText.trim() ? '#94a3b8' : 'white',
                                                border: 'none', fontWeight: 700, fontSize: '0.9rem',
                                                cursor: isSending || !msgText.trim() ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s', alignSelf: 'stretch',
                                            }}
                                        >
                                            <Send size={16} />
                                            {isSending ? 'Envoi...' : 'Répondre'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSupport;
