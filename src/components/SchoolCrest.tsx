import { motion } from "framer-motion";

function SchoolCrest() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className="flex items-center justify-center"
    >
      <div className="relative">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
          }}
        />

        {/* Crest container */}
        <div
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)",
            border: "1px solid rgba(99,102,241,0.4)",
            boxShadow:
              "0 8px 32px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <img
            src="/logo.jpg"
            alt="School Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SchoolCrest;
