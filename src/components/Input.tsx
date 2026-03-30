import { forwardRef, useState, InputHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  isPassword?: boolean;
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon: Icon,
      error,
      isPassword = false,
      hasError = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : props.type || "text";

    return (
      <motion.div
        className="w-full"
        animate={hasError ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="relative group">
          {/* Icon */}
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${
              isFocused ? "text-indigo-400" : "text-white/30"
            }`}
          >
            <Icon size={16} strokeWidth={2} />
          </div>

          {/* Input */}
          <input
            ref={ref}
            {...props}
            type={inputType}
            placeholder={label}
            className={`
              w-full pl-10 pr-${isPassword ? "12" : "4"} pt-6 pb-2
              bg-white/[0.04] rounded-xl text-sm text-white
              border transition-all duration-300 ease-out
              placeholder-transparent focus:outline-none
              ${
                hasError
                  ? "border-red-500/60 focus:border-red-500/80 bg-red-500/5"
                  : isFocused
                    ? "border-indigo-500/60 bg-white/[0.07]"
                    : "border-white/[0.08] hover:border-white/[0.14]"
              }
              ${className}
            `}
            style={{
              boxShadow:
                isFocused && !hasError
                  ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 3px rgba(99,102,241,0.12), 0 1px 3px rgba(0,0,0,0.2)"
                  : hasError
                    ? "inset 0 1px 0 rgba(255,255,255,0.03), 0 0 0 3px rgba(239,68,68,0.1)"
                    : "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
          />

          {/* Floating Label */}
          <label
            className={`
              absolute left-10 pointer-events-none transition-all duration-300 ease-out font-medium
              ${
                isFocused || (props.value && String(props.value).length > 0)
                  ? `top-[0.55rem] text-[0.68rem] ${hasError ? "text-red-400" : "text-indigo-400"}`
                  : "top-1/2 -translate-y-1/2 text-sm text-white/35"
              }
            `}
          >
            {label}
          </label>

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors duration-200 focus:outline-none z-10"
              tabIndex={-1}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={showPassword ? "hide" : "show"}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={2} />
                  ) : (
                    <Eye size={16} strokeWidth={2} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          )}

          {/* Focus glow line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isFocused && !hasError ? 1 : 0,
              opacity: isFocused && !hasError ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%", transformOrigin: "center" }}
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 mt-1.5 px-1"
            >
              <AlertCircle size={11} className="text-red-400 flex-shrink-0" />
              <span className="text-[0.7rem] text-red-400 font-medium">
                {error}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);

Input.displayName = "Input";

export default Input;
