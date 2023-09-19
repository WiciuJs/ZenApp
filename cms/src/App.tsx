import './styles/App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../src/components/Navigation";
import CalendarView from "../src/views/CalendarView";
import Voucher from "../src/components/Voucher";
import UserListView from './views/UserListView';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/client-list" element={<UserListView />}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
