import PropTypes from 'prop-types';
import { useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import BurgerConstructorInfo from './constructor-info/constructor-info';
import styles from './burger-constructor.module.css';

// @ts-ignore: suppress implicit any error
function BurgerConstructor({ingredients}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOrderClick = () => { 
    setIsModalOpen(true);
  };
  const handleCloseModal = () => { 
    setIsModalOpen(false);
  };

  
  return (
     <div className={styles.burger_constructor}>
        <div className={styles.burger_constructor_container}>
        {ingredients.map((ingredient:any, index:any) => (
        <div className={styles.burger_constructor_item} key={ingredient._id}>
          <ConstructorElement
          key={index}
          type={
            index === 0 ? 'top' : 
            index === ingredients.length - 1 ? 'bottom' : undefined
          }
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </div>
      ))}
    </div>
    
    <BurgerConstructorInfo onOrderClick={handleOrderClick} />
    {isModalOpen && <Modal onClose={handleCloseModal} >
         <OrderDetails/>
    </Modal>}
    </div>
    
) }

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;