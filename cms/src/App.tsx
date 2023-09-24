import './styles/App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../src/components/Navigation";
import CalendarView from "../src/views/CalendarView";
import Voucher from "../src/components/Voucher";
import UserListView from './views/CustomerListView';
import { AuthProvider } from "../src/components/AuthContext";
import Login from './components/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/voucher" element={<Voucher />} />
            <Route path="/client-list" element={<UserListView />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
