import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import FloatingShape from "../components/FloatingShape";
import SchoolCrest from "../components/SchoolCrest";
import { SCHOOL_NAME, SCHOOL_TAGLINE, FLOATING_SHAPES } from "../constants";

interface FormState {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

const DEMO_CREDENTIALS = { username: "student", password: "maxwell2024" };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const statsData = [
  { icon: GraduationCap, label: "Students", value: "2,400+" },
  { icon: BookOpen, label: "Courses", value: "180+" },
  { icon: Users, label: "Faculty", value: "120+" },
];

const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.4 + 0.1,
}));

const ORBITS = [
  { size: "22vw", duration: 22, color: "rgba(99,102,241,0.07)", delay: 0 },
  { size: "32vw", duration: 32, color: "rgba(168,85,247,0.05)", delay: 4 },
  { size: "42vw", duration: 44, color: "rgba(56,189,248,0.04)", delay: 8 },
];

function LoginPage() {
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [shakeFields, setShakeFields] = useState({
    username: false,
    password: false,
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rightPanelRef.current) return;
      const rect = rightPanelRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    else if (form.username.trim().length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      setShakeFields({
        username: !form.username.trim(),
        password: !form.password,
      });
      setTimeout(
        () => setShakeFields({ username: false, password: false }),
        600,
      );
      return;
    }
    setIsLoading(true);
    setErrors({});
    await new Promise((res) => setTimeout(res, 1800));
    if (
      form.username === DEMO_CREDENTIALS.username &&
      form.password === DEMO_CREDENTIALS.password
    ) {
      setLoginSuccess(true);
    } else {
      setErrors({ general: "Invalid credentials. Try student / maxwell2024" });
      setShakeFields({ username: true, password: true });
      setTimeout(
        () => setShakeFields({ username: false, password: false }),
        600,
      );
    }
    setIsLoading(false);
  }, [form, validate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  if (loginSuccess) {
    return (
      <motion.div
        className="h-screen w-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0f0c29, #1e1b4b, #312e81)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: "0 0 40px rgba(34,197,94,0.4)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M8 18L15 25L28 11"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
          <motion.h2
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome back!
          </motion.h2>
          <motion.p
            className="text-white/50 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Redirecting to your dashboard...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      <motion.img
        src="/cartoon.png"
        alt="Students"
        className="hidden lg:block absolute z-30 pointer-events-none select-none 
             bottom-0 left-[20%] -translate-x-1/2 
             w-[60vw] max-w-[900px]"
        style={{
          objectFit: "contain",
          filter:
            "drop-shadow(-20px 0 60px rgba(99,102,241,0.45)) drop-shadow(20px 0 40px rgba(0,0,0,0.9))",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      />

      {/* LEFT PANEL */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(-45deg, #0f0c29, #1a1a4e, #0d0d2e, #1e1b4b, #312e81, #1e1b4b, #0f172a)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 12s ease infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.12) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.08) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 80%, rgba(56,189,248,0.06) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {FLOATING_SHAPES.map((shape) => (
          <FloatingShape key={shape.id} {...shape} />
        ))}
        <motion.div
          className="relative z-10 text-center px-12 max-w-lg lg:pr-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <SchoolCrest />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-3">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-indigo-300/80"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Student Portal 2024–25
            </span>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight"
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 40%, #e879f9 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {SCHOOL_NAME}
            </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-white/45 text-sm leading-relaxed mb-10 font-light"
          >
            {SCHOOL_TAGLINE}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-3"
          >
            {statsData.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon size={16} className="text-indigo-400/70" />
                </div>
                <div className="text-lg font-bold text-white/90 leading-none mb-0.5">
                  {value}
                </div>
                <div className="text-[0.65rem] text-white/35 font-medium uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
          }}
        />
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        ref={rightPanelRef}
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ background: "#05070f" }}
      >
        {/* Animated aurora blobs */}
        <motion.div
          className="absolute rounded-full blur-[120px] opacity-20 pointer-events-none 
           w-[30vw] h-[30vw] max-w-[500px] max-h-[500px]"
          style={{
            background:
              "radial-gradient(circle, #6366f1 0%, #a855f7 50%, transparent 80%)",
            top: "-15%",
            right: "-10%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full blur-[100px] opacity-15 pointer-events-none 
           w-[25vw] h-[25vw] max-w-[400px] max-h-[400px]"
          style={{
            background:
              "radial-gradient(circle, #38bdf8 0%, #6366f1 60%, transparent 80%)",
            bottom: "-10%",
            right: "10%",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
        <motion.div
          className="absolute rounded-full blur-[80px] opacity-10 pointer-events-none 
           w-[20vw] h-[20vw] max-w-[300px] max-h-[300px]"
          style={{
            background:
              "radial-gradient(circle, #e879f9 0%, #a855f7 60%, transparent 80%)",
            top: "40%",
            right: "5%",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 15, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />

        {/* Orbiting rings */}
        {ORBITS.map((orbit, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: orbit.size,
              height: orbit.size,
              border: `1px solid ${orbit.color}`,
              top: "50%",
              right: "-8%",
              transform: "translateY(-50%)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: orbit.duration,
              repeat: Infinity,
              ease: "linear",
              delay: orbit.delay,
            }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 6,
                height: 6,
                background: orbit.color.replace("0.0", "0.6"),
                top: "50%",
                left: 0,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 10px ${orbit.color.replace("0.0", "0.8")}`,
              }}
            />
          </motion.div>
        ))}

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: `rgba(${p.id % 3 === 0 ? "99,102,241" : p.id % 3 === 1 ? "168,85,247" : "56,189,248"},${p.opacity})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(99,102,241,0.3)`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(p.id) * 20, 0],
              opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* Mouse-follow glow */}
        <div
          className="absolute pointer-events-none rounded-full blur-[80px] opacity-10 transition-all duration-700"
          style={{
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.8), transparent 70%)",
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Hex grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-2l26-15V18L28 3 2 18v31L28 64z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: "56px 100px",
          }}
        />

        {/* Diagonal scan line */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(transparent 0%, rgba(99,102,241,0.015) 50%, transparent 100%)",
            backgroundSize: "100% 8px",
          }}
          animate={{ backgroundPositionY: ["0px", "8px"] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        />

        {/* Separator */}
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(99,102,241,0.25), transparent)",
          }}
        />

        {/* Login card */}
        <motion.div
          className="relative z-10 w-full max-w-sm px-6 lg:ml-[5vw]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex lg:hidden flex-col items-center mb-8"
          >
            <SchoolCrest />
            <h1 className="mt-4 text-xl font-bold text-white/90">
              {SCHOOL_NAME}
            </h1>
          </motion.div>

          {/* Glassmorphic card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(48px)",
              WebkitBackdropFilter: "blur(48px)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
          >
            {/* Card inner top shimmer */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />

            {/* Card glow accent */}
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(99,102,241,0.08)" }}
            />

            <div className="mb-7 relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, #6366f1, #a855f7)",
                  }}
                />
                <h2 className="text-xl font-bold text-white/95">Sign in</h2>
              </div>
              <p className="text-sm text-white/30 pl-3">
                Access your student portal
              </p>
            </div>

            <AnimatePresence>
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="mb-5 rounded-xl px-4 py-3 flex items-center gap-2.5 relative z-10"
                  style={{
                    background: "rgba(239,68,68,0.06)",
                    border: "1px solid rgba(239,68,68,0.18)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-300/90">
                    {errors.general}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 relative z-10" onKeyDown={handleKeyDown}>
              <Input
                label="Username"
                icon={User}
                value={form.username}
                onChange={(e) => {
                  setForm((f) => ({ ...f, username: e.target.value }));
                  if (errors.username)
                    setErrors((e) => ({ ...e, username: undefined }));
                }}
                error={errors.username}
                hasError={shakeFields.username || !!errors.username}
                autoComplete="username"
              />
              <Input
                label="Password"
                icon={Lock}
                isPassword
                value={form.password}
                onChange={(e) => {
                  setForm((f) => ({ ...f, password: e.target.value }));
                  if (errors.password)
                    setErrors((e) => ({ ...e, password: undefined }));
                }}
                error={errors.password}
                hasError={shakeFields.password || !!errors.password}
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.rememberMe}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, rememberMe: e.target.checked }))
                      }
                      className="sr-only"
                    />
                    <motion.div
                      className="w-4 h-4 rounded flex items-center justify-center"
                      style={{
                        background: form.rememberMe
                          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                          : "rgba(255,255,255,0.04)",
                        border: form.rememberMe
                          ? "1px solid rgba(99,102,241,0.6)"
                          : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: form.rememberMe
                          ? "0 0 12px rgba(99,102,241,0.3)"
                          : "none",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {form.rememberMe && (
                        <motion.svg
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                        >
                          <path
                            d="M1.5 4.5L3.5 6.5L7.5 2.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      )}
                    </motion.div>
                  </div>
                  <span className="text-xs text-white/35 group-hover:text-white/55 transition-colors select-none">
                    Remember me
                  </span>
                </label>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs text-indigo-400/70 hover:text-indigo-300 transition-colors focus:outline-none font-medium"
                  type="button"
                >
                  Forgot password?
                </motion.button>
              </div>

              <div className="pt-2">
                <Button fullWidth isLoading={isLoading} onClick={handleSubmit}>
                  <span>Sign In</span>
                  {!isLoading && (
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight size={15} strokeWidth={2.5} />
                    </motion.div>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 my-5 relative z-10">
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
              <span className="text-[0.65rem] text-white/18 font-medium uppercase tracking-wider">
                or
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "rgba(255,255,255,0.05)" }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01, borderColor: "rgba(99,102,241,0.3)" }}
              whileTap={{ scale: 0.99 }}
              className="relative z-10 w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm text-white/40 hover:text-white/65 transition-all duration-200 focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-medium">Continue with Google SSO</span>
            </motion.button>

            {/* Bottom card shimmer */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,102,241,0.1), transparent)",
              }}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-center text-xs text-white/15 mt-6"
          >
            Having trouble?{" "}
            <button className="text-indigo-400/50 hover:text-indigo-300/70 transition-colors underline underline-offset-2 focus:outline-none">
              Contact IT Support
            </button>
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-center text-[0.65rem] text-white/10 mt-2"
          >
            © 2024 Shri Radha Bihari Public School. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
