import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import WelcomeScreen from "../components/WelcomeScreen";
import SweetGrid from "../components/SweetGrid";
import AuthModal from "../components/AuthModal";
import CartDrawer from "../components/CartDrawer";
import api from "../api/api";
import AdminGuard from "../components/AdminGuard";
import AdminPanel from "./AdminPanel";
import Footer from "../components/Footer";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, login } = useAuth();

  // fetch sweets
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await api.get("/sweets");
        setSweets(Array.isArray(res.data.sweets) ? res.data.sweets : []);
      } catch (err) {
        setError("Failed to load sweets");
      } finally {
        setLoading(false);
      }
    };

    fetchSweets();
  }, []);

  // welcome screen
  if (showWelcome) {
    return <WelcomeScreen onFinish={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">

      {/* Navbar */}
      <Navbar
        onLoginClick={() => setShowAuth(true)}
        onCartClick={() => setShowCart(true)}
      />

      {/* Hero */}
      <section
        id="home"
        className="pt-20 pb-12 text-center overflow-visible"
      >
        <h2
          className="
            text-5xl md:text-6xl
            font-extrabold
            leading-[1.2]
            pb-2
            text-transparent bg-clip-text
            bg-gradient-to-r from-pink-500 to-purple-600
          "
        >
          Welcome to Mithai Magic
        </h2>

        <p className="mt-4 text-xl text-gray-600 italic">
          Sweetness delivered with love 💜
        </p>
      </section>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-20 text-xl text-gray-600">
          Loading sweets...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center mt-20 text-xl text-red-500">
          {error}
        </p>
      )}

      {/* Legacy Section */}
      <section className="pt-16 pb-20 bg-gradient-to-r from-pink-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

          {/* Legacy Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 group">
            <img
              src="https://www.sweedesi.com/cdn/shop/collections/one-stop-sweet-shop-for-famous-indian-sweets-309001_b9c5b281-fff8-4fa9-aa2d-eb4efc4e2c79.jpg?v=1740033502"
              alt="Sweet shop legacy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

            <div className="absolute bottom-4 left-6 text-white">
              <p className="text-sm tracking-widest uppercase opacity-90">
                Since 1985
              </p>
              <h4 className="text-2xl font-bold">
                A Tradition of Taste
              </h4>
            </div>
          </div>

          {/* Legacy Content */}
          <div>
            <h3
              className="
                text-4xl
                font-extrabold
                leading-[1.25]
                pb-1
                text-transparent bg-clip-text
                bg-gradient-to-r from-pink-600 to-purple-600
                mb-6
              "
            >
              A Legacy of Sweetness
            </h3>

            <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"></div>

            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              Mithai Magic is not just a sweet shop — it’s a story of
              generations bound together by tradition, craftsmanship,
              and love for authentic Indian sweets.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              Every laddu, barfi, and mithai is prepared using time-honored
              recipes, ensuring the same taste that families have trusted
              for decades.
            </p>

            <p className="text-lg font-semibold text-purple-600">
              Handcrafted with love. Served with pride. 💜
            </p>
          </div>

        </div>
      </section>

      {/* Sweet Grid */}
      {!loading && !error && (
        <SweetGrid sweets={sweets} />
      )}

      {/* Admin Panel */}
      <AdminGuard>
        <AdminPanel />
      </AdminGuard>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={(userData, token) => {
            login(userData, token);
            setShowAuth(false);
          }}
        />
      )}

      {/* Cart Drawer */}
      {showCart && (
        <CartDrawer
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            alert("Checkout integration coming next");
          }}
        />
      )}

      <Footer />
    </div>
  );
}
