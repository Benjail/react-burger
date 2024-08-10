import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationPanel from './navigation-panel/navigation-panel';

function AppHeader() {
  return ( 
      <header className = {`${styles.appHeader} ml-10 mt-10 mr-10`}>
        <div className = {styles.leftSection}>
          <NavigationPanel side="left"/>
        </div>
        <div className = {styles.logoContainer}>  
        <Logo />
        </div>
        <div className = {styles.rightSection}>
           <NavigationPanel side="right"/>
        </div>
      </header>
  );
}

export default AppHeader;