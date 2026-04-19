import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDomains, renewDomain, toggleAutoRenew, toggleDomainLock, toggleWhoisPrivacy,
    transferDomain, fetchDnsRecords, addDnsRecord, updateDnsRecord, deleteDnsRecord
} from '../../store/slices/domainSlice';
import { Clock, ShieldAlert, RefreshCw, Globe, ChevronDown, ChevronUp, Lock, Unlock,
         Eye, EyeOff, ArrowRightLeft, PlusCircle, Pencil, Trash2, Check, X,
         ShoppingCart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

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

    const tdStyle = { padding: '0.6rem 0.75rem', fontSize: '0.82rem', color: '#334155', verticalAlign: 'middle' };
    const inputStyle = { width: '100%', padding: '0.35rem 0.5rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', color: '#0B1F3A', outline: 'none' };

    return (
        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={tdStyle}>
                <span style={{ background: record.type === 'A' ? '#eff6ff' : record.type === 'MX' ? '#fdf4ff' : '#f0fdf4',
                    color: record.type === 'A' ? '#3b82f6' : record.type === 'MX' ? '#a855f7' : '#22c55e',
                    padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}>
                    {record.type}
                </span>
            </td>
            {editing ? (
                <>
                    <td style={tdStyle}><input style={inputStyle} value={form.name}     onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></td>
                    <td style={tdStyle}><input style={inputStyle} value={form.value}    onChange={e => setForm(f => ({ ...f, value: e.target.value }))} /></td>
                    {record.type === 'MX'
                        ? <td style={tdStyle}><input style={{ ...inputStyle, width: '60px' }} value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} /></td>
                        : <td style={tdStyle}><span style={{ color: '#94a3b8' }}>—</span></td>}
                    <td style={tdStyle}><input style={{ ...inputStyle, width: '70px' }} value={form.ttl} onChange={e => setForm(f => ({ ...f, ttl: e.target.value }))} /></td>
                </>
            ) : (
                <>
                    <td style={tdStyle}>{record.name}</td>
                    <td style={{ ...tdStyle, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{record.value}</td>
                    <td style={tdStyle}>{record.priority ?? '—'}</td>
                    <td style={tdStyle}>{record.ttl}</td>
                </>
            )}
            <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                {editing ? (
                    <>
                        <button onClick={save}  disabled={busy} title="Sauvegarder"
                            style={{ background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer', marginRight: '4px' }}>
                            <Check size={13} />
                        </button>
                        <button onClick={() => setEditing(false)} title="Annuler"
                            style={{ background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer' }}>
                            <X size={13} />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} title="Modifier"
                            style={{ background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer', marginRight: '4px' }}>
                            <Pencil size={13} />
                        </button>
                        <button onClick={del} disabled={busy} title="Supprimer"
                            style={{ background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '0.3rem 0.5rem', cursor: 'pointer' }}>
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

    const inputS = { padding: '0.5rem 0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.85rem', color: '#0B1F3A', outline: 'none', width: '100%' };
    const selectS = { ...inputS, background: 'white' };

    return (
        <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr auto auto', gap: '0.5rem', alignItems: 'end', marginTop: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #cbd5e1' }}>
            <div>
                <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>TYPE</label>
                <select style={selectS} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option>A</option>
                    <option>CNAME</option>
                    <option>MX</option>
                </select>
            </div>
            <div>
                <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>NOM</label>
                <input style={inputS} placeholder="@ ou sous-domaine" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
                <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>VALEUR</label>
                <input style={inputS} placeholder={form.type === 'A' ? '192.168.1.1' : form.type === 'MX' ? 'mail.example.com' : 'target.example.com'} value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
            </div>
            {form.type === 'MX' ? (
                <div>
                    <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>PRIORITÉ</label>
                    <input style={{ ...inputS, width: '70px' }} type="number" placeholder="10" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} />
                </div>
            ) : <div />}
            <div style={{ display: 'flex', gap: '0.4rem', paddingTop: '1.2rem' }}>
                <button type="submit" disabled={busy}
                    style={{ padding: '0.5rem 1rem', background: '#0B1F3A', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {busy ? '...' : 'Ajouter'}
                </button>
                <button type="button" onClick={onClose}
                    style={{ padding: '0.5rem 0.6rem', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    <X size={14} />
                </button>
            </div>
        </form>
    );
};

// ─── Full Management Panel (tabs) ─────────────────────────────────────────────
const ManagePanel = ({ dom, dispatch, addToast }) => {
    const [tab,        setTab]        = useState('actions');
    const [busy,       setBusy]       = useState({});
    const [eppCode,    setEppCode]    = useState('');
    const [showEpp,    setShowEpp]    = useState(false);
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
            await dispatch(renewDomain(dom.idDomaine)).unwrap();
            addToast('Domaine renouvelé pour 1 an !', 'success');
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

    const doTransfer = async () => {
        if (!eppCode.trim()) { addToast('Entrez votre code EPP.', 'error'); return; }
        actBusy('transfer', true);
        try {
            await dispatch(transferDomain({ idDomaine: dom.idDomaine, eppCode })).unwrap();
            addToast('Demande de transfert soumise.', 'success');
            setEppCode(''); setShowEpp(false);
        } catch (e) { addToast(e.message || 'Erreur', 'error'); }
        finally { actBusy('transfer', false); }
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
                        </div>
                        <button onClick={doRenew} disabled={busy.renew} style={primaryBtn}>
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

                    {/* Transfer */}
                    <div style={{ ...rowStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div>
                                <div style={labelStyle}>Transférer le domaine</div>
                                <div style={subStyle}>Transférer vers un autre bureau d'enregistrement (requiert code EPP)</div>
                            </div>
                            <button onClick={() => setShowEpp(e => !e)} style={ghostBtn}>
                                <ArrowRightLeft size={14} /> Transférer
                            </button>
                        </div>
                        {showEpp && (
                            <div style={{ width: '100%', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <input style={{ ...inputStyle, flex: 1 }} type="text" placeholder="Code EPP / Auth Code"
                                    value={eppCode} onChange={e => setEppCode(e.target.value)} />
                                <button onClick={doTransfer} disabled={busy.transfer} style={primaryBtn}>
                                    {busy.transfer ? '...' : 'Confirmer'}
                                </button>
                            </div>
                        )}
                        {dom.is_locked && (
                            <div style={{ fontSize: '0.8rem', color: '#ef4444', background: '#fef2f2', padding: '0.4rem 0.75rem', borderRadius: '6px', width: '100%' }}>
                                ⚠ Le domaine est verrouillé. Désactivez le verrou dans l'onglet Sécurité avant de transférer.
                            </div>
                        )}
                    </div>

                    {/* Buy addons */}
                    <div style={rowStyle}>
                        <div>
                            <div style={labelStyle}>Acheter des extensions</div>
                            <div style={subStyle}>SSL, protection WHOIS, email professionnel…</div>
                        </div>
                        <Link to="/services" style={{ ...primaryBtn, textDecoration: 'none', background: '#0b1f3a' }}>
                            <ShoppingCart size={14} /> Voir les offres
                        </Link>
                    </div>
                </div>
            )}

            {/* ── DNS TAB ── */}
            {tab === 'dns' && (
                <div>
                    {/* DNS Records */}
                    <PanelSection title="Enregistrements DNS" icon={Globe}>
                        {dnsState?.isLoading ? (
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Chargement des enregistrements...</p>
                        ) : (
                            <>
                                {dnsState?.records?.length > 0 ? (
                                    <div style={{ background: 'white', borderRadius: '10px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '0.75rem' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                                            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <tr>
                                                    {['Type','Nom','Valeur','Priorité','TTL',''].map((h,i) => (
                                                        <th key={i} style={{ padding: '0.6rem 0.75rem', color: '#64748b', fontWeight: 600, textAlign: i === 5 ? 'right' : 'left', fontSize: '0.78rem' }}>{h}</th>
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
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Aucun enregistrement DNS. Ajoutez-en un ci-dessous.</p>
                                )}

                                {showAddDns ? (
                                    <AddDnsForm domainId={dom.idDomaine} dispatch={dispatch} addToast={addToast} onClose={() => setShowAddDns(false)} />
                                ) : (
                                    <button onClick={() => setShowAddDns(true)} style={ghostBtn}>
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

                    {/* Status summary */}
                    <div style={{ marginTop: '1rem', padding: '0.85rem 1.1rem', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe', fontSize: '0.82rem', color: '#1d4ed8' }}>
                        <strong>Résumé sécurité :</strong>&nbsp;
                        {dom.is_locked ? '🔒 Verrouillé' : '🔓 Non verrouillé'} · {dom.whois_privacy ? '👁 WHOIS masqué' : '👁 WHOIS visible'} · 🛡 Protection active
                    </div>
                </div>
            )}
        </div>
    );
};


const ClientDomains = () => {
    const dispatch = useDispatch();
    const { items: domains, isLoading } = useSelector(state => state.domains);
    const { user } = useSelector(state => state.auth);
    const { addToast } = useToast();
    const [openPanel, setOpenPanel] = useState(null); 

    useEffect(() => {
        if (user?.id) dispatch(fetchDomains(user.id));
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
                                                    <ManagePanel dom={dom} dispatch={dispatch} addToast={addToast} />
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
        </div>
    );
};

export default ClientDomains;
