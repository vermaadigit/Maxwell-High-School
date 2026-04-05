import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  MapPin,
  DollarSign,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Camera,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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

export default function StudentAdmissionForm() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);

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

  const addSibling = () => setSiblings([...siblings, { name: "", cls: "" }]);
  const removeSibling = (i: number) =>
    setSiblings(siblings.filter((_, idx) => idx !== i));
  const updateSibling = (i: number, field: "name" | "cls", val: string) =>
    setSiblings(
      siblings.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)),
    );

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`text-center max-w-sm p-10 rounded-3xl
            ${isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-violet-100 shadow-2xl"}`}
        >
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
            className={`text-xs mb-6 leading-relaxed ${isDark ? "text-gray-500" : "text-slate-500"}`}
          >
            Student admission form has been successfully submitted for review by
            the administration.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              boxShadow: "0 8px 20px rgba(124,58,237,0.35)",
            }}
          >
            + Add Another Student
          </button>
        </motion.div>
      </div>
    );
  }

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

  return (
    <div
      className="min-h-full"
      style={!isDark ? { background: "#ffffff" } : { background: "#030712" }}
    >
      {/* FORM BODY */}
      <div className="px-5 py-4 space-y-3">
        {/* 1.0 Student Details */}
        <Section
          title="1.0 Student Details"
          icon={User}
          color="#7c3aed"
          badge="Required"
          gradientFrom="#7c3aed"
          gradientTo="#db2777"
        >
          <div className="space-y-4">
            {/* TOP: two field rows + photo */}
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

            {/* Personal info */}
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

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Siblings</Label>
                <button
                  onClick={addSibling}
                  className="flex items-center gap-1 text-[11px] font-bold text-violet-600 hover:text-violet-700 transition-colors px-2 py-1 rounded-lg hover:bg-violet-50"
                >
                  <Plus size={11} /> Add Sibling
                </button>
              </div>
              {siblings.length === 0 ? (
                <div
                  className={`text-[11px] py-3 px-4 rounded-xl border-2 border-dashed text-center
                  ${isDark ? "text-gray-600 border-gray-700" : "text-violet-400 border-violet-200 bg-violet-50/40"}`}
                >
                  No siblings added yet. Click "Add Sibling" to add.
                </div>
              ) : (
                <div className="space-y-2">
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
                        options={classOptions}
                      />
                      <button
                        onClick={() => removeSibling(i)}
                        className="text-red-400 hover:text-red-500 flex-shrink-0 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* 2.0 Custom Fields */}
        <Section
          title="2.0 Custom Fields"
          icon={AlertCircle}
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
              gradientTo="#db2777"
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
              color="#db2777"
              gradientFrom="#db2777"
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

        {/* Address */}
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

        {/* Fee */}
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
      </div>
    </div>
  );
}
