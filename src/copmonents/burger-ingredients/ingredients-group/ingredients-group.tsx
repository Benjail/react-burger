import IngredientItem from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';
import PropTypes from 'prop-types';

// @ts-ignore: suppress implicit any error
function IngredientGroup({ ingredients}) {
  return (
    <div className={styles.ingredients_group}>
      <div className={styles.items_container}>
        {ingredients.map((ingredient :any) => (
          <IngredientItem key={ingredient._id} ingredient={ingredient}/>
        ))}
      </div>
    </div>
  );
}

export default IngredientGroup;
IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  )}