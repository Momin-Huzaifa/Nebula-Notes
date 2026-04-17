import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();

  const hasRole = (roles) => {
    if (!user || !user.role) return false;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(user.role.toLowerCase());
  };

  const isAdmin = hasRole("admin");
  const isEditor = hasRole(["admin", "editor"]);
  const isViewer = hasRole(["admin", "editor", "viewer"]);

  return {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    setLoading,
    logout,
    hasRole,
    isAdmin,
    isEditor,
    isViewer
  };
};
