import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadIngredients } from "../../services/slices/ingredients";
import IngredientDetails from "../../copmonents/burger-ingredients/ingredient-details/ingredient-details";
import styles from "./burger-ingredient-page.module.css";

export default function BurgerIngredientPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.data);
  const [product, setProduct] = useState();

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);

  useEffect(() => {
    setProduct(ingredients?.find(({ _id }) => _id == productId));
  }, [ingredients, productId]);

  return (
    product && (
      <div className={styles.container}>
        <p className="text text_type_main-large">Детали ингредиента</p>
        <IngredientDetails ingredient={product} />
      </div>
    )
  );
}
