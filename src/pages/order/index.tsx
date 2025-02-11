import styles from './order.module.css';
import OrderInfo from '../../copmonents/order/order-info/index';

export default function OrderPage() {
  return (
    <main className={styles.main}>
      <OrderInfo />
    </main>
  );
}
