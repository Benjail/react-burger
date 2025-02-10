import { useEffect } from "react";
import { useDispatch, useSelector } from "../../../services/hooks/hooks";
import { connect, disconnect } from "../../../services/slices/websocket-slice";
import { WebsocketStatus } from "../../../utils/types";
import OrderList from "../../../copmonents/order/order-list";
import { PROFILE_ORDERS_ROUTE } from "../../../const/routes";
import styles from './orders.module.css';

export const ProfileOrdersPage = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const { status, orders } = useSelector((store) => store.webSocket);
    useEffect(()=>{
      const token = localStorage.getItem("accessToken");
      if (token)
        dispatch(connect(`orders?token=${token.substring(7)}`));
      return() => {
         dispatch(disconnect());
      }
    },[dispatch]);

    return (
      <div className={styles.orders}>
        {status === WebsocketStatus.ONLINE && orders.length > 0 && 
        <OrderList isShowStatus={true} endpoint={PROFILE_ORDERS_ROUTE} isOrdersReverse={true} />
        }
      </div>
    );
}
