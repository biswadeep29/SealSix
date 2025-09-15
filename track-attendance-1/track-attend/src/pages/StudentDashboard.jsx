// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   LogOut,
//   Calendar,
//   LayoutDashboard,
//   AlertTriangle,
//   ShieldCheck,
//   X,
//   TrendingUp,
// } from "lucide-react";

// const CircularProgress = ({ percentage }) => {
//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;
//   const color = percentage >= 75 ? "text-green-600" : "text-red-600";

//   return (
//     <div className="relative flex items-center justify-center w-32 h-32">
//       <svg className="transform -rotate-90 w-full h-full">
//         <circle
//           cx="64"
//           cy="64"
//           r={radius}
//           stroke="currentColor"
//           strokeWidth="10"
//           fill="transparent"
//           className="text-gray-200"
//         />
//         <circle
//           cx="64"
//           cy="64"
//           r={radius}
//           stroke="currentColor"
//           strokeWidth="10"
//           fill="transparent"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           className={`transition-all duration-500 ease-in-out ${color}`}
//         />
//       </svg>
//       <span className={`absolute text-2xl font-bold ${color}`}>
//         {percentage}%
//       </span>
//     </div>
//   );
// };

// const AttendanceStatusModal = ({ isOpen, onClose, percentage }) => {
//   if (!isOpen) return null;
//   const isSafe = percentage >= 75;
//   const statusColor = isSafe ? "text-green-600" : "text-red-600";
//   const Icon = isSafe ? ShieldCheck : AlertTriangle;
//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
//       justify-center z-50"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white rounded-2xl shadow-lg p-8 w-full 
//         max-w-md text-center relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 
//           hover:text-gray-600"
//         >
//           <X size={24} />
//         </button>
//         <Icon size={48} className={`mx-auto mb-4 ${statusColor}`} />
//         <h3 className={`text-2xl font-bold mb-2 ${statusColor}`}>
//           {isSafe ? "Attendance Status: Safe" : "Attendance Warning"}
//         </h3>
//         <p className="text-gray-600">
//           {isSafe
//             ? `Congratulations! Your overall attendance 
//             is ${percentage}%, which is above the required threshold. Keep up the good work!`
//             : `Your 
//             overall attendance is ${percentage}%, which is below the required 75%. Please attend classes 
//             regularly to avoid any issues.`}
//         </p>
//         <button
//           onClick={onClose}
//           className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg 
//           hover:bg-blue-600"
//         >
//           Got it
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function StudentDashboard() {
//   const [activeView, setActiveView] = useState("overview");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const [attendance] = useState([
//     { subject: "Math", attended: 18, total: 20 },
//     { subject: "Science", attended: 15, total: 20 },
//     { subject: "History", attended: 10, total: 20 },
//     { subject: "English", attended: 20, total: 20 },
//     { subject: "Physics", attended: 12, total: 20 },
//   ]);

//   const calculatePercentage = (attended, total) =>
//     total > 0 ? parseFloat(((attended / total) * 100).toFixed(1)) : 0;

//   const calculateClassesNeeded = (attended, total) => {
//     // Guard Clause: If attendance is already sufficient or no classes held, no classes are needed.
//     if (total === 0 || (attended / total) * 100 >= 75) {
//       return 0;
//     }

//     // Direct mathematical calculation to find the number of classes needed.
//     // This is much more efficient and safer than a while loop.
//     // Formula derived from: (attended + n) / (total + n) >= 0.75
//     // which simplifies to n >= 3 * total - 4 * attended
//     return Math.ceil(3 * total - 4 * attended);
//   };

//   const overallPercentage = useMemo(() => {
//     const totalAttended = attendance.reduce(
//       (sum, subj) => sum + subj.attended,
//       0
//     );
//     const totalClasses = attendance.reduce((sum, subj) => sum + subj.total, 0);
//     return calculatePercentage(totalAttended, totalClasses);
//   }, [attendance]);

//   const renderAttendanceDetail = () => (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Detailed Attendance Report</h2>
//       <div className="bg-white shadow-lg rounded-2xl p-6">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="p-4">Subject</th>
//               <th className="p-4">Classes Attended</th>
//               <th className="p-4">Total Classes</th>
//               <th className="p-4">Percentage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendance.map((subj, idx) => (
//               <tr key={idx} className="border-b last:border-b-0">
//                 <td className="p-4 font-semibold">{subj.subject}</td>
//                 <td className="p-4">{subj.attended}</td>
//                 <td className="p-4">{subj.total}</td>
//                 <td
//                   className={`p-4 font-bold ${
//                     calculatePercentage(subj.attended, subj.total) >= 75
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {calculatePercentage(subj.attended, subj.total)}%
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderOverview = () => (
//     <div>
//       <div
//         className="bg-white shadow-lg rounded-2xl p-6 mb-6 flex 
//     items-center justify-between"
//       >
//         <div>
//           <h2 className="text-2xl font-bold">Overall Attendance</h2>
//           <p className="text-gray-600">
//             Your combined attendance across all subjects.
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           <CircularProgress percentage={overallPercentage} />
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="text-gray-400 hover:text-blue-700"
//           >
//             {overallPercentage < 75 ? (
//               <AlertTriangle size={24} />
//             ) : (
//               <ShieldCheck size={24} />
//             )}
//           </button>
//         </div>
//       </div>
//       <h2 className="text-xl font-bold mb-4">Subject-wise Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {attendance.map((subj, idx) => {
//             const percentage = calculatePercentage(subj.attended, subj.total);
//             const needsImprovement = percentage < 75;
//             const classesNeeded = needsImprovement ? calculateClassesNeeded(subj.attended, subj.total) : 0;
//             return (
//               <div
//                 key={idx}
//                 className="bg-white shadow-lg
//         rounded-2xl p-6 flex flex-col items-center"
//               >
//                 <h3 className="text-xl font-semibold mb-2">{subj.subject}</h3>
//                 <p className="text-gray-600">
//                   {subj.attended}/{subj.total} classes attended
//                 </p>
//                 <p
//                   className={`mt-3 text-lg font-bold
//                   ${
//                     needsImprovement
//                       ? "text-red-600"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {percentage}%
//                 </p>
//                 {needsImprovement && (
//                     <div className="mt-4 text-center text-xs bg-yellow-100 text-yellow-800 p-2 rounded-lg flex items-center gap-2">
//                         <TrendingUp size={16}/>
//                         <span>
//                             Attend the next <strong>{classesNeeded}</strong> class{classesNeeded > 1 ? 'es' : ''} to reach 75%.
//                         </span>
//                     </div>
//                 )}
//               </div>
//             )
//         })}
//       </div>
//     </div>
//   );

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <AttendanceStatusModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         percentage={overallPercentage}
//       />

//       <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
//         <h2 className="text-2xl font-bold mb-8">Student Dashboard</h2>
//         <nav className="flex-1 space-y-4">
//           <button
//             onClick={() => setActiveView("overview")}
//             className={`flex items-center gap-2 p-2 
//             rounded w-full text-left ${
//               activeView === "overview" ? "bg-blue-600" : "hover:bg-blue-600"
//             }`}
//           >
//             <LayoutDashboard className="w-5 h-5" /> Overview
//           </button>
//           <button
//             onClick={() => setActiveView("attendanceDetail")}
//             className={`flex items-center gap-2 
//             p-2 rounded w-full text-left ${
//               activeView === "attendanceDetail"
//                 ? "bg-blue-600"
//                 : "hover:bg-blue-600"
//             }`}
//           >
//             <Calendar className="w-5 h-5" /> Attendance
//           </button>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded 
//         hover:bg-red-600"
//         >
//           <LogOut className="w-5 h-5" /> Logout
//         </button>
//       </aside>

//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">Welcome, Student</h1>
//         {activeView === "overview"
//           ? renderOverview()
//           : renderAttendanceDetail()}
//       </main>
//     </div>
//   );
// }
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Calendar,
  LayoutDashboard,
  AlertTriangle,
  ShieldCheck,
  X,
  TrendingUp,
  QrCode,
} from "lucide-react";

const CircularProgress = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 75 ? "text-green-600" : "text-red-600";

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`transition-all duration-500 ease-in-out ${color}`}
        />
      </svg>
      <span className={`absolute text-2xl font-bold ${color}`}>
        {percentage}%
      </span>
    </div>
  );
};

const AttendanceStatusModal = ({ isOpen, onClose, percentage }) => {
  if (!isOpen) return null;
  const isSafe = percentage >= 75;
  const statusColor = isSafe ? "text-green-600" : "text-red-600";
  const Icon = isSafe ? ShieldCheck : AlertTriangle;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
      justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-lg p-8 w-full 
        max-w-md text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 
          hover:text-gray-600"
        >
          <X size={24} />
        </button>
        <Icon size={48} className={`mx-auto mb-4 ${statusColor}`} />
        <h3 className={`text-2xl font-bold mb-2 ${statusColor}`}>
          {isSafe ? "Attendance Status: Safe" : "Attendance Warning"}
        </h3>
        <p className="text-gray-600">
          {isSafe
            ? `Congratulations! Your overall attendance 
            is ${percentage}%, which is above the required threshold. Keep up the good work!`
            : `Your 
            overall attendance is ${percentage}%, which is below the required 75%. Please attend classes 
            regularly to avoid any issues.`}
        </p>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg 
          hover:bg-blue-600"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [attendance] = useState([
    { subject: "Math", attended: 18, total: 20 },
    { subject: "Science", attended: 15, total: 20 },
    { subject: "History", attended: 10, total: 20 },
    { subject: "English", attended: 20, total: 20 },
    { subject: "Physics", attended: 12, total: 20 },
  ]);

  const calculatePercentage = (attended, total) =>
    total > 0 ? parseFloat(((attended / total) * 100).toFixed(1)) : 0;

  const calculateClassesNeeded = (attended, total) => {
    if (total === 0 || (attended / total) * 100 >= 75) {
      return 0;
    }
    return Math.ceil(3 * total - 4 * attended);
  };

  const overallPercentage = useMemo(() => {
    const totalAttended = attendance.reduce(
      (sum, subj) => sum + subj.attended,
      0
    );
    const totalClasses = attendance.reduce((sum, subj) => sum + subj.total, 0);
    return calculatePercentage(totalAttended, totalClasses);
  }, [attendance]);

  const renderAttendanceDetail = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Detailed Attendance Report</h2>
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Subject</th>
              <th className="p-4">Classes Attended</th>
              <th className="p-4">Total Classes</th>
              <th className="p-4">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((subj, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="p-4 font-semibold">{subj.subject}</td>
                <td className="p-4">{subj.attended}</td>
                <td className="p-4">{subj.total}</td>
                <td
                  className={`p-4 font-bold ${
                    calculatePercentage(subj.attended, subj.total) >= 75
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {calculatePercentage(subj.attended, subj.total)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div>
      {/* <div className="mb-8 text-center">
        <button
          onClick={() => navigate('/student/verify')}
          className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center gap-3 mx-auto text-lg"
        >
          <QrCode size={24} />
          Scan to Mark Attendance
        </button>
      </div> */}

      <div
        className="bg-white shadow-lg rounded-2xl p-6 mb-6 flex 
    items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold">Overall Attendance</h2>
          <p className="text-gray-600">
            Your combined attendance across all subjects.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CircularProgress percentage={overallPercentage} />
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-blue-700"
          >
            {overallPercentage < 75 ? (
              <AlertTriangle size={24} />
            ) : (
              <ShieldCheck size={24} />
            )}
          </button>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Subject-wise Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendance.map((subj, idx) => {
            const percentage = calculatePercentage(subj.attended, subj.total);
            const needsImprovement = percentage < 75;
            const classesNeeded = needsImprovement ? calculateClassesNeeded(subj.attended, subj.total) : 0;
            return (
              <div
                key={idx}
                className="bg-white shadow-lg
        rounded-2xl p-6 flex flex-col items-center"
              >
                <h3 className="text-xl font-semibold mb-2">{subj.subject}</h3>
                <p className="text-gray-600">
                  {subj.attended}/{subj.total} classes attended
                </p>
                <p
                  className={`mt-3 text-lg font-bold
                  ${
                    needsImprovement
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {percentage}%
                </p>
                {needsImprovement && (
                    <div className="mt-4 text-center text-xs bg-yellow-100 text-yellow-800 p-2 rounded-lg flex items-center gap-2">
                        <TrendingUp size={16}/>
                        <span>
                            Attend the next <strong>{classesNeeded}</strong> class{classesNeeded > 1 ? 'es' : ''} to reach 75%.
                        </span>
                    </div>
                )}
              </div>
            )
        })}
      </div>
    </div>
  );

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AttendanceStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        percentage={overallPercentage}
      />

      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Student Dashboard</h2>
        <nav className="flex-1 space-y-4">
          <button
            onClick={() => setActiveView("overview")}
            className={`flex items-center gap-2 p-2 
            rounded w-full text-left ${
              activeView === "overview" ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> Overview
          </button>
          <button
            onClick={() => setActiveView("attendanceDetail")}
            className={`flex items-center gap-2 
            p-2 rounded w-full text-left ${
              activeView === "attendanceDetail"
                ? "bg-blue-600"
                : "hover:bg-blue-600"
            }`}
          >
            <Calendar className="w-5 h-5" /> Attendance
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded 
        hover:bg-red-600"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, Student</h1>
        {activeView === "overview"
          ? renderOverview()
          : renderAttendanceDetail()}
      </main>
    </div>
  );
}