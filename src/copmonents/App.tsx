import AppHeader from './app-header/app-header';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import styles from './App.module.css';

function App() {
  return (
    <div className= {styles.App}>
    <AppHeader />

    <div className={styles.content}>
       <BurgerIngredients />
       <BurgerConstructor />
    </div>
    </div>
  );
}

export default App;