import { motion } from "framer-motion";

interface FloatingShapeProps {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  color: string;
  borderColor: string;
  shape: "circle" | "square" | "triangle";
}

function FloatingShape({
  size,
  top,
  left,
  delay,
  duration,
  color,
  borderColor,
  shape,
}: FloatingShapeProps) {
  const variants = {
    animate: {
      y: [0, -20, -10, 0],
      rotate: shape === "square" ? [0, 5, -3, 0] : [0, 3, -2, 0],
      scale: [1, 1.05, 0.98, 1],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    position: "absolute",
    top,
    left,
    backgroundColor: color,
    border: `1px solid ${borderColor}`,
    backdropFilter: "blur(8px)",
  };

  if (shape === "circle") {
    return (
      <motion.div
        variants={variants}
        animate="animate"
        style={{ ...baseStyle, borderRadius: "50%" }}
      />
    );
  }

  if (shape === "square") {
    return (
      <motion.div
        variants={variants}
        animate="animate"
        style={{ ...baseStyle, borderRadius: "20%" }}
      />
    );
  }

  if (shape === "triangle") {
    return (
      <motion.div
        variants={variants}
        animate="animate"
        style={{
          width: 0,
          height: 0,
          position: "absolute",
          top,
          left,
          backgroundColor: "transparent",
          border: "none",
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid ${color}`,
          filter: `drop-shadow(0 0 8px ${borderColor})`,
        }}
      />
    );
  }

  return null;
}

export default FloatingShape;
