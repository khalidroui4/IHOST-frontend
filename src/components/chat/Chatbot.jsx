import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minimize2, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, createAnonymousTicket, fetchMyTickets, sendMessage } from '../../store/slices/supportSlice';
import './Chatbot.css';

const Chatbot = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { myTickets: tickets } = useSelector(state => state.support);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Bonjour ! Je suis IHOST Assistant. Comment puis-je vous aider aujourd\'hui ? Votre message sera automatiquement transmis à notre équipe support.' }
    ]);
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [activeTicketId, setActiveTicketId] = useState(null);
    const messagesEndRef = useRef(null);
    const pollRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Poll for admin replies every 8s when a ticket is open
    useEffect(() => {
        const userId = user?.id || user?.idU;
        if (activeTicketId && userId) {
            pollRef.current = setInterval(() => {
                dispatch(fetchMyTickets(userId));
            }, 8000);
        }
        return () => clearInterval(pollRef.current);
    }, [activeTicketId, user, dispatch]);


    // Sync new admin messages from Redux to chat bubble list
    useEffect(() => {
        if (!activeTicketId) return;
        const ticket = tickets?.find(t => t.idSupport === activeTicketId);
        if (!ticket?.messages) return;
        const adminMsgs = ticket.messages.filter(m => m.sender === 'admin');
        adminMsgs.forEach(am => {
            const alreadyShown = messages.some(m => m.adminMsgId === am.idMessage);
            if (!alreadyShown) {
                setMessages(prev => [...prev, {
                    role: 'bot',
                    text: `💬 Support IHOST: ${am.message}`,
                    adminMsgId: am.idMessage
                }]);
            }
        });
    }, [tickets, activeTicketId]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isSending) return;

        const userText = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInput('');
        setIsSending(true);

        const subject = userText.length > 80 ? userText.substring(0, 80) + '...' : userText;

        try {
            if (user) {
                // Logged-in: create a real ticket linked to the user account
                const result = await dispatch(createTicket({ subjectSupport: subject, message: userText })).unwrap();
                if (result?.idTicket) setActiveTicketId(result.idTicket);
                setMessages(prev => [...prev, {
                    role: 'bot',
                    text: `✅ Ticket créé ! Notre équipe vous répondra dès que possible. Consultez la section "Support" pour suivre l'avancement. Je vous notifierai ici si l'admin répond.`
                }]);
            } else {
                // Anonymous: create ticket without auth, tagged as Anonyme
                await dispatch(createAnonymousTicket({ subjectSupport: subject, message: userText })).unwrap();
                setMessages(prev => [...prev, {
                    role: 'bot',
                    text: `📨 Votre message a été transmis à notre support sous le statut "Anonyme". Pour un suivi personnalisé, connectez-vous à votre espace client.`
                }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: `🔴 Erreur lors de la création du ticket. Veuillez réessayer.`
            }]);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        <header className="chat-header">
                            <div className="bot-info">
                                <div className="bot-avatar"><Bot size={18} /></div>
                                <div>
                                    <h3>IHOST Assistant</h3>
                                    <span className="online-status">En ligne</span>
                                </div>
                            </div>
                            {user && (
                                <div className="chat-user-info">
                                    <div className="chat-user-avatar">
                                        {user.avatar ? (
                                            <img src={`http://localhost${user.avatar}`} alt="avatar" />
                                        ) : (
                                            (user.username || user.first_name || 'U').charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <span className="chat-username">{user.username || user.first_name}</span>
                                </div>
                            )}
                            <button onClick={() => setIsOpen(false)} className="close-btn"><Minimize2 size={18} /></button>
                        </header>

                        <div className="chat-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`message-wrapper ${msg.role}`}>
                                    <div className="message-bubble">{msg.text}</div>
                                </div>
                            ))}
                            {isSending && (
                                <div className="message-wrapper bot">
                                    <div className="message-bubble typing">
                                        <Loader2 size={14} className="spin-icon" /> Création du ticket...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chat-input" onSubmit={handleSend}>
                            <input
                                type="text"
                                placeholder={user ? "Décrivez votre problème..." : "Connectez-vous pour envoyer..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isSending}
                            />
                            <button type="submit" disabled={isSending || !input.trim()}>
                                {isSending ? <Loader2 size={18} className="spin-icon" /> : <Send size={18} />}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                className={`chat-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};

export default Chatbot;
