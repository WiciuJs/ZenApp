import React, { createContext, useContext, useState } from "react";

interface IAuthContext {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      setUser(username);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
