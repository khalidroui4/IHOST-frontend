import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUserProfile, updateUserAvatar, updateUserPassword, updateUserEmail } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import { CheckCircle2, Camera, Loader2, AlertCircle } from 'lucide-react';
import LogoutConfirmModal from '../../components/LogoutConfirmModal';
import './Profile.css';
const InputField = ({ label, value, onChange, type = 'text', placeholder = '', hint = '', readOnly = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #e2e8f0',
                background: readOnly ? '#f8fafc' : '#fff',
                fontSize: '0.9rem',
                color: '#0B1F3A',
                outline: 'none',
                transition: 'border-color 0.2s',
                cursor: readOnly ? 'default' : 'text'
            }}
            onFocus={e => !readOnly && (e.target.style.borderColor = '#1E6BFF')}
            onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
        />
        {hint && <small style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{hint}</small>}
    </div>
);

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
    const [flash, setFlash] = useState(null);

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
        { id: 'edit_profile', label: 'Edit profile' },
        { id: 'email_settings', label: 'Email settings' },
        { id: 'change_password', label: 'Change password' },
    ];

    const avatarInitial = user?.first_name ? user.first_name.charAt(0).toUpperCase() :
        user?.nameU ? user.nameU.charAt(0).toUpperCase() : 'U';

    return (
        <PageTransition>
            <div className="profile-container">

                <div className="profile-sidebar">
                    <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>Account settings</h2>
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
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>

                <div style={{ flex: 1, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {flash && <AlertBanner type={flash.type} message={flash.message} onClose={() => setFlash(null)} />}

                    {activeTab === 'edit_profile' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
                                <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>Edit Profile</h1>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#10b981', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                                    <CheckCircle2 size={15} /> Account Confirmed
                                </span>
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
                                            : avatarInitial
                                        }
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '35px' }}>
                                            <Camera size={16} color="white" />
                                        </div>
                                    </div>
                                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                                    <small style={{ color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center' }}>Click to change</small>
                                </div>

                                <form onSubmit={handleProfileSubmit} style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    <div className="form-row">
                                        <InputField label="First name" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
                                        <InputField label="Last name" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
                                    </div>
                                    <InputField label="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} hint={`ihost.ma/@${form.username || 'user'}`} />
                                    <div className="form-row">
                                        <InputField label="Location" value={form.location} placeholder="Casablanca, Maroc" onChange={e => setForm({ ...form, location: e.target.value })} />
                                        <InputField label="Website" value={form.website} placeholder="https://" onChange={e => setForm({ ...form, website: e.target.value })} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Bio</label>
                                        <textarea
                                            rows={3}
                                            value={form.bio}
                                            onChange={e => setForm({ ...form, bio: e.target.value })}
                                            maxLength={250}
                                            placeholder="Tell us about yourself..."
                                            style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff', fontSize: '0.9rem', color: '#0B1F3A', outline: 'none', resize: 'vertical' }}
                                            onFocus={e => (e.target.style.borderColor = '#1E6BFF')}
                                            onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                                        />
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', alignSelf: 'flex-end' }}>{form.bio.length}/250</span>
                                    </div>
                                    <InputField label="Interests (comma-separated)" value={form.interests} placeholder="web, hosting, cloud..." onChange={e => setForm({ ...form, interests: e.target.value })} />
                                    <div className="form-row">
                                        <InputField label="Instagram" value={form.instagram} placeholder="username" onChange={e => setForm({ ...form, instagram: e.target.value })} hint="@ihost_ma may feature you" />
                                        <InputField label="X (Twitter)" value={form.twitter} placeholder="username" onChange={e => setForm({ ...form, twitter: e.target.value })} hint="@ihost_ma may feature you" />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
                                        >
                                            {isLoading && <Loader2 size={16} className="spin" />}
                                            Update Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'email_settings' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
                                <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>Email Settings</h1>
                                <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Update the email address associated with your account.</p>
                            </div>

                            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
                                <InputField label="Current Email" value={user?.email || ''} readOnly />
                                <InputField
                                    label="New Email Address"
                                    type="email"
                                    value={emailForm.email}
                                    onChange={e => setEmailForm({ email: e.target.value })}
                                    placeholder="nouvelle@email.com"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
                                >
                                    {isLoading && <Loader2 size={16} />}
                                    Update Email
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'change_password' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
                                <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '1.4rem', margin: 0 }}>Change Password</h1>
                                <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Choose a strong password of at least 8 characters.</p>
                            </div>

                            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
                                <InputField label="Current Password" type="password" value={passForm.old_password} onChange={e => setPassForm({ ...passForm, old_password: e.target.value })} />
                                <InputField label="New Password" type="password" value={passForm.new_password} onChange={e => setPassForm({ ...passForm, new_password: e.target.value })} hint="At least 8 characters" />
                                <InputField label="Confirm New Password" type="password" value={passForm.confirm_password} onChange={e => setPassForm({ ...passForm, confirm_password: e.target.value })} />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
                                >
                                    {isLoading && <Loader2 size={16} />}
                                    Change Password
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
