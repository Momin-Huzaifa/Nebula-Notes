import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, ArrowRight } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setLoading, isLoading } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await registerUser(name, email, password);
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center sm:min-h-[70vh] px-4">
      <Card className="w-full max-w-md p-8 sm:p-12 relative overflow-hidden" hover={false}>
        <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 mx-auto border border-indigo-500/20"
          >
            <UserPlus className="text-primary w-8 h-8" />
          </motion.div>

          <header className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Join Nebula Notes today</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center"
              >
                {error}
              </motion.p>
            )}

            <Button className="w-full py-3 gap-2" isLoading={isLoading}>
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <footer className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </footer>
        </div>
      </Card>
    </div>
  );
}