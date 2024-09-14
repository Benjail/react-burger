import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import BurgerConstructor from "../../copmonents/burger-constructor/burger-constructor";
import BurgerIngredients from "../../copmonents/burger-ingredients/burger-ingredients";
import styles from "./home.module.css";
import { useEffect } from "react";
import { loadIngredients } from "../../services/slices/ingredients";

export function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  return (
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
  );
}
