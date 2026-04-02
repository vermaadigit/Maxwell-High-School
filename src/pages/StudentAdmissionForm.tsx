import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  MapPin,
  DollarSign,
  ChevronDown,
  Upload,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ── Reusable Components ──────────────────────────────────────

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
      className={`block text-[11px] font-bold mb-1 tracking-wide uppercase
      ${isDark ? "text-gray-400" : "text-gray-800"}`}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
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
      className={`w-full px-2.5 py-1.5 rounded-lg text-xs border outline-none transition-all duration-200
        ${
          isDark
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
            : "bg-white border-gray-400 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/15"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
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
        className={`w-full px-2.5 py-1.5 rounded-lg text-xs border outline-none transition-all duration-200 appearance-none pr-7
          ${
            isDark
              ? "bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
              : "bg-white border-gray-400 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/15"
          }
          ${!value ? (isDark ? "text-gray-500" : "text-gray-400") : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
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
        className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none
        ${isDark ? "text-gray-500" : "text-gray-400"}`}
      />
    </div>
  );
}

function PhotoUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
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
  return (
    <div>
      <Label>{label}</Label>
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center w-20 h-20 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden
          ${isDark ? "border-gray-700 hover:border-indigo-500 bg-gray-800" : "border-gray-300 hover:border-indigo-400 bg-gray-50"}`}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Trash2 size={8} className="text-white" />
            </button>
          </>
        ) : (
          <>
            <Upload
              size={16}
              className={isDark ? "text-gray-600" : "text-gray-400"}
            />
            <span
              className={`text-[9px] mt-1 font-medium ${isDark ? "text-gray-600" : "text-gray-400"}`}
            >
              Upload
            </span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
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
        <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
          <div
            onClick={() => onChange(opt)}
            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all
              ${value === opt ? "border-indigo-500 bg-indigo-500" : isDark ? "border-gray-600" : "border-gray-400"}`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span
            className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {opt}
          </span>
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
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all
          ${checked ? "bg-indigo-600 border-indigo-600" : isDark ? "border-gray-600" : "border-gray-400"}`}
      >
        {checked && (
          <svg width="8" height="8" viewBox="0 0 9 9" fill="none">
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
      <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {label}
      </span>
    </label>
  );
}

// ── Section Accordion ────────────────────────────────────────

function Section({
  title,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`rounded-xl border overflow-hidden
      ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2.5 px-4 py-3 text-left transition-colors
          ${isDark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
      >
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18` }}
        >
          <Icon size={13} style={{ color }} />
        </div>
        <span
          className={`font-bold text-xs flex-1 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            size={14}
            className={isDark ? "text-gray-500" : "text-gray-400"}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              className={`px-4 pb-4 pt-2 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Grid Helpers ─────────────────────────────────────────────
const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
);
const G3 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {children}
  </div>
);
const G4 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {children}
  </div>
);

// ── Sub-section heading ──────────────────────────────────────
function SubHeading({ label, color }: { label: string; color: string }) {
  return (
    <p
      className="text-[10px] font-black uppercase tracking-widest mb-3"
      style={{ color }}
    >
      {label}
    </p>
  );
}

// ── Main Component ───────────────────────────────────────────

export default function StudentAdmissionForm() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);

  // 1.0 Student Detail
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
  const [siblings, setSiblings] = useState<{ name: string; cls: string }[]>([]);
  const [studentPhoto, setStudentPhoto] = useState<string | null>(null);

  // 2.0 Custom Fields
  const [penNumber, setPenNumber] = useState("");
  const [apaarId, setApaarId] = useState("");

  // 3.0 Parents / Guardian
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

  // Address
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

  // Fee
  const [feeGroup, setFeeGroup] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountList, setDiscountList] = useState("");
  const [feeMonth, setFeeMonth] = useState("");

  const addSibling = () => setSiblings([...siblings, { name: "", cls: "" }]);
  const removeSibling = (i: number) =>
    setSiblings(siblings.filter((_, idx) => idx !== i));
  const updateSibling = (i: number, field: "name" | "cls", val: string) =>
    setSiblings(
      siblings.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)),
    );

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setAdmissionNo("");
    setCls("");
    setSection("");
    setRollNumber("");
    setBiometricId("");
    setAdmissionDate("");
    setGender("");
    setDob("");
    setCategory("");
    setReligion("");
    setCaste("");
    setMobile("");
    setEmail("");
    setBloodGroup("");
    setHouse("");
    setHeight("");
    setWeight("");
    setAadhar("");
    setAdmittedClass("");
    setAsOnDate("");
    setReferralBy("");
    setSiblings([]);
    setStudentPhoto(null);
    setPenNumber("");
    setApaarId("");
    setFatherName("");
    setFatherMobile("");
    setFatherDob("");
    setFatherOccupation("");
    setFatherPhoto(null);
    setMarriageAnniversary("");
    setMotherName("");
    setMotherMobile("");
    setMotherDob("");
    setMotherOccupation("");
    setMotherPhoto(null);
    setGuardianType("Father");
    setGuardianName("");
    setGuardianRelation("");
    setGuardianEmail("");
    setGuardianMobile("");
    setGuardianAddress1("");
    setGuardianAddress2("");
    setGuardianIsCurrent(false);
    setPermanentIsCurrent(false);
    setCurrentAddress({ line1: "", line2: "", city: "", state: "", pin: "" });
    setPermanentAddress({ line1: "", line2: "", city: "", state: "", pin: "" });
    setFeeGroup("");
    setDiscount("");
    setDiscountList("");
    setFeeMonth("");
  };

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`text-center max-w-sm p-8 rounded-2xl
            ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100 shadow-xl"}`}
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-emerald-600" />
          </div>
          <h2
            className={`text-base font-bold mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Admission Submitted!
          </h2>
          <p
            className={`text-xs mb-5 ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            Student admission form has been successfully submitted for review.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2 rounded-lg text-xs font-semibold text-white transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            Add Another Student
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-full ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Page Header */}
      <div
        className={`sticky top-0 z-20 px-4 py-2.5 border-b flex items-center justify-between
        ${isDark ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"}`}
      >
        <div>
          <div
            className={`flex items-center gap-1.5 text-[10px] mb-0.5
            ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            <span>Student</span>
            <ChevronRight size={10} />
            <span
              className={`font-semibold ${isDark ? "text-gray-300" : "text-gray-600"}`}
            >
              Admission Form
            </span>
          </div>
          <h1
            className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Student Admission Form
          </h1>
        </div>
        <div className="flex items-center gap-2">
         {/*  <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
              ${
                isDark
                  ? "text-gray-400 bg-gray-800 hover:bg-gray-700"
                  : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
              }`}
          >
            <RotateCcw size={12} />
            Reset
          </button> */}
        {/*   <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            Submit Admission
          </button> */}
        </div>
      </div>

      {/* Form Body */}
      <div className="px-4 py-4 space-y-3">
        {/* 1.0 Student Detail */}
        <Section title="1.0 Student Details" icon={User} color="#6366f1">
          <div className="space-y-3">
            <G4>
              <Field label="Admission No." required>
                <TextInput
                  value={admissionNo}
                  onChange={setAdmissionNo}
                  placeholder="e.g. ADM2024001"
                />
              </Field>
              <Field label="Class" required>
                <SelectInput
                  value={cls}
                  onChange={setCls}
                  placeholder="Select Class"
                  options={[
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
                  ]}
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
                  options={[
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
                  ]}
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

            <div className={`h-px ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />

            <div className="flex flex-wrap gap-4 items-start">
              <PhotoUpload
                label="Student Photo"
                value={studentPhoto}
                onChange={setStudentPhoto}
              />
              <div className="flex-1 min-w-0 space-y-3">
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
                      options={[
                        "A+",
                        "A-",
                        "B+",
                        "B-",
                        "AB+",
                        "AB-",
                        "O+",
                        "O-",
                      ]}
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
                  placeholder="Height in cm"
                />
              </Field>
              <Field label="Weight (kg)">
                <TextInput
                  value={weight}
                  onChange={setWeight}
                  placeholder="Weight in kg"
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
                <Label>Add Sibling</Label>
                <button
                  onClick={addSibling}
                  className="flex items-center gap-1 text-[11px] font-semibold text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  <Plus size={11} /> Add Sibling
                </button>
              </div>
              {siblings.length === 0 ? (
                <div
                  className={`text-[11px] py-2.5 px-3 rounded-lg border border-dashed text-center
                  ${isDark ? "text-gray-600 border-gray-700" : "text-gray-400 border-gray-300"}`}
                >
                  No siblings added yet.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {siblings.map((s, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <TextInput
                        value={s.name}
                        onChange={(v) => updateSibling(i, "name", v)}
                        placeholder="Sibling Name"
                      />
                      <SelectInput
                        value={s.cls}
                        onChange={(v) => updateSibling(i, "cls", v)}
                        placeholder="Class"
                        options={[
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
                        ]}
                      />
                      <button
                        onClick={() => removeSibling(i)}
                        className="text-red-400 hover:text-red-500 flex-shrink-0"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* 2.0 Custom Fields */}
        <Section title="2.0 Custom Fields" icon={AlertCircle} color="#0ea5e9">
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
        >
          <div className="space-y-4">
            {/* Father */}
            <SubHeading label="Father's Information" color="#6366f1" />
            <div className="flex flex-wrap gap-4 items-start">
              <PhotoUpload
                label="Father Photo"
                value={fatherPhoto}
                onChange={setFatherPhoto}
              />
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
            </div>

            <div className={`h-px ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />

            {/* Mother */}
            <SubHeading label="Mother's Information" color="#ec4899" />
            <div className="flex flex-wrap gap-4 items-start">
              <PhotoUpload
                label="Mother Photo"
                value={motherPhoto}
                onChange={setMotherPhoto}
              />
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
            </div>

            <div className={`h-px ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />

            {/* Guardian */}
            <SubHeading label="Guardian Information" color="#10b981" />
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

        {/* Address */}
        <Section title="Student Address Details" icon={MapPin} color="#10b981">
          <div className="space-y-4">
            {/* Current Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <SubHeading label="Current Address" color="#10b981" />
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
                      options={[
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
                      ]}
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

            <div className={`h-px ${isDark ? "bg-gray-800" : "bg-gray-100"}`} />

            {/* Permanent Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <SubHeading label="Permanent Address" color="#3b82f6" />
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
                      options={[
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
                      ]}
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

        {/* Fee */}
        <Section title="Student Fee Assign" icon={DollarSign} color="#8b5cf6">
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

        {/* Submit Bar */}
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-xl border
          ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}
        >
          <div className="flex items-center gap-1.5">
            <AlertCircle
              size={12}
              className={isDark ? "text-gray-600" : "text-gray-400"}
            />
            <span
              className={`text-[11px] ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                ${isDark ? "text-gray-400 bg-gray-800 hover:bg-gray-700" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
            >
              <RotateCcw size={11} /> Reset Form
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
              }}
            >
              Submit Admission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
