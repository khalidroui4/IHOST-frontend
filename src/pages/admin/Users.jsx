import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/userSlice';
import PageTransition from '../../pageTransition';

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { list: users, isLoading } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '2rem' }}>Gestion des Utilisateurs</h1>
                
                {isLoading ? (
                    <p>Chargement des utilisateurs...</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '1rem 1.5rem' }}>ID</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Nom Utilisateur</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Email</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Rôle</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Date Inscription</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.idU} style={{ borderTop: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0B1F3A' }}>{u.idU}</td>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{u.nameU}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>{u.email}</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{ 
                                                background: u.roleU === 'admin' ? '#f5f3ff' : '#f1f5f9', 
                                                color: u.roleU === 'admin' ? '#8b5cf6' : '#64748b', 
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 
                                            }}>
                                                {u.roleU?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default AdminUsers;
