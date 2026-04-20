import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, sendMessage, closeTicket } from '../../store/slices/supportSlice';
import {
    Search, MessageSquare, Clock, CheckCircle, XCircle,
    User, Mail, Send, RefreshCcw, Inbox, Tag, ChevronDown,
    AlertCircle, Circle, X, Loader2
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

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

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
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [filter, setFilter] = useState('all'); 
    const [search, setSearch] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    const [readCursors, setReadCursors] = useState(() => {
        try { return JSON.parse(localStorage.getItem('admin_ticket_read_cursors')) || {}; } 
        catch { return {}; }
    });

    useEffect(() => {
        if (activeId && tickets.length) {
           const activeTicket = tickets.find((t) => t.idSupport === activeId);
           if (activeTicket) {
               setReadCursors(prev => {
                   const updated = { ...prev, [activeId]: activeTicket.messages?.length || 0 };
                   localStorage.setItem('admin_ticket_read_cursors', JSON.stringify(updated));
                   return updated;
               });
           }
        }
    }, [activeId, tickets]);

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
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)', minHeight: '700px', gap: 0, position: 'relative' }}>
            {fullScreenImage && (
                <div 
                    onClick={() => setFullScreenImage(null)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <img src={fullScreenImage} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: 8 }} alt="Agrandie" />
                    <div style={{ position: 'absolute', top: 20, right: 20, color: 'white' }}><X size={40} /></div>
                </div>
            )}
            {/* ── Page Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexShrink: 0 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#1B0606' }}>Support Tickets</h1>
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

            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 0, flex: 1, minHeight: 0 }}>

                <div style={{ display: 'flex', flexDirection: 'column', background: '#1B0606', borderRadius: '8px 0 0 8px', border: '1px solid #380B0B', borderRight: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                    {/* Search + Filters */}
                    <div style={{ padding: '1rem 1rem 0.75rem', borderBottom: '1px solid #380B0B' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#380B0B', border: '1.5px solid #4A1010', borderRadius: '10px', padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }}>
                            <Search size={15} color="#64748b" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Rechercher ticket, utilisateur..."
                                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.875rem', color: '#e9edef', width: '100%' }}
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
                                        background: filter === val ? '#DC2626' : '#4A1010',
                                        color: filter === val ? '#fff' : '#e9edef'
                                    }}
                                >
                                    {label}
                                </button>
                            ))}

                        </div>
                    </div>

                    <div className="support-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
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
                            const lastReadCount = readCursors[t.idSupport] || 0;
                            const newMessages = t.messages?.slice(lastReadCount) || [];
                            const unread = newMessages.filter(m => m.sender === 'client').length;
                            const userName = t.username || t.first_name || `User #${t.userId}`;
                            return (
                                <div
                                    key={t.idSupport}
                                    onClick={() => setActiveId(t.idSupport)}
                                    style={{
                                        position: 'relative',
                                        padding: '0.9rem 1rem', borderRadius: '12px', marginBottom: '4px', cursor: 'pointer',
                                        background: isActive ? '#4A1010' : 'transparent',
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#380B0B'; }}
                                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                        <UserAvatar user={t} size={36} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e9edef', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '130px' }}>
                                                    {userName}
                                                </span>
                                                <span style={{ fontSize: '0.68rem', color: '#8696a0', flexShrink: 0 }}>{fmtDate(t.createdAt)}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                <span style={{ fontSize: '0.68rem', color: '#8696a0', fontWeight: 600 }}>#{t.idSupport}</span>
                                                <StatusBadge status={t.statusSupport} isPending={lastMsg?.sender === "client"} />
                                            </div>
                                            {lastMsg && (
                                                <p style={{ margin: '3px 0 0', fontSize: '0.72rem', color: '#8696a0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    <span style={{ color: lastMsg.sender === 'admin' ? '#e9edef' : '#8696a0' }}>{lastMsg.sender === 'admin' ? 'Vous: ' : 'Client: '}</span>
                                                    {lastMsg.message && lastMsg.message.startsWith('data:image/') ? 'Image' : lastMsg.message}
                                                </p>
                                            )}
                                        </div>
                                        {unread > 0 && !isActive && (
                                            <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 800, minWidth: '18px', height: '18px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', zIndex: 10 }}>
                                                {unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', background: '#1B0606', borderRadius: '0 8px 8px 0', border: '1px solid #380B0B', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>

                    {!activeTicket ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', background: '#110404', gap: '1rem' }}>
                            <MessageSquare size={48} strokeWidth={1.5} style={{ opacity: 0.3 }} />
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: '#94a3b8' }}>Sélectionnez un ticket</p>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem' }}>La conversation apparaîtra ici</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #380B0B', background: '#1B0606', flexShrink: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <UserAvatar user={activeTicket} size={48} />
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#e9edef' }}>
                                                    {activeTicket.userId === null
                                                        ? 'Utilisateur Anonyme'
                                                        : (activeTicket.username || activeTicket.first_name || `Utilisateur #${activeTicket.userId}`)}
                                                    {activeTicket.last_name && activeTicket.userId !== null ? ` ${activeTicket.last_name}` : ''}
                                                </h3>
                                                <StatusBadge status={activeTicket.statusSupport} isPending={activeTicket.messages?.[activeTicket.messages.length - 1]?.sender === "client"} />
                                                {activeTicket.userId === null && (
                                                    <span style={{
                                                        fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
                                                        borderRadius: 999, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b',
                                                        border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', gap: 4
                                                    }}>
                                                        👤 Anonyme
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '4px' }}>
                                                {activeTicket.email && (
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#8696a0' }}>
                                                        <Mail size={12} /> {activeTicket.email}
                                                    </span>
                                                )}
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#8696a0' }}>
                                                    <Tag size={12} /> Ticket #{activeTicket.idSupport}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#8696a0' }}>
                                                    <Clock size={12} /> {new Date(activeTicket.createdAt).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                                        <div style={{ textAlign: 'right', marginRight: '0.5rem' }}>
                                            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.82rem', color: '#e9edef', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {activeTicket.subjectSupport}
                                            </p>
                                            <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: '#8696a0' }}>Sujet du ticket</p>
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

                            <div className="support-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: 'linear-gradient(135deg, #450a0a, #110404)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {(!activeTicket.messages || activeTicket.messages.length === 0) && (
                                    <div style={{ textAlign: 'center', padding: '3rem 0', color: '#8696a0' }}>
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
                                                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isAdmin ? '#DC2626' : '#8696a0' }}>
                                                    {senderName}
                                                </span>
                                                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{formatTime(m.createdAt)}</span>
                                                {isAdmin && (
                                                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg,#1B0606,#DC2626)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.6rem', fontWeight: 800 }}>A</div>
                                                )}
                                            </div>
                                            <div style={{
                                                maxWidth: '70%', padding: m.message && m.message.startsWith('data:image/') ? '0.25rem' : '0.85rem 1.1rem', borderRadius: '16px',
                                                borderBottomLeftRadius: isAdmin ? '16px' : '4px',
                                                borderBottomRightRadius: isAdmin ? '4px' : '16px',
                                                background: isAdmin
                                                    ? 'linear-gradient(135deg, #DC2626, #991B1B)'
                                                    : '#1B0606',
                                                color: isAdmin ? 'white' : '#e9edef',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                fontSize: '0.875rem', lineHeight: 1.55,
                                                border: 'none',
                                            }}>
                                                {m.message && m.message.startsWith('data:image/') ? (
                                                    <img src={m.message} alt="attachment" style={{ maxWidth: "100%", borderRadius: 12, cursor: 'pointer', display: 'block' }} onClick={() => setFullScreenImage(m.message)} />
                                                ) : (
                                                    m.message
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #380B0B', background: '#1B0606', flexShrink: 0 }}>
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
                                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#380B0B', borderRadius: '10px', color: '#8696a0', fontSize: '0.85rem', fontWeight: 500 }}>
                                        Ce ticket est fermé. Rouvrez-le pour répondre.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', width: '100%' }}>
                                        <div style={{ flex: 1, background: '#380B0B', borderRadius: 999, padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', transition: 'border-color 0.2s', border: '1.5px solid transparent' }}
                                            onFocusCapture={e => e.currentTarget.style.borderColor = '#DC2626'}
                                            onBlurCapture={e => e.currentTarget.style.borderColor = 'transparent'}
                                        >
                                            <input
                                                value={msgText}
                                                onChange={e => setMsgText(e.target.value)}
                                                placeholder="Répondre au ticket..."
                                                onKeyDown={e => { if (e.key === 'Enter') handleSend(e); }}
                                                style={{
                                                    border: 'none', outline: 'none', background: 'transparent',
                                                    fontSize: '0.875rem', color: '#e9edef', width: '100%', height: '100%'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSending || !msgText.trim()}
                                            style={{
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                                padding: "0 1.25rem", height: "38px", borderRadius: 999, border: "none",
                                                background: isSending || !msgText.trim() ? '#4A1010' : '#DC2626',
                                                color: isSending || !msgText.trim() ? '#8696a0' : 'white',
                                                fontWeight: 800, fontSize: "0.875rem",
                                                cursor: isSending || !msgText.trim() ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s', flexShrink: 0
                                            }}
                                        >
                                            {isSending ? (
                                                <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                                            ) : (
                                                <Send size={15} />
                                            )}
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
                .support-scroll::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .support-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .support-scroll::-webkit-scrollbar-thumb {
                    background: #DC2626;
                    border-radius: 10px;
                }
                .support-scroll::-webkit-scrollbar-thumb:hover {
                    background: #ef4444;
                }
            `}</style>
        </div>
    );
};

export default AdminSupport;

