import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor}  from "../../copmonents/burger-constructor/burger-constructor";
import BurgerIngredients from "../../copmonents/burger-ingredients/burger-ingredients";
import styles from "./home.module.css";

export const HomePage = (): React.JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.container}>
        <div className={styles.side}>
          <BurgerIngredients />
        </div>
        <div className={styles.constructorContainer}>
          <BurgerConstructor />
        </div>
      </main>
    </DndProvider>
  );
}
