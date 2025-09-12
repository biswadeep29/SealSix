import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  ClipboardList,
  PlayCircle,
  PlusCircle,
  X,
  MoreVertical,
  Trash2,
  AlertTriangle,
  LineChart,
  UserPlus,
  Edit,
} from "lucide-react";

const MiniCircularProgress = ({ percentage, size = 32 }) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 75 ? "text-green-600" : "text-red-600";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-500 ease-in-out ${color}`}
        />
      </svg>
      <span className={`absolute text-xs font-bold ${color}`}>
        {Math.round(percentage)}
      </span>
    </div>
  );
};

const DetailedTrendChart = ({ subject, sessionHistory, totalStudents }) => {
    const data = sessionHistory.slice(-10);
    if (data.length < 2) {
        return <div className="text-center text-sm text-gray-400 py-4">Not enough data for a trend.</div>;
    }

    const chartWidth = 500;
    const chartHeight = 250;
    const padding = 50;

    const points = data.map((session, i) => {
        const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
        const y = chartHeight - padding - ((session.present / totalStudents) * 100 / 100) * (chartHeight - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    const yAxisLabels = [0, 25, 50, 75, 100];

    return (
        <div className="mb-8">
            <h4 className="text-lg font-semibold text-center mb-2">{subject} Attendance Trend</h4>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#d1d5db" />
                <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#d1d5db" />
                
                {yAxisLabels.map(label => {
                    const y = chartHeight - padding - (label / 100) * (chartHeight - padding * 2);
                    return (
                        <g key={label}>
                            <text x={padding - 10} y={y + 5} textAnchor="end" fill="#6b7280" fontSize="12">{label}%</text>
                            <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e5e7eb" strokeDasharray="2" />
                        </g>
                    )
                })}

                {data.map((session, i) => {
                    const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
                    return (
                        <text key={i} x={x} y={chartHeight - padding + 20} textAnchor="middle" fill="#6b7280" fontSize="10">
                            {new Date(session.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                        </text>
                    );
                })}
                
                <polyline fill="none" stroke="#16a34a" strokeWidth="2" points={points} />
                {data.map((session, i) => {
                    const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
                    const y = chartHeight - padding - ((session.present / totalStudents) * 100 / 100) * (chartHeight - padding * 2);
                    return <circle key={i} cx={x} cy={y} r="3" fill="#16a34a" />;
                })}
            </svg>
        </div>
    );
};

export default function TeacherDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate();

  const [studentsBySubject, setStudentsBySubject] = useState({
    Math: [
      { name: "Alice", rollNo: 101, attended: 18, total: 20 },
      { name: "Bob", rollNo: 102, attended: 14, total: 20 },
      { name: "Charlie", rollNo: 103, attended: 20, total: 20 },
      { name: "David", rollNo: 104, attended: 9, total: 20 },
    ],
    Science: [
      { name: "Alice", rollNo: 101, attended: 15, total: 20 },
      { name: "Bob", rollNo: 102, attended: 16, total: 20 },
      { name: "Charlie", rollNo: 103, attended: 14, total: 20 },
      { name: "Eve", rollNo: 105, attended: 19, total: 20 },
    ],
  });
  
  const atRiskStudents = useMemo(() => {
    const students = [];
    const seen = new Set();
    Object.keys(studentsBySubject).forEach(subject => {
        studentsBySubject[subject].forEach(student => {
            const percentage = (student.attended / student.total) * 100;
            if (percentage < 75 && !seen.has(student.rollNo)) {
                students.push({ ...student, subject });
                seen.add(student.rollNo);
            }
        });
    });
    return students;
  }, [studentsBySubject]);

  const handleRemoveStudent = (subject, rollNoToRemove) => {
    setStudentsBySubject((prevStudents) => {
      const updatedSubjectList = prevStudents[subject].filter(
        (student) => student.rollNo !== rollNoToRemove
      );
      return { ...prevStudents, [subject]: updatedSubjectList };
    });
  };

  const [classes, setClasses] = useState({
    "Math": { totalStudents: 40, sessionHistory: [
            { date: "2025-08-20", present: 30 }, { date: "2025-08-22", present: 32 },
            { date: "2025-08-25", present: 28 }, { date: "2025-08-27", present: 35 },
            { date: "2025-08-29", present: 36 }, { date: "2025-09-01", present: 33 },
            { date: "2025-09-03", present: 37 }, { date: "2025-09-05", present: 38 },
            { date: "2025-09-08", present: 35 }, { date: "2025-09-10", present: 31 },
        ]
    },
    "Science": { totalStudents: 40, sessionHistory: [
            { date: "2025-08-21", present: 38 }, { date: "2025-08-23", present: 35 },
            { date: "2025-08-26", present: 36 }, { date: "2025-08-28", present: 32 },
            { date: "2025-09-02", present: 31 }, { date: "2025-09-04", present: 28 },
            { date: "2025-09-06", present: 30 }, { date: "2025-09-09", present: 25 },
        ]
    },
  });

  const [openMenuKey, setOpenMenuKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedConstraints, setSelectedConstraints] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAtRiskModalOpen, setIsAtRiskModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: "", rollNo: "", email: "" });
  const [renameValue, setRenameValue] = useState("");

  const toggleConstraint = (constraint) => setSelectedConstraints(prev => prev.includes(constraint) ? prev.filter(c => c !== constraint) : [...prev, constraint]);
  const handleGenerateQR = () => { if (selectedClass) navigate(`/teacher/session/${encodeURIComponent(selectedClass)}`); };
  const calculatePercentage = (present, total) => total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  const handleLogout = () => navigate("/");

  const handleAddClass = () => {
    if (newClassName.trim() !== "") {
        const subjectKey = newClassName.trim();
        setClasses(prev => ({ ...prev, [subjectKey]: { totalStudents: 40, sessionHistory: [{ date: new Date().toISOString().split("T")[0], present: 0 }] }}));
        setStudentsBySubject(prev => ({ ...prev, [subjectKey]: [] }));
        setNewClassName("");
        setIsModalOpen(false);
    }
  };

  const handleRemoveClass = (subjectKey) => {
    setClasses(prev => {
        const newClasses = { ...prev };
        delete newClasses[subjectKey];
        return newClasses;
    });
    setStudentsBySubject(prev => {
        const newStudents = { ...prev };
        delete newStudents[subjectKey];
        return newStudents;
    });
    setOpenMenuKey(null);
  };
  
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNo) return;
    setStudentsBySubject(prev => ({
        ...prev,
        [currentClass]: [...(prev[currentClass] || []), { ...newStudent, attended: 0, total: 0, rollNo: parseInt(newStudent.rollNo) }]
    }));
    setNewStudent({ name: "", rollNo: "", email: "" });
    setIsAddStudentModalOpen(false);
    setCurrentClass(null);
  }

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    const newName = renameValue.trim();
    if (!newName || newName === currentClass) return;

    setClasses(prev => {
        const newClasses = { ...prev };
        const data = newClasses[currentClass];
        delete newClasses[currentClass];
        newClasses[newName] = data;
        return newClasses;
    });
     setStudentsBySubject(prev => {
        const newStudents = { ...prev };
        const data = newStudents[currentClass];
        delete newStudents[currentClass];
        newStudents[newName] = data;
        return newStudents;
    });

    setRenameValue("");
    setIsRenameModalOpen(false);
    setCurrentClass(null);
  }

  const renderOverview = () => {
    const classEntries = Object.entries(classes);
    return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <PlusCircle size={18} /> Start New Class
        </button>
        <button onClick={() => setIsAtRiskModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <AlertTriangle size={18} /> View At-Risk Students
        </button>
         <button onClick={() => setIsAnalysisModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <LineChart size={18} /> View Analysis
        </button>
      </div>

      <p className="text-gray-600 mb-6">Here’s an overview of your recent classes:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classEntries.map(([subject, classData]) => {
            const latestSession = classData.sessionHistory[classData.sessionHistory.length - 1];
            const attendancePercent = calculatePercentage(latestSession.present, classData.totalStudents);
            return (
              <div key={subject} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col relative">
                <div className="absolute top-4 right-4">
                  <button onClick={() => setOpenMenuKey(openMenuKey === subject ? null : subject)}>
                    <MoreVertical size={20} className="text-gray-500" />
                  </button>
                  {openMenuKey === subject && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                      <button onClick={() => { setIsAddStudentModalOpen(true); setCurrentClass(subject); setOpenMenuKey(null); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UserPlus size={16} /> Add Student
                      </button>
                      <button onClick={() => { setIsRenameModalOpen(true); setCurrentClass(subject); setRenameValue(subject); setOpenMenuKey(null); }} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Edit size={16} /> Rename Class
                      </button>
                      <button onClick={() => handleRemoveClass(subject)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <Trash2 size={16} /> Remove Class
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{subject}</h3>
                  <p className="text-gray-500 text-sm mb-2">Last class: {latestSession.date}</p>
                  <p className="text-gray-600">{latestSession.present}/{classData.totalStudents} present</p>
                  <p className={`mt-3 text-lg font-bold ${ attendancePercent >= 75 ? "text-green-600" : "text-red-600"}`}>
                    {attendancePercent}%
                  </p>
                </div>
                <button onClick={() => { setSelectedClass(subject); setIsAttendanceModalOpen(true); }}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                  <PlayCircle size={18} /> Take Attendance
                </button>
              </div>
        )})}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Start New Class</h2><button onClick={() => setIsModalOpen(false)}><X size={20} className="text-gray-600 hover:text-black" /></button></div>
            <input type="text" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="Enter class name" className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            <div className="flex justify-end gap-2"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button><button onClick={handleAddClass} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Add Class</button></div>
          </div>
        </div>
      )}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Choose attendance constraints</h2><button onClick={() => setIsAttendanceModalOpen(false)}><X size={20} className="text-gray-600 hover:text-black" /></button></div>
            <div className="space-y-3 mb-6">{["Face", "Location", "Biometrics"].map((constraint) => (<label key={constraint} className="flex items-center gap-2"><input type="checkbox" checked={selectedConstraints.includes(constraint)} onChange={() => toggleConstraint(constraint)}/><span>{constraint}</span></label>))}</div>
            <div className="flex justify-end"><button onClick={handleGenerateQR} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Generate QR Code</button></div>
          </div>
        </div>
      )}
       {isAtRiskModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] flex flex-col">
             <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold text-red-600">At-Risk Students Report</h2><button onClick={() => setIsAtRiskModalOpen(false)}><X size={20} className="text-gray-600 hover:text-black" /></button></div>
             <div className="overflow-y-auto">
                {atRiskStudents.length > 0 ? (
                    <ul className="space-y-2">
                        {atRiskStudents.map((student, idx) => (
                             <li key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                               <span className="font-bold">{student.name}</span> (Roll: {student.rollNo}) is at risk in <span className="font-semibold">{student.subject}</span> with {calculatePercentage(student.attended, student.total)}% attendance.
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-center text-gray-500 py-4">No students are currently at risk.</p>}
             </div>
           </div>
         </div>
       )}
        {isAnalysisModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
           <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl max-h-[90vh] flex flex-col">
             <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold text-gray-800">Attendance Analysis</h2><button onClick={() => setIsAnalysisModalOpen(false)}><X size={20} className="text-gray-600 hover:text-black" /></button></div>
             <div className="overflow-y-auto">
                {Object.entries(classes).map(([subject, classData]) => (
                    <DetailedTrendChart key={subject} subject={subject} sessionHistory={classData.sessionHistory} totalStudents={classData.totalStudents} />
                ))}
             </div>
           </div>
         </div>
       )}
       {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleAddStudentSubmit} className="bg-white rounded-xl shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Add Student to {currentClass}</h2><button type="button" onClick={() => setIsAddStudentModalOpen(false)}><X size={20} className="text-gray-600 hover:text-black" /></button></div>
            <div className="space-y-4">
                <input required type="text" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} placeholder="Student Name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                <input required type="number" value={newStudent.rollNo} onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})} placeholder="Roll No" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                <input type="email" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} placeholder="Email (Optional)" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div className="flex justify-end gap-2 mt-6"><button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button><button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Add Student</button></div>
          </form>
        </div>
       )}
       {isRenameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleRenameSubmit} className="bg-white rounded-xl shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Rename Class</h2><button type="button" onClick={() => setIsRenameModalOpen(false)}><X size={20} className="text-gray-600 hover:text-black" /></button></div>
            <input required type="text" value={renameValue} onChange={(e) => setRenameValue(e.target.value)} placeholder="Enter new class name" className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"/>
            <div className="flex justify-end gap-2"><button type="button" onClick={() => setIsRenameModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancel</button><button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Rename</button></div>
          </form>
        </div>
       )}
    </div>
    );
  };

  const renderStudentsView = () => (
    <div>
      <p className="text-gray-600 mb-6">Here is a list of enrolled students and their attendance per subject:</p>
      <div className="space-y-10">{Object.keys(studentsBySubject).map((subject) => (<div key={subject}><h2 className="text-2xl font-bold mb-4">{subject} Student List</h2><div className="bg-white shadow-lg rounded-2xl overflow-hidden h-96 overflow-y-auto"><table className="w-full"><thead className="sticky top-0 bg-gray-200 z-10"><tr><th className="text-left px-6 py-3">Name</th><th className="text-left px-6 py-3">Roll No</th><th className="text-left px-6 py-3">Attendance</th><th className="text-left px-6 py-3">Actions</th></tr></thead><tbody className="bg-white">{studentsBySubject[subject].map((student, idx) => (<tr key={idx} className="border-t"><td className="px-6 py-4 font-medium">{student.name}</td><td className="px-6 py-4">{student.rollNo}</td><td className="px-6 py-4"><MiniCircularProgress percentage={calculatePercentage(student.attended, student.total)}/></td><td className="px-6 py-4"><button onClick={() => handleRemoveStudent(subject, student.rollNo)} className="text-red-600 hover:text-red-800"><Trash2 size={20} /></button></td></tr>))}</tbody></table></div></div>))}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Teacher Dashboard</h2>
        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveView("overview")} className={`flex items-center gap-2 p-2 rounded w-full text-left ${activeView === "overview" ? "bg-green-600" : "hover:bg-green-600"}`}><ClipboardList className="w-5 h-5" /> Classes</button>
          <button onClick={() => setActiveView("students")} className={`flex items-center gap-2 p-2 rounded w-full text-left ${activeView === "students" ? "bg-green-600" : "hover:bg-green-600"}`}><Users className="w-5 h-5" /> Students</button>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600"><LogOut className="w-5 h-5" /> Logout</button>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Teacher</h1>
        {activeView === "overview" ? renderOverview() : renderStudentsView()}
      </main>
    </div>
  );
}
