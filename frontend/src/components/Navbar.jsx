import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onLoginClick, onCartClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold hover:scale-105 transition">
          🍬 Mithai Magic
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-semibold">

          <button onClick={() => scrollToSection("home")} className="hover:text-pink-200">
            Home
          </button>

          <button onClick={() => scrollToSection("sweets")} className="hover:text-pink-200">
            Sweets
          </button>

          <Link to="/about" className="hover:text-pink-200">
            About
          </Link>

          {/* 👋 USER NAME */}
          {user && (
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Hi, {user.name}
            </span>
          )}

          {/* Auth Button */}
          {user ? (
            <button
              onClick={logout}
              className="bg-white text-pink-600 px-5 py-2 rounded-full font-bold hover:bg-pink-100 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-white text-pink-600 px-5 py-2 rounded-full font-bold hover:bg-pink-100 transition"
            >
              Login / Register
            </button>
          )}

          {/* Cart */}
          <button onClick={onCartClick} className="relative hover:scale-110 transition">
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-b from-pink-500 to-purple-600 px-6 py-4 space-y-4 font-semibold">

          {user && (
            <div className="text-white font-semibold">
              👋 Hi, {user.name}
            </div>
          )}

          <button onClick={() => scrollToSection("home")} className="block w-full text-left hover:text-pink-200">
            Home
          </button>

          <button onClick={() => scrollToSection("sweets")} className="block w-full text-left hover:text-pink-200">
            Sweets
          </button>

          <Link to="/about" onClick={() => setMobileOpen(false)} className="block hover:text-pink-200">
            About
          </Link>

          <button
            onClick={() => {
              onCartClick();
              setMobileOpen(false);
            }}
            className="flex items-center gap-2 hover:text-pink-200"
          >
            <ShoppingCart size={22} />
            Cart {cartCount > 0 && `(${cartCount})`}
          </button>

          {user ? (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="w-full bg-white text-pink-600 py-2 rounded-full font-bold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setMobileOpen(false);
              }}
              className="w-full bg-white text-pink-600 py-2 rounded-full font-bold"
            >
              Login / Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
