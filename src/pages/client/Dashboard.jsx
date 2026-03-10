import React from 'react';
import { Layout, Server, Globe, FileText, Bell, User, Shield, CreditCard, Clock, ChevronRight, Zap, AlertCircle } from 'lucide-react';
import PageTransition from '../../pageTransition';
import './Dashboard.css';

const ClientDashboard = () => {
    // Mock data for the dashboard
    const stats = [
        { label: 'Services Actifs', value: '3', icon: Server, color: '#1E6BFF' },
        { label: 'Domaines', value: '2', icon: Globe, color: '#6366F1' },
        { label: 'Factures Impayées', value: '0', icon: FileText, color: '#10b981' },
        { label: 'Tickets Ouverts', value: '1', icon: AlertCircle, color: '#f59e0b' }
    ];

    const recentActivity = [
        { id: 1, type: 'invoice', title: 'Facture #INV-2024-001 payée', date: 'Il y a 2 jours', status: 'success' },
        { id: 2, type: 'service', title: 'Nouvel Hébergement Cloud activé', date: 'Il y a 5 jours', status: 'info' },
        { id: 3, type: 'support', title: 'Ticket #TK-882 répondu', date: 'Il y a 1 semaine', status: 'warning' }
    ];

    return (
        <PageTransition>
            <div className="client-dashboard">
                <header className="dashboard-header">
                    <div>
                        <h1>Bonjour, Khalid !</h1>
                        <p>Voici un aperçu de votre compte aujourd'hui.</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-icon"><Bell size={20} /><span className="badge">2</span></button>
                        <div className="user-profile-small">
                            <div className="avatar">KR</div>
                            <span>Khalid Roui</span>
                        </div>
                    </div>
                </header>

                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-info">
                                <span className="stat-label">{stat.label}</span>
                                <span className="stat-value">{stat.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-grid">
                    {/* Main Content Area */}
                    <div className="main-cards">
                        <section className="card">
                            <div className="card-header">
                                <h2>Vos Services Récents</h2>
                                <button className="btn-link">Tout voir <ChevronRight size={16} /></button>
                            </div>
                            <div className="services-list">
                                <div className="service-item">
                                    <div className="service-icon"><Zap size={20} /></div>
                                    <div className="service-details">
                                        <span className="service-name">Hébergement Cloud Pro</span>
                                        <span className="service-host">cloud-pro-01.ihost.ma</span>
                                    </div>
                                    <span className="status-badge status-active">Actif</span>
                                </div>
                                <div className="service-item">
                                    <div className="service-icon"><Globe size={20} /></div>
                                    <div className="service-details">
                                        <span className="service-name">Enregistrement Domaine</span>
                                        <span className="service-host">mon-entreprise.ma</span>
                                    </div>
                                    <span className="status-badge status-active">Actif</span>
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <div className="card-header">
                                <h2>Activité Récente</h2>
                            </div>
                            <div className="activity-timeline">
                                {recentActivity.map((act) => (
                                    <div key={act.id} className="activity-item">
                                        <div className={`activity-dot dot-${act.status}`}></div>
                                        <div className="activity-content">
                                            <span className="activity-title">{act.title}</span>
                                            <span className="activity-date">{act.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="sidebar-cards">
                        <section className="card account-overview">
                            <h2>Aperçu du Compte</h2>
                            <div className="account-details">
                                <div className="detail-row">
                                    <User size={16} />
                                    <span>Client ID: #12884</span>
                                </div>
                                <div className="detail-row">
                                    <Clock size={16} />
                                    <span>Inscrit le: 12 Mars 2024</span>
                                </div>
                                <div className="detail-row">
                                    <Shield size={16} />
                                    <span>Sécurité: 2FA Activé</span>
                                </div>
                                <div className="detail-row">
                                    <CreditCard size={16} />
                                    <span>Mode de paiement: Visa **** 4421</span>
                                </div>
                            </div>
                            <button className="btn btn-outline btn-full">Gérer le Profil</button>
                        </section>

                        <section className="card promo-card">
                            <div className="promo-background"></div>
                            <div className="promo-content">
                                <h3>Passez au niveau supérieur</h3>
                                <p>Économisez 20% sur votre prochain surclassement Cloud.</p>
                                <button className="btn btn-primary btn-small">En savoir plus</button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ClientDashboard;
