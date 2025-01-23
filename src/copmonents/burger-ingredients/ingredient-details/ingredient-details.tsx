import styles from "./ingredient-details.module.css";
import { Ingredient } from "../../../utils/types";

type IngredientDetailsProps = {
  ingredient: Ingredient;
};

type DetailItemProps ={
  title: string,
  value: number,
}

export const IngredientDetails= ({ingredient}: IngredientDetailsProps): React.JSX.Element => {
  const detailsList: [string, number][] = [
    ["Калории,ккал", ingredient.calories],
    ["Белки, г", ingredient.proteins],
    ["Жиры, г", ingredient.fat],
    ["Углеводы, г", ingredient.carbohydrates],
  ];
  
  return (
    <div className={styles.content}>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <h3 className="text text_type_main-medium mt-4 mb-8">
        {ingredient.name}
      </h3>
      <div className={styles.details}>
        {detailsList.map(([title, value]) => (
          <DetailItem key={title} title={title} value={value} />
        ))}
      </div>
    </div>
  );
}

const DetailItem = (props : DetailItemProps): React.JSX.Element => {
  const value = String(props.value / 10).replace(".", ",");

  return (
    <div className={styles.detailItem}>
      <p className="text text_type_main-default text_color_inactive mb-2">
        {props.title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
}