import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

function Button({
  children,
  isLoading = false,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  if (variant === "ghost") {
    return (
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={`
          text-sm text-white/50 hover:text-white/80 transition-colors duration-200
          focus:outline-none font-medium
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.015, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.975, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-transparent
        disabled:cursor-not-allowed disabled:opacity-60
        transition-all duration-300
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      style={{
        background: isDisabled
          ? "linear-gradient(135deg, #4338ca, #6d28d9)"
          : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
        boxShadow: isDisabled
          ? "none"
          : "0 8px 24px -4px rgba(99,102,241,0.4), 0 0 0 1px rgba(139,92,246,0.2)",
      }}
    >
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={16} strokeWidth={2.5} />
            </motion.div>
            <span>Signing in...</span>
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
}

export default Button;
