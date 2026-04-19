import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUserProfile, updateUserAvatar, updateUserPassword, updateUserEmail } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import { CheckCircle2, Camera, Loader2, AlertCircle, X, Check, Eye, EyeOff } from 'lucide-react';
import LogoutConfirmModal from '../../components/LogoutConfirmModal';
import './Profile.css';
const InputField = ({ label, value, onChange, type = 'text', placeholder = '', hint = '', readOnly = false }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const currentType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>{label}</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type={currentType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    style={{
                        padding: '0.75rem 1rem',
                        paddingRight: isPasswordType ? '2.5rem' : '1rem',
                        borderRadius: '8px',
                        border: '1.5px solid #e2e8f0',
                        background: readOnly ? '#f1f5f9' : '#fff',
                        fontSize: '0.9rem',
                        color: readOnly ? '#64748b' : '#0B1F3A',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        cursor: readOnly ? 'not-allowed' : 'text',
                        opacity: readOnly ? 0.8 : 1,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}
                    onFocus={e => !readOnly && (e.target.style.borderColor = '#1E6BFF')}
                    onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                />
                {isPasswordType && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {hint && <small style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{hint}</small>}
        </div>
    );
};

const AlertBanner = ({ type, message, onClose }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: type === 'success' ? '#ecfdf5' : '#fef2f2',
        color: type === 'success' ? '#059669' : '#dc2626',
        border: `1px solid ${type === 'success' ? '#bbf7d0' : '#fecaca'}`,
        padding: '0.9rem 1.2rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 500
    }}>
        {type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
        <span style={{ flex: 1 }}>{message}</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontWeight: 700, fontSize: '1rem', padding: '0 4px' }}>✕</button>
    </div>
);

const ClientProfile = () => {
    const { user, isLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileRef = useRef();

    const [activeTab, setActiveTab] = useState('edit_profile');
    const [flash,     setFlash]     = useState(null);
    const [isDirty,   setIsDirty]   = useState(false);

    // Edit Profile form state
    const [form, setForm] = useState({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        username: user?.username || '',
        location: user?.location || '',
        website: user?.website || '',
        bio: user?.bio || '',
        interests: user?.interests || '',
        instagram: user?.instagram || '',
        twitter: user?.twitter || '',
    });

    // Helper: update form field and mark as dirty
    const setField = (key) => (e) => { setForm(f => ({ ...f, [key]: e.target.value })); setIsDirty(true); };

    const [emailForm, setEmailForm] = useState({ email: user?.email || '' });

    const [passForm, setPassForm] = useState({ old_password: '', new_password: '', confirm_password: '' });

    const [avatarPreview, setAvatarPreview] = useState(user?.avatar ? user.avatar : null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const showFlash = (type, message) => {
        setFlash({ type, message });
        setTimeout(() => setFlash(null), 5000);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setIsDirty(true);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        let success = true;
        let errorMsg = '';

        if (selectedFile) {
            const fd = new FormData();
            fd.append('avatar', selectedFile);
            const avatarResult = await dispatch(updateUserAvatar(fd));
            if (!updateUserAvatar.fulfilled.match(avatarResult)) {
                success = false;
                errorMsg = avatarResult.payload?.message || 'Erreur lors du téléchargement de l\'avatar.';
            } else {
                setSelectedFile(null); // Clear after success
            }
        }

        if (success) {
            const result = await dispatch(updateUserProfile(form));
            if (updateUserProfile.fulfilled.match(result)) {
                showFlash('success', 'Profil mis à jour avec succès !');
                setIsDirty(false);
            } else {
                showFlash('error', result.payload?.message || 'Erreur interne. Réessayez.');
            }
        } else {
            showFlash('error', errorMsg);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateUserEmail(emailForm));
        if (updateUserEmail.fulfilled.match(result)) {
            showFlash('success', 'Email mis à jour avec succès !');
        } else {
            showFlash('error', result.payload?.message || 'Erreur lors de la mise à jour de l\'email.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passForm.new_password !== passForm.confirm_password) {
            showFlash('error', 'Les nouveaux mots de passe ne correspondent pas.');
            return;
        }
        if (passForm.new_password.length < 8) {
            showFlash('error', 'Le nouveau mot de passe doit contenir au moins 8 caractères.');
            return;
        }
        const result = await dispatch(updateUserPassword({ old_password: passForm.old_password, new_password: passForm.new_password }));
        if (updateUserPassword.fulfilled.match(result)) {
            showFlash('success', 'Mot de passe changé avec succès !');
            setPassForm({ old_password: '', new_password: '', confirm_password: '' });
        } else {
            showFlash('error', result.payload?.message || 'Erreur lors du changement de mot de passe.');
        }
    };

    const tabs = [
        { id: 'edit_profile', label: 'Modifier le profil' },
        { id: 'email_settings', label: 'Paramètres d\'email' },
        { id: 'change_password', label: 'Changer le mot de passe' },
    ];



    const isEmailDirty = emailForm.email && emailForm.email !== (user?.email || '');
    const isPassDirty = Boolean(passForm.old_password || passForm.new_password || passForm.confirm_password);

    const pswd = passForm.new_password;
    const hasMinLength = pswd.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pswd);
    const hasNumber = /[0-9]/.test(pswd);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pswd);

    return (
        <PageTransition>
            <div className="profile-container">

                <div className="profile-sidebar">
                    <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>Paramètres du compte</h2>
                    <ul className="profile-sidebar-list">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => { setActiveTab(tab.id); setFlash(null); }}
                                    style={{
                                        background: 'none', border: 'none', padding: 0,
                                        color: activeTab === tab.id ? '#1E6BFF' : '#64748b',
                                        fontWeight: activeTab === tab.id ? 700 : 500,
                                        fontSize: '0.92rem', cursor: 'pointer', textAlign: 'left',
                                        textDecoration: activeTab === tab.id ? 'underline' : 'none',
                                        textUnderlineOffset: '4px'
                                    }}
                                >{tab.label}</button>

                            </li>
                        ))}
                        <div style={{ margin: '0.5rem 0', height: '1px', background: '#e2e8f0' }} />
                        <li>
                            <button onClick={() => setShowLogoutModal(true)}
                                className='logout-profile'>
                                Déconnexion
                            </button>
                        </li>
                    </ul>
                </div>

                <div style={{ flex: 1, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {flash && <AlertBanner type={flash.type} message={flash.message} onClose={() => setFlash(null)} />}

                    {activeTab === 'edit_profile' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
                                <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '2rem', margin: 0 }}>Modifier le profil</h1>
                                {isDirty && (
                                    <span 
                                        onClick={() => document.getElementById('update-btn')?.scrollIntoView({ behavior: 'smooth' })}
                                        style={{ fontSize: '0.8rem', color: '#dc2626', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: 600, cursor: 'pointer' }}
                                    >
                                        ↓ Cliquez sur Modifier le profil pour enregistrer
                                    </span>
                                )}
                            </div>

                            <div className="profile-content-wrap">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                    <div
                                        onClick={() => fileRef.current.click()}
                                        style={{ width: '110px', height: '110px', borderRadius: '50%', background: avatarPreview ? 'transparent' : '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 800, overflow: 'hidden', cursor: 'pointer', position: 'relative', border: '3px solid #e2e8f0', transition: 'border-color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = '#1E6BFF'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                                    >
                                        {avatarPreview
                                            ? <img src={avatarPreview} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            : <img src="/user.avif" alt="default avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        }
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '35px' }}>
                                            <Camera size={16} color="white" />
                                        </div>
                                    </div>
                                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                                    <small style={{ color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center' }}>Cliquez pour changer</small>
                                </div>

                                <form onSubmit={handleProfileSubmit} style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div className="form-row">
                                        <InputField label="Prénom" value={form.first_name} onChange={setField('first_name')} />
                                        <InputField label="Nom" value={form.last_name} onChange={setField('last_name')} />
                                    </div>
                                    <InputField label="Nom d'utilisateur" value={form.username} onChange={setField('username')} hint={`ihost.ma/@${form.username || 'user'}`} />
                                    <div className="form-row">
                                        <InputField label="Localisation" value={form.location} placeholder="Casablanca, Maroc" onChange={setField('location')} />
                                        <InputField label="Site Web" value={form.website} placeholder="https://" onChange={setField('website')} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Biographie</label>
                                        <textarea
                                            rows={3}
                                            value={form.bio}
                                            onChange={e => { setForm(f => ({ ...f, bio: e.target.value })); setIsDirty(true); }}
                                            maxLength={250}
                                            placeholder="Parlez-nous de vous..."
                                            style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', fontSize: '0.9rem', color: '#0B1F3A', outline: 'none', resize: 'vertical' }}
                                            onFocus={e => (e.target.style.borderColor = '#1E6BFF')}
                                            onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                                        />
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', alignSelf: 'flex-end' }}>{form.bio.length}/250</span>
                                    </div>
                                    <InputField label="Centres d'intérêt (séparés par des virgules)" value={form.interests} placeholder="web, hosting, cloud..." onChange={setField('interests')} />
                                    <div className="form-row">
                                        <InputField label="Instagram" value={form.instagram} placeholder="username" onChange={setField('instagram')} hint="@ihost_ma pourrait vous mentionner" />
                                        <InputField label="X (Twitter)" value={form.twitter} placeholder="username" onChange={setField('twitter')} hint="@ihost_ma pourrait vous mentionner" />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                                        <button
                                            id="update-btn"
                                            type="submit"
                                            disabled={isLoading || !isDirty}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: isDirty ? 'linear-gradient(135deg, #1E6BFF, #0043C0)' : '#cbd5e1', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: (!isDirty || isLoading) ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, transition: 'background 0.25s' }}
                                        >
                                            {isLoading && <Loader2 size={16} className="spin" />}
                                            Mettre à jour le profil
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'email_settings' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
                                <div>
                                    <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>Paramètres d'Email</h1>
                                    <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Mettez à jour l'adresse email associée à votre compte.</p>
                                </div>
                                {isEmailDirty && (
                                    <span 
                                        onClick={() => document.getElementById('update-email-btn')?.scrollIntoView({ behavior: 'smooth' })}
                                        style={{ fontSize: '0.8rem', color: '#dc2626', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: 600, cursor: 'pointer', marginTop: '0.2rem' }}
                                    >
                                        ↓ Cliquez sur Mettre à jour l'email
                                    </span>
                                )}
                            </div>

                            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
                                <InputField label="Email actuel" value={user?.email || ''} readOnly />
                                <InputField
                                    label="Nouvelle adresse email"
                                    type="email"
                                    value={emailForm.email}
                                    onChange={e => setEmailForm({ email: e.target.value })}
                                    placeholder="nouvelle@email.com"
                                />
                                <button
                                    id="update-email-btn"
                                    type="submit"
                                    disabled={isLoading || !isEmailDirty}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content', background: isEmailDirty ? 'linear-gradient(135deg, #1E6BFF, #0043C0)' : '#cbd5e1', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: (!isEmailDirty || isLoading) ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, transition: 'background 0.25s' }}
                                >
                                    {isLoading && <Loader2 size={16} />}
                                    Mettre à jour l'email
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'change_password' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
                                <div>
                                    <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>Changer le mot de passe</h1>
                                    <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Choisissez un mot de passe fort d'au moins 8 caractères.</p>
                                </div>
                                {isPassDirty && (
                                    <span 
                                        onClick={() => document.getElementById('update-pass-btn')?.scrollIntoView({ behavior: 'smooth' })}
                                        style={{ fontSize: '0.8rem', color: '#dc2626', textDecoration: 'underline', textUnderlineOffset: '2px', fontWeight: 600, cursor: 'pointer', marginTop: '0.2rem' }}
                                    >
                                        ↓ Cliquez sur Changer le mot
                                    </span>
                                )}
                            </div>

                            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
                                <InputField label="Mot de passe actuel" type="password" value={passForm.old_password} onChange={e => setPassForm({ ...passForm, old_password: e.target.value })} />
                                <InputField label="Nouveau mot de passe" type="password" value={passForm.new_password} onChange={e => setPassForm({ ...passForm, new_password: e.target.value })} />
                                
                                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid #e2e8f0' }}>
                                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B1F3A', margin: 0 }}>Règles de sécurité :</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: hasMinLength ? '#059669' : '#64748b' }}>
                                            {hasMinLength ? <Check size={16} color="#059669" /> : <X size={16} color="#94a3b8" />} Au moins 8 caractères
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: hasUpperCase ? '#059669' : '#64748b' }}>
                                            {hasUpperCase ? <Check size={16} color="#059669" /> : <X size={16} color="#94a3b8" />} Une majuscule
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: hasNumber ? '#059669' : '#64748b' }}>
                                            {hasNumber ? <Check size={16} color="#059669" /> : <X size={16} color="#94a3b8" />} Un chiffre
                                        </li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: hasSpecialChar ? '#059669' : '#64748b' }}>
                                            {hasSpecialChar ? <Check size={16} color="#059669" /> : <X size={16} color="#94a3b8" />} Un caractère spécial
                                        </li>
                                    </ul>
                                </div>
                                <InputField label="Confirmer le nouveau mot de passe" type="password" value={passForm.confirm_password} onChange={e => setPassForm({ ...passForm, confirm_password: e.target.value })} />
                                <button
                                    id="update-pass-btn"
                                    type="submit"
                                    disabled={isLoading || !isPassDirty}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content', background: isPassDirty ? 'linear-gradient(135deg, #1E6BFF, #0043C0)' : '#cbd5e1', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: (!isPassDirty || isLoading) ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, transition: 'background 0.25s' }}
                                >
                                    {isLoading && <Loader2 size={16} />}
                                    Changer le mot de passe
                                </button>
                            </form>
                        </div>
                    )}

                </div>
            </div>
            <LogoutConfirmModal 
                isOpen={showLogoutModal} 
                onClose={() => setShowLogoutModal(false)} 
            />
        </PageTransition>
    );
};

export default ClientProfile;
