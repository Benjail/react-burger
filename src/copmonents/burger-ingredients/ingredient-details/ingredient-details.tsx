import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css'; 
import { ingredientPropType } from '../../..//utils/types';

// @ts-ignore: suppress implicit any error 
function IngredientDetails({ ingredient}) {
  
  return (
    <div className={`${styles.Content} text_type_main-medium`}>
    <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
    <h2 className="text_type_main-medium">{ingredient.name}</h2>
    <div className={styles.details}>
      <div className={styles.detail}>
        <div>Калории, ккал</div>
        <div className='text_type_digits-default'>{ingredient.calories}</div>
      </div>
      <div className={styles.detail}>
        <div>Белки, г</div>
        <div className='text_type_digits-default'>{ingredient.proteins}</div>
      </div>
      <div className={styles.detail}>
        <div>Жиры, г</div>
        <div className='text_type_digits-default'>{ingredient.fat}</div>
      </div>
      <div className={styles.detail}>
        <div>Углеводы, г</div>
        <div className='text_type_digits-default'>{ingredient.carbohydrates}</div>
      </div>
    </div>
   </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({ingredientPropType})
};

export default IngredientDetails;