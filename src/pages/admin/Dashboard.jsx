import React from 'react';
import { Users, Box, AlertTriangle, FileText, LifeBuoy, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import PageTransition from '../../pageTransition';
import './Dashboard.css';

const AdminDashboard = () => {
    const widgets = [
        { label: 'Utilisateurs Totaux', value: '1,284', icon: Users, color: '#1E6BFF', trend: '+12%' },
        { label: 'Services Actifs', value: '3,450', icon: Box, color: '#10b981', trend: '+5%' },
        { label: 'Services Expirants', value: '42', icon: AlertTriangle, color: '#f59e0b', trend: '-2%' },
        { label: 'Factures Impayées', value: '18', icon: FileText, color: '#ef4444', trend: '+8%' },
        { label: 'Tickets Support', value: '7', icon: LifeBuoy, color: '#6366F1', trend: 'Nouveau' }
    ];

    return (
        <PageTransition>
            <div className="admin-dashboard">
                <header className="admin-header">
                    <h1>Tableau de Bord Admin</h1>
                    <div className="admin-user-info">
                        <ShieldCheck size={20} color="#10b981" />
                        <span>Administrateur Principal</span>
                    </div>
                </header>

                <div className="admin-widgets-grid">
                    {widgets.map((widget, i) => (
                        <div key={i} className="admin-widget-card">
                            <div className="widget-main">
                                <div className="widget-info">
                                    <span className="widget-label">{widget.label}</span>
                                    <span className="widget-value">{widget.value}</span>
                                </div>
                                <div className="widget-icon" style={{ backgroundColor: `${widget.color}15`, color: widget.color }}>
                                    <widget.icon size={24} />
                                </div>
                            </div>
                            <div className="widget-footer">
                                <span className={`trend ${widget.trend.startsWith('-') ? 'negative' : 'positive'}`}>
                                    {widget.trend.startsWith('+') || widget.trend.startsWith('-') ? <TrendingUp size={14} /> : null}
                                    {widget.trend}
                                </span>
                                <span className="trend-label">depuis le mois dernier</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="admin-sections-grid">
                    <section className="admin-card">
                        <div className="card-header">
                            <h2>Activités Récentes du Système</h2>
                            <Activity size={20} color="#64748B" />
                        </div>
                        <div className="admin-log-list">
                            <div className="log-item">
                                <span className="log-time">10:45</span>
                                <span className="log-msg">Nouvel utilisateur inscrit: <strong>khalid_r</strong></span>
                            </div>
                            <div className="log-item">
                                <span className="log-time">10:30</span>
                                <span className="log-msg">Service #8829 activé manuellement</span>
                            </div>
                            <div className="log-item">
                                <span className="log-time">09:15</span>
                                <span className="log-msg">Tentative de connexion suspecte bloquée (IP: 192.168.1.1)</span>
                            </div>
                        </div>
                    </section>

                    <section className="admin-card">
                        <div className="card-header">
                            <h2>Statut de l'Infrastructure</h2>
                        </div>
                        <div className="infra-status">
                            <div className="infra-item">
                                <span>Serveurs Web (Casablanca)</span>
                                <span className="status-indicator online">En ligne</span>
                            </div>
                            <div className="infra-item">
                                <span>Base de données (Cluster A)</span>
                                <span className="status-indicator online">En ligne</span>
                            </div>
                            <div className="infra-item">
                                <span>Service Mail (Exim)</span>
                                <span className="status-indicator warning">Lenteur</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;
