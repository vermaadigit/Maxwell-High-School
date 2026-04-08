import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Home,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

interface House {
  id: string;
  name: string;
  color: string;
  master: string;
  capacity: number;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "General",
    description: "General category students",
    color: "#6366f1",
  },
  {
    id: "2",
    name: "OBC",
    description: "Other Backward Classes",
    color: "#f59e0b",
  },
  { id: "3", name: "SC", description: "Scheduled Caste", color: "#10b981" },
  { id: "4", name: "ST", description: "Scheduled Tribe", color: "#ef4444" },
  {
    id: "5",
    name: "EWS",
    description: "Economically Weaker Section",
    color: "#8b5cf6",
  },
];

const DEFAULT_HOUSES: House[] = [
  {
    id: "1",
    name: "Red House",
    color: "#ef4444",
    master: "Mr. Ramesh Kumar",
    capacity: 120,
  },
  {
    id: "2",
    name: "Blue House",
    color: "#3b82f6",
    master: "Mrs. Priya Singh",
    capacity: 115,
  },
  {
    id: "3",
    name: "Green House",
    color: "#10b981",
    master: "Mr. Ajay Verma",
    capacity: 110,
  },
  {
    id: "4",
    name: "Yellow House",
    color: "#f59e0b",
    master: "Ms. Sunita Devi",
    capacity: 118,
  },
];

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#78716c",
  "#6b7280",
  "#1f2937",
];

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${
          isDark
            ? "bg-gray-900 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
        style={!isDark ? { boxShadow: "0 25px 60px rgba(0,0,0,0.15)" } : {}}
      >
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            isDark ? "border-gray-800" : "border-gray-100"
          }`}
        >
          <span
            className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? "hover:bg-gray-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-400"
            }`}
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </motion.div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}) {
  const { isDark } = useTheme();
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl ${
          isDark ? "bg-gray-900 border border-gray-700" : "bg-white"
        }`}
        style={!isDark ? { boxShadow: "0 25px 60px rgba(0,0,0,0.15)" } : {}}
      >
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <h3
            className={`font-bold text-sm mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Delete "{name}"?
          </h3>
          <p
            className={`text-xs mb-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                isDark
                  ? "border-gray-700 text-gray-400 hover:bg-gray-800"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Color Picker ─────────────────────────────────────────────────────────────

function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (c: string) => void;
}) {
  const { isDark } = useTheme();
  return (
    <div>
      <label
        className={`block text-[10.5px] font-bold mb-1.5 tracking-widest uppercase ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Color
      </label>
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className="w-7 h-7 rounded-lg transition-transform hover:scale-110 flex items-center justify-center"
            style={{
              background: c,
              border:
                value === c
                  ? `2.5px solid ${isDark ? "#fff" : "#111"}`
                  : "2px solid transparent",
            }}
          >
            {value === c && (
              <Check size={12} className="text-white drop-shadow" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-6 h-6 rounded-md" style={{ background: value }} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs border outline-none ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-gray-50 border-gray-200 text-gray-800"
          }`}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const { isDark } = useTheme();
  return (
    <div>
      <label
        className={`block text-[10.5px] font-bold mb-1.5 tracking-widest uppercase ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
          isDark
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
            : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 shadow-sm"
        }`}
      />
    </div>
  );
}

// ─── Category Modal Form ──────────────────────────────────────────────────────

function CategoryForm({
  isOpen,
  onClose,
  onSave,
  initial,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cat: Omit<Category, "id">) => void;
  initial?: Category | null;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [color, setColor] = useState(initial?.color ?? "#6366f1");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setDescription("");
    setColor("#6366f1");
    setError("");
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    onSave({ name: name.trim(), description: description.trim(), color });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Sync with initial when opened for edit
  const [prev, setPrev] = useState(initial);
  if (initial !== prev) {
    setPrev(initial);
    if (initial) {
      setName(initial.name);
      setDescription(initial.description);
      setColor(initial.color);
    } else {
      setName("");
      setDescription("");
      setColor("#6366f1");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initial ? "Edit Category" : "Add Category"}
    >
      <div className="space-y-3">
        <Input
          label="Category Name"
          value={name}
          onChange={(v) => {
            setName(v);
            setError("");
          }}
          placeholder="e.g. General"
          required
        />
        {error && (
          <p className="text-rose-500 text-[10px] font-semibold -mt-1">
            {error}
          </p>
        )}
        <Input
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Short description"
        />
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            {initial ? "Save Changes" : "Add Category"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── House Modal Form ─────────────────────────────────────────────────────────

function HouseForm({
  isOpen,
  onClose,
  onSave,
  initial,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (h: Omit<House, "id">) => void;
  initial?: House | null;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [color, setColor] = useState(initial?.color ?? "#ef4444");
  const [master, setMaster] = useState(initial?.master ?? "");
  const [capacity, setCapacity] = useState(String(initial?.capacity ?? ""));
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setColor("#ef4444");
    setMaster("");
    setCapacity("");
    setError("");
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError("House name is required");
      return;
    }
    onSave({
      name: name.trim(),
      color,
      master: master.trim(),
      capacity: Number(capacity) || 0,
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const [prev, setPrev] = useState(initial);
  if (initial !== prev) {
    setPrev(initial);
    if (initial) {
      setName(initial.name);
      setColor(initial.color);
      setMaster(initial.master);
      setCapacity(String(initial.capacity));
    } else {
      setName("");
      setColor("#ef4444");
      setMaster("");
      setCapacity("");
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={initial ? "Edit House" : "Add House"}
    >
      <div className="space-y-3">
        <Input
          label="House Name"
          value={name}
          onChange={(v) => {
            setName(v);
            setError("");
          }}
          placeholder="e.g. Red House"
          required
        />
        {error && (
          <p className="text-rose-500 text-[10px] font-semibold -mt-1">
            {error}
          </p>
        )}
        <Input
          label="House Master"
          value={master}
          onChange={setMaster}
          placeholder="e.g. Mr. Ramesh Kumar"
        />
        <Input
          label="Capacity"
          value={capacity}
          onChange={setCapacity}
          placeholder="e.g. 120"
          type="number"
        />
        <ColorPicker value={color} onChange={setColor} />
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
          >
            {initial ? "Save Changes" : "Add House"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────

function CategoryCard({
  cat,
  onEdit,
  onDelete,
  index,
}: {
  cat: Category;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}) {
  const { isDark } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`relative rounded-2xl border overflow-hidden group transition-all ${
        isDark
          ? "bg-gray-900 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="h-1.5 w-full" style={{ background: cat.color }} />
      <div className="px-4 py-3.5 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
          style={{
            background: cat.color + "22",
            border: `2px solid ${cat.color}40`,
          }}
        >
          <Tag size={16} style={{ color: cat.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {cat.name}
          </p>
          <p
            className={`text-[11px] truncate mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            {cat.description || "No description"}
          </p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? "hover:bg-indigo-500/20 text-indigo-400"
                : "hover:bg-indigo-50 text-indigo-500"
            }`}
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={onDelete}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? "hover:bg-red-500/20 text-red-400"
                : "hover:bg-red-50 text-red-500"
            }`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── House Card ───────────────────────────────────────────────────────────────

function HouseCard({
  house,
  onEdit,
  onDelete,
  index,
}: {
  house: House;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}) {
  const { isDark } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className={`relative rounded-2xl border overflow-hidden group transition-all ${
        isDark
          ? "bg-gray-900 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
      }`}
    >
      <div className="h-1.5 w-full" style={{ background: house.color }} />
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: house.color + "22",
              border: `2px solid ${house.color}40`,
            }}
          >
            <Home size={16} style={{ color: house.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {house.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: house.color }}
              />
              <p
                className={`text-[11px] truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {house.color}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isDark
                  ? "hover:bg-indigo-500/20 text-indigo-400"
                  : "hover:bg-indigo-50 text-indigo-500"
              }`}
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                isDark
                  ? "hover:bg-red-500/20 text-red-400"
                  : "hover:bg-red-50 text-red-500"
              }`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-2 gap-2 pt-2.5 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}
        >
          <div>
            <p
              className={`text-[9.5px] font-bold uppercase tracking-wider mb-0.5 ${isDark ? "text-gray-600" : "text-gray-400"}`}
            >
              House Master
            </p>
            <p
              className={`text-[11px] font-semibold truncate ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {house.master || "—"}
            </p>
          </div>
          <div>
            <p
              className={`text-[9.5px] font-bold uppercase tracking-wider mb-0.5 ${isDark ? "text-gray-600" : "text-gray-400"}`}
            >
              Capacity
            </p>
            <p
              className={`text-[11px] font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {house.capacity || "—"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section Panel ────────────────────────────────────────────────────────────

function Panel({
  title,
  icon: Icon,
  color,
  count,
  onAdd,
  addLabel,
  children,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  count: number;
  onAdd: () => void;
  addLabel: string;
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();
  return (
    <div
      className={`rounded-2xl border ${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}
    >
      <div
        className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: color + "18",
              border: `1.5px solid ${color}30`,
            }}
          >
            <Icon size={16} style={{ color }} />
          </div>
          <div>
            <h3
              className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {title}
            </h3>
            <p
              className={`text-[10.5px] mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {count} {count === 1 ? "item" : "items"} total
            </p>
          </div>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          }}
        >
          <Plus size={13} />
          {addLabel}
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MasterSettings() {
  const { isDark } = useTheme();

  // Categories
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [deletingCat, setDeletingCat] = useState<Category | null>(null);

  // Houses
  const [houses, setHouses] = useState<House[]>(DEFAULT_HOUSES);
  const [houseModalOpen, setHouseModalOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);
  const [deletingHouse, setDeletingHouse] = useState<House | null>(null);

  const handleAddCategory = (data: Omit<Category, "id">) => {
    setCategories((prev) => [...prev, { ...data, id: Date.now().toString() }]);
  };
  const handleEditCategory = (data: Omit<Category, "id">) => {
    if (!editingCat) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === editingCat.id ? { ...data, id: c.id } : c)),
    );
    setEditingCat(null);
  };
  const handleDeleteCategory = () => {
    if (!deletingCat) return;
    setCategories((prev) => prev.filter((c) => c.id !== deletingCat.id));
    setDeletingCat(null);
  };

  const handleAddHouse = (data: Omit<House, "id">) => {
    setHouses((prev) => [...prev, { ...data, id: Date.now().toString() }]);
  };
  const handleEditHouse = (data: Omit<House, "id">) => {
    if (!editingHouse) return;
    setHouses((prev) =>
      prev.map((h) => (h.id === editingHouse.id ? { ...data, id: h.id } : h)),
    );
    setEditingHouse(null);
  };
  const handleDeleteHouse = () => {
    if (!deletingHouse) return;
    setHouses((prev) => prev.filter((h) => h.id !== deletingHouse.id));
    setDeletingHouse(null);
  };

  return (
    <div className={`min-h-full ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Header */}
      {/* <div
        className={`sticky top-0 z-30 flex items-center gap-4 px-5 py-3.5 border-b ${isDark ? "bg-gray-950/95 border-gray-800" : "bg-white/95 border-gray-200"}`}
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          <FolderOpen size={15} className="text-white" />
        </div>
        <div>
          <p
            className={`text-xs font-black uppercase tracking-widest ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
          >
            Master Settings
          </p>
          <p
            className={`text-[10px] font-medium ${isDark ? "text-gray-600" : "text-gray-400"}`}
          >
            Manage categories and house masters
          </p>
        </div>
      </div> */}

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Total Categories",
              value: categories.length,
              color: "#6366f1",
              icon: Tag,
            },
            {
              label: "Total Houses",
              value: houses.length,
              color: "#f59e0b",
              icon: Home,
            },
          ].map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: color + "18" }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <p
                  className={`text-lg font-extrabold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {value}
                </p>
                <p
                  className={`text-[10.5px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Panel */}
        <Panel
          title="Category Master"
          icon={Tag}
          color="#6366f1"
          count={categories.length}
          onAdd={() => {
            setEditingCat(null);
            setCatModalOpen(true);
          }}
          addLabel="Add Category"
        >
          {categories.length === 0 ? (
            <div
              className={`text-center py-10 rounded-xl border-2 border-dashed ${isDark ? "border-gray-800 text-gray-600" : "border-gray-200 text-gray-400"}`}
            >
              <Tag size={24} className="mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold">No categories yet</p>
              <p className="text-[11px] mt-1 opacity-70">
                Click "Add Category" to create one
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence>
                {categories.map((cat, i) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    index={i}
                    onEdit={() => {
                      setEditingCat(cat);
                      setCatModalOpen(true);
                    }}
                    onDelete={() => setDeletingCat(cat)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </Panel>

        {/* House Panel */}
        <Panel
          title="House Master"
          icon={Home}
          color="#f59e0b"
          count={houses.length}
          onAdd={() => {
            setEditingHouse(null);
            setHouseModalOpen(true);
          }}
          addLabel="Add House"
        >
          {houses.length === 0 ? (
            <div
              className={`text-center py-10 rounded-xl border-2 border-dashed ${isDark ? "border-gray-800 text-gray-600" : "border-gray-200 text-gray-400"}`}
            >
              <Home size={24} className="mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold">No houses yet</p>
              <p className="text-[11px] mt-1 opacity-70">
                Click "Add House" to create one
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence>
                {houses.map((house, i) => (
                  <HouseCard
                    key={house.id}
                    house={house}
                    index={i}
                    onEdit={() => {
                      setEditingHouse(house);
                      setHouseModalOpen(true);
                    }}
                    onDelete={() => setDeletingHouse(house)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </Panel>
      </div>

      {/* Modals */}
      <AnimatePresence>
        <CategoryForm
          isOpen={catModalOpen}
          onClose={() => {
            setCatModalOpen(false);
            setEditingCat(null);
          }}
          onSave={editingCat ? handleEditCategory : handleAddCategory}
          initial={editingCat}
        />
        <HouseForm
          isOpen={houseModalOpen}
          onClose={() => {
            setHouseModalOpen(false);
            setEditingHouse(null);
          }}
          onSave={editingHouse ? handleEditHouse : handleAddHouse}
          initial={editingHouse}
        />
        <DeleteModal
          isOpen={!!deletingCat}
          onClose={() => setDeletingCat(null)}
          onConfirm={handleDeleteCategory}
          name={deletingCat?.name ?? ""}
        />
        <DeleteModal
          isOpen={!!deletingHouse}
          onClose={() => setDeletingHouse(null)}
          onConfirm={handleDeleteHouse}
          name={deletingHouse?.name ?? ""}
        />
      </AnimatePresence>
    </div>
  );
}
