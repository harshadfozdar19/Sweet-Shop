import { useEffect } from "react";

export default function WelcomeScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-white">
      <h1 className="text-6xl md:text-8xl font-bold text-white animate-pulse">
        🍬 Mithai Magic 🍬
      </h1>
    </div>
  );
}
