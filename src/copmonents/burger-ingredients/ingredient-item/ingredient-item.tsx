import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientModal from '../ingredient-modal/ingredient-modal';
import IngredientDetails  from '../ingredient-details/ingredient-details';

// @ts-ignore: suppress implicit any error 
function IngredientItem({ ingredient }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIngredientClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {  
    setIsModalOpen(false);
  };

  return (
    <div className={styles.item} onClick={handleIngredientClick}>
      <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
      <div className={styles.price}>{ingredient.price} <CurrencyIcon type="primary" /></div>
      <div className={`${styles.name} text_type_main-small`}>{ingredient.name}</div>

      {isModalOpen && <IngredientModal onClose={handleCloseModal}>
          <IngredientDetails ingredient={ingredient}/>
        </IngredientModal>}
    </div>
  );
}

IngredientItem.propTypes = {
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
  }),
};

export default IngredientItem;