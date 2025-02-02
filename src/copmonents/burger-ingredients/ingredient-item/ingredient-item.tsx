import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { openDetails } from '../../../services/slices/ingredients-details-slice';
import styles from './ingredient-item.module.css';
import { CartIngredient, Ingredient } from '../../../utils/types';

interface IngredientItemProps {
  ingredient: Ingredient;
}

const IngredientItem: FC<IngredientItemProps> = ({ ingredient }): React.JSX.Element => {
  const { bun, ingredients } = useSelector((store: any) => store.cart);

  const counter = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun && bun._id === ingredient._id ? 2 : null;
    } else {
      return ingredients.filter((item: CartIngredient) => item._id === ingredient._id).length || null;
    }
  }, [bun, ingredients, ingredient.type, ingredient._id]);

  const { name, image, price } = ingredient;

  const [, dragRef] = useDrag({
    type: ingredient.type ==='bun' ? 'bun' : 'ingredient',
    item:  ingredient ,
  });

  const dispatch = useDispatch();

  const handleShowIngredientDetails = () => {
    console.log("Put ingredient to cart");
    dispatch(openDetails(ingredient));
  };

  return (
    <>
      <li className={styles.ingredient} onClick={handleShowIngredientDetails} ref={dragRef}>
        {counter && <Counter count={counter} size='default' />}
        <img src={image} alt={name} className='ml-4 mr-4' />
        <span className={`${styles.price} text text_type_digits-default`}>
          {price}
          <CurrencyIcon type='primary' />
        </span>
        <span>{name}</span>
      </li>
    </>
  );
};

export default IngredientItem;
