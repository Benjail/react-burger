import AppHeader from './app-header/app-header';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import styles from './App.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect  } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {loadIngredients} from '../services/slices/ingredients';

function App() {
  const dispatch = useDispatch();  
  const {loading, error } = useSelector(state => state.ingredients);
  useEffect(() => { 
    dispatch(loadIngredients());
  }, []);
  if(loading)
  {
    <p>Loading...</p>
  }

  if (!loading && error) {
    return <p>Ошибка: {error}</p>
  } 

  return (
    <div className={styles.wrapper}>
     <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.container}>
            <div className={styles.side}>
              <h1 className="text text_type_main-large mt-10 mb-5">
                Соберите бургер
              </h1>
              <BurgerIngredients />
            </div>
            <div className={styles.constructorContainer}>
              <BurgerConstructor />
            </div>
          </main>
        </DndProvider>
    </div>
  );
}

export default App;