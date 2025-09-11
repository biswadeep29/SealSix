import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, ClipboardList, PlayCircle } from "lucide-react"; // Added PlayCircle icon

// ... (Your MiniCircularProgress helper component remains the same) ...
const MiniCircularProgress = ({ percentage, size = 32 }) => {
    const radius = (size / 2) - 4; const circumference = 2 * Math.PI * radius; const offset = circumference - (percentage / 100) * circumference; const color = percentage >= 75 ? "text-green-600" : "text-red-600";
    return ( <div className="relative flex items-center justify-center" style={{ width: size, height: size }}> <svg className="transform -rotate-90 w-full h-full"> <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-200" /> <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} className={`transition-all duration-500 ease-in-out ${color}`} /> </svg> <span className={`absolute text-xs font-bold ${color}`}>{Math.round(percentage)}</span> </div> );
};

export default function TeacherDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const navigate = useNavigate();

  // ... (Your studentsBySubject and classes data remains the same) ...
  const [studentsBySubject] = useState({ Math: [ { name: "Alice", rollNo: 101, attended: 18, total: 20 }, { name: "Bob", rollNo: 102, attended: 14, total: 20 }, { name: "Charlie", rollNo: 103, attended: 20, total: 20 }, { name: "David", rollNo: 104, attended: 19, total: 20 }, { name: "Eve", rollNo: 105, attended: 15, total: 20 }, { name: "Frank", rollNo: 106, attended: 16, total: 20 }, { name: "Grace", rollNo: 107, attended: 13, total: 20 }, { name: "Heidi", rollNo: 108, attended: 17, total: 20 }, { name: "Ivan", rollNo: 109, attended: 18, total: 20 }, { name: "Judy", rollNo: 110, attended: 12, total: 20 }, ], Science: [ { name: "Alice", rollNo: 101, attended: 15, total: 20 }, { name: "Bob", rollNo: 102, attended: 16, total: 20 }, { name: "Charlie", rollNo: 103, attended: 14, total: 20 }, { name: "David", rollNo: 104, attended: 17, total: 20 }, { name: "Eve", rollNo: 105, attended: 18, total: 20 }, { name: "Frank", rollNo: 106, attended: 11, total: 20 }, { name: "Grace", rollNo: 107, attended: 19, total: 20 }, { name: "Heidi", rollNo: 108, attended: 20, total: 20 }, { name: "Ivan", rollNo: 109, attended: 13, total: 20 }, { name: "Judy", rollNo: 110, attended: 15, total: 20 }, ], History: [ { name: "Alice", rollNo: 101, attended: 10, total: 20 }, { name: "Bob", rollNo: 102, attended: 12, total: 20 }, { name: "Charlie", rollNo: 103, attended: 18, total: 20 }, { name: "David", rollNo: 104, attended: 16, total: 20 }, { name: "Eve", rollNo: 105, attended: 14, total: 20 }, { name: "Frank", rollNo: 106, attended: 17, total: 20 }, { name: "Grace", rollNo: 107, attended: 19, total: 20 }, { name: "Heidi", rollNo: 108, attended: 15, total: 20 }, { name: "Ivan", rollNo: 109, attended: 13, total: 20 }, { name: "Judy", rollNo: 110, attended: 11, total: 20 }, ], });
  const [classes] = useState([ { subject: "Math", date: "2025-09-09", totalStudents: 40, present: 35 }, { subject: "Science", date: "2025-09-08", totalStudents: 40, present: 30 }, { subject: "History", date: "2025-09-07", totalStudents: 40, present: 28 }, ]);
  
  const calculatePercentage = (present, total) => ((present / total) * 100).toFixed(1);
  const handleLogout = () => navigate("/");

  const renderOverview = () => (
    <div>
      <p className="text-gray-600 mb-6">Here’s an overview of your recent classes:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{cls.subject}</h3>
              <p className="text-gray-500 text-sm mb-2">Date: {cls.date}</p>
              <p className="text-gray-600">{cls.present}/{cls.totalStudents} present</p>
              <p className={`mt-3 text-lg font-bold ${calculatePercentage(cls.present, cls.totalStudents) >= 75 ? "text-green-600" : "text-red-600"}`}>
                {calculatePercentage(cls.present, cls.totalStudents)}%
              </p>
            </div>
            {/* --- ADDED: Start Session Button --- */}
            <button 
              onClick={() => navigate(`/teacher/session/${cls.subject}`)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <PlayCircle size={18} /> Take Attendance
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentsView = () => (
    <div>
      <p className="text-gray-600 mb-6">Here is a list of enrolled students and their attendance per subject:</p>
      <div className="space-y-10">
        {Object.keys(studentsBySubject).map(subject => (
          <div key={subject}>
            <h2 className="text-2xl font-bold mb-4">{subject} Student List</h2>
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden h-96 overflow-y-auto">
              <table className="w-full">
                {/* --- FIXED: Added bg-gray-200 to the thead for solid background --- */}
                <thead className="sticky top-0 bg-gray-200 z-10">
                  <tr>
                    <th className="text-left px-6 py-3">Name</th>
                    <th className="text-left px-6 py-3">Roll No</th>
                    <th className="text-left px-6 py-3">Attendance</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {studentsBySubject[subject].map((student, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-6 py-4 font-medium">{student.name}</td>
                      <td className="px-6 py-4">{student.rollNo}</td>
                      <td className="px-6 py-4">
                        <MiniCircularProgress 
                          percentage={calculatePercentage(student.attended, student.total)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6">
        {/* ... (Sidebar is the same) ... */}
        <h2 className="text-2xl font-bold mb-8">Teacher Dashboard</h2>
        <nav className="flex-1 space-y-4">
          <button onClick={() => setActiveView("overview")} className={`flex items-center gap-2 p-2 rounded w-full text-left ${activeView === 'overview' ? 'bg-green-600' : 'hover:bg-green-600'}`}><ClipboardList className="w-5 h-5" /> Classes</button>
          <button onClick={() => setActiveView("students")} className={`flex items-center gap-2 p-2 rounded w-full text-left ${activeView === 'students' ? 'bg-green-600' : 'hover:bg-green-600'}`}><Users className="w-5 h-5" /> Students</button>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600"><LogOut className="w-5 h-5" /> Logout</button>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Teacher</h1>
        {activeView === 'overview' ? renderOverview() : renderStudentsView()}
      </main>
    </div>
  );
}

