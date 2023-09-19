import "../styles/Navigation.scss";
import "../styles/Calendar.scss";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="Navigation">
      <Link to="/calendar" className="Navigation-item">Kalendarz</Link>
      <Link to="/client-list" className="Navigation-item">Lista klientów</Link>
      <Link to="/supplies" className="Navigation-item">Zaopatrzenie</Link>
      <Link to="/voucher" className="Navigation-item">Voucher</Link>
      <Link to="/treatments" className="Navigation-item">Zabiegi</Link>
    </div>
  );
}

export default Navigation;
