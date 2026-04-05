import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, SlidersHorizontal } from "lucide-react";

export interface ColumnDef {
  key: string;
  label: string;
  defaultVisible: boolean;
}

export const ALL_COLUMNS: ColumnDef[] = [
  { key: "index", label: "#", defaultVisible: true },
  { key: "admNo", label: "Adm. No.", defaultVisible: true },
  { key: "rollNo", label: "Roll No.", defaultVisible: true },
  { key: "name", label: "Name", defaultVisible: true },
  { key: "class", label: "Class", defaultVisible: true },
  { key: "section", label: "Section", defaultVisible: true },
  { key: "gender", label: "Gender", defaultVisible: true },
  { key: "penNo", label: "PEN No.", defaultVisible: true },
  { key: "dob", label: "DOB", defaultVisible: false },
  { key: "fatherName", label: "Father Name", defaultVisible: false },
  { key: "motherName", label: "Mother Name", defaultVisible: false },
  { key: "status", label: "Status", defaultVisible: false },
  { key: "view", label: "View", defaultVisible: true },
];

interface Props {
  open: boolean;
  onClose: () => void;
  visibleKeys: Set<string>;
  onChange: (keys: Set<string>) => void;
  isDark: boolean;
}

export default function ColumnCustomizer({
  open,
  onClose,
  visibleKeys,
  onChange,
  isDark,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const toggle = (key: string) => {
    const next = new Set(visibleKeys);
    next.has(key) ? next.delete(key) : next.add(key);
    onChange(next);
  };

  const reset = () => {
    onChange(
      new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key)),
    );
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onClose}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all hover:scale-105 active:scale-95 ${
          open
            ? isDark
              ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-400"
              : "bg-indigo-50 border-indigo-300 text-indigo-700"
            : isDark
              ? "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
              : "bg-white border-gray-300 text-gray-600 hover:border-violet-400 shadow-sm"
        }`}
      >
        <SlidersHorizontal size={13} />
        Customize Columns
        <span
          className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            isDark
              ? "bg-indigo-900/50 text-indigo-400"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          {visibleKeys.size}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute right-0 top-full mt-2 z-50 w-64 rounded-2xl shadow-2xl border overflow-hidden ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200 shadow-xl shadow-gray-200/60"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark ? "border-gray-800" : "border-gray-100"
              }`}
            >
              <div>
                <p
                  className={`text-xs font-bold ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  Customize Columns
                </p>
                <p
                  className={`text-[10px] mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  Toggle column visibility
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={reset}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition-colors ${
                    isDark
                      ? "text-indigo-400 hover:bg-indigo-900/30"
                      : "text-violet-600 hover:bg-violet-50"
                  }`}
                >
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    isDark
                      ? "text-gray-500 hover:bg-gray-800 hover:text-white"
                      : "text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Default columns section */}
            <div className="px-3 pt-3 pb-1">
              <p
                className={`text-[10px] font-bold uppercase tracking-wider px-1 mb-1.5 ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                Default
              </p>
              <div className="space-y-0.5">
                {ALL_COLUMNS.filter((c) => c.defaultVisible).map((col) => {
                  const checked = visibleKeys.has(col.key);
                  return (
                    <button
                      key={col.key}
                      onClick={() => toggle(col.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-violet-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                          checked
                            ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                            : isDark
                              ? "bg-gray-800 border border-gray-700"
                              : "bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {checked && (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="flex-1 text-left">{col.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra columns section */}
            <div className="px-3 pt-1 pb-3">
              <p
                className={`text-[10px] font-bold uppercase tracking-wider px-1 mb-1.5 mt-2 ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                Additional
              </p>
              <div className="space-y-0.5">
                {ALL_COLUMNS.filter((c) => !c.defaultVisible).map((col) => {
                  const checked = visibleKeys.has(col.key);
                  return (
                    <button
                      key={col.key}
                      onClick={() => toggle(col.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-violet-50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                          checked
                            ? "bg-gradient-to-br from-indigo-500 to-violet-600"
                            : isDark
                              ? "bg-gray-800 border border-gray-700"
                              : "bg-gray-100 border border-gray-300"
                        }`}
                      >
                        {checked && (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="flex-1 text-left">{col.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
