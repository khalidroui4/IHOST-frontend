import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import { CheckCircle2 } from 'lucide-react';

const ClientProfile = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('edit_profile');

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '140px', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', paddingBottom: '4rem' }}>
                
                {/* SETTINGS SIDEBAR */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>Account settings</h2>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {[
                            { id: 'edit_profile', label: 'Edit profile' },
                            { id: 'email_settings', label: 'Email settings' },
                            { id: 'change_password', label: 'Change password' },
                            { id: 'applications', label: 'Applications' }
                        ].map(tab => (
                            <li key={tab.id}>
                                <button 
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{ 
                                        background: 'none', border: 'none', padding: 0, 
                                        color: activeTab === tab.id ? '#1E6BFF' : '#64748b', 
                                        fontWeight: activeTab === tab.id ? 700 : 500,
                                        fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left',
                                        transition: 'color 0.2s', textDecoration: activeTab === tab.id ? 'underline' : 'none',
                                        textUnderlineOffset: '4px'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        ))}

                        <div style={{ margin: '1rem 0', height: '1px', background: '#e2e8f0' }}></div>

                        <li>
                            <button 
                                onClick={() => {
                                    if(window.confirm('Are you sure you want to log out?')) {
                                        dispatch(logout());
                                        navigate('/');
                                    }
                                }}
                                style={{ 
                                    background: 'none', border: 'none', padding: 0, 
                                    color: '#64748b', fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left',
                                }}
                            >
                                Log out
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => alert('Contacting support deletion...')}
                                style={{ 
                                    background: 'none', border: 'none', padding: 0, 
                                    color: '#ef4444', fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left',
                                }}
                            >
                                Close account
                            </button>
                        </li>
                    </ul>
                </div>

                {/* MAIN CONTENT AREA */}
                <div style={{ flex: 1, maxWidth: '800px' }}>
                    
                    {activeTab === 'edit_profile' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            
                            {/* Header row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
                                <h1 style={{ color: '#0B1F3A', fontWeight: 800, fontSize: '1.5rem', margin: 0 }}>Edit profile</h1>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#10b981', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                                    <CheckCircle2 size={16} /> Account Confirmed
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
                                {/* Avatar column */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 800, overflow: 'hidden' }}>
                                        {user?.name ? user.name.charAt(0).toUpperCase() : (user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U')}
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: '#64748b', textDecoration: 'underline', fontSize: '0.85rem', cursor: 'pointer' }}>
                                        Change profile image
                                    </button>
                                </div>

                                {/* Main edit fields form */}
                                <form style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => e.preventDefault()}>
                                    
                                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>First name</label>
                                            <input defaultValue={user?.first_name || user?.name || ''} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Last name</label>
                                            <input defaultValue={user?.last_name || ''} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Email</label>
                                        <input defaultValue={user?.email || ''} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                    </div>

                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '0.5rem' }}>Badge</h3>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>You don't have any badges yet :(</p>
                                        </div>
                                        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Username (only letters, numbers, and underscores)</label>
                                            <input defaultValue={user?.username || ''} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                            <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>ihost.ma/@{user?.username || 'user'}</small>
                                        </div>
                                    </div>

                                    {/* ABOUT SECTION */}
                                    <div style={{ marginTop: '2rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>About</h3>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Location</label>
                                                <input style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Personal site/portfolio</label>
                                                <input placeholder="https://" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Bio</label>
                                                <textarea rows={4} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none', resize: 'vertical' }}></textarea>
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', alignSelf: 'flex-end' }}>250</span>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Interests (maximum 5)</label>
                                                <input placeholder="add a tag" style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                                <small style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.5rem', lineHeight: '1.4' }}>Your interests are generated from the types of photos you like, collect, and contribute.</small>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SOCIAL SECTION */}
                                    <div style={{ marginTop: '2rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>Social</h3>
                                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Instagram username</label>
                                                <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                                                    <span style={{ padding: '0.8rem', background: '#f1f5f9', color: '#475569', borderRight: '1px solid #cbd5e1' }}>@</span>
                                                    <input style={{ flex: 1, padding: '0.8rem', border: 'none', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                                </div>
                                                <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>So that we can feature you on @ihost_ma</small>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>X (Twitter) username</label>
                                                <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                                                    <span style={{ padding: '0.8rem', background: '#f1f5f9', color: '#475569', borderRight: '1px solid #cbd5e1' }}>@</span>
                                                    <input style={{ flex: 1, padding: '0.8rem', border: 'none', fontSize: '0.95rem', color: '#0B1F3A', outline: 'none' }} />
                                                </div>
                                                <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>So that we can feature you on @ihost_ma</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                                        <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Update account</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    )}
                    
                    {activeTab !== 'edit_profile' && (
                        <div style={{ padding: '3rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                            <h2 style={{ color: '#0B1F3A', fontWeight: 800 }}>Component Pending</h2>
                            <p style={{ color: '#64748b' }}>This section is currently under construction.</p>
                        </div>
                    )}

                </div>
            </div>
        </PageTransition>
    );
};

export default ClientProfile;
