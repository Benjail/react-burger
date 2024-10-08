import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../api/utils/types';

function IngredientGroup({ ingredients}) {
  return (
    <div className={styles.ingredients_group}>
      <div className={styles.items_container}>
        {ingredients.map((ingredient) => (
          <IngredientItem key={ingredient._id} ingredient={ingredient}/>
        ))}
      </div>
    </div>
  );
}

export default IngredientGroup;
IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
}