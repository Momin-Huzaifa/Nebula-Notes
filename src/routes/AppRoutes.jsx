import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotesPage from "../pages/notes/NotesPage";
import ActivityLog from "../pages/activity/ActivityLog";
import SharedNote from "../pages/public/SharedNote";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/activity"
        element={
          <ProtectedRoute>
            <ActivityLog />
          </ProtectedRoute>
        }
      />

      <Route path="/share/:id" element={<SharedNote />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}