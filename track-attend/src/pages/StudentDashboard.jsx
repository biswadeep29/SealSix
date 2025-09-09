import { useState } from "react";
import { LogOut, Calendar, BookOpen } from "lucide-react"; // icons

export default function StudentDashboard() {
  const [attendance] = useState([
    { subject: "Math", attended: 18, total: 20 },
    { subject: "Science", attended: 15, total: 20 },
    { subject: "History", attended: 10, total: 20 },
  ]);

  const calculatePercentage = (attended, total) =>
    ((attended / total) * 100).toFixed(1);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Student Dashboard</h2>
        <nav className="flex-1 space-y-4">
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-600"
          >
            <Calendar className="w-5 h-5" /> Attendance
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-600"
          >
            <BookOpen className="w-5 h-5" /> Subjects
          </a>
        </nav>
        <button className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Student</h1>
        <p className="text-gray-600 mb-6">
          Here’s an overview of your attendance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendance.map((subj, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold mb-2">{subj.subject}</h3>
              <p className="text-gray-600">
                {subj.attended}/{subj.total} classes attended
              </p>
              <p
                className={`mt-3 text-lg font-bold ${
                  calculatePercentage(subj.attended, subj.total) >= 75
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {calculatePercentage(subj.attended, subj.total)}%
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
