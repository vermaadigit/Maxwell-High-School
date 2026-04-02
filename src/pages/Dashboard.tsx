import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Menu,
  Bell,
  Search,
  GraduationCap,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import StudentAdmissionForm from "./StudentAdmissionForm";

interface DashboardProps {
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string; icon: React.ElementType }[];
}

const MENU_ITEMS: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    id: "student",
    label: "Student",
    icon: Users,
    children: [
      {
        id: "student-admission",
        label: "Student Admission Form",
        icon: ClipboardList,
      },
    ],
  },
];

const STATS = [
  {
    label: "Total Students",
    value: "2,418",
    change: "+3.2%",
    icon: GraduationCap,
    color: "#6366f1",
  },
  {
    label: "Active Courses",
    value: "184",
    change: "+1.1%",
    icon: BookOpen,
    color: "#0ea5e9",
  },
  {
    label: "Attendance Today",
    value: "94.6%",
    change: "+0.8%",
    icon: TrendingUp,
    color: "#10b981",
  },
  {
    label: "Upcoming Events",
    value: "7",
    change: "This month",
    icon: Calendar,
    color: "#f59e0b",
  },
];

const RECENT_ADMISSIONS = [
  {
    name: "Aarav Sharma",
    class: "XI-A",
    date: "01 Apr 2026",
    status: "Approved",
  },
  {
    name: "Priya Verma",
    class: "IX-B",
    date: "31 Mar 2026",
    status: "Pending",
  },
  {
    name: "Rohan Gupta",
    class: "X-A",
    date: "30 Mar 2026",
    status: "Approved",
  },
  {
    name: "Sneha Patel",
    class: "VIII-C",
    date: "29 Mar 2026",
    status: "Review",
  },
  {
    name: "Arjun Singh",
    class: "XII-B",
    date: "28 Mar 2026",
    status: "Approved",
  },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string; dot: string }> = {
    Approved: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },
    Pending: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-400",
      dot: "bg-amber-500",
    },
    Review: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-400",
      dot: "bg-blue-500",
    },
  };
  const c = colors[status] || colors.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const { isDark, toggleTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(
    new Set(["student"]),
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderContent = () => {
    if (activeMenu === "student-admission") return <StudentAdmissionForm />;
    return <DashboardHome />;
  };

  const SidebarContent = () => (
    <div
      className={`flex flex-col h-full ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-r transition-colors duration-300`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-5 h-16 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
        >
          <Award size={16} className="text-white" />
        </div>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-hidden"
          >
            <p
              className={`text-xs font-bold leading-none ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Maxwell
            </p>
            <p
              className={`text-[10px] mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              High School ERP
            </p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {MENU_ITEMS.map((item) => {
          const isExpanded = expandedMenus.has(item.id);
          const isActive =
            activeMenu === item.id ||
            item.children?.some((c) => c.id === activeMenu);
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                    if (sidebarOpen === false) setSidebarOpen(true);
                  } else setActiveMenu(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? isDark
                      ? "bg-indigo-600/20 text-indigo-400"
                      : "bg-indigo-50 text-indigo-700"
                    : isDark
                      ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  size={18}
                  className={`flex-shrink-0 ${isActive ? "text-indigo-500" : ""}`}
                />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    )}
                  </>
                )}
                {!sidebarOpen && isActive && (
                  <div className="absolute left-0 w-0.5 h-8 bg-indigo-500 rounded-r-full" />
                )}
              </button>

              {/* Children */}
              {item.children && sidebarOpen && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 pl-3 border-gray-200 dark:border-gray-700">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => {
                              setActiveMenu(child.id);
                              setMobileSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              activeMenu === child.id
                                ? isDark
                                  ? "bg-indigo-600/20 text-indigo-400 font-semibold"
                                  : "bg-indigo-50 text-indigo-700 font-semibold"
                                : isDark
                                  ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <child.icon size={15} />
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className={`p-3 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}
      >
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
            isDark
              ? "text-gray-500 hover:bg-red-900/20 hover:text-red-400"
              : "text-gray-500 hover:bg-red-50 hover:text-red-600"
          }`}
        >
          <LogOut size={17} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`h-screen w-screen flex overflow-hidden ${isDark ? "bg-gray-950" : "bg-gray-50"} transition-colors duration-300`}
    >
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block relative flex-shrink-0 h-full overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Topbar */}
        <header
          className={`flex items-center gap-4 h-16 px-6 border-b flex-shrink-0 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} transition-colors duration-300`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
            >
              <Menu size={18} />
            </button>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className={`lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Breadcrumb */}
          <div
            className={`hidden sm:flex items-center gap-2 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            <span>Home</span>
            {activeMenu !== "dashboard" && (
              <>
                <ChevronRight size={12} />
                <span
                  className={`font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                >
                  {activeMenu === "student-admission"
                    ? "Student Admission Form"
                    : "Dashboard"}
                </span>
              </>
            )}
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-400 border border-gray-200"} transition-colors`}
          >
            <Search size={13} />
            <span>Search...</span>
            <span
              className={`ml-4 text-[10px] px-1.5 py-0.5 rounded ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
            >
              ⌘K
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300 ${isDark ? "bg-gray-800 text-amber-400 hover:bg-gray-700" : "bg-gray-100 text-indigo-600 hover:bg-gray-200 border border-gray-200"}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Notifications */}
          <button
            className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${isDark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-200"}`}
          >
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2 ml-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
              }}
            >
              S
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-xs font-semibold leading-none ${isDark ? "text-white" : "text-gray-800"}`}
              >
                Student
              </p>
              <p
                className={`text-[10px] mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                Admin
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className={`flex-1 overflow-auto ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function DashboardHome() {
  const { isDark } = useTheme();

  return (
    <div className="p-5 space-y-5">
      {/* Welcome Banner */}
      <div
        className="relative rounded-2xl overflow-hidden p-6"
        style={{
          background:
            "linear-gradient(135deg, #1a1a3e 0%, #16213e 45%, #0f3460 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 32px rgba(15, 52, 96, 0.35)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: "linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(251,191,36,0.14), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom left, rgba(99,102,241,0.18), transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-white/50 text-xs font-medium mb-1 tracking-wide">
            Good morning 👋
          </p>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#f1f5f9" }}>
            Welcome back, <span style={{ color: "#fbbf24" }}>Admin</span>
          </h2>
          <p className="text-white/40 text-xs max-w-xs">
            Here's what's happening at Maxwell High School today.
          </p>
        </div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(251,191,36,0.10)",
              border: "1px solid rgba(251,191,36,0.22)",
              backdropFilter: "blur(8px)",
            }}
          >
            <GraduationCap size={28} style={{ color: "#fbbf24" }} />
          </div>
          <span
            className="text-[9px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(251,191,36,0.5)" }}
          >
            Maxwell
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-xl px-4 py-3.5 flex items-center gap-3.5 relative overflow-hidden ${
              isDark ? "bg-gray-900 border border-gray-800" : "border"
            }`}
            style={
              !isDark
                ? {
                    background: `linear-gradient(135deg, #ffffff 55%, ${stat.color}12 100%)`,
                    borderColor: `${stat.color}35`,
                    boxShadow: `0 2px 14px ${stat.color}18`,
                  }
                : {}
            }
          >
            {/* Light theme colored top border */}
            {!isDark && (
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                style={{ background: stat.color }}
              />
            )}

            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${stat.color}18` }}
            >
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>

            {/* Value + label */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p
                  className={`text-base font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {stat.value}
                </p>
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={
                    !isDark
                      ? { background: `${stat.color}15`, color: stat.color }
                      : stat.change === "This month"
                        ? { background: "#374151", color: "#9ca3af" }
                        : {
                            background: "rgba(16,185,129,0.15)",
                            color: "#34d399",
                          }
                  }
                >
                  {stat.change}
                </span>
              </div>
              <p
                className={`text-[11px] mt-0.5 truncate ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Admissions Table */}
      <div
        className={`rounded-xl ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"}`}
      >
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}
        >
          <div>
            <h3
              className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Recent Admissions
            </h3>
            <p
              className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Latest student registrations
            </p>
          </div>
          <button className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDark ? "bg-gray-800/50" : "bg-gray-50"}>
                {["Student Name", "Class", "Admission Date", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`px-5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider ${isDark ? "text-gray-500" : "text-gray-400"}`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}
            >
              {RECENT_ADMISSIONS.map((row, i) => (
                <motion.tr
                  key={row.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-indigo-50/40"}`}
                >
                  <td
                    className={`px-5 py-3 text-xs font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                        style={{
                          background: `hsl(${(i * 60 + 200) % 360}, 70%, 55%)`,
                        }}
                      >
                        {row.name[0]}
                      </div>
                      {row.name}
                    </div>
                  </td>
                  <td
                    className={`px-5 py-3 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {row.class}
                  </td>
                  <td
                    className={`px-5 py-3 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {row.date}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
