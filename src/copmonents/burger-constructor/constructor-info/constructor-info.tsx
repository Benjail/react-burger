import BurgerConstructorPrice from '../constructor-price/costructor-price';
import styles from './constructor-info.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// @ts-ignore: suppress implicit any error 
function BurgerConstructorInfo({onOrderClick}) {
  return (
    <div className = {styles.burger_constructor_info}>
    <BurgerConstructorPrice/>
    <div className='mr-4'>
    <Button htmlType="button" type="primary" size="large" onClick={onOrderClick}>
      Оформить заказ
    </Button>
    </div>
  </div>
) }

BurgerConstructorInfo.propTypes = {
  onOrderClick: PropTypes.func,
};

export default BurgerConstructorInfo;