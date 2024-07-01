/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './navigation-panel.module.css';
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

// @ts-ignore: suppress implicit any error for side
function NavigationPanel({ side }) {
  return (
    <nav className={`${side === 'right' ? styles.navigation_right_panel : styles.navigation_panel}`}>
      {side === 'left' ? (
        <>
          <div className = {styles.nav_item}>
            <BurgerIcon type="primary" />
            <a href="" className = {styles.nav_link}>Конструктор</a>
          </div>
          <div className = {styles.nav_item}>
            <ListIcon type="secondary" />   
            <a href="" className = {styles.nav_link}>Лента заказов</a>
          </div>
        </>
      ) : (
        <div className = {styles.nav_item}>
          <ProfileIcon type="secondary" />
          <a href="" className = {styles.nav_link}>Личный кабинет</a>
        </div>
      )}
    </nav>
  );
}

NavigationPanel.propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
};

export default NavigationPanel;