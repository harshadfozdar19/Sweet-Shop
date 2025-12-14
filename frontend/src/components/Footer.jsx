import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  // scroll helper
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      // navigate to home first, then scroll
      window.location.href = `/#${id}`;
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h3 className="text-3xl font-extrabold mb-4">
            🍬 Mithai Magic
          </h3>
          <p className="text-white/90 leading-relaxed">
            A legacy of sweetness crafted with love, tradition,
            and authentic Indian flavors.
          </p>
          <p className="mt-3 text-sm text-white/80">
            Serving happiness since 1985 💜
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-white/90">

            <li>
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-white underline-offset-4 hover:underline"
              >
                Home
              </button>
            </li>

            <li>
              <button
                onClick={() => scrollToSection("sweets")}
                className="hover:text-white underline-offset-4 hover:underline"
              >
                Sweets
              </button>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-white underline-offset-4 hover:underline"
              >
                About
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xl font-bold mb-4">Contact Us</h4>
          <p className="text-white/90">📍 India</p>
          <p className="text-white/90">📧 support@mithaimagic.com</p>
          <p className="text-white/90">📞 +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Mithai Magic. All rights reserved.
      </div>
    </footer>
  );
}
