import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (!success) {
      setError("Invalid admin email or password.");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f7f2e7] flex items-center justify-center p-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl"
      >
        <div className="w-14 h-14 bg-[#59663b] text-white rounded-full flex items-center justify-center mx-auto">
          <Leaf />
        </div>

        <h1 className="font-serif text-3xl text-center mt-6">
          Srikrishn Admin
        </h1>

        <p className="text-center text-[#6f7566] text-sm mt-2">
          Manage your store
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Admin email"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#59663b]"
          />

          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#59663b]"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button className="w-full bg-[#59663b] text-white rounded-full py-4">
            Login
          </button>
        </form>

        <p className="text-xs text-center text-[#999] mt-6">
          Demo: admin@srikrishn.com / admin123
        </p>
      </motion.div>
    </main>
  );
}