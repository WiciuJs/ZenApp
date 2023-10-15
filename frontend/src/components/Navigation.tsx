import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faAddressBook,
  faBox,
  faGift,
  faSpa,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

interface NavigationProps {
  user: { username: string } | null;
  logout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, logout }) => {
  const location = useLocation();

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className={`container-fluid ${styles.containerFluid}`}>
        <ul className={`navbar-nav ${styles.navbarNav}`}>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`}
              to="/calendar"
            >
              <FontAwesomeIcon icon={faCalendar} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${location.pathname === '/client-list' ? 'active' : ''}`}
              to="/client-list"
            >
              <FontAwesomeIcon icon={faAddressBook} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${location.pathname === '/supplies' ? 'active' : ''}`}
              to="/supplies"
            >
              <FontAwesomeIcon icon={faBox} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${location.pathname === '/voucher' ? 'active' : ''}`}
              to="/voucher"
            >
              <FontAwesomeIcon icon={faGift} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${location.pathname === '/treatments' ? 'active' : ''}`}
              to="/treatments"
            >
              <FontAwesomeIcon icon={faSpa} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <a
              href="#"
              className={`nav-link ${styles.navLink}`}
              onClick={logout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
