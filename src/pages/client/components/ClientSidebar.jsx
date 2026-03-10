import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Box, 
    Globe, 
    User, 
    ShoppingCart, 
    FileText, 
    LifeBuoy, 
    CreditCard, 
    Bell, 
    Shield, 
    History,
    LogOut
} from 'lucide-react';
import './ClientSidebar.css';

const ClientSidebar = () => {
    const menuItems = [
        { icon: LayoutDashboard, label: 'Tableau de bord', path: '/client/dashboard' },
        { icon: Box, label: 'Mes Services', path: '/client/services' },
        { icon: Globe, label: 'Mes Domaines', path: '/client/domains' },
        { icon: ShoppingCart, label: 'Panier', path: '/client/cart' },
        { icon: FileText, label: 'Factures', path: '/client/invoices' },
        { icon: LifeBuoy, label: 'Support', path: '/client/support' },
        { icon: CreditCard, label: 'Paiements', path: '/client/payments' },
        { icon: Bell, label: 'Notifications', path: '/client/notifications' },
        { icon: User, label: 'Profil', path: '/client/profile' },
        { icon: Shield, label: 'Sécurité', path: '/client/security' },
        { icon: History, label: 'Historique', path: '/client/orders' }
    ];

    return (
        <aside className="client-sidebar">
            <div className="sidebar-logo">IHOST</div>
            <nav className="sidebar-nav">
                {menuItems.map((item, index) => (
                    <NavLink 
                        key={index} 
                        to={item.path} 
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button className="logout-btn">
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </aside>
    );
};

export default ClientSidebar;
