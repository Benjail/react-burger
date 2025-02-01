import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../copmonents/burger-ingredients/ingredient-details/ingredient-details";
import styles from "./burger-ingredient-page.module.css";
import { Ingredient } from "../../utils/types";

export default function BurgerIngredientPage() {
  const { productId } = useParams<{ productId: string }>();
  const ingredients: Ingredient[] = useSelector((state: any) => state.ingredients.data);
  const [product, setProduct] = useState<Ingredient>();

  useEffect(() => {
    setProduct(ingredients?.find(({ _id }) => _id === productId));
  }, [ingredients, productId]);

  return (
      <div>
        {product ? (
        <div className={styles.container}>
          <p className="text text_type_main-large">Детали ингредиента</p>
          <IngredientDetails ingredient={product} />
        </div>
        ): (
          <p></p>
        )}
      </div>
  );
}
