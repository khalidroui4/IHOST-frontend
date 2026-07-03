import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDomains, renewDomain, toggleAutoRenew, toggleDomainLock, toggleWhoisPrivacy,
    transferDomain, fetchDnsRecords, addDnsRecord, updateDnsRecord, deleteDnsRecord
} from '../../store/slices/domainSlice';
import { Clock, ShieldAlert, RefreshCw, Globe, ChevronDown, ChevronUp, Lock, Unlock,
         Eye, EyeOff, ArrowRightLeft, PlusCircle, Pencil, Trash2, Check, X,
         ShoppingCart, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { addToCart, fetchCart } from '../../store/slices/cartSlice';
import ConfirmCartModal from '../../components/ConfirmCartModal';
import { fetchSubscriptions } from '../../store/slices/subscriptionSlice';

// ─── Tiny Toggle Switch ───────────────────────────────────────────────────────
const Toggle = ({ value, onToggle, disabled }) => (
    <button
        onClick={onToggle}
        disabled={disabled}
        style={{
            width: '44px', height: '24px', borderRadius: '12px',
            background: value ? '#10b981' : '#cbd5e1',
            border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            position: 'relative', transition: 'background 0.25s', flexShrink: 0,
            opacity: disabled ? 0.6 : 1
        }}
    >
        <span style={{
            position: 'absolute', top: '3px',
            left: value ? '23px' : '3px',
            width: '18px', height: '18px', borderRadius: '50%',
            background: 'white', transition: 'left 0.25s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            display: 'block'
        }} />
    </button>
);

// ─── Section Header (inside panel) ───────────────────────────────────────────
const PanelSection = ({ title, icon: Icon, children }) => (
    <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Icon size={16} color="#475569" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0B1F3A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {title}
            </span>
        </div>
        {children}
    </div>
);

// ─── DNS Record Row ───────────────────────────────────────────────────────────
const TYPE_COLORS = {
    A:     { bg: '#eff6ff', color: '#1d4ed8' },
    AAAA:  { bg: '#f0f9ff', color: '#0369a1' },
    CNAME: { bg: '#f0fdf4', color: '#15803d' },
    MX:    { bg: '#fdf4ff', color: '#9333ea' },
    TXT:   { bg: '#fff7ed', color: '#c2410c' },
    NS:    { bg: '#fefce8', color: '#a16207' },
    SRV:   { bg: '#fdf2f8', color: '#be185d' },
};

const DnsRow = ({ record, domainId, dispatch, addToast }) => {
    const [editing, setEditing] = useState(false);
    const [form, setForm]       = useState({ name: record.name, value: record.value, priority: record.priority || '', ttl: record.ttl || 3600 });
    const [busy, setBusy]       = useState(false);

    const save = async () => {
        setBusy(true);
        try {
            await dispatch(updateDnsRecord({ idRecord: record.idRecord, idDomaine: domainId, ...form })).unwrap();
            addToast('Enregistrement DNS mis à jour.', 'success');
            setEditing(false);
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { setBusy(false); }
    };

    const del = async () => {
        if (!window.confirm('Supprimer cet enregistrement DNS ?')) return;
        setBusy(true);
        try {
            await dispatch(deleteDnsRecord({ idRecord: record.idRecord, idDomaine: domainId })).unwrap();
            addToast('Enregistrement supprimé.', 'success');
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { setBusy(false); }
    };

    const typeColor = TYPE_COLORS[record.type] || { bg: '#f1f5f9', color: '#475569' };
    const tdStyle = { padding: '0.65rem 0.9rem', fontSize: '0.82rem', color: '#334155', verticalAlign: 'middle' };
    const inputStyle = { width: '100%', padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', color: '#0B1F3A', outline: 'none', background: 'white' };

    return (
        <tr style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            {/* Type badge */}
            <td style={tdStyle}>
                <span style={{ background: typeColor.bg, color: typeColor.color,
                    padding: '0.2rem 0.55rem', borderRadius: '5px', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.5px', fontFamily: 'monospace' }}>
                    {record.type}
                </span>
            </td>
            {editing ? (
                <>
                    <td style={tdStyle}><input style={inputStyle} value={form.name}  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></td>
                    <td style={tdStyle}><input style={inputStyle} value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} /></td>
                    <td style={tdStyle}>{record.type === 'MX'
                        ? <input style={{ ...inputStyle, width: '60px' }} type="number" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} />
                        : <span style={{ color: '#94a3b8' }}>—</span>}
                    </td>
                    <td style={tdStyle}>
                        <select style={{ ...inputStyle, width: '90px', cursor: 'pointer' }} value={form.ttl} onChange={e => setForm(f => ({ ...f, ttl: e.target.value }))}>
                            <option value={60}>1 min</option>
                            <option value={300}>5 min</option>
                            <option value={600}>10 min</option>
                            <option value={1800}>30 min</option>
                            <option value={3600}>1 heure</option>
                            <option value={86400}>24 heures</option>
                        </select>
                    </td>
                </>
            ) : (
                <>
                    <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#0B1F3A', fontWeight: 600 }}>{record.name}</td>
                    <td style={{ ...tdStyle, maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', color: '#475569' }}>
                        {record.value}
                    </td>
                    <td style={tdStyle}>{record.priority != null ? <span style={{ background: '#fdf4ff', color: '#9333ea', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.75rem', fontWeight: 700 }}>{record.priority}</span> : <span style={{ color: '#cbd5e1' }}>—</span>}</td>
                    <td style={{ ...tdStyle, color: '#64748b' }}>{record.ttl >= 3600 ? `${record.ttl/3600}h` : `${record.ttl}s`}</td>
                </>
            )}
            <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                {editing ? (
                    <>
                        <button onClick={save} disabled={busy} title="Sauvegarder"
                            style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer', marginRight: '4px' }}>
                            <Check size={13} />
                        </button>
                        <button onClick={() => setEditing(false)} title="Annuler"
                            style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer' }}>
                            <X size={13} />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} title="Modifier"
                            style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer', marginRight: '4px' }}>
                            <Pencil size={13} />
                        </button>
                        <button onClick={del} disabled={busy} title="Supprimer"
                            style={{ background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '0.35rem 0.6rem', cursor: 'pointer' }}>
                            <Trash2 size={13} />
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
};

// ─── Add DNS Record Form ──────────────────────────────────────────────────────
const AddDnsForm = ({ domainId, dispatch, addToast, onClose }) => {
    const [form, setForm] = useState({ type: 'A', name: '', value: '', priority: '', ttl: 3600 });
    const [busy, setBusy] = useState(false);

    const PLACEHOLDER = {
        A:     { name: '@ ou sous-domaine', value: '192.168.1.1', hint: 'Pointe vers une adresse IPv4' },
        CNAME: { name: 'www', value: 'exemple.com', hint: 'Alias vers un autre nom de domaine' },
        MX:    { name: '@', value: 'mail.exemple.com', hint: 'Serveur de messagerie entrant' },
    };
    const ph = PLACEHOLDER[form.type] || { name: 'sous-domaine', value: 'valeur', hint: '' };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.value) { addToast('Nom et valeur sont requis.', 'error'); return; }
        setBusy(true);
        try {
            await dispatch(addDnsRecord({ idDomaine: domainId, ...form, priority: form.type === 'MX' ? parseInt(form.priority) || 10 : null })).unwrap();
            addToast('Enregistrement DNS ajouté !', 'success');
            onClose();
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { setBusy(false); }
    };

    const inputS = { padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', color: '#0B1F3A', outline: 'none', width: '100%', background: 'white' };

    return (
        <div style={{ marginTop: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Form Header */}
            <div style={{ padding: '0.85rem 1.1rem', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <PlusCircle size={14} /> Nouvel enregistrement DNS
                </span>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>
                    <X size={14} />
                </button>
            </div>
            <form onSubmit={submit} style={{ padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Type + TTL row */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '0.75rem' }}>
                    <div>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Type</label>
                        <select style={{ ...inputS, cursor: 'pointer' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                            <option>A</option>
                            <option>CNAME</option>
                            <option>MX</option>
                        </select>
                        {ph.hint && <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>{ph.hint}</div>}
                    </div>
                    <div>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>TTL</label>
                        <select style={{ ...inputS, cursor: 'pointer' }} value={form.ttl} onChange={e => setForm(f => ({ ...f, ttl: e.target.value }))}>
                            <option value={60}>1 minute (automatique)</option>
                            <option value={300}>5 minutes</option>
                            <option value={600}>10 minutes</option>
                            <option value={1800}>30 minutes</option>
                            <option value={3600}>1 heure</option>
                            <option value={86400}>24 heures</option>
                        </select>
                    </div>
                </div>
                {/* Name + Value row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nom</label>
                        <input style={inputS} placeholder={ph.name} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Valeur / Cible</label>
                        <input style={inputS} placeholder={ph.value} value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
                    </div>
                </div>
                {/* Priority if MX */}
                {form.type === 'MX' && (
                    <div style={{ maxWidth: '130px' }}>
                        <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Priorité</label>
                        <input style={inputS} type="number" placeholder="10" min="0" max="65535" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} />
                    </div>
                )}
                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.25rem' }}>
                    <button type="submit" disabled={busy}
                        style={{ padding: '0.55rem 1.25rem', background: '#0B1F3A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
                        {busy ? '...' : 'Enregistrer'}
                    </button>
                    <button type="button" onClick={onClose}
                        style={{ padding: '0.55rem 0.9rem', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

// ─── Full Management Panel (tabs) ─────────────────────────────────────────────
const ManagePanel = ({ dom, dispatch, addToast, onShowAddons, navigate, subscriptions }) => {
    const activeAddonsForDomain = (subscriptions || []).filter(sub => {
        const isSameDomain = sub.domainName === dom.domainName;
        const isNotExpired = sub.endDate && new Date(sub.endDate) > new Date();
        const isAddon = sub.typeService === 'addon' || ['Certificat SSL', 'Protection WHOIS', 'Email Pro'].includes(sub.nameService);
        return isSameDomain && isNotExpired && isAddon;
    });
    // Also pick up addons that are in the cart (pending payment) for this domain
    const { items: cartItems } = useSelector(state => state.cart);
    const [tab,        setTab]        = useState('actions');
    const [busy,       setBusy]       = useState({});
    const [showAddDns, setShowAddDns] = useState(false);
    const dnsState = useSelector(state => state.domains.dnsRecords[dom.idDomaine]);

    useEffect(() => {
        if (tab === 'dns' && !dnsState) {
            dispatch(fetchDnsRecords(dom.idDomaine));
        }
    }, [tab]);

    const actBusy = (key, val) => setBusy(b => ({ ...b, [key]: val }));

    const doRenew = async () => {
        actBusy('renew', true);
        try {
            const res = await dispatch(renewDomain(dom.idDomaine)).unwrap();
            if (res.addedToCart) {
                dispatch(fetchCart());
                addToast('Le renouvellement de votre domaine a été ajouté au panier !', 'success');
                navigate('/client/cart');
            } else {
                addToast('Domaine renouvelé pour 1 an !', 'success');
            }
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { actBusy('renew', false); }
    };

    const doAutoRenew = async () => {
        actBusy('ar', true);
        try {
            await dispatch(toggleAutoRenew(dom.idDomaine)).unwrap();
            addToast(`Auto-renouvellement ${dom.auto_renew ? 'désactivé' : 'activé'}.`, 'success');
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { actBusy('ar', false); }
    };

    const doLock = async () => {
        actBusy('lock', true);
        try {
            await dispatch(toggleDomainLock(dom.idDomaine)).unwrap();
            addToast(`Verrouillage ${dom.is_locked ? 'désactivé' : 'activé'}.`, 'success');
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { actBusy('lock', false); }
    };

    const doPrivacy = async () => {
        actBusy('priv', true);
        try {
            await dispatch(toggleWhoisPrivacy(dom.idDomaine)).unwrap();
            addToast(`WHOIS Privacy ${dom.whois_privacy ? 'désactivé' : 'activé'}.`, 'success');
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { actBusy('priv', false); }
    };



    const tabs = [
        { id: 'actions',  label: 'Actions',   icon: RefreshCw },
        { id: 'dns',      label: 'DNS',        icon: Globe },
        { id: 'security', label: 'Sécurité',   icon: Shield },
    ];

    const panelStyle = { background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '1.5rem 2rem' };
    const rowStyle   = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.1rem', background: 'white', borderRadius: '10px', border: '1px solid #e8ecf2', marginBottom: '0.75rem' };
    const labelStyle = { fontWeight: 600, color: '#0B1F3A', fontSize: '0.9rem' };
    const subStyle   = { fontSize: '0.78rem', color: '#64748b', marginTop: '2px' };
    const inputStyle = { padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', width: '100%', outline: 'none' };
    const primaryBtn = { padding: '0.5rem 1.1rem', background: '#0B1F3A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' };
    const ghostBtn   = { padding: '0.5rem 1.1rem', background: 'transparent', color: '#0B1F3A', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' };

    return (
        <div style={panelStyle}>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        style={{ padding: '0.5rem 1.1rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: tab === t.id ? 700 : 500, fontSize: '0.85rem',
                            background: tab === t.id ? '#0B1F3A' : '#e8ecf2',
                            color:      tab === t.id ? 'white'   : '#475569',
                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem', transition: 'all 0.2s' }}>
                        <t.icon size={14} /> {t.label}
                    </button>
                ))}
            </div>

            {/* ── ACTIONS TAB ─ */}
            {tab === 'actions' && (
                <div>
                    {/* Renew */}
                    <div style={rowStyle}>
                        <div>
                            <div style={labelStyle}>Renouveler le domaine</div>
                            <div style={subStyle}>Prolonger d'1 an à partir de la date d'expiration actuelle</div>
                            {!!dom.auto_renew ? (
                                <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.35rem', fontWeight: 600 }}>
                                    L'auto-renouvellement est activé. Ce domaine se renouvellera automatiquement à expiration.
                                </div>
                            ) : (
                                dom.statusDomaine === 'active' && (
                                    <div style={{ color: '#ea580c', fontSize: '0.78rem', marginTop: '0.35rem', fontWeight: 600 }}>
                                        Ce domaine est actif. Le renouvellement manuel est disponible uniquement après expiration.
                                    </div>
                                )
                            )}
                        </div>
                        <button 
                            onClick={doRenew} 
                            disabled={busy.renew || !!dom.auto_renew || dom.statusDomaine === 'active'} 
                            style={(!!dom.auto_renew || dom.statusDomaine === 'active') ? { ...primaryBtn, opacity: 0.5, cursor: 'not-allowed' } : primaryBtn}
                            title={
                                !!dom.auto_renew 
                                    ? "Désactivez l'auto-renouvellement pour renouveler manuellement" 
                                    : (dom.statusDomaine === 'active' ? "Le domaine est encore actif" : "")
                            }
                        >
                            <RefreshCw size={14} /> {busy.renew ? '...' : 'Renouveler'}
                        </button>
                    </div>

                    {/* Auto-renew */}
                    <div style={rowStyle}>
                        <div>
                            <div style={labelStyle}>Auto-renouvellement</div>
                            <div style={subStyle}>Renouvellement automatique avant expiration</div>
                        </div>
                        <Toggle value={!!dom.auto_renew} onToggle={doAutoRenew} disabled={!!busy.ar} />
                    </div>

                    {/* Extensions block — active subscriptions + pending cart items */}
                    {(() => {
                        const ADDON_NAMES = ['Certificat SSL', 'Protection WHOIS', 'Email Pro'];
                        const cartAddonsForDomain = (cartItems || []).filter(item =>
                            item.domainName === dom.domainName &&
                            ADDON_NAMES.includes(item.nameService)
                        );
                        const hasAny = activeAddonsForDomain.length > 0 || cartAddonsForDomain.length > 0;
                        if (!hasAny) return null;
                        return (
                            <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <div style={{ fontWeight: 700, color: '#0B1F3A', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Extensions :
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
                                    {/* Active subscriptions */}
                                    {activeAddonsForDomain.map((addon, aIdx) => (
                                        <div key={`active-${addon.idSub || aIdx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '0.82rem', color: '#334155', padding: '0.5rem 0.75rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                                            <span style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <Check size={14} color="#10b981" /> {addon.nameService}
                                            </span>
                                            <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.75rem', background: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                                Actif · jusqu'au {new Date(addon.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                    {/* Cart-pending addons */}
                                    {cartAddonsForDomain.map((item, iIdx) => {
                                        // Skip if this same addon is already shown as an active subscription
                                        const alreadyShown = activeAddonsForDomain.some(a => a.nameService === item.nameService);
                                        if (alreadyShown) return null;
                                        return (
                                            <div key={`cart-${item.idCart || iIdx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '0.82rem', color: '#334155', padding: '0.5rem 0.75rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                                                <span style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                                    <ShoppingCart size={14} color="#3b82f6" /> {item.nameService}
                                                </span>
                                                <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.75rem', background: '#dbeafe', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                                                    En attente de paiement
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })()}





                    {/* Buy addons */}
                    <div style={rowStyle}>
                        <div>
                            <div style={labelStyle}>Acheter des extensions</div>
                            <div style={subStyle}>SSL, protection WHOIS, email professionnel…</div>
                        </div>
                        <button 
                            onClick={() => onShowAddons(dom)} 
                            style={{ ...primaryBtn, background: '#0b1f3a', cursor: 'pointer' }}
                        >
                            <ShoppingCart size={14} /> Voir les offres
                        </button>
                    </div>
                </div>
            )}

            {/* ── DNS TAB ── */}
            {tab === 'dns' && (
                <div>
                    {/* Propagation info banner */}
                    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#92400e', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>ℹ️</span>
                        <span>Les modifications DNS peuvent prendre jusqu'à <strong>48 heures</strong> pour se propager sur internet (généralement 1–4h). TTL = durée de mise en cache par les résolveurs DNS.</span>
                    </div>

                    <PanelSection title="Enregistrements DNS" icon={Globe}>
                        {dnsState?.isLoading ? (
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Chargement des enregistrements...</p>
                        ) : (
                            <>
                                {dnsState?.records?.length > 0 ? (
                                    <div style={{ background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '0.75rem' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                                            <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                                <tr>
                                                    {['Type', 'Nom', 'Valeur / Cible', 'Priorité', 'TTL', ''].map((h, i) => (
                                                        <th key={i} style={{ padding: '0.7rem 0.9rem', color: '#64748b', fontWeight: 700, textAlign: i === 5 ? 'right' : 'left', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dnsState.records.map(rec => (
                                                    <DnsRow key={rec.idRecord} record={rec} domainId={dom.idDomaine} dispatch={dispatch} addToast={addToast} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                                        <Globe size={32} color="#cbd5e1" style={{ display: 'block', margin: '0 auto 0.75rem auto' }} />
                                        Aucun enregistrement DNS configuré pour ce domaine.
                                    </div>
                                )}

                                {showAddDns ? (
                                    <AddDnsForm domainId={dom.idDomaine} dispatch={dispatch} addToast={addToast} onClose={() => setShowAddDns(false)} />
                                ) : (
                                    <button onClick={() => setShowAddDns(true)} style={{ ...ghostBtn, marginTop: '0.5rem' }}>
                                        <PlusCircle size={14} /> Ajouter un enregistrement
                                    </button>
                                )}
                            </>
                        )}
                    </PanelSection>
                </div>
            )}

            {/* ── SECURITY TAB ───────────────────────────────────────────── */}
            {tab === 'security' && (
                <div>
                    {/* Domain Lock */}
                    <div style={rowStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {dom.is_locked
                                ? <Lock size={18} color="#ef4444" />
                                : <Unlock size={18} color="#94a3b8" />}
                            <div>
                                <div style={labelStyle}>Verrouillage du domaine</div>
                                <div style={subStyle}>Empêche tout transfert non autorisé</div>
                            </div>
                        </div>
                        <Toggle value={!!dom.is_locked} onToggle={doLock} disabled={!!busy.lock} />
                    </div>

                    {/* WHOIS Privacy */}
                    <div style={rowStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {dom.whois_privacy
                                ? <EyeOff size={18} color="#7c3aed" />
                                : <Eye    size={18} color="#94a3b8" />}
                            <div>
                                <div style={labelStyle}>Confidentialité WHOIS</div>
                                <div style={subStyle}>Masque vos informations personnelles dans le registre public</div>
                            </div>
                        </div>
                        <Toggle value={!!dom.whois_privacy} onToggle={doPrivacy} disabled={!!busy.priv} />
                    </div>

                    {/* Basic Protection */}
                    <div style={{ ...rowStyle, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Shield size={18} color="#10b981" />
                            <div>
                                <div style={labelStyle}>Protection de base</div>
                                <div style={subStyle}>Surveillance anti-spam et prévention de transfert non autorisé</div>
                            </div>
                        </div>
                        <span style={{ background: '#ecfdf5', color: '#10b981', fontSize: '0.72rem', fontWeight: 800, padding: '0.3rem 0.7rem', borderRadius: '20px' }}>
                            ACTIF
                        </span>
                    </div>


                </div>
            )}
        </div>
    );
};

const AddonsModal = ({ domain, onClose, dispatch, addToast, subscriptions }) => {
    const addons = [
        { id: 'ssl',   name: 'Certificat SSL',    price: '20', period: 'mois', duration: 1, features: ['Chiffrement HTTPS', 'Confiance visiteurs', 'Compatible tous navigateurs'], icon: ShieldAlert },
        { id: 'whois', name: 'Protection WHOIS',  price: '10', period: 'mois', duration: 1, features: ['Masquer vos donn\u00e9es personnelles', '\u00c9viter le spam', 'Protection identit\u00e9'], icon: Shield },
        { id: 'email', name: 'Email Pro',          price: '30', period: 'mois', duration: 1, features: ['Adresse email professionnelle', 'Anti-spam int\u00e9gr\u00e9', 'Acc\u00e8s webmail'], icon: Globe }
    ];
    const [pendingAddon, setPendingAddon] = useState(null);
    const [busy, setBusy] = useState(false);
    // Also read current cart items to block adding duplicates before checkout
    const { items: cartItems } = useSelector(state => state.cart);

    const buyAddon = async (addon) => {
        setBusy(true);
        setPendingAddon(null);
        try {
            await dispatch(addToCart({ nameService: addon.name, domainName: domain.domainName, durationMonths: addon.duration })).unwrap();
            addToast(`${addon.name} ajout\u00e9 au panier avec succ\u00e8s !`, 'success');
            onClose();
        } catch(e) { addToast(e.message || "Erreur lors de l'ajout", 'error'); }
        finally { setBusy(false); }
    };

    return (
        <>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(11,20,26,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.3s' }}>
                <div style={{ background: '#1E293B', borderRadius: 20, width: '100%', maxWidth: '500px', boxShadow: '0 25px 60px rgba(0,0,0,0.18)', animation: 'slideUp 0.2s ease', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #0F172A' }}>
                        <h2 style={{ margin: 0, color: '#e9edef', fontSize: '1.2rem', fontWeight: 800 }}>Extensions pour {domain.domainName}</h2>
                        <button onClick={onClose} style={{ background: '#334155', color: '#e9edef', border: 'none', cursor: 'pointer', display: 'flex', padding: 6, borderRadius: 8 }}><X size={16} /></button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
                        {addons.map(a => {
                            const addonIsActive = (subscriptions || []).some(sub => 
                                sub.domainName === domain.domainName && 
                                sub.nameService === a.name && 
                                sub.endDate && 
                                new Date(sub.endDate) > new Date()
                            );
                            // Also block if already in cart (not yet checked out)
                            const addonInCart = (cartItems || []).some(item =>
                                item.domainName === domain.domainName &&
                                item.nameService === a.name
                            );

                            return (
                                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1.5px solid #334155', background: '#0F172A', borderRadius: 10 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <a.icon color="#1E6BFF" size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#e9edef', fontSize: '0.95rem' }}>{a.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#8696a0', marginTop: '4px' }}>{a.price} Dhs/Mois</div>
                                        </div>
                                    </div>
                                    {addonIsActive ? (
                                        <button disabled={true} style={{ background: '#334155', color: '#8696a0', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'not-allowed', fontSize: '0.85rem' }}>
                                            Déjà activé
                                        </button>
                                    ) : addonInCart ? (
                                        <button disabled={true} style={{ background: '#1e3a5f', color: '#93c5fd', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'not-allowed', fontSize: '0.85rem' }}>
                                            Dans le panier
                                        </button>
                                    ) : (
                                        <button disabled={busy} onClick={() => setPendingAddon(a)} style={{ background: '#1E6BFF', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', fontSize: '0.85rem' }}>
                                            Ajouter
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {pendingAddon && (
                <ConfirmCartModal
                    item={{ name: pendingAddon.name, price: pendingAddon.price, period: pendingAddon.period, features: pendingAddon.features }}
                    onConfirm={() => buyAddon(pendingAddon)}
                    onCancel={() => setPendingAddon(null)}
                />
            )}
        </>
    );
};


const ClientDomains = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: domains, isLoading } = useSelector(state => state.domains);
    const { items: subscriptions } = useSelector(state => state.subscriptions || { items: [] });
    const { user } = useSelector(state => state.auth);
    const { addToast } = useToast();
    const [openPanel, setOpenPanel] = useState(null);
    const [addonDomain, setAddonDomain] = useState(null); 

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchDomains(user.id));
            dispatch(fetchSubscriptions(user.id));
        }
    }, [dispatch, user]);

    const togglePanel = (id) => setOpenPanel(p => p === id ? null : id);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Domaines</h1>

            {isLoading ? (
                <p style={{ color: '#94a3b8' }}>Chargement de vos domaines...</p>
            ) : domains.length === 0 ? (
                <div style={{ padding: '4rem 2rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <Globe size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
                    <p style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#64748b' }}>Vous n'avez aucun domaine enregistré.</p>
                    <Link to="/domaines/register" style={{ color: '#1E6BFF', fontWeight: 700, textDecoration: 'none' }}>Rechercher un domaine</Link>
                </div>
            ) : (
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(11,31,58,0.03)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <tr>
                                <th style={{ padding: '1.1rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.82rem' }}>Domaine</th>
                                <th style={{ padding: '1.1rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.82rem' }}>Statut</th>
                                <th style={{ padding: '1.1rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.82rem' }}>Expiration</th>
                                <th style={{ padding: '1.1rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.82rem' }}>Auto-renew</th>
                                <th style={{ padding: '1.1rem 1.5rem', color: '#64748b', fontWeight: 600, fontSize: '0.82rem', textAlign: 'right' }}>Gestion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.map(dom => {
                                const expireDate  = new Date(dom.expirationDate);
                                const isExpiring  = expireDate < new Date(new Date().setDate(new Date().getDate() + 30));
                                const isOpen      = openPanel === dom.idDomaine;

                                return (
                                    <React.Fragment key={dom.idDomaine}>
                                        <tr style={{ borderBottom: isOpen ? 'none' : '1px solid #f1f5f9', background: isOpen ? '#f8fafc' : 'white', transition: 'background 0.2s' }}>
                                            {/* Domain name */}
                                            <td style={{ padding: '1.1rem 1.5rem' }}>
                                                <div style={{ fontWeight: 700, color: '#0B1F3A', fontSize: '0.97rem' }}>{dom.domainName}</div>
                                                <div style={{ fontSize: '0.77rem', color: '#94a3b8' }}>#{dom.idDomaine}</div>
                                            </td>
                                            {/* Status */}
                                            <td style={{ padding: '1.1rem 1.5rem' }}>
                                                <span style={{
                                                    background: dom.statusDomaine === 'active' ? '#ecfdf5' : '#fef2f2',
                                                    color:      dom.statusDomaine === 'active' ? '#10b981' : '#ef4444',
                                                    fontSize: '0.7rem', fontWeight: 800, padding: '0.35rem 0.65rem',
                                                    borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px'
                                                }}>
                                                    {dom.statusDomaine}
                                                </span>
                                            </td>
                                            {/* Expiration */}
                                            <td style={{ padding: '1.1rem 1.5rem', fontSize: '0.88rem', fontWeight: 600, color: isExpiring ? '#ea580c' : '#0B1F3A' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                    {isExpiring ? <ShieldAlert size={14} color="#ea580c" /> : <Clock size={14} color="#64748b" />}
                                                    {expireDate.toLocaleDateString()}
                                                </div>
                                            </td>
                                            {/* Auto-renew badge */}
                                            <td style={{ padding: '1.1rem 1.5rem' }}>
                                                <span style={{
                                                    fontSize: '0.72rem', fontWeight: 700,
                                                    background: dom.auto_renew ? '#ecfdf5' : '#f1f5f9',
                                                    color:      dom.auto_renew ? '#10b981' : '#94a3b8',
                                                    padding: '0.3rem 0.65rem', borderRadius: '20px'
                                                }}>
                                                    {dom.auto_renew ? 'Activé' : 'Désactivé'}
                                                </span>
                                            </td>
                                            {/* Manage button */}
                                            <td style={{ padding: '1.1rem 1.5rem', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => togglePanel(dom.idDomaine)}
                                                    style={{
                                                        padding: '0.5rem 1.1rem', borderRadius: '8px',
                                                        background: isOpen ? '#0B1F3A' : 'white',
                                                        color:      isOpen ? 'white' : '#0B1F3A',
                                                        border: '1px solid #0B1F3A', fontWeight: 700, fontSize: '0.82rem',
                                                        cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                    Gérer
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Expanded management panel */}
                                        {isOpen && (
                                            <tr>
                                                <td colSpan={5} style={{ padding: 0, borderBottom: '1px solid #e2e8f0' }}>
                                                    <ManagePanel dom={dom} dispatch={dispatch} addToast={addToast} onShowAddons={setAddonDomain} navigate={navigate} subscriptions={subscriptions} />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {addonDomain && (
                <AddonsModal domain={addonDomain} onClose={() => setAddonDomain(null)} dispatch={dispatch} addToast={addToast} subscriptions={subscriptions} />
            )}
        </div>
    );
};

export default ClientDomains;
