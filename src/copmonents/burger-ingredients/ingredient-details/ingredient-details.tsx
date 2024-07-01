import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css'; 

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
  ingredient: PropTypes.shape({
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
};

export default IngredientDetails;