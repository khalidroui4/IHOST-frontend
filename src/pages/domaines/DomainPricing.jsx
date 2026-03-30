import React from "react";
import {
  ShieldCheck,
  Server,
  Headphones,
  RefreshCw,
  ArrowRight,
  Globe,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../../pageTransition";
import LuxeCard from "../../components/LuxeCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import { useEffect } from 'react';

const DomainPricing = () => {
  const dispatch = useDispatch();
  const { items: services, isLoading } = useSelector(state => state.services);

  useEffect(() => {
    if (!services || services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services]);

  const dynamicPricingData = Array.from(new Map(
    services
      .filter(s => s.typeService === 'domain' && parseInt(s.isActive) === 1)
      .map(s => {
        const extMatch = s.nameService.match(/\.[a-zA-Z]+/);
        const ext = extMatch ? extMatch[0].toLowerCase() : null;
        if (!ext) return null;
        const priceVal = parseFloat(s.price);
        return [ext, {
          ext,
          reg: `${priceVal.toFixed(0)} DH`,
          ren: `${(priceVal * 1.05).toFixed(0)} DH`,
          trans: `${priceVal.toFixed(0)} DH`,
          promo: priceVal < 50,
          trending: ext === '.com' || ext === ".ma"
        }];
      })
      .filter(Boolean)
  ).values());

  const pricingData = dynamicPricingData;

  return (
    <PageTransition>
      <div className="domain-page">
        <section className="hero">
          <div
            className="hero-background"
            style={{
              background: "transparent",
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
                backgroundImage: "url(/pricing.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.15,
                mixBlendMode: "luminosity",
                zIndex: 0
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
                  Tarifs Clairs & Transparents
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
                  Découvrez notre grille tarifaire complète pour plus de 500
                  extensions. Pas de frais cachés, pas de mauvaises surprises au
                  renouvellement.
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
                    Rechercher un domaine <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                Grille Tarifaire Complète
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
                Consultez les prix d'enregistrement, de renouvellement et de
                transfert pour nos extensions les plus populaires.
              </p>
            </div>
            <div
              style={{
                maxWidth: "1000px",
                margin: "0 auto",
                overflowX: "auto",
                background: "white",
                borderRadius: "32px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(11, 31, 58, 0.1)",
                padding: "1.5rem",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 0.5rem",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      color: "#4B5563",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    <th style={{ padding: "1.5rem 2rem" }}>Extension</th>
                    <th style={{ padding: "1.5rem" }}>Enregistrement</th>
                    <th style={{ padding: "1.5rem" }}>Renouvellement</th>
                    <th style={{ padding: "1.5rem 2rem" }}>Transfert</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="4" style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                        Chargement des tarifs...
                      </td>
                    </tr>
                  ) : pricingData.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        background: index % 2 === 0 ? "#F5F7FA" : "white",
                        borderRadius: "16px",
                        transition: "all 0.3s ease-in-out",
                      }}
                    >
                      <td
                        style={{
                          padding: "1.5rem 2rem",
                          borderRadius: "16px 0 0 16px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: 900,
                              color: "#1E6BFF",
                            }}
                          >
                            {item.ext}
                          </span>
                          {item.promo && (
                            <span
                              style={{
                                background: "#EF4444",
                                color: "white",
                                fontSize: "0.65rem",
                                padding: "0.2rem 0.6rem",
                                borderRadius: "4px",
                                fontWeight: 900,
                              }}
                            >
                              PROMO
                            </span>
                          )}
                          {item.trending && (
                            <span
                              style={{
                                background: "#3B82F6",
                                color: "white",
                                fontSize: "0.65rem",
                                padding: "0.2rem 0.6rem",
                                borderRadius: "4px",
                                fontWeight: 900,
                              }}
                            >
                              TRENDING
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "1.5rem",
                          fontWeight: 800,
                          color: "#0B1F3A",
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.reg}
                      </td>
                      <td
                        style={{
                          padding: "1.5rem",
                          color: "#4B5563",
                          fontWeight: 600,
                        }}
                      >
                        {item.ren}
                      </td>
                      <td
                        style={{
                          padding: "1.5rem 2rem",
                          color: "#4B5563",
                          fontWeight: 600,
                          borderRadius: "0 16px 16px 0",
                        }}
                      >
                        {item.trans}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: "3rem", textAlign: "center" }}>
              <p style={{ color: "#4B5563", fontSize: "0.95rem" }}>
                * Offres de bienvenue valables pour la première année.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section-premium bg-light"
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
                Inclus avec chaque domaine
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
                Bénéficiez de tous les outils essentiels pour la réussite de
                votre projet, sans surcoût.
              </p>
            </div>
            <div className="features-grid">
              <LuxeCard
                icon={ShieldCheck}
                title="Protection WHOIS"
                desc="Gardez vos coordonnées personnelles secrètes et évitez le spam dès l'activation."
              />
              <LuxeCard
                icon={Server}
                title="Gestion DNS Avancée"
                desc="Contrôle granulaire sur vos zones DNS via une interface de gestion fluide et rapide."
              />
              <LuxeCard
                icon={RefreshCw}
                title="Renouvellement Auto"
                desc="Activez l'auto-renouvellement pour éviter de perdre vos domaines stratégiques par oubli."
              />
              <LuxeCard
                icon={Headphones}
                title="Assistance 24/7"
                desc="Nos experts sont là pour vous aider à synchroniser vos domaines avec vos services web."
              />
            </div>
          </div>
        </section>

        <section className="cta-split" style={{ padding: "6rem 0" }}>
          <div className="container-luxe">
            <div
              style={{
                background: "#6366F1",
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
                Trouvez votre domaine aujourd'hui
              </h2>
              <p
                style={{
                  fontSize: "1.25rem",
                  opacity: 0.9,
                  marginBottom: "3rem",
                  maxWidth: "750px",
                  margin: "0 auto 3rem",
                }}
              >
                Ne laissez pas passer l'opportunité. Votre nom de domaine idéal
                vous attend parmi des millions de possibilités.
              </p>
              <Link
                to="/domaines/register"
                className="btn"
                style={{
                  background: "white",
                  color: "#7c3aed",
                  padding: "1.2rem 3rem",
                  borderRadius: "100px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                }}
              >
                Rechercher maintenant <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default DomainPricing;
