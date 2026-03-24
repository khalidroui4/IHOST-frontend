import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../store/slices/notificationSlice';
import PageTransition from '../../pageTransition';
import { Bell } from 'lucide-react';

const ClientNotifications = () => {
    const dispatch = useDispatch();
    const { items: notifications, isLoading } = useSelector(state => state.notifications);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if(user) dispatch(fetchNotifications(user.id));
    }, [dispatch, user]);

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '2rem' }}>Centre de Notifications</h1>
                
                {isLoading ? (
                    <p>Chargement des notifications...</p>
                ) : notifications.length === 0 ? (
                    <div style={{ padding: '3rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <p style={{ color: '#6B7280' }}>Vous n'avez aucune notification.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {notifications.map(n => (
                            <div key={n.idNotification} style={{ background: n.isRead ? '#fff' : '#f0f7ff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                                <div style={{ background: '#1E6BFF', padding: '0.8rem', borderRadius: '50%', color: '#fff' }}>
                                    <Bell size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: '#0B1F3A', fontWeight: n.isRead ? 500 : 700, fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{n.message}</p>
                                    <small style={{ color: '#6B7280' }}>{new Date(n.createdAt).toLocaleString()}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default ClientNotifications;
