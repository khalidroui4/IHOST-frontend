import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {
  LayoutDashboard,
  Users,
  Server,
  Package,
  HelpCircle,
  Search,
  LogOut,
  Shield,
  ChevronRight,
  Menu,
} from "lucide-react";
import LogoutConfirmModal from "../LogoutConfirmModal";

const sidebarGroups = [
  {
    label: "Menu",
    items: [
      { path: "/admin/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
      { path: "/admin/users", icon: Users, label: "Utilisateurs" },
      { path: "/admin/orders", icon: Package, label: "Commandes" },
      { path: "/admin/services", icon: Server, label: "Catalogue Services" },
      { path: "/admin/support", icon: HelpCircle, label: "Tickets" },
    ],
  },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        background: "#faf8f8",
        zIndex: 9999,
        overflow: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "" : "hidden"}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`app-sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          width: "240px",
          background: "#1B0606",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "1.5rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Link
            to="/admin/dashboard"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/adminLogo.jpeg"
              alt="logo"
              style={{ width: "160px", height: "80px", margin: "auto" }}
            />
          </Link>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "1rem 0.75rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sidebarGroups.map((group) => (
            <div key={group.label} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-evenly", gap: "2px" }}>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.65rem",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "0.875rem",
                        transition: "all 0.15s",
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
                        background: isActive
                          ? "rgba(220,38,38,0.15)"
                          : "transparent",
                      }}
                    >
                      <Icon size={17} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div
          style={{
            padding: "1rem 0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <button
            onClick={() => setShowLogoutModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              width: "100%",
              padding: "0.6rem 0.75rem",
              borderRadius: "8px",
              background: "transparent",
              border: "none",
              color: "#f87171",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s",
              textAlign: "left",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </div>
      </aside>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <header
          className="dashboard-header"
          style={{
            height: "64px",
            background: "#faf5f5",
            borderBottom: "1px solid #cbcbcbff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
            flexShrink: 0,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="mobile-header-toggle"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} color="#1B0606" />
            </button>

            <div style={{ flex: 1 }} />
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.4rem 0.8rem",
                gap: "0.5rem"
              }}
            >
              <Users size={20} color="#DC2626" />
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#DC2626" }}>Admin</div>
            </div>
          </div>
        </header>

        <main
          className="dashboard-main"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "2rem",
            background: "#faf5f5",
          }}
        >
          <Outlet />
        </main>
      </div>
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

export default AdminLayout;
