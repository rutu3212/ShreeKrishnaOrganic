import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// ======================================================
// Auth Context
// ======================================================

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "srikrishn_admin";

// ======================================================
// Auth Provider
// ======================================================

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved admin
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Error loading authentication:", error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = (email, password) => {
    const adminEmail = "admin@srikrishn.com";
    const adminPassword = "admin123";

    const enteredEmail = email?.trim().toLowerCase();

    if (
      enteredEmail === adminEmail &&
      password === adminPassword
    ) {
      const admin = {
        id: 1,
        name: "Admin",
        email: adminEmail,
        role: "ADMIN",
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(admin)
      );

      setUser(admin);

      return {
        success: true,
        user: admin,
        message: "Login successful.",
      };
    }

    return {
      success: false,
      user: null,
      message: "Invalid email or password.",
    };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ======================================================
// useAuth Hook
// ======================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}

export default AuthContext;