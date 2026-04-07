import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  MapPin,
  DollarSign,
  ChevronDown,
  CheckCircle,
  Plus,
  Trash2,
  Camera,
  Download,
  Printer,
  X,
  Send,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ─── Reusable Primitives ─────────────────────────────────────────────────────

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  const { isDark } = useTheme();
  return (
    <label
      className={`block text-[10.5px] font-bold mb-1.5 tracking-widest uppercase
      ${isDark ? "text-gray-400" : "text-gray-900"}`}
    >
      {children}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      {children}
    </div>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  const { isDark } = useTheme();
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-4 rounded-lg text-xs border outline-none transition-all duration-200
        ${
          isDark
            ? "bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 focus:bg-gray-800"
            : "bg-white border-gray-400 text-slate-800 placeholder-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 focus:bg-violet-50/30 shadow-sm hover:border-violet-300"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    />
  );
}

function SelectInput({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const { isDark } = useTheme();
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-4 rounded-lg text-xs border outline-none transition-all duration-200 appearance-none pr-7
          ${
            isDark
              ? "bg-gray-800/80 border-gray-600 text-white focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              : "bg-white border-gray-400 text-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 focus:bg-violet-50/30 shadow-sm hover:border-violet-300"
          }
          ${!value ? (isDark ? "text-gray-500" : "text-slate-400") : ""}
          ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none
        ${isDark ? "text-gray-500" : "text-violet-400"}`}
      />
    </div>
  );
}

function PhotoUpload({
  label,
  value,
  onChange,
  size = "md",
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  size?: "md" | "lg";
}) {
  const { isDark } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  const dim = size === "lg" ? "w-28 h-32" : "w-24 h-28";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative ${dim} rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden group
          ${
            isDark
              ? "border-gray-600 hover:border-violet-400 bg-gray-800"
              : "border-violet-300 hover:border-violet-500 bg-gradient-to-br from-violet-50 to-fuchsia-50"
          }`}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={18} className="text-white" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <Trash2 size={9} className="text-white" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1.5 p-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${isDark ? "bg-gray-700" : "bg-gradient-to-br from-violet-100 to-fuchsia-100"}`}
            >
              <Camera
                size={18}
                className={isDark ? "text-gray-400" : "text-violet-500"}
              />
            </div>
            <span
              className={`text-[9px] font-semibold text-center leading-tight
              ${isDark ? "text-gray-500" : "text-violet-400"}`}
            >
              Click to Upload
            </span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      <span
        className={`text-[9.5px] font-bold text-center uppercase tracking-wide
        ${isDark ? "text-gray-500" : "text-violet-500"}`}
      >
        {label}
      </span>
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <label
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 cursor-pointer transition-all text-xs font-semibold
            ${
              value === opt
                ? "border-violet-500 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-600"
                : isDark
                  ? "border-gray-700 text-gray-400 hover:border-gray-600"
                  : "border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50/50"
            }`}
        >
          <div
            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center
            ${value === opt ? "border-violet-500" : isDark ? "border-gray-600" : "border-slate-400"}`}
          >
            {value === opt && (
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            )}
          </div>
          {opt}
        </label>
      ))}
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const { isDark } = useTheme();
  return (
    <label
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all
        ${checked ? "border-violet-500" : isDark ? "border-gray-600" : "border-slate-300"}`}
        style={
          checked
            ? { background: "linear-gradient(135deg, #7c3aed, #db2777)" }
            : {}
        }
      >
        {checked && (
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M1.5 4.5L3.5 6.5L7.5 2.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span
        className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}
      >
        {label}
      </span>
    </label>
  );
}

function Section({
  title,
  icon: Icon,
  color,
  badge,
  children,
  gradientFrom,
  gradientTo,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all
      ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border shadow-sm"}`}
      style={
        !isDark && gradientFrom
          ? {
              borderColor: `${gradientFrom}25`,
              boxShadow: `0 2px 20px ${gradientFrom}12`,
            }
          : {}
      }
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors
          ${isDark ? "hover:bg-gray-800/40" : ""}`}
        style={
          !isDark && gradientFrom
            ? {
                background: `linear-gradient(135deg, ${gradientFrom}10, ${gradientTo ?? gradientFrom}06)`,
              }
            : {}
        }
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={
            !isDark && gradientFrom
              ? {
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo ?? gradientFrom})`,
                  boxShadow: `0 4px 12px ${gradientFrom}40`,
                }
              : {
                  background: `linear-gradient(135deg, ${color}22, ${color}44)`,
                  border: `1.5px solid ${color}40`,
                }
          }
        >
          <Icon
            size={15}
            className={!isDark && gradientFrom ? "text-white" : ""}
            style={isDark || !gradientFrom ? { color } : {}}
          />
        </div>
        <span
          className="font-bold text-sm flex-1"
          style={{ color: isDark ? "#f1f5f9" : color }}
        >
          {title}
        </span>
        {badge && (
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={
              !isDark && gradientFrom
                ? {
                    background: `${gradientFrom}18`,
                    color: gradientFrom,
                    border: `1px solid ${gradientFrom}25`,
                  }
                : { background: `${color}18`, color }
            }
          >
            {badge}
          </span>
        )}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown
            size={16}
            className={isDark ? "text-gray-500" : "text-slate-400"}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-4 border-t"
              style={
                !isDark && gradientFrom
                  ? {
                      borderColor: `${gradientFrom}15`,
                      background: `linear-gradient(180deg, ${gradientFrom}05 0%, transparent 70px)`,
                    }
                  : { borderColor: isDark ? "#1f2937" : "#f1f5f9" }
              }
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
);
const G3 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {children}
  </div>
);
const G4 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{children}</div>
);

function SubHeading({
  label,
  color,
  gradientFrom,
  gradientTo,
}: {
  label: string;
  color: string;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  const { isDark } = useTheme();
  return (
    <div
      className="flex items-center gap-2 mb-3 pb-2 border-b"
      style={{ borderColor: isDark ? "#374151" : `${color}20` }}
    >
      <div
        className="w-1.5 h-4 rounded-full"
        style={{
          background: gradientFrom
            ? `linear-gradient(180deg, ${gradientFrom}, ${gradientTo ?? gradientFrom})`
            : `linear-gradient(180deg, ${color}, ${color}80)`,
        }}
      />
      <p
        className="text-[10.5px] font-black uppercase tracking-widest"
        style={{ color }}
      >
        {label}
      </p>
    </div>
  );
}

function Divider() {
  const { isDark } = useTheme();
  return (
    <div
      className="h-px my-2"
      style={{
        background: isDark
          ? "#1f2937"
          : "linear-gradient(90deg, transparent, #e9d5ff 20%, #e9d5ff 80%, transparent)",
      }}
    />
  );
}

function SiblingModal({
  isOpen,
  onClose,
  onAdd,
  classOptions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sibling: { name: string; cls: string; section: string }) => void;
  classOptions: string[];
}) {
  const { isDark } = useTheme();
  const [name, setName] = useState("");
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");
  const [errors, setErrors] = useState<{ name?: string; cls?: string }>({});

  const handleAdd = () => {
    const newErrors: { name?: string; cls?: string } = {};
    if (!name.trim()) newErrors.name = "Sibling name is required";
    if (!cls) newErrors.cls = "Class is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onAdd({ name: name.trim(), cls, section });
    setName("");
    setCls("");
    setSection("");
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setName("");
    setCls("");
    setSection("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl
          ${isDark ? "bg-gray-900 border border-gray-700" : "bg-white border border-violet-100"}`}
        style={
          !isDark ? { boxShadow: "0 20px 60px rgba(124,58,237,0.18)" } : {}
        }
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={
            !isDark
              ? { background: "linear-gradient(135deg, #7c3aed10, #db287706)" }
              : { borderBottom: "1px solid #1f2937" }
          }
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2877)",
                boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
              }}
            >
              <Users size={15} className="text-white" />
            </div>
            <span
              className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-800"}`}
            >
              Add Sibling
            </span>
          </div>
          <button
            onClick={handleClose}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
              ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-violet-50 text-slate-400"}`}
          >
            <X size={15} />
          </button>
        </div>
        <div
          className="px-5 pt-4 pb-5 space-y-3"
          style={
            !isDark
              ? {
                  borderTop: "1px solid rgba(124,58,237,0.1)",
                  background:
                    "linear-gradient(180deg, rgba(124,58,237,0.03) 0%, transparent 60px)",
                }
              : {}
          }
        >
          <div>
            <Label required>Class</Label>
            <SelectInput
              value={cls}
              onChange={(v) => {
                setCls(v);
                if (errors.cls) setErrors((e) => ({ ...e, cls: undefined }));
              }}
              placeholder="Select Class"
              options={classOptions}
            />
            {errors.cls && (
              <p className="text-rose-500 text-[10px] mt-1 font-semibold">
                {errors.cls}
              </p>
            )}
          </div>
          <div>
            <Label>Section</Label>
            <SelectInput
              value={section}
              onChange={setSection}
              placeholder="Select Section"
              options={["A", "B", "C", "D", "E"]}
            />
          </div>
          <div>
            <Label required>Name</Label>
            <TextInput
              value={name}
              onChange={(v) => {
                setName(v);
                if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
              }}
              placeholder="Sibling's Full Name"
            />
            {errors.name && (
              <p className="text-rose-500 text-[10px] mt-1 font-semibold">
                {errors.name}
              </p>
            )}
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleClose}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all
                ${isDark ? "border-gray-700 text-gray-400 hover:bg-gray-800" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2877)",
                boxShadow: "0 6px 16px rgba(124,58,237,0.3)",
              }}
            >
              Add Sibling
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function buildPrintStyles() {
  return `<style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 10px; color: #111; background: #fff; padding: 10mm 12mm; }
    .school-header { display: flex; align-items: center; justify-content: center; gap: 16px; padding-bottom: 10px; border-bottom: 2px solid #7c3aed; margin-bottom: 8px; }
    .school-logo { width: 60px; height: 60px; border-radius: 50%; border: 2px solid #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 900; color: #7c3aed; background: linear-gradient(135deg, #f5f0ff, #fdf4ff); flex-shrink: 0; }
    .school-info { text-align: center; }
    .school-name { font-size: 18px; font-weight: 900; color: #7c3aed; letter-spacing: 0.03em; text-transform: uppercase; }
    .school-sub { font-size: 9.5px; color: #555; margin-top: 2px; }
    .school-contact { font-size: 8.5px; color: #888; margin-top: 2px; }
    .form-title-bar { background: linear-gradient(135deg, #7c3aed, #db2877); color: #fff; text-align: center; padding: 5px 0; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; border-radius: 4px; margin-bottom: 10px; }
    .photo-box { width: 90px; height: 105px; border: 1.5px solid #7c3aed; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 4px; background: linear-gradient(135deg, #faf5ff, #fdf4ff); flex-shrink: 0; overflow: hidden; }
    .photo-icon { font-size: 22px; color: #c4b5fd; }
    .photo-box-label { font-size: 7.5px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 0.05em; text-align: center; line-height: 1.3; }
    .section-heading { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em; color: #fff; background: linear-gradient(90deg, #7c3aed, #a855f7); padding: 3.5px 10px; border-radius: 3px; margin: 10px 0 6px 0; display: flex; align-items: center; gap: 6px; }
    .section-heading span { font-size: 9px; opacity: 0.85; }
    .sub-heading { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #7c3aed; border-left: 3px solid #7c3aed; padding-left: 6px; margin: 8px 0 5px 0; }
    .field-label { font-size: 7.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #666; margin-bottom: 1.5px; }
    .field-label .req { color: #e11d48; }
    .field-line { border-bottom: 1px solid #bbb; height: 18px; width: 100%; }
    .field-value { border-bottom: 1px solid #999; height: 18px; width: 100%; font-size: 10.5px; color: #111; font-weight: 600; padding-bottom: 2px; display: flex; align-items: flex-end; }
    .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; margin-bottom: 6px; }
    .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px 12px; margin-bottom: 6px; }
    .g4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px 12px; margin-bottom: 6px; }
    .top-row { display: flex; gap: 12px; align-items: flex-start; }
    .top-row .fields { flex: 1; min-width: 0; }
    .sibling-table { width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 4px; }
    .sibling-table th { background: linear-gradient(90deg, #ede9fe, #fce7f3); color: #7c3aed; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 6px; border: 1px solid #ddd6fe; text-align: left; font-size: 7.5px; }
    .sibling-table td { border: 1px solid #e5e7eb; padding: 14px 6px 4px; vertical-align: bottom; }
    .sibling-table td.filled { padding: 4px 6px; vertical-align: middle; font-weight: 600; }
    .page-break { page-break-before: always; }
    .divider { border: none; border-top: 0.5px solid #e9d5ff; margin: 8px 0; }
    .declaration-box { border: 1px solid #ddd6fe; border-radius: 5px; padding: 8px 10px; background: linear-gradient(135deg, #faf5ff, #fdf4ff); font-size: 8.5px; color: #444; line-height: 1.6; margin-top: 10px; }
    .declaration-box strong { color: #7c3aed; }
    .signature-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 16px; }
    .sig-block { text-align: center; }
    .sig-line { border-bottom: 1px solid #666; height: 36px; margin-bottom: 4px; }
    .sig-label { font-size: 8px; font-weight: 700; color: #666; text-transform: uppercase; letter-spacing: 0.05em; }
    .office-box { border: 1.5px dashed #7c3aed; border-radius: 5px; padding: 6px 10px 8px; margin-top: 10px; }
    .office-title { font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.08em; color: #7c3aed; margin-bottom: 6px; border-bottom: 0.5px solid #ddd6fe; padding-bottom: 3px; }
    .form-footer { text-align: center; font-size: 7.5px; color: #aaa; margin-top: 12px; padding-top: 6px; border-top: 0.5px solid #eee; }
    @page { margin: 10mm; size: A4; }
  </style>`;
}

function buildSchoolHeader() {
  return `<div class="school-header">
    <div class="school-logo">S</div>
    <div class="school-info">
      <div class="school-name">Your School Name</div>
      <div class="school-sub">Affiliated to CBSE / ICSE &nbsp;|&nbsp; Estd. 2001 &nbsp;|&nbsp; NAAC Accredited</div>
      <div class="school-contact">School Address, City, State - PIN &nbsp;|&nbsp; +91 XXXXX XXXXX &nbsp;|&nbsp; info@school.edu.in</div>
    </div>
  </div>
  <div class="form-title-bar">Student Admission Form &mdash; Academic Year _________</div>`;
}

function buildFooterBlocks() {
  return `<div class="declaration-box">
    <strong>Declaration:</strong> I / We hereby declare that the information provided in this form is true and correct to the best of my / our knowledge and belief. I / We agree to abide by the rules and regulations of the school and undertake to pay all fees and dues as and when demanded. I / We understand that providing false or misleading information may lead to cancellation of admission without prior notice.
  </div>
  <div class="signature-row">
    <div class="sig-block"><div class="sig-line"></div><div class="sig-label">Signature of Father / Guardian</div></div>
    <div class="sig-block"><div class="sig-line"></div><div class="sig-label">Signature of Mother</div></div>
    <div class="sig-block"><div class="sig-line"></div><div class="sig-label">Date</div></div>
  </div>
  <div class="office-box">
    <div class="office-title">For Office Use Only &mdash; Do Not Fill</div>
    <div class="g4">
      <div><div class="field-label">Admission Approved By</div><div class="field-line"></div></div>
      <div><div class="field-label">Approval Date</div><div class="field-line"></div></div>
      <div><div class="field-label">Student ID Assigned</div><div class="field-line"></div></div>
      <div><div class="field-label">Fee Receipt No.</div><div class="field-line"></div></div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:4px;">
      <div style="flex:1;"><div class="field-label">Remarks</div><div class="field-line"></div><div class="field-line" style="margin-top:6px;"></div></div>
      <div style="text-align:center;padding-left:20px;flex-shrink:0;">
        <div style="border-bottom:1px solid #aaa;height:40px;width:130px;margin-bottom:4px;"></div>
        <div style="font-size:8px;font-weight:700;color:#7c3aed;text-transform:uppercase;letter-spacing:0.05em;">Principal Signature &amp; Stamp</div>
      </div>
    </div>
  </div>
  <div class="form-footer">This is an official admission form. Please fill in BLOCK LETTERS using a blue or black pen only. &nbsp;|&nbsp; Form issued by: School Administration &nbsp;|&nbsp; www.school.edu.in</div>`;
}

export default function StudentAdmissionForm() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [siblingModalOpen, setSiblingModalOpen] = useState(false);

  const [admissionNo, setAdmissionNo] = useState("");
  const [cls, setCls] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [biometricId, setBiometricId] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [category, setCategory] = useState("");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [house, setHouse] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [admittedClass, setAdmittedClass] = useState("");
  const [asOnDate, setAsOnDate] = useState("");
  const [referralBy, setReferralBy] = useState("");
  const [siblings, setSiblings] = useState<
    { name: string; cls: string; section: string }[]
  >([]);
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);
  const [penNumber, setPenNumber] = useState("");
  const [apaarId, setApaarId] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherMobile, setFatherMobile] = useState("");
  const [fatherDob, setFatherDob] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [fatherPhoto, setFatherPhoto] = useState<string | null>(null);
  const [marriageAnniversary, setMarriageAnniversary] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherMobile, setMotherMobile] = useState("");
  const [motherDob, setMotherDob] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [motherPhoto, setMotherPhoto] = useState<string | null>(null);
  const [guardianType, setGuardianType] = useState("Father");
  const [guardianName, setGuardianName] = useState("");
  const [guardianRelation, setGuardianRelation] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  const [guardianAddress1, setGuardianAddress1] = useState("");
  const [guardianAddress2, setGuardianAddress2] = useState("");
  const [guardianIsCurrent, setGuardianIsCurrent] = useState(false);
  const [permanentIsCurrent, setPermanentIsCurrent] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pin: "",
  });
  const [permanentAddress, setPermanentAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pin: "",
  });
  const [feeGroup, setFeeGroup] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountList, setDiscountList] = useState("");
  const [feeMonth, setFeeMonth] = useState("");

  const addSibling = (sibling: {
    name: string;
    cls: string;
    section: string;
  }) => {
    setSiblings([...siblings, sibling]);
  };
  const removeSibling = (i: number) =>
    setSiblings(siblings.filter((_, idx) => idx !== i));

  const curAddr = {
    line1: guardianIsCurrent ? guardianAddress1 : currentAddress.line1,
    line2: guardianIsCurrent ? guardianAddress2 : currentAddress.line2,
    city: currentAddress.city,
    state: currentAddress.state,
    pin: currentAddress.pin,
  };
  const perAddr = {
    line1: permanentIsCurrent ? curAddr.line1 : permanentAddress.line1,
    line2: permanentIsCurrent ? curAddr.line2 : permanentAddress.line2,
    city: permanentIsCurrent ? curAddr.city : permanentAddress.city,
    state: permanentIsCurrent ? curAddr.state : permanentAddress.state,
    pin: permanentIsCurrent ? curAddr.pin : permanentAddress.pin,
  };

  const handleDownloadBlankForm = () => {
    const field = (label: string, req?: boolean) => `
      <div>
        <div class="field-label">${label}${req ? ' <span class="req">*</span>' : ""}</div>
        <div class="field-line"></div>
      </div>`;

    const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Blank Student Admission Form</title>${buildPrintStyles()}</head><body>
      ${buildSchoolHeader()}
      <div class="section-heading">1. &nbsp; Student Details <span>( Fill all fields marked * )</span></div>
      <div class="top-row">
        <div class="fields">
          <div class="g4">${field("Admission No.", true)}${field("Class / Grade", true)}${field("Section")}${field("Roll Number")}</div>
          <div class="g4">${field("Biometric ID")}${field("Admission Date", true)}${field("Admitted Class")}${field("As on Date")}</div>
        </div>
        <div class="photo-box"><div class="photo-icon">📷</div><div class="photo-box-label">Affix Recent<br/>Passport<br/>Size Photo</div></div>
      </div>
      <hr class="divider"/>
      <div class="g3">${field("First Name", true)}${field("Last Name", true)}${field("Gender", true)}</div>
      <div class="g4">${field("Date of Birth", true)}${field("Blood Group")}${field("House / Color")}${field("Category (Gen/OBC/SC/ST/EWS)")}</div>
      <div class="g4">${field("Religion")}${field("Caste")}${field("Aadhar Number")}${field("Mobile Number", true)}</div>
      <div class="g4">${field("E-mail ID")}${field("Height (cm)")}${field("Weight (kg)")}${field("Referral By")}</div>
      <div class="sub-heading">Sibling(s) Studying in This School</div>
      <table class="sibling-table">
        <thead><tr><th style="width:32px;">S.No.</th><th>Sibling Full Name</th><th style="width:70px;">Class</th><th style="width:60px;">Section</th><th style="width:90px;">Admission No.</th></tr></thead>
        <tbody><tr><td>1.</td><td></td><td></td><td></td><td></td></tr><tr><td>2.</td><td></td><td></td><td></td><td></td></tr><tr><td>3.</td><td></td><td></td><td></td><td></td></tr></tbody>
      </table>
      <div class="section-heading">2. &nbsp; Custom / Academic Fields</div>
      <div class="g2">${field("PEN Number (Permanent Education Number)")}${field("APAAR ID (Academic Bank of Credits ID)")}</div>
      <div class="section-heading">3. &nbsp; Parents / Guardian Details</div>
      <div class="sub-heading">Father's Information</div>
      <div class="top-row">
        <div class="fields">
          <div class="g3">${field("Father Full Name")}${field("Father Mobile")}${field("Father Date of Birth")}</div>
          <div class="g2">${field("Father Occupation")}${field("Marriage Anniversary Date")}</div>
        </div>
        <div class="photo-box" style="width:70px;height:82px;"><div class="photo-icon" style="font-size:16px;">📷</div><div class="photo-box-label" style="font-size:6.5px;">Father<br/>Photo</div></div>
      </div>
      <hr class="divider"/>
      <div class="sub-heading">Mother's Information</div>
      <div class="top-row">
        <div class="fields">
          <div class="g3">${field("Mother Full Name")}${field("Mother Mobile")}${field("Mother Date of Birth")}</div>
          <div class="g2">${field("Mother Occupation")}</div>
        </div>
        <div class="photo-box" style="width:70px;height:82px;"><div class="photo-icon" style="font-size:16px;">📷</div><div class="photo-box-label" style="font-size:6.5px;">Mother<br/>Photo</div></div>
      </div>
      <hr class="divider"/>
      <div class="sub-heading">Guardian Information</div>
      <div style="margin-bottom:5px;font-size:8.5px;color:#555;">If Guardian is: &nbsp;&nbsp; &#9744; Father &nbsp;&nbsp; &#9744; Mother &nbsp;&nbsp; &#9744; Other (specify below)</div>
      <div class="g3">${field("Guardian Name")}${field("Relation with Student")}${field("Guardian Email")}</div>
      <div class="g2">${field("Guardian Mobile")}${field("Guardian Address Line 1")}</div>
      <div class="g2">${field("Guardian Address Line 2")}</div>
      <div class="page-break"></div>
      <div class="section-heading">4. &nbsp; Student Address Details</div>
      <div class="sub-heading">Current Address</div>
      <div style="margin-bottom:4px;font-size:8.5px;color:#555;">&#9744; Same as Guardian Address</div>
      <div class="g2">${field("Address Line 1")}${field("Address Line 2")}</div>
      <div class="g3">${field("City")}${field("State")}${field("PIN Code")}</div>
      <hr class="divider"/>
      <div class="sub-heading">Permanent Address</div>
      <div style="margin-bottom:4px;font-size:8.5px;color:#555;">&#9744; Same as Current Address</div>
      <div class="g2">${field("Address Line 1")}${field("Address Line 2")}</div>
      <div class="g3">${field("City")}${field("State")}${field("PIN Code")}</div>
      <div class="section-heading">5. &nbsp; Fee Assignment</div>
      <div class="g4">${field("Fee Group")}${field("Assign Discount")}${field("Discount List")}${field("Month")}</div>
      <div class="section-heading">6. &nbsp; Documents Checklist <span>( Tick &#10003; for submitted documents )</span></div>
      <div class="g3" style="margin-bottom:6px;line-height:1.8;">
        <div style="font-size:8.5px;">&#9744; Birth Certificate</div>
        <div style="font-size:8.5px;">&#9744; Aadhar Card (Student)</div>
        <div style="font-size:8.5px;">&#9744; Previous School TC</div>
        <div style="font-size:8.5px;">&#9744; Previous Class Marksheet</div>
        <div style="font-size:8.5px;">&#9744; Caste Certificate</div>
        <div style="font-size:8.5px;">&#9744; Passport Size Photos (4)</div>
        <div style="font-size:8.5px;">&#9744; Address Proof</div>
        <div style="font-size:8.5px;">&#9744; Medical Certificate</div>
        <div style="font-size:8.5px;">&#9744; Income Certificate (EWS/RTE)</div>
      </div>
      ${buildFooterBlocks()}
    </body></html>`;

    const printWindow = window.open("", "_blank", "width=950,height=800");
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handlePrint = () => {
    openFilledForm(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };


  const handleDownloadFilledPDF = () => {
    openFilledForm(true);
  };

  function openFilledForm(isPdf: boolean) {
    const v = (val: string) => val || '<span style="color:#bbb;">—</span>';
    const fv = (val: string) => val || "—";

    const resolvedGuardianName =
      guardianType === "Father"
        ? fatherName
        : guardianType === "Mother"
          ? motherName
          : guardianName;
    const resolvedGuardianRelation =
      guardianType === "Father"
        ? "Father"
        : guardianType === "Mother"
          ? "Mother"
          : guardianRelation;

    const fld = (label: string, val: string, req?: boolean) => `
      <div>
        <div class="field-label">${label}${req ? ' <span class="req">*</span>' : ""}</div>
        <div class="field-value">${v(val)}</div>
      </div>`;

    const siblingsRows =
      siblings.length > 0
        ? siblings
            .map(
              (s, i) =>
                `<tr><td class="filled">${i + 1}.</td><td class="filled">${s.name}</td><td class="filled">${s.cls}</td><td class="filled">${s.section || "—"}</td><td class="filled">—</td></tr>`,
            )
            .join("")
        : `<tr><td>1.</td><td></td><td></td><td></td><td></td></tr><tr><td>2.</td><td></td><td></td><td></td><td></td></tr>`;

    const studentImg = studentPhoto
      ? `<img src="${studentPhoto}" style="width:100%;height:100%;object-fit:cover;" />`
      : `<div class="photo-icon">📷</div><div class="photo-box-label">Affix Recent<br/>Passport<br/>Size Photo</div>`;
    const fatherImg = fatherPhoto
      ? `<img src="${fatherPhoto}" style="width:100%;height:100%;object-fit:cover;" />`
      : `<div class="photo-icon" style="font-size:16px;">📷</div><div class="photo-box-label" style="font-size:6.5px;">Father<br/>Photo</div>`;
    const motherImg = motherPhoto
      ? `<img src="${motherPhoto}" style="width:100%;height:100%;object-fit:cover;" />`
      : `<div class="photo-icon" style="font-size:16px;">📷</div><div class="photo-box-label" style="font-size:6.5px;">Mother<br/>Photo</div>`;

    const printDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
      <title>Student Admission Form${isPdf ? " — Filled" : ""}</title>
      ${buildPrintStyles()}
      <style>
        .print-info { text-align: right; font-size: 8px; color: #888; margin-bottom: 8px; }
        .filled-badge { display: inline-block; background: linear-gradient(135deg,#7c3aed,#db2877); color: #fff; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 4px; margin-left: 8px; }
      </style>
    </head><body>
      ${buildSchoolHeader()}
      ${isPdf ? `<div class="print-info">Printed on: ${printDate} <span class="filled-badge">FILLED COPY</span></div>` : `<div class="print-info">Printed on: ${printDate}</div>`}
      <div class="section-heading">1. &nbsp; Student Details <span>( Fill all fields marked * )</span></div>
      <div class="top-row">
        <div class="fields">
          <div class="g4">
            ${fld("Admission No.", admissionNo, true)}
            ${fld("Class / Grade", cls, true)}
            ${fld("Section", section)}
            ${fld("Roll Number", rollNumber)}
          </div>
          <div class="g4">
            ${fld("Biometric ID", biometricId)}
            ${fld("Admission Date", admissionDate, true)}
            ${fld("Admitted Class", admittedClass)}
            ${fld("As on Date", asOnDate)}
          </div>
        </div>
        <div class="photo-box">${studentImg}</div>
      </div>
      <hr class="divider"/>
      <div class="g3">
        ${fld("First Name", firstName, true)}
        ${fld("Last Name", lastName, true)}
        ${fld("Gender", gender, true)}
      </div>
      <div class="g4">
        ${fld("Date of Birth", dob, true)}
        ${fld("Blood Group", bloodGroup)}
        ${fld("House / Color", house)}
        ${fld("Category", category)}
      </div>
      <div class="g4">
        ${fld("Religion", religion)}
        ${fld("Caste", caste)}
        ${fld("Aadhar Number", aadhar)}
        ${fld("Mobile Number", mobile, true)}
      </div>
      <div class="g4">
        ${fld("E-mail ID", email)}
        ${fld("Height (cm)", height)}
        ${fld("Weight (kg)", weight)}
        ${fld("Referral By", referralBy)}
      </div>
      <div class="sub-heading">Sibling(s) Studying in This School</div>
      <table class="sibling-table">
        <thead><tr><th style="width:32px;">S.No.</th><th>Sibling Full Name</th><th style="width:70px;">Class</th><th style="width:60px;">Section</th><th style="width:90px;">Admission No.</th></tr></thead>
        <tbody>${siblingsRows}</tbody>
      </table>
      <div class="section-heading">2. &nbsp; Custom / Academic Fields</div>
      <div class="g2">
        ${fld("PEN Number", penNumber)}
        ${fld("APAAR ID", apaarId)}
      </div>
      <div class="section-heading">3. &nbsp; Parents / Guardian Details</div>
      <div class="sub-heading">Father's Information</div>
      <div class="top-row">
        <div class="fields">
          <div class="g3">
            ${fld("Father Full Name", fatherName)}
            ${fld("Father Mobile", fatherMobile)}
            ${fld("Father Date of Birth", fatherDob)}
          </div>
          <div class="g2">
            ${fld("Father Occupation", fatherOccupation)}
            ${fld("Marriage Anniversary Date", marriageAnniversary)}
          </div>
        </div>
        <div class="photo-box" style="width:70px;height:82px;">${fatherImg}</div>
      </div>
      <hr class="divider"/>
      <div class="sub-heading">Mother's Information</div>
      <div class="top-row">
        <div class="fields">
          <div class="g3">
            ${fld("Mother Full Name", motherName)}
            ${fld("Mother Mobile", motherMobile)}
            ${fld("Mother Date of Birth", motherDob)}
          </div>
          <div class="g2">${fld("Mother Occupation", motherOccupation)}</div>
        </div>
        <div class="photo-box" style="width:70px;height:82px;">${motherImg}</div>
      </div>
      <hr class="divider"/>
      <div class="sub-heading">Guardian Information</div>
      <div style="margin-bottom:5px;font-size:8.5px;color:#555;">
        Guardian is: <strong style="color:#7c3aed;">${fv(guardianType)}</strong>
      </div>
      <div class="g3">
        ${fld("Guardian Name", resolvedGuardianName)}
        ${fld("Relation with Student", resolvedGuardianRelation)}
        ${fld("Guardian Email", guardianEmail)}
      </div>
      <div class="g2">
        ${fld("Guardian Mobile", guardianMobile)}
        ${fld("Guardian Address Line 1", guardianAddress1)}
      </div>
      <div class="g2">${fld("Guardian Address Line 2", guardianAddress2)}</div>
      <div class="page-break"></div>
      <div class="section-heading">4. &nbsp; Student Address Details</div>
      <div class="sub-heading">Current Address</div>
      <div class="g2">
        ${fld("Address Line 1", curAddr.line1)}
        ${fld("Address Line 2", curAddr.line2)}
      </div>
      <div class="g3">
        ${fld("City", curAddr.city)}
        ${fld("State", curAddr.state)}
        ${fld("PIN Code", curAddr.pin)}
      </div>
      <hr class="divider"/>
      <div class="sub-heading">Permanent Address</div>
      <div class="g2">
        ${fld("Address Line 1", perAddr.line1)}
        ${fld("Address Line 2", perAddr.line2)}
      </div>
      <div class="g3">
        ${fld("City", perAddr.city)}
        ${fld("State", perAddr.state)}
        ${fld("PIN Code", perAddr.pin)}
      </div>
      <div class="section-heading">5. &nbsp; Fee Assignment</div>
      <div class="g4">
        ${fld("Fee Group", feeGroup)}
        ${fld("Assign Discount", discount)}
        ${fld("Discount List", discountList)}
        ${fld("Month", feeMonth)}
      </div>
      <div class="section-heading">6. &nbsp; Documents Checklist <span>( Tick &#10003; for submitted documents )</span></div>
      <div class="g3" style="margin-bottom:6px;line-height:1.8;">
        <div style="font-size:8.5px;">&#9744; Birth Certificate</div>
        <div style="font-size:8.5px;">&#9744; Aadhar Card (Student)</div>
        <div style="font-size:8.5px;">&#9744; Previous School TC</div>
        <div style="font-size:8.5px;">&#9744; Previous Class Marksheet</div>
        <div style="font-size:8.5px;">&#9744; Caste Certificate</div>
        <div style="font-size:8.5px;">&#9744; Passport Size Photos (4)</div>
        <div style="font-size:8.5px;">&#9744; Address Proof</div>
        <div style="font-size:8.5px;">&#9744; Medical Certificate</div>
        <div style="font-size:8.5px;">&#9744; Income Certificate (EWS/RTE)</div>
      </div>
      ${buildFooterBlocks()}
    </body></html>`;

    const printWindow = window.open("", "_blank", "width=950,height=800");
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  }

  // ── Constants ───────────────────────────────────────────────────────────────
  const classOptions = [
    "Nursery",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  const stateOptions = [
    "Bihar",
    "Uttar Pradesh",
    "Delhi",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
    "Madhya Pradesh",
    "West Bengal",
    "Tamil Nadu",
    "Karnataka",
    "Other",
  ];

  // ── Submitted Screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`text-center max-w-sm w-full p-10 rounded-3xl
            ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-violet-100 shadow-2xl"}`}
          style={
            !isDark ? { boxShadow: "0 20px 60px rgba(124,58,237,0.15)" } : {}
          }
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              boxShadow: "0 8px 24px rgba(16,185,129,0.35)",
            }}
          >
            <CheckCircle size={30} className="text-white" />
          </motion.div>

          <h2
            className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Admission Submitted! 🎉
          </h2>
          <p
            className={`text-xs mb-3 leading-relaxed ${isDark ? "text-gray-500" : "text-slate-500"}`}
          >
            Student admission form has been successfully submitted for review by
            the administration.
          </p>

          {/* Ref line */}
          <div
            className={`text-xs font-semibold px-4 py-2 rounded-xl mb-6
              ${isDark ? "bg-gray-800 text-violet-400" : "bg-violet-50 text-violet-700"}`}
          >
            Admission No: {admissionNo || "—"} &nbsp;|&nbsp; {firstName}{" "}
            {lastName}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {/* Download Filled PDF */}
            <button
              onClick={handleDownloadFilledPDF}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2877)",
                boxShadow: "0 8px 20px rgba(124,58,237,0.35)",
              }}
            >
              <Download size={14} />
              Download Filled Form (PDF)
            </button>

            {/* Add Another Student */}
            <button
              onClick={() => setSubmitted(false)}
              className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-xs font-bold border transition-all hover:scale-[1.02]
                ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-violet-200 text-violet-600 hover:bg-violet-50"}`}
            >
              <Plus size={14} />
              Add Another Student
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-full"
      style={!isDark ? { background: "#ffffff" } : { background: "#030712" }}
    >
      {/* Sibling Modal */}
      <AnimatePresence>
        {siblingModalOpen && (
          <SiblingModal
            isOpen={siblingModalOpen}
            onClose={() => setSiblingModalOpen(false)}
            onAdd={addSibling}
            classOptions={classOptions}
          />
        )}
      </AnimatePresence>

      {/* ── Top Action Bar ──────────────────────────────────────────────────── */}
      <div
        className={`sticky top-0 z-40 flex items-center justify-between px-5 py-3 border-b
          ${isDark ? "bg-gray-950/95 border-gray-800" : "bg-white/95 border-violet-100"}`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div>
          <p
            className={`text-xs font-black uppercase tracking-widest ${isDark ? "text-violet-400" : "text-violet-600"}`}
          >
            Student Admission
          </p>
          <p
            className={`text-[10px] font-medium ${isDark ? "text-gray-600" : "text-slate-400"}`}
          >
            Fill all required fields marked with *
          </p>
        </div>
        <button
          onClick={handleDownloadBlankForm}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all hover:scale-[1.02] active:scale-[0.98]
            ${isDark ? "border-violet-500/40 text-violet-400 bg-violet-500/10 hover:bg-violet-500/20" : "border-violet-200 text-violet-600 bg-violet-50 hover:bg-violet-100"}`}
        >
          <Download size={12} />
          Download Blank Form
        </button>
      </div>

      {/* ── FORM BODY ───────────────────────────────────────────────────────── */}
      <div className="px-5 py-4 space-y-3">
        {/* 1.0 Student Details */}
        <Section
          title="1.0 Student Details"
          icon={User}
          color="#7c3aed"
          badge="Required"
          gradientFrom="#7c3aed"
          gradientTo="#db2877"
        >
          <div className="space-y-4">
            <div className="flex gap-5 items-start">
              <div className="flex-1 min-w-0 space-y-3">
                <G4>
                  <Field label="Admission No." required>
                    <TextInput
                      value={admissionNo}
                      onChange={setAdmissionNo}
                      placeholder="ADM2024001"
                    />
                  </Field>
                  <Field label="Class" required>
                    <SelectInput
                      value={cls}
                      onChange={setCls}
                      placeholder="Select Class"
                      options={classOptions}
                    />
                  </Field>
                  <Field label="Section">
                    <SelectInput
                      value={section}
                      onChange={setSection}
                      placeholder="Select Section"
                      options={["A", "B", "C", "D", "E"]}
                    />
                  </Field>
                  <Field label="Roll Number">
                    <TextInput
                      value={rollNumber}
                      onChange={setRollNumber}
                      placeholder="Roll No."
                    />
                  </Field>
                </G4>
                <G4>
                  <Field label="Biometric ID">
                    <TextInput
                      value={biometricId}
                      onChange={setBiometricId}
                      placeholder="Biometric ID"
                    />
                  </Field>
                  <Field label="Admission Date" required>
                    <TextInput
                      type="date"
                      value={admissionDate}
                      onChange={setAdmissionDate}
                    />
                  </Field>
                  <Field label="Admitted Class">
                    <SelectInput
                      value={admittedClass}
                      onChange={setAdmittedClass}
                      placeholder="Select Class"
                      options={classOptions}
                    />
                  </Field>
                  <Field label="As on Date">
                    <TextInput
                      type="date"
                      value={asOnDate}
                      onChange={setAsOnDate}
                    />
                  </Field>
                </G4>
              </div>
              <div className="flex-shrink-0 pt-0.5">
                <PhotoUpload
                  label="Student Photo"
                  value={studentPhoto}
                  onChange={setStudentPhoto}
                  size="lg"
                />
              </div>
            </div>

            <Divider />

            <div className="space-y-3">
              <G3>
                <Field label="First Name" required>
                  <TextInput
                    value={firstName}
                    onChange={setFirstName}
                    placeholder="First Name"
                  />
                </Field>
                <Field label="Last Name" required>
                  <TextInput
                    value={lastName}
                    onChange={setLastName}
                    placeholder="Last Name"
                  />
                </Field>
                <Field label="Gender" required>
                  <SelectInput
                    value={gender}
                    onChange={setGender}
                    placeholder="Select Gender"
                    options={["Male", "Female", "Other"]}
                  />
                </Field>
              </G3>
              <G3>
                <Field label="Date of Birth" required>
                  <TextInput type="date" value={dob} onChange={setDob} />
                </Field>
                <Field label="Blood Group">
                  <SelectInput
                    value={bloodGroup}
                    onChange={setBloodGroup}
                    placeholder="Select"
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                  />
                </Field>
                <Field label="House">
                  <SelectInput
                    value={house}
                    onChange={setHouse}
                    placeholder="Select House"
                    options={[
                      "Red House",
                      "Blue House",
                      "Green House",
                      "Yellow House",
                    ]}
                  />
                </Field>
              </G3>
            </div>

            <G4>
              <Field label="Category">
                <SelectInput
                  value={category}
                  onChange={setCategory}
                  placeholder="Select Category"
                  options={["General", "OBC", "SC", "ST", "EWS"]}
                />
              </Field>
              <Field label="Religion">
                <SelectInput
                  value={religion}
                  onChange={setReligion}
                  placeholder="Select Religion"
                  options={[
                    "Hindu",
                    "Muslim",
                    "Christian",
                    "Sikh",
                    "Jain",
                    "Buddhist",
                    "Other",
                  ]}
                />
              </Field>
              <Field label="Caste">
                <TextInput
                  value={caste}
                  onChange={setCaste}
                  placeholder="Caste"
                />
              </Field>
              <Field label="Aadhar Number">
                <TextInput
                  value={aadhar}
                  onChange={setAadhar}
                  placeholder="XXXX XXXX XXXX"
                />
              </Field>
            </G4>

            <G4>
              <Field label="Mobile Number" required>
                <TextInput
                  type="tel"
                  value={mobile}
                  onChange={setMobile}
                  placeholder="+91 XXXXX XXXXX"
                />
              </Field>
              <Field label="E-mail ID">
                <TextInput
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="student@example.com"
                />
              </Field>
              <Field label="Height (cm)">
                <TextInput
                  value={height}
                  onChange={setHeight}
                  placeholder="cm"
                />
              </Field>
              <Field label="Weight (kg)">
                <TextInput
                  value={weight}
                  onChange={setWeight}
                  placeholder="kg"
                />
              </Field>
            </G4>

            <G2>
              <Field label="Referral By">
                <TextInput
                  value={referralBy}
                  onChange={setReferralBy}
                  placeholder="Referred by whom?"
                />
              </Field>
            </G2>

            {/* Siblings */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Siblings</Label>
                <button
                  onClick={() => setSiblingModalOpen(true)}
                  className="flex items-center gap-1 text-[11px] font-bold text-violet-600 hover:text-violet-700 transition-colors px-2 py-1 rounded-lg hover:bg-violet-50"
                >
                  <Plus size={11} /> Add Sibling
                </button>
              </div>
              {siblings.length === 0 ? (
                <div
                  className={`text-[11px] py-3 px-4 rounded-xl border-2 border-dashed text-center ${isDark ? "text-gray-600 border-gray-700" : "text-violet-400 border-violet-200 bg-violet-50/40"}`}
                >
                  No siblings added yet. Click "Add Sibling" to add.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {siblings.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${isDark ? "bg-gray-800/60 border-gray-700" : "bg-violet-50/60 border-violet-100"}`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #7c3aed, #db2877)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-slate-800"}`}
                        >
                          {s.name}
                        </p>
                        <p
                          className={`text-[10px] font-medium ${isDark ? "text-gray-500" : "text-slate-400"}`}
                        >
                          Class {s.cls}
                          {s.section ? ` · Section ${s.section}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => removeSibling(i)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isDark ? "hover:bg-red-500/20 text-red-400" : "hover:bg-red-50 text-red-400"}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* 2.0 Custom Fields */}
        <Section
          title="2.0 Custom Fields"
          icon={User}
          color="#0ea5e9"
          gradientFrom="#0ea5e9"
          gradientTo="#06b6d4"
        >
          <G2>
            <Field label="PEN Number">
              <TextInput
                value={penNumber}
                onChange={setPenNumber}
                placeholder="Permanent Education Number"
              />
            </Field>
            <Field label="APAAR ID">
              <TextInput
                value={apaarId}
                onChange={setApaarId}
                placeholder="Academic Bank of Credits ID"
              />
            </Field>
          </G2>
        </Section>

        {/* 3.0 Parents / Guardian */}
        <Section
          title="3.0 Parents / Guardian Details"
          icon={Users}
          color="#f59e0b"
          gradientFrom="#f59e0b"
          gradientTo="#f97316"
        >
          <div className="space-y-4">
            <SubHeading
              label="Father's Information"
              color="#7c3aed"
              gradientFrom="#7c3aed"
              gradientTo="#db2877"
            />
            <div className="flex gap-5">
              <div className="flex-1 min-w-0 space-y-3">
                <G3>
                  <Field label="Father Name">
                    <TextInput
                      value={fatherName}
                      onChange={setFatherName}
                      placeholder="Father's Full Name"
                    />
                  </Field>
                  <Field label="Father's Mobile">
                    <TextInput
                      type="tel"
                      value={fatherMobile}
                      onChange={setFatherMobile}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </Field>
                  <Field label="Father Date of Birth">
                    <TextInput
                      type="date"
                      value={fatherDob}
                      onChange={setFatherDob}
                    />
                  </Field>
                </G3>
                <G2>
                  <Field label="Father Occupation">
                    <TextInput
                      value={fatherOccupation}
                      onChange={setFatherOccupation}
                      placeholder="Occupation"
                    />
                  </Field>
                  <Field label="Marriage Anniversary Date">
                    <TextInput
                      type="date"
                      value={marriageAnniversary}
                      onChange={setMarriageAnniversary}
                    />
                  </Field>
                </G2>
              </div>
              <div className="flex-shrink-0 pt-0.5">
                <PhotoUpload
                  label="Father Photo"
                  value={fatherPhoto}
                  onChange={setFatherPhoto}
                />
              </div>
            </div>

            <Divider />

            <SubHeading
              label="Mother's Information"
              color="#db2877"
              gradientFrom="#db2877"
              gradientTo="#f43f5e"
            />
            <div className="flex gap-5">
              <div className="flex-1 min-w-0 space-y-3">
                <G3>
                  <Field label="Mother Name">
                    <TextInput
                      value={motherName}
                      onChange={setMotherName}
                      placeholder="Mother's Full Name"
                    />
                  </Field>
                  <Field label="Mother Mobile">
                    <TextInput
                      type="tel"
                      value={motherMobile}
                      onChange={setMotherMobile}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </Field>
                  <Field label="Mother Date of Birth">
                    <TextInput
                      type="date"
                      value={motherDob}
                      onChange={setMotherDob}
                    />
                  </Field>
                </G3>
                <Field label="Mother Occupation">
                  <TextInput
                    value={motherOccupation}
                    onChange={setMotherOccupation}
                    placeholder="Occupation"
                  />
                </Field>
              </div>
              <div className="flex-shrink-0 pt-0.5">
                <PhotoUpload
                  label="Mother Photo"
                  value={motherPhoto}
                  onChange={setMotherPhoto}
                />
              </div>
            </div>

            <Divider />

            <SubHeading
              label="Guardian Information"
              color="#10b981"
              gradientFrom="#10b981"
              gradientTo="#059669"
            />
            <div className="mb-3">
              <Label>If Guardian is</Label>
              <RadioGroup
                options={["Father", "Mother", "Other"]}
                value={guardianType}
                onChange={setGuardianType}
              />
            </div>
            <G3>
              <Field label="Guardian Name">
                <TextInput
                  value={guardianName}
                  onChange={setGuardianName}
                  placeholder="Guardian Name"
                  disabled={guardianType !== "Other"}
                />
              </Field>
              <Field label="Guardian Relation">
                <TextInput
                  value={guardianRelation}
                  onChange={setGuardianRelation}
                  placeholder="e.g. Uncle, Aunt"
                  disabled={guardianType !== "Other"}
                />
              </Field>
              <Field label="Guardian Email">
                <TextInput
                  type="email"
                  value={guardianEmail}
                  onChange={setGuardianEmail}
                  placeholder="guardian@example.com"
                />
              </Field>
            </G3>
            <div className="mt-3 space-y-3">
              <G2>
                <Field label="Guardian Mobile">
                  <TextInput
                    type="tel"
                    value={guardianMobile}
                    onChange={setGuardianMobile}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </Field>
              </G2>
              <G2>
                <Field label="Guardian Address Line 1">
                  <TextInput
                    value={guardianAddress1}
                    onChange={setGuardianAddress1}
                    placeholder="House No., Street Name"
                  />
                </Field>
                <Field label="Guardian Address Line 2">
                  <TextInput
                    value={guardianAddress2}
                    onChange={setGuardianAddress2}
                    placeholder="Locality, Landmark"
                  />
                </Field>
              </G2>
            </div>
          </div>
        </Section>

        {/* 4.0 Address */}
        <Section
          title="Student Address Details"
          icon={MapPin}
          color="#10b981"
          gradientFrom="#10b981"
          gradientTo="#3b82f6"
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <SubHeading
                  label="Current Address"
                  color="#10b981"
                  gradientFrom="#10b981"
                  gradientTo="#059669"
                />
                <CheckboxField
                  label="Same as Guardian Address"
                  checked={guardianIsCurrent}
                  onChange={setGuardianIsCurrent}
                />
              </div>
              <div className="space-y-3">
                <G2>
                  <Field label="Address Line 1">
                    <TextInput
                      value={
                        guardianIsCurrent
                          ? guardianAddress1
                          : currentAddress.line1
                      }
                      onChange={(v) =>
                        !guardianIsCurrent &&
                        setCurrentAddress({ ...currentAddress, line1: v })
                      }
                      placeholder="House No., Street"
                      disabled={guardianIsCurrent}
                    />
                  </Field>
                  <Field label="Address Line 2">
                    <TextInput
                      value={
                        guardianIsCurrent
                          ? guardianAddress2
                          : currentAddress.line2
                      }
                      onChange={(v) =>
                        !guardianIsCurrent &&
                        setCurrentAddress({ ...currentAddress, line2: v })
                      }
                      placeholder="Locality, Landmark"
                      disabled={guardianIsCurrent}
                    />
                  </Field>
                </G2>
                <G3>
                  <Field label="City">
                    <TextInput
                      value={currentAddress.city}
                      onChange={(v) =>
                        !guardianIsCurrent &&
                        setCurrentAddress({ ...currentAddress, city: v })
                      }
                      placeholder="City"
                      disabled={guardianIsCurrent}
                    />
                  </Field>
                  <Field label="State">
                    <SelectInput
                      value={currentAddress.state}
                      onChange={(v) =>
                        !guardianIsCurrent &&
                        setCurrentAddress({ ...currentAddress, state: v })
                      }
                      placeholder="Select State"
                      disabled={guardianIsCurrent}
                      options={stateOptions}
                    />
                  </Field>
                  <Field label="PIN Code">
                    <TextInput
                      value={currentAddress.pin}
                      onChange={(v) =>
                        !guardianIsCurrent &&
                        setCurrentAddress({ ...currentAddress, pin: v })
                      }
                      placeholder="6-digit PIN"
                      disabled={guardianIsCurrent}
                    />
                  </Field>
                </G3>
              </div>
            </div>

            <Divider />

            <div>
              <div className="flex items-center justify-between mb-3">
                <SubHeading
                  label="Permanent Address"
                  color="#3b82f6"
                  gradientFrom="#3b82f6"
                  gradientTo="#6366f1"
                />
                <CheckboxField
                  label="Same as Current Address"
                  checked={permanentIsCurrent}
                  onChange={setPermanentIsCurrent}
                />
              </div>
              <div className="space-y-3">
                <G2>
                  <Field label="Address Line 1">
                    <TextInput
                      value={
                        permanentIsCurrent
                          ? currentAddress.line1
                          : permanentAddress.line1
                      }
                      onChange={(v) =>
                        !permanentIsCurrent &&
                        setPermanentAddress({ ...permanentAddress, line1: v })
                      }
                      placeholder="House No., Street"
                      disabled={permanentIsCurrent}
                    />
                  </Field>
                  <Field label="Address Line 2">
                    <TextInput
                      value={
                        permanentIsCurrent
                          ? currentAddress.line2
                          : permanentAddress.line2
                      }
                      onChange={(v) =>
                        !permanentIsCurrent &&
                        setPermanentAddress({ ...permanentAddress, line2: v })
                      }
                      placeholder="Locality, Landmark"
                      disabled={permanentIsCurrent}
                    />
                  </Field>
                </G2>
                <G3>
                  <Field label="City">
                    <TextInput
                      value={
                        permanentIsCurrent
                          ? currentAddress.city
                          : permanentAddress.city
                      }
                      onChange={(v) =>
                        !permanentIsCurrent &&
                        setPermanentAddress({ ...permanentAddress, city: v })
                      }
                      placeholder="City"
                      disabled={permanentIsCurrent}
                    />
                  </Field>
                  <Field label="State">
                    <SelectInput
                      value={
                        permanentIsCurrent
                          ? currentAddress.state
                          : permanentAddress.state
                      }
                      onChange={(v) =>
                        !permanentIsCurrent &&
                        setPermanentAddress({ ...permanentAddress, state: v })
                      }
                      placeholder="Select State"
                      disabled={permanentIsCurrent}
                      options={stateOptions}
                    />
                  </Field>
                  <Field label="PIN Code">
                    <TextInput
                      value={
                        permanentIsCurrent
                          ? currentAddress.pin
                          : permanentAddress.pin
                      }
                      onChange={(v) =>
                        !permanentIsCurrent &&
                        setPermanentAddress({ ...permanentAddress, pin: v })
                      }
                      placeholder="6-digit PIN"
                      disabled={permanentIsCurrent}
                    />
                  </Field>
                </G3>
              </div>
            </div>
          </div>
        </Section>

        {/* 5.0 Fee */}
        <Section
          title="Student Fee Assign"
          icon={DollarSign}
          color="#8b5cf6"
          gradientFrom="#8b5cf6"
          gradientTo="#a855f7"
        >
          <G4>
            <Field label="Fee Group">
              <SelectInput
                value={feeGroup}
                onChange={setFeeGroup}
                placeholder="Select Fee Group"
                options={[
                  "General Fee",
                  "Science Fee",
                  "Commerce Fee",
                  "Arts Fee",
                  "Sports Fee",
                ]}
              />
            </Field>
            <Field label="Assign Discount">
              <SelectInput
                value={discount}
                onChange={setDiscount}
                placeholder="Select Discount"
                options={[
                  "No Discount",
                  "10%",
                  "15%",
                  "20%",
                  "25%",
                  "50%",
                  "Full Scholarship",
                ]}
              />
            </Field>
            <Field label="Discount List">
              <SelectInput
                value={discountList}
                onChange={setDiscountList}
                placeholder="Select List"
                options={[
                  "Merit Scholarship",
                  "Staff Ward",
                  "RTE",
                  "EWS",
                  "SC/ST Concession",
                  "Sports Quota",
                ]}
              />
            </Field>
            <Field label="Month">
              <SelectInput
                value={feeMonth}
                onChange={setFeeMonth}
                placeholder="Select Month"
                options={[
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                  "January",
                  "February",
                  "March",
                ]}
              />
            </Field>
          </G4>
        </Section>

        {/* ── Bottom Action Bar ──────────────────────────────────────────────── */}
        <div
          className={`flex items-center justify-between px-5 py-4 rounded-2xl border
            ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-violet-100"}`}
          style={
            !isDark ? { boxShadow: "0 2px 20px rgba(124,58,237,0.08)" } : {}
          }
        >
          <div>
            <p
              className={`text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}
            >
              Ready to submit & print?
            </p>
            <p
              className={`text-[10px] font-medium ${isDark ? "text-gray-600" : "text-slate-400"}`}
            >
              Submit the form or print a formatted copy
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Print Button */}
            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all hover:scale-[1.02] active:scale-[0.98]
                ${isDark ? "border-violet-500/40 text-violet-400 bg-violet-500/10 hover:bg-violet-500/20" : "border-violet-200 text-violet-600 bg-violet-50 hover:bg-violet-100"}`}
            >
              <Printer size={13} />
              Print Form
            </button>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 6px 16px rgba(16,185,129,0.3)",
              }}
            >
              <Send size={13} />
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
