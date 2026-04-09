import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Home, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ${isDark ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"}`}
      >
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
        >
          <span
            className={`font-extrabold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-400"}`}
          >
            <X size={15} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </motion.div>
    </div>
  );
}

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
        className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl ${isDark ? "bg-gray-900 border border-gray-700" : "bg-white"}`}
      >
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <h3
            className={`font-extrabold text-sm mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Delete "{name}"?
          </h3>
          <p
            className={`text-xs font-semibold mb-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${isDark ? "border-gray-700 text-gray-400 hover:bg-gray-800" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
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
        className={`block text-[10.5px] font-extrabold mb-1.5 tracking-widest uppercase ${isDark ? "text-gray-400" : "text-gray-600"}`}
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
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold border outline-none ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-800"}`}
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

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
        className={`block text-[10.5px] font-extrabold mb-1.5 tracking-widest uppercase ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold border outline-none transition-all ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20" : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 shadow-sm"}`}
      />
    </div>
  );
}

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
          <p className="text-rose-500 text-[10px] font-bold -mt-1">{error}</p>
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
          <p className="text-rose-500 text-[10px] font-bold -mt-1">{error}</p>
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

export default function MasterSettings() {
  const { isDark } = useTheme();

  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [deletingCat, setDeletingCat] = useState<Category | null>(null);

  const [houses, setHouses] = useState<House[]>(DEFAULT_HOUSES);
  const [houseModalOpen, setHouseModalOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);
  const [deletingHouse, setDeletingHouse] = useState<House | null>(null);

  const handleAddCategory = (data: Omit<Category, "id">) =>
    setCategories((prev) => [...prev, { ...data, id: Date.now().toString() }]);
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

  const handleAddHouse = (data: Omit<House, "id">) =>
    setHouses((prev) => [...prev, { ...data, id: Date.now().toString() }]);
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

  const cardBase = `rounded-2xl border flex flex-col ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`;
  const headerBase = `flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`;
  const rowBase = `flex items-center gap-3 px-4 py-2.5 border-b last:border-b-0 group transition-colors ${isDark ? "border-gray-800 hover:bg-gray-800/50" : "border-gray-100 hover:bg-gray-50"}`;
  const colLabel = `text-[10px] font-extrabold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-400"}`;

  return (
    <div className={`min-h-full ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="p-5">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Category Master Card */}
          <div className={cardBase}>
            <div className={headerBase}>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "#6366f118",
                    border: "1.5px solid #6366f130",
                  }}
                >
                  <Tag size={15} style={{ color: "#6366f1" }} />
                </div>
                <div>
                  <h3
                    className={`font-extrabold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Category Master
                  </h3>
                  <p
                    className={`text-[10.5px] font-bold mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    {categories.length}{" "}
                    {categories.length === 1 ? "item" : "items"} total
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingCat(null);
                  setCatModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <Plus size={12} /> Add
              </button>
            </div>

            <div
              className={`grid grid-cols-12 px-4 py-2 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}
            >
              <p className={`col-span-1 ${colLabel}`}>#</p>
              <p className={`col-span-4 ${colLabel}`}>Name</p>
              <p className={`col-span-5 ${colLabel}`}>Description</p>
              <p className={`col-span-2 text-right ${colLabel}`}>Actions</p>
            </div>

            {categories.length === 0 ? (
              <div
                className={`text-center py-8 ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                <Tag size={22} className="mx-auto mb-2 opacity-40" />
                <p className="text-xs font-bold">No categories yet</p>
              </div>
            ) : (
              <AnimatePresence>
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.03 }}
                    className={rowBase}
                  >
                    <div className="w-full grid grid-cols-12 items-center">
                      <span
                        className={`col-span-1 text-xs font-extrabold ${isDark ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {i + 1}
                      </span>
                      <div className="col-span-4 flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: cat.color }}
                        />
                        <span
                          className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {cat.name}
                        </span>
                      </div>
                      <span
                        className={`col-span-5 text-xs font-semibold truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {cat.description || "—"}
                      </span>
                      <div className="col-span-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingCat(cat);
                            setCatModalOpen(true);
                          }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-indigo-500/20 text-indigo-400" : "hover:bg-indigo-50 text-indigo-500"}`}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeletingCat(cat)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-red-500/20 text-red-400" : "hover:bg-red-50 text-red-500"}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* House Master Card */}
          <div className={cardBase}>
            <div className={headerBase}>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "#f59e0b18",
                    border: "1.5px solid #f59e0b30",
                  }}
                >
                  <Home size={15} style={{ color: "#f59e0b" }} />
                </div>
                <div>
                  <h3
                    className={`font-extrabold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    House Master
                  </h3>
                  <p
                    className={`text-[10.5px] font-bold mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    {houses.length} {houses.length === 1 ? "item" : "items"}{" "}
                    total
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingHouse(null);
                  setHouseModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                }}
              >
                <Plus size={12} /> Add
              </button>
            </div>

            <div
              className={`grid grid-cols-12 px-4 py-2 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}
            >
              <p className={`col-span-1 ${colLabel}`}>#</p>
              <p className={`col-span-3 ${colLabel}`}>Name</p>
              <p className={`col-span-4 ${colLabel}`}>Master</p>
              <p className={`col-span-2 ${colLabel}`}>Cap.</p>
              <p className={`col-span-2 text-right ${colLabel}`}>Actions</p>
            </div>

            {houses.length === 0 ? (
              <div
                className={`text-center py-8 ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                <Home size={22} className="mx-auto mb-2 opacity-40" />
                <p className="text-xs font-bold">No houses yet</p>
              </div>
            ) : (
              <AnimatePresence>
                {houses.map((house, i) => (
                  <motion.div
                    key={house.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.03 }}
                    className={rowBase}
                  >
                    <div className="w-full grid grid-cols-12 items-center">
                      <span
                        className={`col-span-1 text-xs font-extrabold ${isDark ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {i + 1}
                      </span>
                      <div className="col-span-3 flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: house.color }}
                        />
                        <span
                          className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {house.name}
                        </span>
                      </div>
                      <span
                        className={`col-span-4 text-xs font-semibold truncate ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {house.master || "—"}
                      </span>
                      <span
                        className={`col-span-2 text-xs font-bold ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {house.capacity || "—"}
                      </span>
                      <div className="col-span-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingHouse(house);
                            setHouseModalOpen(true);
                          }}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-indigo-500/20 text-indigo-400" : "hover:bg-indigo-50 text-indigo-500"}`}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeletingHouse(house)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "hover:bg-red-500/20 text-red-400" : "hover:bg-red-50 text-red-500"}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

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
