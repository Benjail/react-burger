import React from 'react';
import styles from  './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientGroup from './ingredients-group/ingredients-group';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../..//utils/types';

// @ts-ignore: suppress implicit any error
function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = React.useState('one');
  //@ts-ignore: suppress implicit any error for ingredient
  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  // @ts-ignore: suppress implicit any error for ingredient
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  // @ts-ignore: suppress implicit any error for ingredient
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');

  return <div className={styles.burger_ingredients}>
            <div className={`${styles.ingritients_textbox} text_type_main-large pt-10`}>
                Соберите бургер
            </div>
            <div className={`${styles.ingridients_tabs} mt-5 mb-10`}>
              <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
              </Tab>
              <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
              </Tab>
            </div>
            <div className={styles.ingredients_container}>
            <div className={`${styles.ingredients_group_headline} text_type_main-medium`}>
              Булки
            </div>
            <IngredientGroup ingredients={buns} />

            <div className={`${styles.ingredients_group_headline} text_type_main-medium`}>
              Соусы
            </div>
            <IngredientGroup ingredients={sauces} />

            <div className={`${styles.ingredients_group_headline} text_type_main-medium`}>
              Начинки
            </div>
            <IngredientGroup ingredients={mains} />
            </div>
          </div>
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
}
export default BurgerIngredients;

