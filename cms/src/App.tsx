import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import CalendarView from './views/CalendarView';
import Voucher from './components/Voucher';
import UserListView from './views/CustomerListView';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const user = token ? { username: 'exampleUser' } : null; 

  return (
    <Router>
      <div className="App">
        <Navigation user={user} logout={handleLogout} />
        <Routes>
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/client-list" element={<UserListView />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
