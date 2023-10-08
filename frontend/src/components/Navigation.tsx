import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.scss';
import '../styles/LoginForm.scss';

interface NavigationProps {
  user: { username: string } | null;
  setToken: (token: string) => void;
}

function Navigation({ user, setToken }: NavigationProps) {
  const [activeLink, setActiveLink] = useState<string>('');
  const navigate = useNavigate()

  useEffect(() => {
    function handleNavigationAnimation() {
      const activeItem = document.querySelector('.Navigation-link.active') as HTMLElement;
      if (activeItem) {
        const activeWidth = activeItem.offsetWidth;
        const activeHeight = activeItem.offsetHeight;
        const itemTop = activeItem.offsetTop;
        const itemLeft = activeItem.offsetLeft
        const horiSelector = document.querySelector('.hori-selector') as HTMLElement;
        if (horiSelector) {
          horiSelector.style.width = `${activeWidth}px`;
          horiSelector.style.height = `${activeHeight}px`;
          horiSelector.style.transform = `translateX(${itemLeft}px) translateY(${itemTop}px)`;
        }
      }
    }

    handleNavigationAnimation();
    window.addEventListener('resize', handleNavigationAnimation);

    return () => {
      window.removeEventListener('resize', handleNavigationAnimation);
    };
  }, [activeLink]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <a className="navbar-brand navbar-logo" href="#">
      </a>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <li className="nav-item">
            <Link
              to="/calendar"
              className={`nav-link Navigation-link${activeLink === '/calendar' ? ' active' : ''}`}
              onClick={() => handleLinkClick('/calendar')}
            >
              <i className="far fa-calendar-alt"></i> Kalendarz
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/client-list"
              className={`nav-link Navigation-link${activeLink === '/client-list' ? ' active' : ''}`}
              onClick={() => handleLinkClick('/client-list')}
            >
              Lista klientów
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/supplies"
              className={`nav-link Navigation-link${activeLink === '/supplies' ? ' active' : ''}`}
              onClick={() => handleLinkClick('/supplies')}
            >
              Zaopatrzenie
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/voucher"
              className={`nav-link Navigation-link${activeLink === '/voucher' ? ' active' : ''}`}
              onClick={() => handleLinkClick('/voucher')}
            >
              Voucher
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/treatments"
              className={`nav-link Navigation-link${activeLink === '/treatments' ? ' active' : ''}`}
              onClick={() => handleLinkClick('/treatments')}
            >
              Zabiegi
            </Link>
          </li>
          <li className="nav-item">
            <a href="" onClick={handleLogout} className={`nav-link Navigation-link`} style={{ cursor: 'pointer' }}>
              Wyloguj się
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
