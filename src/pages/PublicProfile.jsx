import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTransition from '../pageTransition';
import { 
    MapPin, Globe, Calendar, Server, Globe2, 
    ExternalLink, Loader2, ArrowLeft, User, Copy, Check 
} from 'lucide-react';
import './PublicProfile.css';

const PublicProfile = () => {
    const { userId, username } = useParams();
    const navigate = useNavigate();
    const identifier = userId || username;

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPublicProfile = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/IHOST-backend/users/public/${identifier}`);
                if (response.data && response.data.status === 'success') {
                    setProfile(response.data.data);
                } else {
                    setError('Impossible de charger le profil.');
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    setError('Utilisateur non trouvé.');
                } else {
                    setError('Une erreur est survenue lors de la récupération du profil.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (identifier) {
            fetchPublicProfile();
        }
    }, [identifier]);

    const handleCopyUrl = () => {
        if (!profile) return;
        const publicUrl = `ihost.ma/@${profile.username || profile.idU}`;
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <PageTransition>
                <div className="profile-loader-container">
                    <Loader2 className="animate-spin" size={48} color="#1E6BFF" />
                    <p style={{ fontWeight: 600 }}>Chargement du profil public...</p>
                </div>
            </PageTransition>
        );
    }

    if (error || !profile) {
        return (
            <PageTransition>
                <div className="public-profile-wrapper">
                    <div className="profile-error-container">
                        <User size={60} color="#ef4444" style={{ margin: '0 auto' }} />
                        <h2 className="profile-error-title">Profil non disponible</h2>
                        <p className="profile-error-desc">{error || 'Ce profil est introuvable ou privé.'}</p>
                        <Link to="/" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '100px' }}>
                            Retourner à l'accueil
                        </Link>
                    </div>
                </div>
            </PageTransition>
        );
    }

    const fullName = profile.first_name && profile.last_name 
        ? `${profile.first_name} ${profile.last_name}`
        : (profile.nameU || 'Propriétaire Anonyme');

    const formattedDate = profile.createdAt 
        ? new Date(profile.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
        : 'Récemment';

    return (
        <PageTransition>
            <div className="public-profile-wrapper">
                {/* Hero Banner with linear gradient */}
                <div className="profile-hero-banner">
                </div>

                <div className="public-profile-container">
                    {/* Main Identity Card */}
                    <div className="profile-main-card">
                        <div className="profile-avatar-container">
                            {profile.avatar ? (
                                <img 
                                    src={profile.avatar} 
                                    alt={fullName} 
                                    className="profile-avatar-circle" 
                                />
                            ) : (
                                <div className="profile-avatar-circle">
                                    <User size={64} />
                                </div>
                            )}
                        </div>

                        <h1 className="profile-name">{fullName}</h1>
                        {profile.username && <p className="profile-username">@{profile.username}</p>}

                        <button onClick={handleCopyUrl} className="profile-url-badge" title="Copier l'URL publique">
                            {copied ? (
                                <>
                                    <Check size={14} color="#10b981" /> Copié !
                                </>
                            ) : (
                                <>
                                    <Copy size={14} /> ihost.ma/@{profile.username || profile.idU}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Stats and Info Grid */}
                    <div className="profile-details-grid">
                        {/* Domain Stats */}
                        <div className="profile-stats-card">
                            <div className="stats-icon-wrap domains">
                                <Globe2 size={28} />
                            </div>
                            <div className="stats-info">
                                <span className="stats-value">{profile.domainCount || 0}</span>
                                <span className="stats-label">Domaines</span>
                            </div>
                        </div>

                        {/* Hosting Stats */}
                        <div className="profile-stats-card">
                            <div className="stats-icon-wrap hosting">
                                <Server size={28} />
                            </div>
                            <div className="stats-info">
                                <span className="stats-value">{profile.hostingCount || 0}</span>
                                <span className="stats-label">Hébergements</span>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="profile-info-block">
                            <h3 className="info-block-title">Biographie</h3>
                            {profile.bio ? (
                                <p className="bio-text">{profile.bio}</p>
                            ) : (
                                <p className="bio-empty">Aucune biographie rédigée par cet utilisateur.</p>
                            )}
                        </div>

                        {/* General Info Section */}
                        <div className="profile-info-block">
                            <h3 className="info-block-title">Informations Générales</h3>
                            <div className="details-list">
                                {profile.location && (
                                    <div className="details-item">
                                        <MapPin className="details-item-icon" size={20} />
                                        <span>Localisation : <strong>{profile.location}</strong></span>
                                    </div>
                                )}
                                {profile.website && (
                                    <div className="details-item">
                                        <Globe className="details-item-icon" size={20} />
                                        <span>Site Web : </span>
                                        <a 
                                            href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="details-item-link"
                                        >
                                            {profile.website.replace(/(^\w+:|^)\/\//, '')} <ExternalLink size={14} style={{ marginLeft: '2px', display: 'inline' }} />
                                        </a>
                                    </div>
                                )}
                                <div className="details-item">
                                    <Calendar className="details-item-icon" size={20} />
                                    <span>Membre depuis : <strong>{formattedDate}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default PublicProfile;
