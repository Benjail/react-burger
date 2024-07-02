import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails  from '../ingredient-details/ingredient-details';
import { ingredientPropType } from '../../..//utils/types';

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

      {isModalOpen && <Modal onClose={handleCloseModal} title={"Детали ингредиента"}>
          <IngredientDetails ingredient={ingredient}/>
        </Modal>}
    </div>
  );
}

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({ingredientPropType}).isRequired
};

export default IngredientItem;