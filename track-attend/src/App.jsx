import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
// --- ADDED: Import the new page ---
import LiveSessionPage from "./pages/LiveSessionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/teacher" element={<TeacherDashboard />} />
      <Route path="/teacher/session/:courseName" element={<LiveSessionPage />} />
    </Routes>
  );
}

export default App;


