import { Link } from 'react-router-dom';
import '../styles/Navigation.scss';

interface NavigationProps {
  user: any; 
  logout: () => void; 
}

function Navigation({ user, logout }: NavigationProps) {
  return (
    <div className="Navigation">
      {user ? (
        <>
          <Link to="/calendar" className="Navigation-item">
            Kalendarz
          </Link>
          <Link to="/client-list" className="Navigation-item">
            Lista klientów
          </Link>
          <Link to="/supplies" className="Navigation-item">
            Zaopatrzenie
          </Link>
          <Link to="/voucher" className="Navigation-item">
            Voucher
          </Link>
          <Link to="/treatments" className="Navigation-item">
            Zabiegi
          </Link>
          <button onClick={logout} className="Navigation-item">
            Wyloguj się
          </button>
        </>
      ) : (
        <Link to="/login" className="Navigation-item">
          Zaloguj się
        </Link>
      )}
    </div>
  );
}

export default Navigation;
