import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../store/slices/invoiceSlice';
import { fetchOrders } from '../../store/slices/orderSlice';
import { FileText, Download, Loader2, ChevronDown, ChevronUp, Package, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ClientInvoices = () => {
    const dispatch = useDispatch();
    const { items: invoices, isLoading: isInvLoading } = useSelector(state => state.invoices);
    const { items: orders } = useSelector(state => state.orders);
    const { user } = useSelector(state => state.auth);
    const [expandedInv, setExpandedInv] = useState(null);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchInvoices(user.id));
            dispatch(fetchOrders(user.id));
        }
    }, [dispatch, user]);

    const toggleExpand = (idFacture) => {
        setExpandedInv(expandedInv === idFacture ? null : idFacture);
    };

    const generatePDF = async (inv) => {
        const doc = new jsPDF();
        
        // Theme colors
        const blue = [11, 31, 58];
        const accent = [30, 107, 255];
        const gray = [100, 116, 139];
        const lightGray = [241, 245, 249];
        const white = [255, 255, 255];
        const W = 210, H = 297;
        const mL = 14, mR = 196;

        // Load logo
        let logoImg = null;
        try {
            const response = await fetch('/logo.jpeg');
            const blob = await response.blob();
            logoImg = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        } catch(e) {}

       
        doc.setFillColor(...blue);
        doc.rect(0, 0, W, 42, 'F');

        // Logo
        if (logoImg) {
            doc.addImage(logoImg, 'JPEG', mL, 6, 32, 30);
        }

        // Company text
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(...white);
        doc.text('IHOST', logoImg ? 50 : mL, 20);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Hébergement Web & Solutions Cloud', logoImg ? 50 : mL, 27);

        // Company contact (right side)
        doc.setFontSize(7.5);
        doc.setTextColor(180, 200, 230);
        const contacts = [
            'Casablanca, Maroc',
            '+212 5XX-XXXXXX',
            'contact@ihost.ma',
            'www.ihost.ma'
        ];
        contacts.forEach((line, i) => {
            doc.text(line, mR, 12 + i * 5, { align: 'right' });
        });

        // Thin accent line
        doc.setFillColor(...accent);
        doc.rect(0, 42, W, 1.5, 'F');

      
        let y = 54;

        // Big title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(...accent);
        doc.text('FACTURE', mL, y);

        // Invoice meta (left)
        y += 10;
        doc.setFontSize(9);
        doc.setTextColor(...gray);
        doc.setFont('helvetica', 'normal');
        doc.text('N° Facture :', mL, y);
        doc.text('Date :', mL, y + 6);
        doc.text('Statut :', mL, y + 12);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...blue);
        doc.text(inv.invoiceNumber || `FAC-${inv.idFacture.toString().padStart(4, '0')}`, 42, y);
        doc.text(new Date(inv.createdAt).toLocaleDateString('fr-FR'), 42, y + 6);
        doc.setTextColor(16, 185, 129);
        doc.text('PAYÉE', 42, y + 12);

        // "Facturé à" (right)
        doc.setFontSize(9);
        doc.setTextColor(...gray);
        doc.setFont('helvetica', 'normal');
        doc.text('Facturé à :', 130, y);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...blue);
        const clientName = user?.first_name && user?.last_name 
            ? `${user.first_name} ${user.last_name}` 
            : user?.username || user?.nameU || 'Client';
        doc.text(clientName, 130, y + 6);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...gray);
        if (user?.email) doc.text(user.email, 130, y + 12);
        if (user?.location) doc.text(user.location, 130, y + 18);

        
        y = 98;
        doc.setFillColor(...accent);
        doc.roundedRect(mL, y, W - 28, 22, 3, 3, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...white);
        doc.text('MONTANT TOTAL DÛ', mL + 8, y + 9);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text(`${parseFloat(inv.amount).toFixed(2)} DH`, mR - 8, y + 15, { align: 'right' });

        
        const items = inv.items && inv.items.length > 0 ? inv.items : [];
        let tableBody = [];
        let subtotal = 0;

        if (items.length > 0) {
            items.forEach((item, idx) => {
                const label = item.domainName ? `${item.domainName} - Domaine` : item.nameService;
                const unitPrice = parseFloat(item.price);
                const qty = parseInt(item.durationMonths) || 1;
                const lineTotal = unitPrice * qty;
                subtotal += lineTotal;
                tableBody.push([
                    { content: `${idx + 1}`, styles: { halign: 'center' } },
                    label,
                    `${unitPrice.toFixed(2)} DH`,
                    { content: `${qty}`, styles: { halign: 'center' } },
                    { content: `${lineTotal.toFixed(2)} DH`, styles: { halign: 'right', fontStyle: 'bold' } }
                ]);
            });
        } else {
            subtotal = parseFloat(inv.amount);
            tableBody.push([
                { content: '1', styles: { halign: 'center' } },
                inv.label || `Services IHOST`,
                `${subtotal.toFixed(2)} DH`,
                { content: '1', styles: { halign: 'center' } },
                { content: `${subtotal.toFixed(2)} DH`, styles: { halign: 'right', fontStyle: 'bold' } }
            ]);
        }

        autoTable(doc, {
            startY: 128,
            head: [['#', 'Désignation', 'Prix Unitaire', 'Qté', 'Total']],
            body: tableBody,
            theme: 'grid',
            headStyles: {
                fillColor: blue,
                textColor: 255,
                fontSize: 9,
                fontStyle: 'bold',
                cellPadding: 5,
            },
            bodyStyles: {
                fontSize: 9,
                cellPadding: 5,
                textColor: [50, 50, 50],
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252],
            },
            columnStyles: {
                0: { cellWidth: 12 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 34 },
                3: { cellWidth: 16 },
                4: { cellWidth: 34 },
            },
            styles: {
                lineColor: [226, 232, 240],
                lineWidth: 0.3,
            },
        });

       
        let tableEndY = doc.lastAutoTable.finalY + 8;
        const sumX = 130;
        const sumValX = mR;
        const tax = 0; 
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...gray);

        doc.text('Sous-total HT :', sumX, tableEndY);
        doc.setTextColor(...blue);
        doc.text(`${subtotal.toFixed(2)} DH`, sumValX, tableEndY, { align: 'right' });

        doc.setDrawColor(226, 232, 240);
        doc.line(sumX, tableEndY + 2, mR, tableEndY + 2);

        tableEndY += 8;
        doc.setTextColor(...gray);
        doc.text('TVA (0%) :', sumX, tableEndY);
        doc.setTextColor(...blue);
        doc.text(`${tax.toFixed(2)} DH`, sumValX, tableEndY, { align: 'right' });

        doc.line(sumX, tableEndY + 2, mR, tableEndY + 2);

        tableEndY += 10;
        doc.setFillColor(...accent);
        doc.roundedRect(sumX - 2, tableEndY - 5, mR - sumX + 4, 12, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...white);
        doc.text('Total TTC :', sumX + 4, tableEndY + 2);
        doc.text(`${parseFloat(inv.amount).toFixed(2)} DH`, sumValX - 2, tableEndY + 2, { align: 'right' });

       
        const payY = doc.lastAutoTable.finalY + 8;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...blue);
        doc.text('Méthode de Paiement', mL, payY);

        doc.setDrawColor(...accent);
        doc.setLineWidth(0.5);
        doc.line(mL, payY + 2, mL + 45, payY + 2);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...gray);
        const payInfo = [
            ['Banque :', 'Attijariwafa Bank'],
            ['Compte :', 'XXXX XXXX XXXX 4521'],
            ['Titulaire :', 'IHOST SARL'],
            ['SWIFT :', 'BCMAMAMC'],
        ];
        payInfo.forEach(([label, val], i) => {
            doc.setFont('helvetica', 'normal');
            doc.text(label, mL, payY + 8 + i * 5);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...blue);
            doc.text(val, mL + 22, payY + 8 + i * 5);
            doc.setTextColor(...gray);
        });

       
        const termsY = Math.max(tableEndY + 20, payY + 35);
        
        if (termsY < 260) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...blue);
            doc.text('Conditions Générales', mL, termsY);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(...gray);
            const terms = [
                '• Le paiement est dû dans les 30 jours suivant la date de facturation.',
                '• Les services sont activés immédiatement après confirmation du paiement.',
                '• Aucun remboursement après activation du service.',
                '• Pour toute question, contactez notre support : support@ihost.ma'
            ];
            terms.forEach((t, i) => {
                doc.text(t, mL, termsY + 5 + i * 4);
            });
        }

       
        if (termsY < 260) {
            const sigY = termsY + 2;
            doc.setDrawColor(...blue);
            doc.setLineWidth(0.3);
            doc.line(140, sigY + 18, mR, sigY + 18);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...blue);
            doc.text('Signature Autorisée', 168, sigY + 23, { align: 'center' });
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(7);
            doc.setTextColor(...gray);
            doc.text('Direction Comptable IHOST', 168, sigY + 27, { align: 'center' });
        }

       
        doc.setFillColor(...blue);
        doc.rect(0, H - 14, W, 14, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(180, 200, 230);
        doc.text('Merci pour votre confiance. IHOST - Hébergement Web & Solutions Cloud de qualité au Maroc.', W / 2, H - 6, { align: 'center' });

        doc.save(`Facture_${inv.invoiceNumber || inv.idFacture}.pdf`);
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>Mes Factures</h1>

             <div style={{ padding: '1.25rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px' }}>
                <p style={{ margin: 0, color: '#059669', fontSize: '0.9rem', fontWeight: 500 }}>
                    Retrouvez ici toutes vos factures payées. Vous pouvez consulter les détails et télécharger chaque facture en format PDF.
                </p>
             </div>

            {isInvLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                    <Loader2 className="animate-spin" size={30} color="#94a3b8" />
                </div>
            ) : invoices.length === 0 ? (
                <div style={{ padding: '4rem 2rem', background: '#fff', textAlign: 'center', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <FileText size={48} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
                    <p style={{ margin: 0, fontSize: '1.1rem', color: '#64748b' }}>Aucune facture payée pour le moment.</p>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>Vos factures apparaîtront ici après chaque paiement.</p>
                </div>
            ) : (
                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e5eaf0' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>N° Facture</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Désignation</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Montant</th>
                                <th style={{ padding: '1.25rem 1.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Télécharger</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(inv => {
                                const isExpanded = expandedInv === inv.idFacture;
                                const linkedOrder = (orders || []).find(o => o.idOrder === inv.idOrder || o.totalAmount === inv.amount);
                                
                                return (
                                <React.Fragment key={`frag-${inv.idFacture}`}>
                                    <tr style={{ borderBottom: isExpanded ? 'none' : '1px solid #f1f5f9', transition: 'background 0.15s', cursor: 'pointer', background: isExpanded ? '#f8fafc' : 'transparent' }} onClick={() => toggleExpand(inv.idFacture)} onMouseEnter={e => { if(!isExpanded) e.currentTarget.style.background = '#f8fafc' }} onMouseLeave={e => { if(!isExpanded) e.currentTarget.style.background = 'transparent' }}>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#0B1F3A' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <FileText size={18} />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span>{inv.invoiceNumber || `FAC-${inv.idFacture.toString().padStart(4, '0')}`}</span>
                                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                                        Voir détails {isExpanded ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#334155', fontSize: '0.9rem', fontWeight: 600 }}>
                                            {inv.label || `Commande #${inv.orderId}`}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#0B1F3A', fontSize: '1rem' }}>{parseFloat(inv.amount).toFixed(2)} DH</td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                                            <button onClick={() => generatePDF(inv)} style={{ background: '#0B1F3A', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#1a3a6e'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#0B1F3A'}
                                            >
                                                <Download size={14} /> Télécharger PDF
                                            </button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                                            <td colSpan="6" style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
                                                <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                    <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#0B1F3A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Package size={16} color="#1E6BFF"/> Détails de la commande
                                                    </h4>
                                                    {(inv.items && inv.items.length > 0) ? inv.items.map((item, idx) => (
                                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem' }}>
                                                            <span style={{ fontWeight: 600, color: '#334155' }}>
                                                                {item.domainName ? `${item.domainName} - Domaine` : item.nameService}
                                                            </span>
                                                            <span style={{ fontWeight: 700, color: '#0B1F3A' }}>
                                                                {parseFloat(item.price).toFixed(2)} DH × {item.durationMonths} mois
                                                            </span>
                                                        </div>
                                                    )) : (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f1f5f9', borderRadius: '6px', fontSize: '0.85rem' }}>
                                                            <span style={{ fontWeight: 600, color: '#334155' }}>Commande #{inv.orderId}</span>
                                                            <span style={{ fontWeight: 700, color: '#0B1F3A' }}>{parseFloat(inv.amount).toFixed(2)} DH</span>
                                                        </div>
                                                    )}
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid #e2e8f0' }}>
                                                        <span style={{ fontWeight: 800, color: '#0B1F3A', fontSize: '1rem' }}>Total: {parseFloat(inv.amount).toFixed(2)} DH</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClientInvoices;
