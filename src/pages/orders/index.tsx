import { useEffect } from 'react';

import OrderList from '../../copmonents/order-list/index';
import styles from './orders.module.css';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { connect, disconnect } from '../../services/slices/websocket-slice';
import { WebsocketStatus } from '../../utils/websocket';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { status, orders } = useSelector((store) => store.webSocket);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) dispatch(connect(`orders?token=${accessToken.substring(7)}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders}>
      {status === WebsocketStatus.ONLINE && orders.length > 0 && <OrderList isShowStatus={true} linkEndpoint='/profile/orders' isOrdersReverse={true} />}
    </div>
  );
}
