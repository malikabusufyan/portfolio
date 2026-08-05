import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";

import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminExperience from "./admin/AdminExperience";
import AdminSkills from "./admin/AdminSkills";
import AdminProjects from "./admin/AdminProjects";
import AdminMessages from "./admin/AdminMessages";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
