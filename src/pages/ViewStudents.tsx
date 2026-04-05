import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  X,
  Users,
  GraduationCap,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ColumnCustomizer, { ALL_COLUMNS } from "../components/ColumnCustomizer";

interface Student {
  id: number;
  admNo: string;
  rollNo: string;
  name: string;
  class: string;
  section: string;
  gender: string;
  dob: string;
  fatherName: string;
  motherName: string;
  penNo: string;
  status: string;
}

const ALL_STUDENTS: Student[] = [
  {
    id: 1,
    admNo: "ADM2024001",
    rollNo: "01",
    name: "Aarav Sharma",
    class: "XI",
    section: "A",
    gender: "Male",
    dob: "12 Jan 2008",
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    penNo: "PEN100001",
    status: "Active",
  },
  {
    id: 2,
    admNo: "ADM2024002",
    rollNo: "14",
    name: "Priya Verma",
    class: "IX",
    section: "B",
    gender: "Female",
    dob: "05 Mar 2010",
    fatherName: "Suresh Verma",
    motherName: "Meena Verma",
    penNo: "PEN100002",
    status: "Active",
  },
  {
    id: 3,
    admNo: "ADM2024003",
    rollNo: "07",
    name: "Rohan Gupta",
    class: "X",
    section: "A",
    gender: "Male",
    dob: "22 Jul 2009",
    fatherName: "Amit Gupta",
    motherName: "Priya Gupta",
    penNo: "PEN100003",
    status: "Active",
  },
  {
    id: 4,
    admNo: "ADM2024004",
    rollNo: "22",
    name: "Sneha Patel",
    class: "VIII",
    section: "C",
    gender: "Female",
    dob: "18 Nov 2011",
    fatherName: "Dinesh Patel",
    motherName: "Kavita Patel",
    penNo: "PEN100004",
    status: "Inactive",
  },
  {
    id: 5,
    admNo: "ADM2024005",
    rollNo: "03",
    name: "Arjun Singh",
    class: "XII",
    section: "B",
    gender: "Male",
    dob: "30 Apr 2007",
    fatherName: "Harpal Singh",
    motherName: "Gurpreet Singh",
    penNo: "PEN100005",
    status: "Active",
  },
  {
    id: 6,
    admNo: "ADM2024006",
    rollNo: "18",
    name: "Meera Nair",
    class: "VII",
    section: "A",
    gender: "Female",
    dob: "09 Aug 2012",
    fatherName: "Ravi Nair",
    motherName: "Lata Nair",
    penNo: "PEN100006",
    status: "Active",
  },
  {
    id: 7,
    admNo: "ADM2024007",
    rollNo: "11",
    name: "Karan Mehta",
    class: "XI",
    section: "C",
    gender: "Male",
    dob: "14 Feb 2008",
    fatherName: "Vivek Mehta",
    motherName: "Anita Mehta",
    penNo: "PEN100007",
    status: "Active",
  },
  {
    id: 8,
    admNo: "ADM2024008",
    rollNo: "05",
    name: "Anjali Rao",
    class: "IX",
    section: "A",
    gender: "Female",
    dob: "27 Sep 2010",
    fatherName: "Srinivas Rao",
    motherName: "Padma Rao",
    penNo: "PEN100008",
    status: "Active",
  },
  {
    id: 9,
    admNo: "ADM2024009",
    rollNo: "19",
    name: "Vikram Joshi",
    class: "X",
    section: "B",
    gender: "Male",
    dob: "03 Dec 2009",
    fatherName: "Naresh Joshi",
    motherName: "Rekha Joshi",
    penNo: "PEN100009",
    status: "Inactive",
  },
  {
    id: 10,
    admNo: "ADM2024010",
    rollNo: "08",
    name: "Pooja Desai",
    class: "XII",
    section: "A",
    gender: "Female",
    dob: "16 Jun 2007",
    fatherName: "Bhavesh Desai",
    motherName: "Hetal Desai",
    penNo: "PEN100010",
    status: "Active",
  },
  {
    id: 11,
    admNo: "ADM2024011",
    rollNo: "25",
    name: "Rahul Tiwari",
    class: "VIII",
    section: "B",
    gender: "Male",
    dob: "21 Oct 2011",
    fatherName: "Manoj Tiwari",
    motherName: "Seema Tiwari",
    penNo: "PEN100011",
    status: "Active",
  },
  {
    id: 12,
    admNo: "ADM2024012",
    rollNo: "13",
    name: "Divya Krishnan",
    class: "VII",
    section: "C",
    gender: "Female",
    dob: "07 May 2012",
    fatherName: "Suresh Krishnan",
    motherName: "Deepa Krishnan",
    penNo: "PEN100012",
    status: "Active",
  },
  {
    id: 13,
    admNo: "ADM2024013",
    rollNo: "09",
    name: "Amit Chauhan",
    class: "XI",
    section: "B",
    gender: "Male",
    dob: "11 Jan 2008",
    fatherName: "Dinesh Chauhan",
    motherName: "Usha Chauhan",
    penNo: "PEN100013",
    status: "Active",
  },
  {
    id: 14,
    admNo: "ADM2024014",
    rollNo: "16",
    name: "Riya Bansal",
    class: "IX",
    section: "C",
    gender: "Female",
    dob: "25 Aug 2010",
    fatherName: "Anil Bansal",
    motherName: "Nisha Bansal",
    penNo: "PEN100014",
    status: "Active",
  },
  {
    id: 15,
    admNo: "ADM2024015",
    rollNo: "21",
    name: "Saurabh Yadav",
    class: "X",
    section: "C",
    gender: "Male",
    dob: "04 Mar 2009",
    fatherName: "Ramesh Yadav",
    motherName: "Geeta Yadav",
    penNo: "PEN100015",
    status: "Active",
  },
  {
    id: 16,
    admNo: "ADM2024016",
    rollNo: "04",
    name: "Neha Kapoor",
    class: "XII",
    section: "C",
    gender: "Female",
    dob: "19 Sep 2007",
    fatherName: "Rajan Kapoor",
    motherName: "Simran Kapoor",
    penNo: "PEN100016",
    status: "Active",
  },
  {
    id: 17,
    admNo: "ADM2024017",
    rollNo: "12",
    name: "Harsh Agarwal",
    class: "VIII",
    section: "A",
    gender: "Male",
    dob: "28 Feb 2011",
    fatherName: "Vikas Agarwal",
    motherName: "Pooja Agarwal",
    penNo: "PEN100017",
    status: "Active",
  },
  {
    id: 18,
    admNo: "ADM2024018",
    rollNo: "20",
    name: "Shruti Pandey",
    class: "IX",
    section: "B",
    gender: "Female",
    dob: "10 Jun 2010",
    fatherName: "Arun Pandey",
    motherName: "Anuradha Pandey",
    penNo: "PEN100018",
    status: "Active",
  },
  {
    id: 19,
    admNo: "ADM2024019",
    rollNo: "06",
    name: "Deepak Mishra",
    class: "X",
    section: "A",
    gender: "Male",
    dob: "15 Dec 2009",
    fatherName: "Sunil Mishra",
    motherName: "Kamla Mishra",
    penNo: "PEN100019",
    status: "Active",
  },
  {
    id: 20,
    admNo: "ADM2024020",
    rollNo: "17",
    name: "Tanvi Srivastava",
    class: "VII",
    section: "B",
    gender: "Female",
    dob: "02 Apr 2012",
    fatherName: "Rakesh Srivastava",
    motherName: "Sunita Srivastava",
    penNo: "PEN100020",
    status: "Inactive",
  },
];

const CLASS_OPTIONS = ["VII", "VIII", "IX", "X", "XI", "XII"];
const SECTION_OPTIONS = ["A", "B", "C", "D", "E"];
const GENDER_OPTIONS = ["Male", "Female"];
const PAGE_SIZES = [10, 25, 50];

const AVATAR_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#0ea5e9",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#84cc16",
];
function avatarColor(idx: number) {
  return AVATAR_COLORS[idx % AVATAR_COLORS.length];
}

function Avatar({ name, idx }: { name: string; idx: number }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
      style={{ background: avatarColor(idx) }}
    >
      {name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)}
    </div>
  );
}

function ViewModal({
  student,
  onClose,
  isDark,
}: {
  student: Student;
  onClose: () => void;
  isDark: boolean;
}) {
  const Row = ({ label, value }: { label: string; value: string }) => (
    <div
      className={`flex items-start gap-3 py-2.5 border-b last:border-0 ${isDark ? "border-gray-800" : "border-gray-100"}`}
    >
      <span
        className={`w-36 text-[11px] font-semibold flex-shrink-0 ${isDark ? "text-gray-500" : "text-violet-500"}`}
      >
        {label}
      </span>
      <span
        className={`text-xs font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}
      >
        {value || "—"}
      </span>
    </div>
  );
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.92, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-violet-100"}`}
        >
          <div
            className="h-1.5"
            style={{
              background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)",
            }}
          />
          <div
            className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}
          >
            <div className="flex items-center gap-3">
              <Avatar name={student.name} idx={student.id} />
              <div>
                <p
                  className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {student.name}
                </p>
                <p
                  className={`text-[11px] ${isDark ? "text-gray-500" : "text-violet-400"}`}
                >
                  {student.admNo} · Class {student.class}-{student.section}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${isDark ? "text-gray-500 hover:bg-gray-800 hover:text-white" : "text-gray-400 hover:bg-red-50 hover:text-red-500"}`}
            >
              <X size={15} />
            </button>
          </div>
          <div className="px-5 py-1 max-h-[60vh] overflow-y-auto">
            <Row label="Admission No." value={student.admNo} />
            <Row label="Roll Number" value={student.rollNo} />
            <Row label="Full Name" value={student.name} />
            <Row label="Class" value={student.class} />
            <Row label="Section" value={student.section} />
            <Row label="Gender" value={student.gender} />
            <Row label="Date of Birth" value={student.dob} />
            <Row label="Father's Name" value={student.fatherName} />
            <Row label="Mother's Name" value={student.motherName} />
            <Row label="PEN No." value={student.penNo} />
            <Row label="Status" value={student.status} />
          </div>
          <div
            className={`px-5 py-3 border-t flex justify-end ${isDark ? "border-gray-800" : "border-gray-100"}`}
          >
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95 ${isDark ? "text-gray-400 border border-gray-700 hover:bg-gray-800" : "text-white"}`}
              style={
                !isDark
                  ? {
                      background: "linear-gradient(135deg,#6366f1,#a855f7)",
                      boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                    }
                  : {}
              }
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

interface ViewStudentsProps {
  onNewAdmission: () => void;
}

export default function ViewStudents({
  onNewAdmission: _onNewAdmission,
}: ViewStudentsProps) {
  const { isDark } = useTheme();

  const [searchName, setSearchName] = useState("");
  const [searchAdm, setSearchAdm] = useState("");
  const [selClass, setSelClass] = useState("");
  const [selSection, setSelSection] = useState("");
  const [selGender, setSelGender] = useState("");
  const [searched, setSearched] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(
    new Set(ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key)),
  );

  const results = useMemo(() => {
    if (showAll) return ALL_STUDENTS;
    if (!searched) return [];
    return ALL_STUDENTS.filter(
      (s) =>
        (!searchName ||
          s.name.toLowerCase().includes(searchName.trim().toLowerCase())) &&
        (!searchAdm ||
          s.admNo.toLowerCase().includes(searchAdm.trim().toLowerCase())) &&
        (!selClass || s.class === selClass) &&
        (!selSection || s.section === selSection) &&
        (!selGender || s.gender === selGender),
    );
  }, [
    searched,
    showAll,
    searchName,
    searchAdm,
    selClass,
    selSection,
    selGender,
  ]);

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  const paginated = results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const doSearch = () => {
    setShowAll(false);
    setSearched(true);
    setCurrentPage(1);
  };
  const doShowAll = () => {
    setShowAll(true);
    setSearched(false);
    setCurrentPage(1);
  };
  const doReset = () => {
    setSearchName("");
    setSearchAdm("");
    setSelClass("");
    setSelSection("");
    setSelGender("");
    setSearched(false);
    setShowAll(false);
    setCurrentPage(1);
  };

  const anyActive =
    searchName || searchAdm || selClass || selSection || selGender;
  const showResults = searched || showAll;

  const inputBase = `w-full px-3 py-2.5 rounded-xl text-xs outline-none transition-all duration-200 font-medium`;
  const inputCls =
    inputBase +
    " border " +
    (isDark
      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
      : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 shadow-sm hover:border-gray-400");
  const selectCls =
    inputBase +
    " border appearance-none cursor-pointer pr-8 " +
    (isDark
      ? "bg-gray-800 border-gray-700 text-gray-300 focus:border-indigo-500"
      : "bg-white border-gray-300 text-gray-700 focus:border-violet-400 shadow-sm hover:border-gray-400");
  const labelCls = `block text-[11px] font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`;

  const classBgLight: Record<string, string> = {
    VII: "bg-sky-100 text-sky-700",
    VIII: "bg-teal-100 text-teal-700",
    IX: "bg-violet-100 text-violet-700",
    X: "bg-orange-100 text-orange-700",
    XI: "bg-pink-100 text-pink-700",
    XII: "bg-emerald-100 text-emerald-700",
  };

  const orderedVisibleCols = ALL_COLUMNS.filter((c) => visibleKeys.has(c.key));

  const renderCell = (s: Student, key: string, _i: number, rowIdx: number) => {
    switch (key) {
      case "index":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs font-medium ${isDark ? "text-gray-600" : "text-gray-400"}`}
          >
            {(currentPage - 1) * pageSize + rowIdx + 1}
          </td>
        );
      case "admNo":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs font-mono font-semibold whitespace-nowrap ${isDark ? "text-indigo-400" : "text-violet-600"}`}
          >
            {s.admNo}
          </td>
        );
      case "rollNo":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {s.rollNo}
          </td>
        );
      case "name":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap ${isDark ? "text-gray-200" : "text-gray-800"}`}
          >
            <div className="flex items-center gap-2.5">
              <Avatar name={s.name} idx={s.id} />
              {s.name}
            </div>
          </td>
        );
      case "class":
        return (
          <td key={key} className="px-4 py-3">
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${isDark ? "bg-gray-800 text-gray-300" : classBgLight[s.class] || "bg-gray-100 text-gray-700"}`}
            >
              {s.class}
            </span>
          </td>
        );
      case "section":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {s.section}
          </td>
        );
      case "gender":
        return (
          <td key={key} className="px-4 py-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${s.gender === "Male" ? (isDark ? "bg-blue-900/30 text-blue-400" : "bg-sky-100 text-sky-700") : isDark ? "bg-pink-900/30 text-pink-400" : "bg-pink-100 text-pink-700"}`}
            >
              {s.gender}
            </span>
          </td>
        );
      case "dob":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs whitespace-nowrap font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {s.dob}
          </td>
        );
      case "fatherName":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs whitespace-nowrap font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {s.fatherName}
          </td>
        );
      case "motherName":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs whitespace-nowrap font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {s.motherName}
          </td>
        );
      case "penNo":
        return (
          <td
            key={key}
            className={`px-4 py-3 text-xs font-mono whitespace-nowrap ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            {s.penNo}
          </td>
        );
      case "status":
        return (
          <td key={key} className="px-4 py-3">
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit ${s.status === "Active" ? (isDark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700") : isDark ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${s.status === "Active" ? "bg-emerald-500" : "bg-red-500"}`}
              />
              {s.status}
            </span>
          </td>
        );
      case "view":
        return (
          <td key={key} className="px-4 py-3">
            <button
              onClick={() => setViewStudent(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all hover:scale-105 active:scale-95 ${isDark ? "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50" : "text-white"}`}
              style={
                !isDark
                  ? {
                      background: "linear-gradient(135deg,#6366f1,#a855f7)",
                      boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
                    }
                  : {}
              }
            >
              <Eye size={12} /> View
            </button>
          </td>
        );
      default:
        return <td key={key} className="px-4 py-3" />;
    }
  };

  return (
    <div className="p-5 space-y-4 font-[Inter,sans-serif]">
      {/* Search Panel */}
      <div
        className={`rounded-2xl border p-4 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-violet-100 shadow-md shadow-violet-50"}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
          <div>
            <label className={labelCls}>Student Name</label>
            <div className="relative">
              <Search
                size={13}
                className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-gray-500" : "text-violet-400"}`}
              />
              <input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                placeholder="Enter name..."
                className={inputCls + " pl-8"}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Admission No.</label>
            <input
              value={searchAdm}
              onChange={(e) => setSearchAdm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              placeholder="e.g. ADM2024001"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Class</label>
            <div className="relative">
              <select
                value={selClass}
                onChange={(e) => setSelClass(e.target.value)}
                className={selectCls}
              >
                <option value="">All Classes</option>
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronRight
                size={12}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Section</label>
            <div className="relative">
              <select
                value={selSection}
                onChange={(e) => setSelSection(e.target.value)}
                className={selectCls}
              >
                <option value="">All Sections</option>
                {SECTION_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronRight
                size={12}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Gender</label>
            <div className="relative">
              <select
                value={selGender}
                onChange={(e) => setSelGender(e.target.value)}
                className={selectCls}
              >
                <option value="">All Genders</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronRight
                size={12}
                className={`absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={doSearch}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: isDark
                ? "linear-gradient(135deg,#4338ca,#6d28d9)"
                : "linear-gradient(135deg,#4f46e5,#7c3aed)",
              boxShadow: isDark
                ? "0 4px 14px rgba(67,56,202,0.4)"
                : "0 4px 16px rgba(79,70,229,0.45)",
            }}
          >
            <Search size={13} /> Search Students
          </button>
          <button
            onClick={doShowAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: isDark
                ? "linear-gradient(135deg,#0f766e,#0284c7)"
                : "linear-gradient(135deg,#0d9488,#0891b2)",
              boxShadow: isDark
                ? "0 4px 14px rgba(15,118,110,0.4)"
                : "0 4px 16px rgba(13,148,136,0.4)",
            }}
          >
            <Users size={13} /> View All Students
          </button>
          {(anyActive || showResults) && (
            <button
              onClick={doReset}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all hover:scale-105 active:scale-95 ${isDark ? "text-gray-400 border-gray-700 hover:bg-gray-800" : "text-rose-500 border-rose-200 bg-rose-50 hover:bg-rose-100"}`}
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${isDark ? "bg-gray-800 text-gray-300" : "bg-violet-50 text-violet-700 border border-violet-200"}`}
                >
                  <Users size={12} />
                  {results.length} student{results.length !== 1 ? "s" : ""}{" "}
                  found
                </div>
                {results.filter((s) => s.status === "Active").length > 0 && (
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${isDark ? "bg-gray-800 text-gray-400" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}
                  >
                    <UserCheck size={12} />
                    {results.filter((s) => s.status === "Active").length} Active
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    Show
                  </span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] border outline-none font-medium ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-600 shadow-sm"}`}
                  >
                    {PAGE_SIZES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span
                    className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    per page
                  </span>
                </div>

                {/* Customize Columns button + dropdown */}
                <ColumnCustomizer
                  open={customizerOpen}
                  onClose={() => setCustomizerOpen((v) => !v)}
                  visibleKeys={visibleKeys}
                  onChange={setVisibleKeys}
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Table */}
            <div
              className={`rounded-2xl border overflow-hidden ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-md shadow-gray-100"}`}
            >
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-gray-800" : "bg-violet-50"}`}
                  >
                    <GraduationCap
                      size={24}
                      className={isDark ? "text-gray-600" : "text-violet-300"}
                    />
                  </div>
                  <p
                    className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  >
                    No students found
                  </p>
                  <button
                    onClick={doReset}
                    className={`text-xs font-semibold mt-1 ${isDark ? "text-indigo-400" : "text-violet-500"} hover:underline`}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr
                          className={
                            isDark
                              ? "bg-gray-800/70"
                              : "bg-gradient-to-r from-violet-50 to-indigo-50"
                          }
                        >
                          {orderedVisibleCols.map((col) => (
                            <th
                              key={col.key}
                              className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${isDark ? "text-gray-500" : "text-violet-500"}`}
                            >
                              {col.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody
                        className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}
                      >
                        {paginated.map((s, rowIdx) => (
                          <motion.tr
                            key={s.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: rowIdx * 0.03 }}
                            className={`transition-colors ${isDark ? "hover:bg-gray-800/50" : "hover:bg-violet-50/40"}`}
                          >
                            {orderedVisibleCols.map((col, i) =>
                              renderCell(s, col.key, i, rowIdx),
                            )}
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div
                      className={`flex items-center justify-between px-5 py-3 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}
                    >
                      <span
                        className={`text-[11px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
                      >
                        Showing {(currentPage - 1) * pageSize + 1}–
                        {Math.min(currentPage * pageSize, results.length)} of{" "}
                        {results.length}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-500 hover:bg-violet-100"}`}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${currentPage === p ? "text-white" : isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-500 hover:bg-violet-100"}`}
                            style={
                              currentPage === p
                                ? {
                                    background: isDark
                                      ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                                      : "linear-gradient(135deg,#6366f1,#a855f7)",
                                  }
                                : {}
                            }
                          >
                            {p}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-500 hover:bg-violet-100"}`}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-20 gap-4 ${isDark ? "border-gray-800" : "border-violet-200"}`}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: isDark
                ? "#1e1b4b"
                : "linear-gradient(135deg,#6366f1,#a855f7)",
            }}
          >
            <GraduationCap size={26} className="text-white" />
          </div>
          <div className="text-center">
            <p
              className={`text-sm font-bold ${isDark ? "text-gray-400" : "text-gray-700"}`}
            >
              Search or view all students
            </p>
            <p
              className={`text-xs mt-1 max-w-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}
            >
              Use filters and click{" "}
              <span
                className={`font-bold ${isDark ? "text-indigo-400" : "text-violet-600"}`}
              >
                Search Students
              </span>{" "}
              or click{" "}
              <span
                className={`font-bold ${isDark ? "text-sky-400" : "text-teal-600"}`}
              >
                View All Students
              </span>
            </p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {viewStudent && (
          <ViewModal
            student={viewStudent}
            onClose={() => setViewStudent(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
