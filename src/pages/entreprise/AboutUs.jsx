import React from "react";
import { Target, Eye, ShieldCheck, Zap, HeadphonesIcon, Award, Users, Globe, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../../pageTransition";
import LuxeCard from "../../components/LuxeCard";
import './AboutUs.css';

const AboutUs = () => {
  return (
    <PageTransition>
      <div className="entreprise-page">
        <section className="hero">
          <div className="hero-background-dark">
            <div className="pattern-grid-tech" />
            <div className="hero-overlay" />
            <div className="hero-image-overlay" style={{ backgroundImage: "url(/tech-company.jpg)" }} />
            <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
              <div className="hero-text-container">
                <h1 className="font-tech hero-title">L'Excellence Numérique</h1>
                <p className="hero-description">
                  Découvrez l'histoire, la mission et l'engagement d'IHOST. Nous bâtissons l'infrastructure de demain pour propulser votre succès aujourd'hui.
                </p>
                <div className="hero-buttons" style={{ justifyContent: "center", gap: "1.5rem" }}>
                  <Link to="/signup" className="btn btn-primary" style={{ padding: "1.2rem 3rem", fontSize: "1rem" }}>
                    Notre Histoire <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-premium bg-white section-padding">
          <div className="container-luxe">
            <div className="section-header-container">
              <h2 className="section-title">Mission & Vision</h2>
              <p className="section-subtitle">L'étoile polaire qui guide chacune de nos innovations technologiques.</p>
            </div>
            <div className="mission-grid">
              <div className="mission-card hover-lift">
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", background: "rgba(59, 130, 246, 0.05)", borderRadius: "50%" }}></div>
                <div className="mission-icon-group">
                  <div className="mission-icon-wrapper" style={{ background: "rgba(59, 130, 246, 0.1)", color: "#1E6BFF" }}>
                    <Target size={36} />
                  </div>
                  <h2 className="mission-card-title">Notre Mission</h2>
                </div>
                <p className="mission-card-desc">
                  Démocratiser l'accès aux infrastructures de pointe. Nous accompagnons les entreprises dans leur transition vers le Cloud en offrant des solutions robustes, souveraines et accessibles, sans compromis sur la performance.
                </p>
              </div>

              <div className="mission-card hover-lift">
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", background: "rgba(16, 185, 129, 0.05)", borderRadius: "50%" }}></div>
                <div className="mission-icon-group">
                  <div className="mission-icon-wrapper" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                    <Eye size={36} />
                  </div>
                  <h2 className="mission-card-title">Notre Vision</h2>
                </div>
                <p className="mission-card-desc">
                  Devenir le leader technologique incontesté en Afrique et au Moyen-Orient. Nous aspirons à construire l'écosystème numérique de demain en misant sur le Green Computing et l'innovation constante.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-premium bg-light section-padding">
          <div className="container-luxe">
            <div className="section-header-container">
              <h2 className="section-title">Nos Valeurs Fondamentales</h2>
              <p className="section-subtitle">L'ADN qui définit notre culture d'entreprise et nos engagements clients.</p>
            </div>
            <div className="features-grid">
              <LuxeCard icon={ShieldCheck} title="Fiabilité Absolue" desc="Nous concevons des infrastructures redondantes pour garantir un uptime de 99.9%, parce que votre business ne s'arrête jamais." />
              <LuxeCard icon={Award} title="Qualité Premium" desc="La satisfaction client n'est pas un objectif, c'est notre standard. Chaque service est audité pour répondre aux normes les plus strictes." />
              <LuxeCard icon={Zap} title="Agilité Constante" desc="Dans un monde qui change vite, nous adaptons nos technologies en temps réel pour vous offrir un avantage compétitif majeur." />
              <LuxeCard icon={HeadphonesIcon} title="Humain & Réactif" desc="Un support local, expert et passionné. Nous ne sommes pas juste un fournisseur, nous sommes votre extension technique." />
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-luxe">
            <div className="section-header-container">
              <h2 className="section-title">IHOST en Chiffres</h2>
              <p className="section-subtitle">Une croissance soutenue par la confiance de nos partenaires et clients fidèles.</p>
            </div>
            <div className="stats-grid">
              {[
                { icon: Users, label: "Clients Actifs", value: "15,000+" },
                { icon: Globe, label: "Pays Couverts", value: "35+" },
                { icon: ShieldCheck, label: "Uptime Moyen", value: "99.99%" },
                { icon: Rocket, label: "Projets Cloud", value: "5,000+" },
              ].map((stat, i) => (
                <div key={i} className="stat-card hover-lift">
                  <div className="stat-icon-wrapper"><stat.icon size={45} /></div>
                  <div style={{ fontSize: "3rem", fontWeight: 900, color: "#0B1F3A", marginBottom: "0.5rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "1.1rem", color: "#4B5563", fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "#F5F7FA" }}>
          <div className="container-luxe">
            <div className="join-container">
              <div className="join-content">
                <h2 className="join-title">Rejoignez l'aventure technologique</h2>
                <p className="join-desc">
                  Nous sommes constamment à la recherche de talents passionnés pour repousser les limites du Cloud au Maroc et en Afrique. Prêt à transformer le futur ?
                </p>
                <div className="join-checklist">
                  {[
                    "Environnement Innovant",
                    "Culture de l'Excellence",
                    "Impact Reèl",
                    "Formation Continue",
                  ].map((item, i) => (
                    <div key={i} className="join-check-item">
                      <CheckCircle2 size={24} color="#10b981" /> {item}
                    </div>
                  ))}
                </div>
                <Link to="/entreprise/careers" className="btn cta-btn-override" style={{ background: "#1E6BFF", color: 'white', display: "inline-flex", alignItems: "center", gap: "1rem" }}>
                  Voir nos opportunités <ArrowRight size={24} />
                </Link>
              </div>
              <div className="join-visual">
                <div className="join-visual-card">
                  <Users size={200} color="rgba(255,255,255,0.1)" style={{ position: "absolute" }} />
                  <div style={{ color: "white", textAlign: "center", position: "relative", zIndex: 1, padding: "3rem" }}>
                    <h3 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1rem" }}>+50</h3>
                    <p style={{ fontSize: "1.2rem", fontWeight: 600 }}>Experts Dédiés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-split" style={{ padding: "8rem 0" }}>
          <div className="container-luxe">
            <div className="cta-container">
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 className="cta-title">Prêt à accélérer votre croissance ?</h2>
                <p className="cta-desc">
                  Des milliers d'entreprises font déjà confiance à notre infrastructure pour propulser leurs services digitaux. Pourquoi pas vous ?
                </p>
                <div className="cta-btn-group">
                  <Link to="/contact" className="btn cta-btn-override cta-btn-primary">Nous Contacter</Link>
                  <Link to="/hebergement" className="btn btn-outline cta-btn-override cta-btn-outline">Nos Solutions</Link>
                </div>
              </div>
              <div className="cta-glow"></div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AboutUs;
