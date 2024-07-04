import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { 
  ConstructorElement,
  DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import BurgerConstructorInfo from './constructor-info/constructor-info';
import styles from './burger-constructor.module.css';
import { ingredientPropType } from '../..//utils/types';

// @ts-ignore: suppress implicit any error
function BurgerConstructor({ingredients}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bunIngredient, setBunIngredient] = useState(null);
  const [otherIngredients, setOtherIngredients] = useState([]);

  useEffect(()=>{
    setBunIngredient(
      // @ts-ignore: suppress implicit any error
      ingredients?.find(({ type }) => type === "bun") || null
    );
    setOtherIngredients(
      // @ts-ignore: suppress implicit any error
      ingredients?.filter(({ type }) => type !== "bun")
    );
  }, [ingredients]);

  const handleOrderClick = () => { 
    setIsModalOpen(true);
  };
  const handleCloseModal = () => { 
    setIsModalOpen(false);
  };


  return (
     <div className={styles.burger_constructor}>
        <div className='mt-25'>
          {bunIngredient && (
          <ConstructorElement
            type="top"
              // @ts-ignore: suppress implicit any error
            text={`${bunIngredient.name} (вверх)`}
              // @ts-ignore: suppress implicit any error
            price={bunIngredient.price}
              // @ts-ignore: suppress implicit any error
            thumbnail={bunIngredient.image}
            isLocked={true}
          />
          )}
        </div>
        <div className={styles.burger_constructor_container}>
          {otherIngredients.map((ingredient:any, index:any) => (
          <div className={styles.burger_constructor_item} key={ingredient._id}>
            {/* {!(index === 0 || index === ingredients.length - 1) && (
                <DragIcon type='primary' />
              )} */}
            <DragIcon type='primary' />
            <ConstructorElement
              key={index}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image} 
            />
          </div>
          ))}
        </div>
        <div>
          {bunIngredient && (
          <ConstructorElement
            type="bottom"
              // @ts-ignore: suppress implicit any error
            text={`${bunIngredient.name} (вниз)`}
              // @ts-ignore: suppress implicit any errors
            price={bunIngredient.price}
              // @ts-ignore: suppress implicit any error
            thumbnail={bunIngredient.image}
            isLocked={true}
          />
          )}
        </div>
    <BurgerConstructorInfo onOrderClick={handleOrderClick} />
    {isModalOpen && <Modal onClose={handleCloseModal} >
         <OrderDetails/>
    </Modal>}
    </div>
    
) }

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;