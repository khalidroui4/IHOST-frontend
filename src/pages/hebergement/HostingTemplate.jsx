import React, { useEffect } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import PageTransition from "../../pageTransition";
import LuxeCard from "../../components/LuxeCard";
import TechPricingCard from "../../components/TechPricingCard";

const HostingTemplate = ({ data }) => {
  if (!data) return <Navigate to="/" />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data.id]);

  return (
    <PageTransition>
      <div className="hosting-page">
        <section className="hero">
          <div
            className="hero-background"
            style={{
              background: `linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)`,
              position: "relative",
              border: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${data.hero.image || "/cloud server infrastructure.jpg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.15,
                zIndex: 1,
              }}
            />
            <div className="pattern-grid-tech" style={{ zIndex: 2 }} />
            <div
              className="container-luxe hero-content"
              style={{ zIndex: 10, position: "relative" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "4rem",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h1
                    className="font-tech"
                    style={{
                      fontSize: "3.8rem",
                      color: "#fff",
                      marginBottom: "1.5rem",
                      lineHeight: "1.1",
                    }}
                  >
                    {data.hero.title}
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
                    {data.hero.subtitle}
                  </p>
                  <div
                    className="hero-buttons"
                    style={{ justifyContent: "flex-start", gap: "1.5rem" }}
                  >
                    <Link
                      to="/signup"
                      className="btn btn-primary"
                      style={{ padding: "1.2rem 3rem", fontSize: "1rem" }}
                    >
                      {data.hero.ctaText} <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
                <div
                  style={{ position: "relative", display: "none", lg: "block" }}
                >
                  {/* Abstract Visual for Hosting */}
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "32px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Zap size={120} color="#00C2FF" opacity={0.2} />
                  </div>
                </div>
              </div>
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
                Une architecture pensée pour la performance
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
                Des infrastructures de pointe pour propulser vos projets web
                vers de nouveaux sommets.
              </p>
            </div>
            <div className="features-grid">
              {data.benefits.map((benefit, index) => (
                <LuxeCard
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  desc={benefit.desc}
                />
              ))}
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
                Nos Offres et Tarifs
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
                Une tarification transparente et sans frais cachés, adaptée à
                chaque étape de votre croissance.
              </p>
            </div>
            <div
              className="pricing-cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem",
                maxWidth: "1100px",
                margin: "0 auto",
                alignItems: "center",
              }}
            >
              {data.plans.map((plan, index) => (
                <TechPricingCard
                  key={index}
                  name={plan.name}
                  price={plan.price}
                  period={plan.period}
                  features={plan.features}
                  highlight={plan.highlight}
                  badge={plan.badge}
                  buttonText="Ajouter au panier"
                  addToCartMode={true}
                />
              ))}
            </div>

            <div
              className="pricing-comparison"
              style={{
                marginTop: "6rem",
                overflowX: "auto",
                display: "none",
                lg: "block",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#F8FAFC",
                      borderBottom: "2px solid #E2E8F0",
                    }}
                  >
                    <th
                      style={{
                        padding: "2rem",
                        fontSize: "1.2rem",
                        color: "#0B1F3A",
                      }}
                    >
                      Caractéristiques
                    </th>
                    {data.plans.map((plan, i) => (
                      <th
                        key={i}
                        style={{
                          padding: "2rem",
                          fontSize: "1.2rem",
                          color: "#0B1F3A",
                          textAlign: "center",
                        }}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "1.5rem 2rem", fontWeight: 600 }}>
                      Performance
                    </td>
                    {data.plans.map((plan, i) => (
                      <td
                        key={i}
                        style={{ padding: "1.5rem 2rem", textAlign: "center" }}
                      >
                        {i === 0 ? "Standard" : i === 1 ? "High" : "Ultimate"}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "1.5rem 2rem", fontWeight: 600 }}>
                      Support Technique
                    </td>
                    {data.plans.map((plan, i) => (
                      <td
                        key={i}
                        style={{ padding: "1.5rem 2rem", textAlign: "center" }}
                      >
                        {i === 2 ? "Prioritaire 24/7" : "Standard 24/7"}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "1.5rem 2rem", fontWeight: 600 }}>
                      Sauvegardes
                    </td>
                    {data.plans.map((plan, i) => (
                      <td
                        key={i}
                        style={{ padding: "1.5rem 2rem", textAlign: "center" }}
                      >
                        {i === 0 ? "Hebdomadaire" : "Quotidienne"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
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
                Prêt à passer à la vitesse supérieure ?
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
                Rejoignez l'écosystème IHOST et bénéficiez du support d'experts
                24/7 pour votre réussite en ligne.
              </p>
              <Link
                to="/signup"
                className="btn"
                style={{
                  background: "white",
                  color: "#1E6BFF",
                  padding: "1.2rem 3rem",
                  borderRadius: "9999px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                }}
              >
                Créer mon compte <ArrowUpRight size={22} />
              </Link>
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
                Questions Fréquentes
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
                Tout ce que vous devez savoir sur nos solutions d'hébergement.
              </p>
            </div>
            <div
              className="faq-list"
              style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}
            >
              {data.faq.map((q, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: "2.5rem",
                    borderRadius: "20px",
                    marginBottom: "1.5rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)",
                    borderLeft: "6px solid #2563EB",
                  }}
                >
                  <h4
                    style={{
                      color: "#1E6BFF",
                      fontSize: "1.3rem",
                      marginBottom: "1rem",
                      fontWeight: 700,
                    }}
                  >
                    {q.question}
                  </h4>
                  <p
                    style={{
                      color: "#4B5563",
                      lineHeight: "1.8",
                      margin: 0,
                      fontSize: "1.1rem",
                    }}
                  >
                    {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default HostingTemplate;
