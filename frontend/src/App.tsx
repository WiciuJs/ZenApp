import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";
import Navigation from "./components/Navigation";
import CalendarView from "./views/CalendarView";
import Voucher from "./components/Voucher";
import UserListView from "./views/CustomerListView";
import Login from "./components/Login";
import OrderView from "../src/views/Orderview";
import TreatmentView from "./views/TreatmentView";

import styles from "./App.module.scss";

function App() {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const user = token ? { username: "exampleUser" } : null;

  const ProtectedRoute = ({
    token,
    children,
  }: {
    token: string;
    children: React.ReactNode;
  }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };

  return (
    <Router>
      <div className="App">
        {token ? <Navigation user={user} logout={handleLogout} /> : null}
        <div className={styles.mainContainer}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute token={token}>
                  <CalendarView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/voucher"
              element={
                <ProtectedRoute token={token}>
                  <Voucher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client-list"
              element={
                <ProtectedRoute token={token}>
                  <UserListView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplies"
              element={
                <ProtectedRoute token={token}>
                  <OrderView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/treatments"
              element={
                <ProtectedRoute token={token}>
                  <TreatmentView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
