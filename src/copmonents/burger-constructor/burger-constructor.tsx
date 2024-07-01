import BurgerConstructorInfo from './constructor-info/constructor-info';
import styles from './burger-constructor.module.css';
import { useEffect, useState } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderModal from './order-modal/order-modal';
import OrderDetails from './order-details/order-details';

function BurgerConstructor() {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOrderClick = () => { 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => { 
    setIsModalOpen(false);
  };

  const url = 'https://norma.nomoreparties.space/api/ingredients';
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          setIngredients(res.data);
        } else {
          console.error('Возникла ошибка при загрузке данных');
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
     <div className={styles.burger_constructor}>
        <div className={styles.burger_constructor_container}>
        {ingredients.map((ingredient, index) => (
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
    {isModalOpen && <OrderModal onClose={handleCloseModal} >
         <OrderDetails/>
    </OrderModal>}
    </div>
    
) }
export default BurgerConstructor;