import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyTickets,
  createTicket,
  sendMessage,
} from "../../store/slices/supportSlice";
import {
  MessageSquare,
  Send,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Tag,
  ChevronRight,
  Inbox,
  Shield,
  X,
  Loader2,
  Paperclip,
} from "lucide-react";

const timeAgo = (d) => {
  if (!d) return "";
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return "À l'instant";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}j`;
};

const fmt = (d) =>
  d
    ? new Date(d).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

const getChatDateLabel = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
  if (date.toDateString() === yesterday.toDateString()) return "Hier";
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const StatusBadge = ({ status, isPending }) => {
  const isClosed = status === "closed";
  
  let bg, text, dotColor, label;
  
  if (isClosed) {
      bg = "#f1f5f9";
      text = "#64748b";
      dotColor = "#94a3b8";
      label = "Fermé";
  } else if (isPending) {
      bg = "#fef3c7";
      text = "#b45309";
      dotColor = "#f59e0b";
      label = "En attente";
  } else {
      bg = "#dcfce7";
      text = "#15803d";
      dotColor = "#22c55e";
      label = "Ouvert";
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: "0.68rem",
        fontWeight: 700,
        background: bg,
        color: text,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dotColor,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
};

const NewTicketModal = ({ onClose, onSubmit, isCreating }) => {
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;
    onSubmit(subject.trim(), msg.trim());
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,31,58,0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
    >
      <div
        style={{
          background: "#1E293B",
          borderRadius: 20,
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
          animation: "slideUp 0.2s ease",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #0F172A",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontWeight: 800,
                color: "#e9edef",
                fontSize: "1.1rem",
              }}
            >
              Nouveau Ticket Support
            </h3>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "0.8rem",
                color: "#8696a0",
              }}
            >
              Décrivez votre problème en détail
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#334155",
              border: "none",
              borderRadius: 8,
              padding: 6,
              cursor: "pointer",
              color: "#e9edef",
              display: "flex",
            }}
          >
            <X size={16} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#e9edef",
                marginBottom: 6,
              }}
            >
              Sujet *
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex: Problème de connexion FTP..."
              required
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: 10,
                border: "1.5px solid #334155",
                background: "#0F172A",
                color: "#e9edef",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1E6BFF")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#e9edef",
                marginBottom: 6,
              }}
            >
              Message initial (optionnel)
            </label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Décrivez votre problème en détail..."
              rows={4}
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: 10,
                border: "1.5px solid #334155",
                background: "#0F172A",
                color: "#e9edef",
                fontSize: "0.9rem",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                lineHeight: 1.6,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1E6BFF")}
              onBlur={(e) => (e.target.style.borderColor = "#334155")}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "0.7rem 1.25rem",
                borderRadius: 10,
                border: "1.5px solid #334155",
                background: "transparent",
                color: "#e9edef",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!subject.trim() || isCreating}
              style={{
                padding: "0.7rem 1.5rem",
                borderRadius: 10,
                border: "none",
                background:
                  !subject.trim() || isCreating
                    ? "#334155"
                    : "linear-gradient(135deg,#1E6BFF,#0043C0)",
                color: !subject.trim() || isCreating ? "#8696a0" : "white",
                fontWeight: 700,
                cursor:
                  !subject.trim() || isCreating ? "not-allowed" : "pointer",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {isCreating ? (
                <>
                  <Loader2
                    size={14}
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Création...
                </>
              ) : (
                <>
                  <Plus size={14} /> Créer le ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientSupport = () => {
  const dispatch = useDispatch();
  const { myTickets: tickets, isLoading } = useSelector(
    (state) => state.support,
  );
  const { user } = useSelector((state) => state.auth);
  const [activeId, setActiveId] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const chatRef = useRef(null);

  const [readCursors, setReadCursors] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ticket_read_cursors')) || {}; } 
    catch { return {}; }
  });

  useEffect(() => {
    if (activeId && tickets.length) {
       const activeTicket = tickets.find((t) => t.idSupport === activeId);
       if (activeTicket) {
           setReadCursors(prev => {
               const updated = { ...prev, [activeId]: activeTicket.messages?.length || 0 };
               localStorage.setItem('ticket_read_cursors', JSON.stringify(updated));
               return updated;
           });
       }
    }
  }, [activeId, tickets]);

  useEffect(() => {
    const userId = user?.id || user?.idU;
    if (!userId) return;

    dispatch(fetchMyTickets(userId));

    const interval = setInterval(() => {
      dispatch(fetchMyTickets(userId));
    }, 8000);

    return () => clearInterval(interval);
  }, [dispatch, user]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, tickets]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 800;

        if (width > height && width > MAX_DIM) {
          height *= MAX_DIM / width;
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width *= MAX_DIM / height;
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.55);
        setSelectedImage(compressedBase64);
      };
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCreate = async (subject, msg) => {
    setIsCreating(true);
    const userId = user?.id || user?.idU;
    await dispatch(
      createTicket({ subjectSupport: subject, message: msg || undefined }),
    );
    if (userId) await dispatch(fetchMyTickets(userId));
    setIsCreating(false);
    setShowModal(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const userId = user?.id || user?.idU;
    if ((!msgText.trim() && !selectedImage) || !activeId) return;
    setIsSending(true);

    if (selectedImage) {
        await dispatch(sendMessage({ ticketId: activeId, message: selectedImage }));
        setSelectedImage(null);
    }
    
    if (msgText.trim()) {
        await dispatch(sendMessage({ ticketId: activeId, message: msgText }));
        setMsgText("");
    }

    if (userId) await dispatch(fetchMyTickets(userId));
    setIsSending(false);
  };

  const activeTicket = tickets.find((t) => t.idSupport === activeId);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        margin: "-2rem",
        padding: "2rem",
        background: "#0B1F3A",
        minHeight: "700px",
        gap: 0,
        position: "relative",
        boxSizing: "border-box"
      }}
    >
      {fullScreenImage && (
        <div 
          onClick={() => setFullScreenImage(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <img src={fullScreenImage} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: 8 }} alt="Agrandie" />
            <div style={{ position: 'absolute', top: 20, right: 20, color: 'white' }}><X size={40} /></div>
        </div>
      )}
      <style>{`
                .support-custom-scroll::-webkit-scrollbar {
                    width: 5px;
                }
                .support-custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .support-custom-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                }
                .support-custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.25);
                }
            `}</style>
      {showModal && (
        <NewTicketModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
          isCreating={isCreating}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexShrink: 0,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Support Client
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              color: "#94a3b8",
              fontSize: "0.875rem",
            }}
          >
            Vos demandes d'assistance technique
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: 12,
            border: "none",
            background: "#1E293B",
            color: "white",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px #31434eff",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-1px)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        >
          <Plus size={16} />
          Nouveau Ticket
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          borderRadius: 8,
          border: "1px solid #163967",
          boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
          background: "#0F294D",
        }}
      >
        <div
          style={{
            width: "320px",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #163967",
            background: "#08162A",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: "1rem",
              background: "#08162A",
              borderBottom: "1px solid #163967",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#8696a0",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div
            className="support-custom-scroll"
            style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}
          >
            {isLoading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#94a3b8",
                  fontSize: "0.875rem",
                }}
              >
                <Loader2
                  size={24}
                  style={{ animation: "spin 1s linear infinite", opacity: 0.5 }}
                />
              </div>
            )}
            {!isLoading && tickets.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem 1rem",
                  textAlign: "center",
                  color: "#8696a0",
                }}
              >
                <Inbox
                  size={36}
                  style={{ marginBottom: "0.75rem", opacity: 0.3 }}
                />
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    color: "#8696a0",
                    fontSize: "0.875rem",
                  }}
                >
                  Aucun ticket
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "0.78rem" }}>
                  Créez votre premier ticket support
                </p>
              </div>
            )}
            {tickets.map((t) => {
              const isActive = t.idSupport === activeId;
              const lastMsg = t.messages?.[t.messages.length - 1];
              const lastReadCount = readCursors[t.idSupport] || 0;
              const newMessages = t.messages?.slice(lastReadCount) || [];
              const unreadAdminCount = newMessages.filter(m => m.sender === "admin").length;
              return (
                <div
                  key={t.idSupport}
                  onClick={() => setActiveId(t.idSupport)}
                  style={{
                    position: "relative",
                    padding: "0.875rem 0.875rem",
                    borderRadius: 12,
                    marginBottom: 4,
                    cursor: "pointer",
                    background: isActive ? "#13325B" : "transparent",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "#0F294D";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 4,
                    }}
                  >
                   
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: "#8696a0",
                        flexShrink: 0,
                        marginLeft: 4,
                      }}
                    >
                      {fmtDate(t.createdAt)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: lastMsg ? 5 : 0,
                    }}
                  >
                    <span style={{ fontSize: "0.68rem", color: "#8696a0" }}>
                      #{t.idSupport}
                    </span>
                    <StatusBadge status={t.statusSupport} isPending={lastMsg?.sender === "client"} />
                    {unreadAdminCount > 0 && !isActive && (
                      <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 800, minWidth: '18px', height: '18px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', zIndex: 10 }}>
                          {unreadAdminCount}
                      </span>
                    )}
                  </div>
                  {lastMsg && (
                    <div
                      style={{
                        margin: 0,
                        fontSize: "0.72rem",
                        color: "#8696a0",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lastMsg.sender === "admin" ? (
                        <>
                          <img 
                            src="/support.png" 
                            alt="S" 
                            style={{ width: 14, height: 14, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
                            onError={(e) => { 
                              e.target.onerror = null; 
                              e.target.style.display="none"; 
                              e.target.nextSibling.style.display="flex"; 
                            }} 
                          />
                          <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg,#0B1F3A,#1a3a6e)', display: 'none', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '8px', fontWeight: 'bold', flexShrink: 0 }}>S</div>
                          <span style={{ color: '#e9edef', fontWeight: 600, flexShrink: 0 }}>Support:</span>
                        </>
                      ) : (
                        <span style={{ flexShrink: 0 }}>Vous:</span>
                      )}
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                         {lastMsg.message && lastMsg.message.startsWith("data:image/") ? "Image" : lastMsg.message}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "hidden",
            background: "#1E293B",
          }}
        >
          {!activeTicket ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#8696a0",
                gap: "1rem",
                background: "#1E293B",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "#334155",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageSquare
                  size={32}
                  strokeWidth={1.5}
                  style={{ opacity: 0.8, color: "#8696a0" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    color: "#e9edef",
                    fontSize: "1rem",
                  }}
                >
                  Sélectionnez un ticket
                </p>
                <p style={{ margin: "6px 0 0", fontSize: "0.875rem" }}>
                  Ou créez-en un nouveau pour contacter le support
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.65rem 1.25rem",
                  borderRadius: 10,
                  border: "none",
                  background: "#10161a8f",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Plus size={15} /> Nouveau Ticket
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  padding: "1.1rem 1.5rem",
                  borderBottom: "1px solid #163967",
                  background: "#08162A",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "white", padding: 2, flexShrink: 0, border: "2px solid #1E6BFF" }}>
                      <img src="/support.png" alt="Support IHOST" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 4 }}>
                        <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: "#e9edef" }}>
                          Support IHOST
                        </h3>
                        <StatusBadge status={activeTicket.statusSupport} isPending={activeTicket.messages?.[activeTicket.messages.length - 1]?.sender === "client"} />
                      </div>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.72rem", color: "#8696a0", display: "flex", alignItems: "center", gap: 4 }}>
                          <Tag size={11} /> #{activeTicket.idSupport}
                        </span>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#334155" }}></span>
                        <span style={{ fontSize: "0.72rem", color: "#8696a0", display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={11} /> Créé le {fmtDate(activeTicket.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "0.82rem", color: "#e9edef", maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {activeTicket.subjectSupport}
                    </p>
                    <p style={{ margin: "2px 0 0", fontSize: "0.7rem", color: "#8696a0" }}>
                      Sujet du ticket
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="support-custom-scroll"
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1.5rem",
                  background: "#0F294D",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {(!activeTicket.messages ||
                  activeTicket.messages.length === 0) && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "3rem 0",
                      color: "#8696a0",
                    }}
                  >
                    <MessageSquare
                      size={32}
                      style={{ opacity: 0.25, marginBottom: "0.5rem" }}
                    />
                    <p style={{ fontSize: "0.875rem" }}>
                      Aucun message dans ce ticket
                    </p>
                  </div>
                )}

                {activeTicket.messages?.length > 0 &&
                  (() => {
                    let lastDateLabel = null;
                    return activeTicket.messages.map((m, i) => {
                      const isClient = m.sender === "client";
                      const currentLabel = getChatDateLabel(m.createdAt);
                      const showLabel = currentLabel !== lastDateLabel;
                      lastDateLabel = currentLabel;

                      return (
                        <React.Fragment key={m.idMessage || i}>
                          {showLabel && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "0.5rem 0",
                              }}
                            >
                              <span
                                style={{
                                  background: "rgba(30, 41, 59, 0.85)",
                                  backdropFilter: "blur(4px)",
                                  color: "#8696a0",
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  padding: "0.35rem 0.85rem",
                                  borderRadius: 999,
                                  border: "none",
                                  boxShadow: "0 1px 3px rgba(11,20,26,0.3)",
                                  textTransform: "capitalize",
                                }}
                              >
                                {currentLabel}
                              </span>
                            </div>
                          )}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: isClient ? "flex-end" : "flex-start",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                marginBottom: 4,
                              }}
                            >
                              {!isClient && (
                                <img
                                  src="/support.png"
                                  alt="Support"
                                  style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    flexShrink: 0,
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                              )}
                              {!isClient && (
                                <div
                                  style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    background:
                                      "linear-gradient(135deg,#0B1F3A,#1a3a6e)",
                                    display: "none",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    flexShrink: 0,
                                  }}
                                >
                                  S
                                </div>
                              )}
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  color: isClient ? "#0047cbff" : "#bcbcbcff",
                                }}
                              >
                                {isClient ? "Vous" : "Support IHOST"}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  color: "#8696a0",
                                }}
                              >
                                {fmt(m.createdAt)}
                              </span>
                              {isClient &&
                                (user?.avatar ? (
                                  <img
                                    src={user.avatar}
                                    alt="Vous"
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      flexShrink: 0,
                                    }}
                                  />
                                ) : (
                                  <img
                                    src="/user.avif"
                                    alt="Vous"
                                    style={{
                                      width: 24,
                                      height: 24,
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      flexShrink: 0,
                                    }}
                                  />
                                ))}
                            </div>

                            <div
                              style={{
                                maxWidth: "68%",
                                padding: m.message && m.message.startsWith("data:image/") ? "0.25rem" : "0.85rem 1.1rem",
                                borderRadius: 16,
                                borderBottomRightRadius: isClient ? 4 : 16,
                                borderBottomLeftRadius: isClient ? 16 : 4,
                                background: isClient ? "#1E6BFF" : "#0B1F3A",
                                color: "#e9edef",
                                boxShadow: "0 1px 2px rgba(11,20,26,0.3)",
                                border: "none",
                                fontSize: "0.875rem",
                                lineHeight: 1.6,
                              }}
                            >
                              {m.message && m.message.startsWith("data:image/") ? (
                                <img src={m.message} alt="attachment" style={{ maxWidth: "100%", borderRadius: 12, cursor: 'pointer', display: 'block' }} onClick={() => setFullScreenImage(m.message)} />
                              ) : (
                                m.message
                              )}
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()}
                <div ref={chatRef} />
              </div>

              <div
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#08162A",
                  borderTop: "1px solid #163967",
                  flexShrink: 0,
                }}
              >
                {activeTicket.statusSupport === "closed" ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "0.5rem",
                      background: "#0F294D",
                      borderRadius: 8,
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                    }}
                  >
                    Ce ticket est fermé. Contactez le support pour le rouvrir.
                  </div>
                ) : (
                  <form
                    onSubmit={handleSend}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      width: "100%"
                    }}
                  >
                    {selectedImage && (
                        <div style={{ position: 'relative', alignSelf: 'flex-start', background: '#0F294D', padding: 8, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <img src={selectedImage} alt="preview" style={{ maxHeight: 120, borderRadius: 8, display: 'block' }} />
                            <div onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: -8, right: -8, background: '#163967', color: '#94a3b8', borderRadius: '50%', cursor: 'pointer', padding: 4, display: 'flex' }}>
                                <X size={14} />
                            </div>
                        </div>
                    )}
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <div
                          style={{
                            flex: 1,
                            background: "#0F294D",
                            border: "1px solid #163967",
                            borderRadius: 999,
                            padding: "0.4rem 1.25rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input type="file" id="image-upload" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                          <label htmlFor="image-upload" style={{ cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', paddingRight: '12px', borderRight: '1px solid #163967', marginRight: '12px' }}>
                              <Paperclip size={18} />
                          </label>
                          <input
                            value={msgText}
                            onChange={(e) => setMsgText(e.target.value)}
                            placeholder="Écrivez votre message..."
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSend(e);
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              fontSize: "0.875rem",
                              color: "#e9edef",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSending || (!msgText.trim() && !selectedImage)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            padding: "0 1.25rem",
                            height: "38px",
                            borderRadius: 999,
                            border: "none",
                            background:
                              isSending || (!msgText.trim() && !selectedImage) ? "#0F294D" : "#1E6BFF",
                            color:
                              isSending || (!msgText.trim() && !selectedImage) ? "#64748b" : "white",
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            cursor:
                              isSending || (!msgText.trim() && !selectedImage)
                                ? "not-allowed"
                                : "pointer",
                            transition: "all 0.2s",
                            flexShrink: 0,
                          }}
                        >
                          {isSending ? (
                            <Loader2
                              size={16}
                              style={{ animation: "spin 1s linear infinite" }}
                            />
                          ) : (
                            <Send size={15} />
                          )}
                        </button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }

                .support-custom-scroll::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .support-custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .support-custom-scroll::-webkit-scrollbar-thumb {
                    background: #334155;
                    border-radius: 10px;
                }
                .support-custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: #1E6BFF;
                }
            `}</style>
    </div>
  );
};

export default ClientSupport;




