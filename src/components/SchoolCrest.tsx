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
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)",
            border: "1px solid rgba(99,102,241,0.4)",
            boxShadow:
              "0 8px 32px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* SVG Crest */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Shield shape */}
            <path
              d="M22 4L6 10V22C6 31.5 13 39.5 22 42C31 39.5 38 31.5 38 22V10L22 4Z"
              fill="url(#crestGrad)"
              stroke="rgba(165,180,252,0.5)"
              strokeWidth="1"
            />
            {/* M letter */}
            <path
              d="M13 28V16L18 24L22 19L26 24L31 16V28"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Stars */}
            <circle cx="22" cy="13" r="1.5" fill="rgba(253,224,71,0.9)" />
            <circle cx="17" cy="31" r="1" fill="rgba(253,224,71,0.7)" />
            <circle cx="27" cy="31" r="1" fill="rgba(253,224,71,0.7)" />

            <defs>
              <linearGradient
                id="crestGrad"
                x1="6"
                y1="4"
                x2="38"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="rgba(99,102,241,0.5)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0.4)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default SchoolCrest;
