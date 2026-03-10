import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Bonjour ! Je suis IHOST Assistant. Comment puis-je vous aider aujourd\'hui ?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, { 
                role: 'bot', 
                text: "D'accord, je comprends votre demande concernant \"" + input + "\". Nos experts sont également disponibles par ticket support." 
            }]);
        }, 1000);
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
                                    <h3>IHOST AI Assistant</h3>
                                    <span className="online-status">En ligne</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="close-btn"><Minimize2 size={18} /></button>
                        </header>

                        <div className="chat-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`message-wrapper ${msg.role}`}>
                                    <div className="message-bubble">{msg.text}</div>
                                </div>
                            ))}
                        </div>

                        <form className="chat-input" onSubmit={handleSend}>
                            <input 
                                type="text" 
                                placeholder="Posez votre question..." 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button type="submit"><Send size={18} /></button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button className={`chat-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
        </div>
    );
};

export default Chatbot;
