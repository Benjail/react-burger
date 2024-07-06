import styles from './constructor-price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
function BurgerConstructorPrice() {
  return (
    <div className = {styles.burger_constructor_price}>
    <div className='text text_type_main-large'>
      610
    </div>
    <div className='ml-3'>
    <CurrencyIcon type="primary" />
    </div>
  </div>
) }
export default BurgerConstructorPrice;