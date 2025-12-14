import { useState } from "react";
import { X } from "lucide-react";
import api from "../api/api";

export default function AuthModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        onSuccess(res.data.user, res.data.token);

      } else {
        await api.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={28} />
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-8
          text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {!isLogin && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-pink-500"
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-pink-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-pink-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500
              text-white py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch */}
        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-600 font-bold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
            
          </button>
        </p>
      </div>
    </div>
  );
}
