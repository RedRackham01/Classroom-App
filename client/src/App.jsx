import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import PrincipalPage from "./Pages/PrincipalPage";
import TeacherPage from "./Pages/TeacherPage";
import StudentPage from "./Pages/StudentPage";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  const isPrincipal = Boolean(useSelector((state) => state.isPrincipal));
  const isTeacher = Boolean(useSelector((state) => state.isTeacher));
  const isStudent = Boolean(useSelector((state) => state.isStudent));
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
      <Route path="*" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/principal" element={isAuth && isPrincipal ? <PrincipalPage /> : <Navigate to="/" />} />
        <Route path="/teacher" element={isAuth && isTeacher ? <TeacherPage /> : <Navigate to="/" />} />
        <Route path="/student" element={isAuth && isStudent ? <StudentPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
