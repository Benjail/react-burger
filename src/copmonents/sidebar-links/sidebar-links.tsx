import { NavLink } from "react-router-dom";
import styles from "./sidebar-links.module.css";
import { Route } from "../../utils/types";

type Props = {
  routes: Route[];
  footerText?: string; 
}

type SideBarItemProps = {
  route: Route;
}

export const SidebarLinks = ({ routes, footerText }: Props): React.JSX.Element  => {
  return (
    <div className={styles.container}>
      {routes.map((route) => (
        <SideBarItem route={route} key={route.to} />
      ))}
      {footerText && (
        <p className="mt-20 text text_type_main-default text_color_inactive">
          {footerText}
        </p>
      )}
    </div>
  );
}

const SideBarItem = ({ route }: SideBarItemProps): React.JSX.Element => (
  <NavLink
    className={({ isActive }) =>
      `${styles.link} ${isActive ? styles.linkActive : ""}`
    }
    to={route.to}
    end
  >
    {route.text}
  </NavLink>
);