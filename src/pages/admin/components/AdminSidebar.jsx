import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    ShoppingCart, 
    Box, 
    ShieldAlert, 
    LogOut,
    ExternalLink
} from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin/dashboard' },
        { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
        { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
        { icon: Box, label: 'Services', path: '/admin/services' },
        { icon: ShieldAlert, label: 'Sécurité', path: '/admin/security' }
    ];

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">IHOST ADMIN</div>
            <nav className="admin-nav">
                {menuItems.map((item, index) => (
                    <NavLink 
                        key={index} 
                        to={item.path} 
                        className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="admin-sidebar-footer">
                <a href="/" className="back-to-site">
                    <ExternalLink size={18} />
                    <span>Voir le site</span>
                </a>
                <button className="admin-logout">
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
