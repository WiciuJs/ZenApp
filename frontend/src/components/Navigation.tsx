import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navigation.module.scss'
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

function Navigation({ user, logout }: NavigationProps) {
  const [activeLink, setActiveLink] = useState<string>('');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className={`container-fluid ${styles.containerFluid}`}>
        <ul className={`navbar-nav ${styles.navbarNav}`}>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${activeLink === '/calendar' ? 'active' : ''}`}
              to="/calendar"
              onClick={() => handleLinkClick('/calendar')}
            >
              <FontAwesomeIcon icon={faCalendar} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${activeLink === '/client-list' ? 'active' : ''}`}
              to="/client-list"
              onClick={() => handleLinkClick('/client-list')}
            >
              <FontAwesomeIcon icon={faAddressBook} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${activeLink === '/supplies' ? 'active' : ''}`}
              to="/supplies"
              onClick={() => handleLinkClick('/supplies')}
            >
              <FontAwesomeIcon icon={faBox} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${activeLink === '/voucher' ? 'active' : ''}`}
              to="/voucher"
              onClick={() => handleLinkClick('/voucher')}
            >
              <FontAwesomeIcon icon={faGift} />
            </Link>
          </li>
          <li className={`nav-item ${styles.navItem}`}>
            <Link
              className={`nav-link ${activeLink === '/treatments' ? 'active' : ''}`}
              to="/treatments"
              onClick={() => handleLinkClick('/treatments')}
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
