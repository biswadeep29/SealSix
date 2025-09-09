import { useState } from "react";
import { LogOut, Users, ClipboardList } from "lucide-react";

export default function TeacherDashboard() {
  const [classes] = useState([
    {
      subject: "Math",
      date: "2025-09-09",
      totalStudents: 40,
      present: 35,
    },
    {
      subject: "Science",
      date: "2025-09-08",
      totalStudents: 40,
      present: 30,
    },
    {
      subject: "History",
      date: "2025-09-07",
      totalStudents: 40,
      present: 28,
    },
  ]);

  const calculatePercentage = (present, total) =>
    ((present / total) * 100).toFixed(1);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Teacher Dashboard</h2>
        <nav className="flex-1 space-y-4">
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded hover:bg-green-600"
          >
            <ClipboardList className="w-5 h-5" /> Classes
          </a>
          <a
            href="#"
            className="flex items-center gap-2 p-2 rounded hover:bg-green-600"
          >
            <Users className="w-5 h-5" /> Students
          </a>
        </nav>
        <button className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Teacher</h1>
        <p className="text-gray-600 mb-6">
          Here’s an overview of your recent classes:
        </p>

        {/* Classes Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {classes.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold mb-1">{cls.subject}</h3>
              <p className="text-gray-500 text-sm mb-2">Date: {cls.date}</p>
              <p className="text-gray-600">
                {cls.present}/{cls.totalStudents} present
              </p>
              <p
                className={`mt-3 text-lg font-bold ${
                  calculatePercentage(cls.present, cls.totalStudents) >= 75
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {calculatePercentage(cls.present, cls.totalStudents)}%
              </p>
            </div>
          ))}
        </div>

        {/* Student List (example) */}
        <h2 className="text-2xl font-bold mb-4">Student List (Math)</h2>
        <table className="w-full bg-white shadow-lg rounded-2xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Roll No</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Alice</td>
              <td className="px-4 py-2">101</td>
              <td className="px-4 py-2 text-green-600 font-medium">Present</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Bob</td>
              <td className="px-4 py-2">102</td>
              <td className="px-4 py-2 text-red-600 font-medium">Absent</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Charlie</td>
              <td className="px-4 py-2">103</td>
              <td className="px-4 py-2 text-green-600 font-medium">Present</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
