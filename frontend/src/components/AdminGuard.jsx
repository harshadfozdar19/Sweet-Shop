import { useAuth } from "../context/AuthContext";

export default function AdminGuard({ children }) {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return null; // hide admin UI
  }

  return children;
}
