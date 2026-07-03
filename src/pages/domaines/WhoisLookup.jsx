import React, { useState } from "react";
import {
  Search as SearchIcon,
  ShieldAlert,
  CheckCircle2,
  Loader2,
  Globe,
  Database,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Zap,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageTransition from "../../pageTransition";
import LuxeCard from "../../components/LuxeCard";

const WhoisLookup = () => {
  const navigate = useNavigate();
  const [domainQuery, setDomainQuery] = useState("");
  const [searchState, setSearchState] = useState("idle"); // idle, loading, result, not_found, error
  const [whoisData, setWhoisData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = domainQuery.trim();
    if (!query) return;

    setSearchState("loading");
    setWhoisData(null);
    setErrorMsg("");

    try {
      const res = await axios.get(`/IHOST-backend/domains/whois/${query}`);
      if (res.data.status === "success") {
        if (res.data.registered) {
          setWhoisData(res.data.data);
          setSearchState("result");
        } else {
          setSearchState("not_found");
        }
      } else {
        setErrorMsg(res.data.message || "Erreur de vérification");
        setSearchState("error");
      }
    } catch (err) {
      setErrorMsg(
        "Impossible d'obtenir les données WHOIS. Veuillez réessayer.",
      );
      setSearchState("error");
    }
  };

  const SearchComponent = (
    <div
      className="domain-search-wrapper"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        padding: "1rem",
        borderRadius: "100px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          background: "white",
          borderRadius: "100px",
          padding: "0.25rem",
        }}
      >
        <SearchIcon
          size={24}
          color="#4B5563"
          style={{ marginLeft: "1.5rem" }}
        />
        <input
          type="text"
          placeholder="Entrez un domaine (ex: google.com)"
          value={domainQuery}
          onChange={(e) => {
            setDomainQuery(e.target.value);
            setSearchState("idle");
          }}
          style={{
            flex: 1,
            border: "none",
            padding: "1.2rem",
            fontSize: "1.2rem",
            outline: "none",
            color: "#0B1F3A",
            background: "transparent",
          }}
        />
        <button
          type="submit"
          className="btn"
          style={{
            margin: "0",
            padding: "1rem 2.5rem",
            borderRadius: "100px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#6366F1",
            color: "white",
            fontWeight: 700,
          }}
        >
          {searchState === "loading" ? (
            <Loader2 className="spinner" size={20} />
          ) : (
            "Analyser"
          )}
        </button>
      </form>
    </div>
  );

  return (
    <PageTransition>
      <div className="domain-page">
        <section className="hero">
          <div
            className="hero-background"
            style={{
              background: "linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="pattern-grid-tech" />
            <div className="hero-overlay" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/whois.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.35,
                zIndex: 0,
              }}
            />
            <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
              <div
                style={{
                  maxWidth: "900px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <h1
                  className="font-tech"
                  style={{
                    fontSize: "3.8rem",
                    color: "#fff",
                    marginBottom: "1.5rem",
                  }}
                >
                  Anatomie des Domaines
                </h1>
                <p
                  className="hero-subtext"
                  style={{
                    fontSize: "1.25rem",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "4rem",
                    lineHeight: "1.7",
                    fontWeight: 400,
                  }}
                >
                  Accédez instantanément à la base de données WHOIS pour
                  identifier le propriétaire, le registraire et les dates clés
                  de n'importe quel domaine.
                </p>
                <div
                  className="hero-buttons"
                  style={{ justifyContent: "center", gap: "1.5rem" }}
                >
                  <Link
                    to="/signup"
                    className="btn btn-primary"
                    style={{ padding: "1.2rem 3rem", fontSize: "1rem" }}
                  >
                    Enregistrer un domaine <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
              <div style={{ marginTop: "4rem" }}>{SearchComponent}</div>
            </div>
          </div>
        </section>

        {searchState === "result" && whoisData && (
          <section
            className="section-premium"
            style={{ padding: "4rem 2rem", background: "#f8fafc" }}
          >
            <div
              className="container-luxe"
              style={{ maxWidth: "900px", margin: "0 auto" }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "32px",
                  padding: "4rem",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(11, 31, 58, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid rgba(11, 31, 58, 0.1)",
                    paddingBottom: "2.5rem",
                    marginBottom: "3rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 0.5rem 0",
                        color: "#4B5563",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                      }}
                    >
                      Résultats pour le domaine
                    </p>
                    <h3
                      style={{
                        fontSize: "2.5rem",
                        color: "#1E6BFF",
                        margin: 0,
                        fontWeight: 900,
                      }}
                    >
                      {whoisData.domainName}
                    </h3>
                  </div>
                  {whoisData.whois_privacy ? (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.6rem 1.5rem",
                        background: "#fffbeb",
                        color: "#d97706",
                        borderRadius: "100px",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        border: "1px solid #fde68a",
                      }}
                    >
                      <ShieldAlert size={20} /> WHOIS PROTÉGÉ
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.6rem 1.5rem",
                        background: "#f0fdf4",
                        color: "#16a34a",
                        borderRadius: "100px",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <CheckCircle2 size={20} /> DONNÉES PUBLIQUES
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  {/* Propriétaire Card */}
                  <div
                    onClick={() => {
                      if (whoisData.whois_privacy) return;
                      const ownerLink = whoisData.owner_username
                        ? `/user/${whoisData.owner_username}`
                        : `/profile/public/${whoisData.owner_id}`;
                      navigate(ownerLink);
                    }}
                    onMouseEnter={(e) => {
                      if (whoisData.whois_privacy) return;
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 20px rgba(30, 107, 255, 0.15)";
                      e.currentTarget.style.borderColor = "#1E6BFF";
                    }}
                    onMouseLeave={(e) => {
                      if (whoisData.whois_privacy) return;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "rgba(11, 31, 58, 0.1)";
                    }}
                    style={{
                      background: "#F5F7FA",
                      padding: "2rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(11, 31, 58, 0.1)",
                      cursor: whoisData.whois_privacy ? "default" : "pointer",
                      transition: "transform 250ms, box-shadow 250ms, border-color 250ms",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "#1E6BFF",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <User size={20} />{" "}
                      <h4
                        style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}
                      >
                        PROPRIÉTAIRE
                      </h4>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
                      {whoisData.owner_avatar ? (
                        <img
                          src={whoisData.owner_avatar}
                          alt={whoisData.owner_name}
                          style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: "rgba(30, 107, 255, 0.1)",
                          color: "#1E6BFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <User size={24} />
                        </div>
                      )}
                      <div style={{ textAlign: "left" }}>
                        <p style={{ margin: 0, color: "#0B1F3A", fontWeight: 800, fontSize: "1.15rem" }}>
                          {whoisData.owner_first_name && whoisData.owner_last_name
                            ? `${whoisData.owner_first_name} ${whoisData.owner_last_name}`
                            : whoisData.owner_name}
                        </p>
                        {whoisData.owner_username && (
                          <p style={{ margin: 0, color: "#1E6BFF", fontWeight: 600, fontSize: "0.9rem" }}>
                            @{whoisData.owner_username}
                          </p>
                        )}
                      </div>
                    </div>

                    {!whoisData.whois_privacy && (
                      <div style={{
                        marginTop: "1.25rem",
                        color: "#1E6BFF",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}>
                        Voir le profil public <span>→</span>
                      </div>
                    )}
                  </div>

                  {/* Registrar Card */}
                  <div
                    style={{
                      background: "#F5F7FA",
                      padding: "2rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(11, 31, 58, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "#1E6BFF",
                        marginBottom: "1rem",
                      }}
                    >
                      <Globe size={20} />{" "}
                      <h4
                        style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}
                      >
                        BUREAU D'ENREGISTREMENT
                      </h4>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: "#0B1F3A",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                      }}
                    >
                      IHOST Registrar Inc.
                    </p>
                    <p
                      style={{
                        margin: "0.5rem 0 0",
                        color: "#4B5563",
                        fontSize: "0.95rem",
                      }}
                    >
                      Statut:{" "}
                      <span
                        style={{
                          color:
                            whoisData.statusDomaine === "active"
                              ? "#16a34a"
                              : "#ef4444",
                          fontWeight: 700,
                        }}
                      >
                        {whoisData.statusDomaine.toUpperCase()}
                      </span>
                    </p>
                  </div>

                  {/* Date Expire Card */}
                  <div
                    style={{
                      background: "#F5F7FA",
                      padding: "2rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(11, 31, 58, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "#1E6BFF",
                        marginBottom: "1rem",
                      }}
                    >
                      <Calendar size={20} />{" "}
                      <h4
                        style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}
                      >
                        PÉRIODE DE VALIDITÉ
                      </h4>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        color: "#0B1F3A",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                      }}
                    >
                      Expiration:{" "}
                      <span
                        style={{
                          color:
                            whoisData.statusDomaine === "active"
                              ? "#0B1F3A"
                              : "#ef4444",
                        }}
                      >
                        {new Date(whoisData.expirationDate).toLocaleDateString(
                          "fr-FR",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </span>
                    </p>
                    <p
                      style={{
                        margin: "0.5rem 0 0",
                        color: "#4B5563",
                        fontSize: "0.95rem",
                      }}
                    >
                      Renouvellement automatique:{" "}
                      {whoisData.is_locked ? "Verrouillé" : "Libre"}
                    </p>
                  </div>

                  {/* DNS servers */}
                  <div
                    style={{
                      background: "#F5F7FA",
                      padding: "2rem",
                      borderRadius: "20px",
                      border: "1px solid rgba(11, 31, 58, 0.1)",
                      gridColumn: "1 / -1",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        color: "#1E6BFF",
                        marginBottom: "1rem",
                      }}
                    >
                      <Database size={20} />{" "}
                      <h4
                        style={{ margin: 0, fontWeight: 800, fontSize: "1rem" }}
                      >
                        SERVEURS DE NOMS (DNS)
                      </h4>
                    </div>
                    <div
                      style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: "#0B1F3A",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          fontFamily: "monospace",
                          background: "white",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        ns1.ihost.ma
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: "#0B1F3A",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          fontFamily: "monospace",
                          background: "white",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        ns2.ihost.ma
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {searchState === "not_found" && (
          <section
            className="section-premium"
            style={{ padding: "4rem 2rem", background: "#f8fafc" }}
          >
            <div
              className="container-luxe"
              style={{ maxWidth: "900px", margin: "0 auto" }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "32px",
                  padding: "4rem 2rem",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                  border: "2px dashed rgba(11, 31, 58, 0.15)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "#ecfdf5",
                    color: "#10b981",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 2rem",
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>
                <h3
                  style={{
                    fontSize: "2rem",
                    color: "#0B1F3A",
                    marginBottom: "1rem",
                    fontWeight: 800,
                  }}
                >
                  Domaine Non Enregistré
                </h3>
                <p
                  style={{
                    color: "#4B5563",
                    fontSize: "1.2rem",
                    maxWidth: "600px",
                    margin: "0 auto 2.5rem",
                    lineHeight: "1.6",
                  }}
                >
                  Le nom de domaine{" "}
                  <strong style={{ color: "#1E6BFF" }}>{domainQuery}</strong>{" "}
                  n'est pas enregistré sur notre plateforme et semble disponible
                  à l'enregistrement !
                </p>
                <Link
                  to={`/domaines/register?q=${domainQuery}`}
                  className="btn btn-primary"
                  style={{
                    padding: "1.2rem 3rem",
                    fontSize: "1.1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  Enregistrer maintenant <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {searchState === "error" && (
          <section
            className="section-premium"
            style={{ padding: "4rem 2rem", background: "#f8fafc" }}
          >
            <div
              className="container-luxe"
              style={{ maxWidth: "900px", margin: "0 auto" }}
            >
              <div
                style={{
                  background: "#fef2f2",
                  borderRadius: "24px",
                  padding: "2.5rem",
                  border: "1px solid #fecaca",
                  textAlign: "center",
                  color: "#991b1b",
                }}
              >
                <p style={{ margin: 0, fontWeight: 700, fontSize: "1.1rem" }}>
                  {errorMsg}
                </p>
              </div>
            </div>
          </section>
        )}

        <section
          className="section-premium bg-white"
          style={{ padding: "8rem 2rem", textAlign: "center" }}
        >
          <div className="container-luxe">
            <div
              className="section-header"
              style={{ marginBottom: "5rem", textAlign: "center" }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "#0B1F3A",
                  marginBottom: "1rem",
                  letterSpacing: "-1px",
                }}
              >
                Transparence & Sécurité
              </h2>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "#4B5563",
                  maxWidth: "700px",
                  margin: "0 auto",
                  lineHeight: "1.6",
                }}
              >
                Pourquoi la base de données WHOIS est-elle essentielle pour
                l'écosystème internet ?
              </p>
            </div>
            <div className="features-grid">
              <LuxeCard
                icon={ShieldCheck}
                title="Protection WHOIS"
                desc="Nos services de confidentialité permettent de masquer vos données personnelles tout en restant conforme aux règles de l'ICANN."
              />
              <LuxeCard
                icon={Calendar}
                title="Surveillance d'Expiration"
                desc="Ne perdez jamais votre domaine. Utilisez WHOIS pour suivre les dates d'échéance et configurer des alertes de renouvellement."
              />
              <LuxeCard
                icon={Database}
                title="Vérification Technique"
                desc="Diagnostiquez les erreurs de configuration DNS et assurez-vous que vos serveurs de noms pointent vers les bonnes cibles."
              />
            </div>
          </div>
        </section>

        <section className="cta-split" style={{ padding: "6rem 0" }}>
          <div className="container-luxe">
            <div
              style={{
                background: "linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)",
                borderRadius: "32px",
                padding: "5rem",
                color: "white",
                textAlign: "center",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                  marginBottom: "1.5rem",
                }}
              >
                Protéger vos données personnelles
              </h2>
              <p
                style={{
                  fontSize: "1.25rem",
                  opacity: 0.9,
                  marginBottom: "3rem",
                  maxWidth: "700px",
                  margin: "0 auto 3rem",
                }}
              >
                Activez la protection WHOIS sur vos domaines IHOST pour éviter
                le spam, les tentatives de phishing et le vol d'identité.
              </p>
              <Link
                to="/client/dashboard"
                className="btn"
                style={{
                  background: "white",
                  color: "#1E6BFF",
                  padding: "1.2rem 3rem",
                  borderRadius: "100px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                }}
              >
                Configurer la protection <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default WhoisLookup;
