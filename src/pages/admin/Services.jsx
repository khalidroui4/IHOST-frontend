import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import ConfirmModal from '../../components/ConfirmModal';
import { X, Server } from 'lucide-react';

const AdminServices = () => {
    const dispatch = useDispatch();
    const { items: services, isLoading } = useSelector(state => state.services);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [formData, setFormData] = useState({ 
        nameService: '', 
        descriptionS: '', 
        price: '', 
        durationMonths: '12',
        typeService: 'hosting'
    });

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleOpenModal = (service = null) => {
        if (service) {
            setFormData({
                nameService: service.nameService,
                descriptionS: service.descriptionS,
                price: service.price,
                durationMonths: service.durationMonths,
                typeService: service.typeService || 'hosting'
            });
            setIsEditing(true);
            setCurrentId(service.idService);
        } else {
            setFormData({
                nameService: '',
                descriptionS: '',
                price: '',
                durationMonths: '12',
                typeService: 'hosting'
            });
            setIsEditing(false);
            setCurrentId(null);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing 
                ? `/IHOST-backend/services/${currentId}`
                : '/IHOST-backend/services';
            
            const method = isEditing ? 'put' : 'post';
            
            await axios[method](url, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` }
            });
            setIsModalOpen(false);
            dispatch(fetchServices());
        } catch(err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (service) => {
        setServiceToDelete(service);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!serviceToDelete) return;
        try {
            await axios.delete(`/IHOST-backend/services/${serviceToDelete.idService}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` }
            });
            setIsDeleteModalOpen(false);
            setServiceToDelete(null);
            dispatch(fetchServices());
        } catch(err) {
            console.error(err);
        }
    };

    const serviceTypes = [
        { value: 'hosting', label: 'Hébergement Web' },
        { value: 'cloud', label: 'Cloud & VPS' },
        { value: 'email', label: 'Email Professionnel' },
        { value: 'ssl', label: 'Certificats SSL' },
        { value: 'domain', label: 'Noms de Domaine' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'multisites', label: 'Multisites' }
    ];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: '#1B0606', fontWeight: 800, margin: 0 }}>Catalogue des Services</h1>
                <button 
                    onClick={() => handleOpenModal()} 
                    style={{ background: 'linear-gradient(135deg, #DC2626, #991B1B)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,38,38,0.2)' }}
                >
                    + NOUVEAU SERVICE
                </button>
            </div>

            {/* Modern Dark Red Modal Overlay */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(27, 6, 6, 0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ background: '#1B0606', width: '100%', maxWidth: '550px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden', animation: 'cm-slide-up 0.3s ease', border: '1px solid #3d1414' }}>
                        
                        {/* Modal Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #2d0a0a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div>
                                <h3 style={{ margin: 0, fontWeight: 800, color: '#e9edef', fontSize: '1.25rem' }}>
                                    {isEditing ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}
                                </h3>
                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#a1a1aa' }}>
                                    {isEditing ? 'Mettez à jour les détails de votre offre' : 'Configurez les détails de votre nouvelle offre'}
                                </p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                style={{ background: '#2d0a0a', border: '1px solid #3d1414', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#e9edef', transition: 'all 0.2s' }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9edef' }}>Nom du Service</label>
                                <input 
                                    value={formData.nameService} 
                                    onChange={e => setFormData({...formData, nameService: e.target.value})} 
                                    required 
                                    placeholder="Ex: Hébergement Pro..."
                                    style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #3d1414', background: '#2d0a0a', color: '#e9edef', outline: 'none', fontSize: '0.95rem', transition: 'all 0.2s' }}
                                    onFocus={e => e.target.style.borderColor = '#DC2626'}
                                    onBlur={e => e.target.style.borderColor = '#3d1414'}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9edef' }}>Catégorie / Type</label>
                                <select 
                                    value={formData.typeService}
                                    onChange={e => setFormData({...formData, typeService: e.target.value})}
                                    required
                                    style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #3d1414', background: '#2d0a0a', color: '#e9edef', outline: 'none', fontSize: '0.95rem', cursor: 'pointer' }}
                                >
                                    {serviceTypes.map(t => (
                                        <option key={t.value} value={t.value} style={{ background: '#1B0606' }}>{t.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9edef' }}>Description</label>
                                <textarea 
                                    value={formData.descriptionS} 
                                    onChange={e => setFormData({...formData, descriptionS: e.target.value})} 
                                    required 
                                    placeholder="Décrivez les avantages du service..."
                                    style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #3d1414', background: '#2d0a0a', color: '#e9edef', outline: 'none', fontSize: '0.95rem', minHeight: '80px', resize: 'vertical' }}
                                    onFocus={e => e.target.style.borderColor = '#DC2626'}
                                    onBlur={e => e.target.style.borderColor = '#3d1414'}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9edef' }}>Prix (DH)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={formData.price} 
                                        onChange={e => setFormData({...formData, price: e.target.value})} 
                                        required 
                                        style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #3d1414', background: '#2d0a0a', color: '#e9edef', outline: 'none', fontSize: '0.95rem' }}
                                        onFocus={e => e.target.style.borderColor = '#DC2626'}
                                        onBlur={e => e.target.style.borderColor = '#3d1414'}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e9edef' }}>Durée (Mois)</label>
                                    <input 
                                        type="number" 
                                        value={formData.durationMonths} 
                                        onChange={e => setFormData({...formData, durationMonths: e.target.value})} 
                                        required 
                                        style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1.5px solid #3d1414', background: '#2d0a0a', color: '#e9edef', outline: 'none', fontSize: '0.95rem' }}
                                        onFocus={e => e.target.style.borderColor = '#DC2626'}
                                        onBlur={e => e.target.style.borderColor = '#3d1414'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ padding: '0.8rem 1.5rem', borderRadius: '10px', border: '1.5px solid #3d1414', background: 'transparent', color: '#e9edef', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseEnter={e => e.target.style.background = '#2d0a0a'}
                                    onMouseLeave={e => e.target.style.background = 'transparent'}
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={!formData.nameService || !formData.price || !formData.descriptionS}
                                    style={{ 
                                        padding: '0.8rem 2rem', 
                                        borderRadius: '10px', 
                                        border: 'none', 
                                        background: (!formData.nameService || !formData.price || !formData.descriptionS) 
                                            ? '#3d1414' 
                                            : 'linear-gradient(135deg, #DC2626, #991B1B)', 
                                        color: (!formData.nameService || !formData.price || !formData.descriptionS) ? '#8696a0' : 'white', 
                                        fontWeight: 700, 
                                        cursor: (!formData.nameService || !formData.price || !formData.descriptionS) ? 'not-allowed' : 'pointer', 
                                        boxShadow: (!formData.nameService || !formData.price || !formData.descriptionS) ? 'none' : '0 4px 12px rgba(220,38,38,0.3)', 
                                        transition: 'all 0.2s' 
                                    }}
                                    onMouseEnter={e => {
                                        if (formData.nameService && formData.price && formData.descriptionS) {
                                            e.target.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                                >
                                    {isEditing ? 'Mettre à jour' : 'Créer le Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <ConfirmModal 
                    title="Désactiver le service ?"
                    message={`Êtes-vous sûr de vouloir désactiver le service "${serviceToDelete?.nameService}" ?`}
                    onConfirm={confirmDelete}
                    onCancel={() => {
                        setIsDeleteModalOpen(false);
                        setServiceToDelete(null);
                    }}
                    confirmText="Désactiver"
                    cancelText="Annuler"
                    type="danger"
                    theme="dark"
                />
            )}
            
            {isLoading ? (
                <p>Chargement des services...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem' }}>ID</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Service</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Description</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Durée</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Prix</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Statut</th>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(s => (
                                <tr key={s.idService} style={{ borderTop: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#1B0606' }}>#{s.idService}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ fontWeight: 700, color: '#1B0606' }}>{s.nameService}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{s.typeService}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                        {s.descriptionS.length > 60 ? s.descriptionS.substring(0, 60) + '...' : s.descriptionS}
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: '#64748b' }}>{s.durationMonths} Mois</td>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#DC2626' }}>{s.price} DH</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{ 
                                            background: parseInt(s.isActive) ? '#ecfdf5' : '#fef2f2', 
                                            color: parseInt(s.isActive) ? '#10b981' : '#ef4444', 
                                            padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
                                        }}>
                                            {parseInt(s.isActive) ? 'ACTIF' : 'INACTIF'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button 
                                                onClick={() => handleOpenModal(s)}
                                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                                            >
                                                &#9998;
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(s)}
                                                style={{ background: '#fef2f2', border: '1px solid #fee2e2', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
