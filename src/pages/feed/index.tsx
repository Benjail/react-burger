import { useEffect } from 'react';

import OrderList from '../../copmonents/order/order-list';
import OrderCounter from '../../copmonents/order/order-counter';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { connect, disconnect } from '../../services/slices/websocket-slice';
import { WebsocketStatus } from '../../utils/types';

export default function FeedPage() {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((store) => store.webSocket);

  useEffect(() => {
    dispatch(connect('orders/all'));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main} pr-5 pl-5`}> <h1 className='text text_type_main-large mt-10'>Лента заказов</h1>
      {status === WebsocketStatus.ONLINE && orders.length > 0 && (
          <div className={`${styles.container} mt-5`}>
            <OrderList isShowStatus={false} endpoint='/feed' />
            <OrderCounter />
          </div>
      )}
    </main>
  );
}
