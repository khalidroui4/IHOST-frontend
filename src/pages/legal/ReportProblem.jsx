import React, { useState } from 'react';
import './LegalPage.css';
import PageTransition from '../../pageTransition';
import { Send, AlertTriangle } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";

const ReportProblem = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'technique',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Report submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000); // Reset after 5s
        setFormData({ name: '', email: '', type: 'technique', message: '' });
    };

    return (
        <PageTransition>
            <div className="legal-page-wrapper">
                <div className="legal-page-container">
                    <div className="legal-header">
                        <h1>Signaler un problème</h1>
                        <p>Vous avez rencontré un problème, un bug, ou une activité suspecte (spam/phishing) sur notre réseau ? Laissez-nous un message détaillé et notre équipe technique interviendra rapidement.</p>
                    </div>

                    <div className="report-form-card" style={{
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        {submitted ? (
                            <div className="alert alert-success d-flex align-items-center" role="alert" style={{ borderRadius: '12px' }}>
                                <AlertTriangle className="me-2 flex-shrink-0" />
                                <div>
                                    Merci pour votre signalement ! Notre équipe prendra contact avec vous si des informations supplémentaires sont nécessaires.
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Nom complet *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{ padding: '0.75rem', borderRadius: '12px' }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Adresse E-mail *</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{ padding: '0.75rem', borderRadius: '12px' }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="type" className="form-label">Type de problème *</label>
                                    <select
                                        className="form-control"
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        style={{ padding: '0.75rem', borderRadius: '12px' }}
                                    >
                                        <option value="technique">Problème Technique / Bug</option>
                                        <option value="abuse">Signaler un abus (Spam / DMCA / Phishing)</option>
                                        <option value="billing">Problème de Facturation</option>
                                        <option value="other">Autre / Général</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label">Description détaillée *</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Veuillez fournir autant de détails que possible (URL, messages d'erreur, description de l'infraction...)"
                                        required
                                        style={{ padding: '0.75rem', borderRadius: '12px', resize: 'vertical' }}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 btn-submit-report"
                                >
                                    Envoyer le rapport <Send size={18} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ReportProblem;
