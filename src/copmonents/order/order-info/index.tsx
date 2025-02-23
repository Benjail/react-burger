import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Statuses } from '../../../utils/types';
import { useDispatch, useSelector } from '../../../services/hooks/hooks';
import { clearOrder, getOrder, updateOrder } from '../../../services/slices/order-slice';
import { getUniqIngredientsWithAmount } from '../../../utils/functions';

const OrderInfo = () => {
  const { number } = useParams();
  const { data } = useSelector((store) => store.ingredients);
  const { loading: orderLoading, error, data: order } = useSelector((store) => store.order);
  const { orders } = useSelector((store) => store.webSocket);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      dispatch(getOrder(number!));
    }
    return () => {
      dispatch(clearOrder());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const foundedOrder = orders.find((order) => order.number.toString() === number);
    if (!order) {
      if (foundedOrder) {
        dispatch(updateOrder(foundedOrder));
      }
    } else {
      if (foundedOrder && foundedOrder.status !== order.status) {
        dispatch(updateOrder(foundedOrder))
      }
    }
  }, [dispatch, number, order, orders]);

  const ingredients = order && getUniqIngredientsWithAmount(order.ingredients, data);
  return (
    <article data-testid='order-number'>
    <div className={styles.order}>
      {error && <h2>Ошибка при загрузке заказа</h2>}
      {!location.state && !orderLoading && !error && !order && <h2>{`Заказ #0${number} не найден`}</h2>}
      {order && (
        <>
          <div className={'text text_type_digits-default'}>{`#0${order.number}`}</div>
          <span className='text text_type_main-medium mt-10'>{order.name}</span>
          <span className={`${styles.status} text text_type_main-default mt-3 ${order.status === 'done' ? styles.done : ''}`}>{Statuses[order.status]}</span>
          <span className='text text_type_main-medium mt-15'>Состав:</span>
          <ul className={`${styles.ingredients} mt-6`}>
            {ingredients?.map((ingredient) => (
                <li key={ingredient._id} className={styles.ingredient}>
                  <div className={styles['preview-container']}>
                    <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.preview} />
                  </div>
                  <span>{ingredient.name}</span>
                  <div className={`${styles.price} ${styles.amount}`}>
                    <span className='text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</span>
                    <CurrencyIcon type='primary' />
                  </div>
                </li>
              ))}
          </ul>
          <div className={`${styles.total} mt-10`}>
            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.createdAt)} />
            <div className={styles.price}>
              <span className='text text_type_digits-default'>
                {ingredients?.reduce((acc, ingredient) => (acc += ingredient.price * ingredient.amount), 0)}
              </span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
    </article>
  );
};

export default OrderInfo;
