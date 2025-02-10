import styles from './app-header.module.css';
import { useSelector } from '../../services/hooks/hooks';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";
import {
  FEED_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
} from "../../const/routes";

interface Props {
  icon?: React.FC<{ type: "primary" | "secondary" }>;
  to: string;
  text: string;
}

const LinkItem = ({ icon: Icon, to, text }: Props): React.JSX.Element => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.menuItem} ${!isActive ? styles.inactive : ""}`
      }
      end
    >
      {({ isActive }) => (
        <>
          {Icon && <Icon type={isActive ? "primary" : "secondary"} />}
          <span className={styles.menuItemText}>{text}</span>
        </>
      )}
    </NavLink>
  );
};


export const AppHeader = (): React.JSX.Element => {
  const user = useSelector((state) => state.profile.user);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.menu}>
            <LinkItem icon={BurgerIcon} to={HOME_ROUTE} text="Конструктор" />
            <LinkItem
              icon={ListIcon}
              to={FEED_ROUTE}
              text="Лента заказов"
            />
          </ul>
        </nav>
        <Logo />
        <nav>
          <ul className={styles.rightMenu}>
            <LinkItem
              icon={ProfileIcon}
              to={PROFILE_ROUTE}
              text = { user ? user.name : "Личный кабинет"}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}
