import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navigation.module.scss";
import {
  faCalendar,
  faAddressBook,
  faBox,
  faGift,
  faSpa,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface NavigationProps {
  user: { username: string } | null;
  logout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, logout }) => {
  const location = useLocation();

  const navConfig = [
    { path: "/calendar", icon: faCalendar },
    { path: "/client-list", icon: faAddressBook },
    { path: "/supplies", icon: faBox },
    { path: "/voucher", icon: faGift },
    { path: "/treatments", icon: faSpa },
    { path: "#", icon: faRightFromBracket, onClick: logout },
  ];

  return (
    <nav className={`${styles.navbar}`}>
      <div className={`${styles.containerFluid}`}>
        <ul className={`${styles.navbarNav}`}>
          {navConfig.map((item) => (
            <li
              key={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.active : ""
              }`}
            >
              <Link to={item.path} onClick={item.onClick}>
                <div className={`${styles.iconContainer}`}>
                  <FontAwesomeIcon
                    className={`${styles.navIcon}`}
                    icon={item.icon}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
