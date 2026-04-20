import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchTickets } from '../../store/slices/supportSlice';
import { Link } from 'react-router-dom';
import { Users, Package, HelpCircle, Server } from 'lucide-react';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { list: users } = useSelector(state => state.users);
    const { items: orders } = useSelector(state => state.orders);
    const { tickets } = useSelector(state => state.support);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchUsers());
        dispatch(fetchTickets());
    }, [dispatch]);

    const statCards = [
        { label: 'UTILISATEURS', value: users.length, icon: Users, path: '/admin/users' },
        { label: 'COMMANDES', value: orders.length, icon: Package, path: '/admin/orders' },
        { label: 'TICKETS', value: tickets.length, icon: HelpCircle, path: '/admin/support' },
        { label: 'SERVICES', value: 'Catalogue', icon: Server, path: '/admin/services' },
    ];

    const cardStyle = { 
        background: 'white', 
        borderRadius: '16px', 
        border: '1px solid #e5eaf0', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '130px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    return (
        <div style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.75rem',
            minHeight: 'calc(100vh - 130px)',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none' /* IE/Edge */
        }}>
            <style>
                {`
                    .dashboard-main::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
            
            <div style={{ padding: '0.5rem 0' }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, color: '#1B0606', letterSpacing: '-0.5px' }}>
                    Espace <span style={{ background: 'linear-gradient(to right, #DC2626 0%, #991B1B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Administrateur</span>
                </h1>
                <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Vue d'ensemble de la plateforme</p>
            </div>

            {/* Cards section (Centered in remaining space) */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '3rem' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '1.25rem',
                    width: '100%' 
                }}>
                    {statCards.map(({ label, value, icon: Icon, path }) => (
                        <Link 
                            key={label} 
                            to={path}
                            style={cardStyle}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
                        >
                            <div style={{ position: 'absolute', top: '-15%', right: '-10%', color: '#fef2f2', zIndex: 0 }}>
                                <Icon size={130} strokeWidth={2} fill="#fef2f2" color="#fee2e2" />
                            </div>
                            
                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                <p style={{ margin: 0, fontSize: value === 'Catalogue' ? '2.2rem' : '3.5rem', fontWeight: 500, color: '#1a4260', lineHeight: 1, fontFamily: 'serif' }}>{value}</p> 
                                <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af', fontWeight: 400, letterSpacing: '0.5px', fontFamily: 'serif' }}>{label}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
