import {
    Button,
    CurrencyIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { 
    memo,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useState,
  } from "react";
  
  import { useLocation, useNavigate } from 'react-router-dom';
  import { useDispatch, useSelector } from "react-redux";
  import { closeOrder, createOrder } from "../../services/slices/order-slice";
  import {Modal} from "../modal/modal";
  import {OrderDetails} from "../order-details/order-details";
  import styles from "./order.module.css";
  
  const initialState = { totalPrice: 0 };
  function totalPriceReducer(state: any, action: any) {
    switch (action.type) {
      case "reset":
        return { totalPrice: 0 };
      case "bun":
        return { totalPrice: state.totalPrice + action.payload.price * 2 };
      case "ingredient":
        return { totalPrice: state.totalPrice + action.payload.price };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  
  const orderDataSelector = (state: any) => ({
    ingredients: state.ingredients.data,
    order: state.order.data,
    orderLoading: state.order.loading,
    error: state.order.error,
    orderOpen: state.order.open,
    user: state.profile.user
  });
  
  type Props = {
    bunItem: string;
    orderIngredients: OrderIngredient[];
  }

  type OrderIngredient = {
    id: string;
    uuid: string;
  }

  const OrderTotal = (props: Props): React.JSX.Element => {
    const { ingredients, order, orderLoading, error, orderOpen, user } =
      useSelector(orderDataSelector);

    const ingredientsMap = useMemo(
      () =>
        //@ts-ignore
        new Map(ingredients.map((ingredient) => [ingredient._id, ingredient])),
      [ingredients]
    );
    const [valid, setValid] = useState(false);
  
    const [totalPriceState, totalPriceDispatch] = useReducer(
      totalPriceReducer,
      initialState
    );
    
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      totalPriceDispatch({ type: "reset" });
  
      if (props.bunItem) {
        totalPriceDispatch({
          type: "bun",
          payload: ingredientsMap.get(props.bunItem),
        });
      }
      
      if (props.bunItem) {
        const bun = ingredientsMap.get(props.bunItem);
        if (bun) {
          totalPriceDispatch({
            type: "bun",
            payload: bun,
          });
        }
      }
      
      props.orderIngredients.forEach(({ id }) => {
        totalPriceDispatch({
          type: "ingredient",
          payload: ingredientsMap.get(id),
        });
      });
  
      setValid(Boolean(props.bunItem));
    }, [ingredientsMap, props.bunItem, props.orderIngredients]);

    const handleSubmitOrder = useCallback(() => {
      if (!user) {
        return navigate('/login', { state: { from: location } });
      }
    
    const orderListIds = [
      props.bunItem, 
      ...props.orderIngredients.map(({ id }) => id), 
    ].filter(Boolean); 
      
    dispatch(
      //@ts-ignore - временно игнорируем ошибку, если она всё ещё появляется
      createOrder(orderListIds)
    );
  }, [user, navigate, location, dispatch, props.bunItem, props.orderIngredients]);
    

    const onCompleteModalClose = useCallback(() => {
      dispatch(closeOrder());
    }, [dispatch]);
  
    return (
      <>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.total}>
          <p className="text text_type_digits-medium mr-2">
            {totalPriceState.totalPrice}
          </p>
          <div className={styles.totalIcon}>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10"
            disabled={orderLoading || !valid}
            onClick={handleSubmitOrder}
          >
            Оформить заказ
          </Button>
          {orderOpen && (
            <Modal onClose={onCompleteModalClose} header={""}>
              <OrderDetails order={order.order?.number} />
            </Modal>
          )}
        </div>
      </>
    );
  };
  
  export default memo(OrderTotal);