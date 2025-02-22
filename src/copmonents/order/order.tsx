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
  import { useDispatch, useSelector } from "../../services/hooks/hooks";
  import { closeOrder, createOrder } from "../../services/slices/order-slice";
  import {Modal} from "../modal/modal";
  import {OrderDetails} from "./order-details/order-details";
  import styles from "./order.module.css";
  import { CartIngredient } from "../../utils/types";
  
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

  type Props = {
    bunItem: string | null;
    cartIngredients: CartIngredient[];
  }

  const OrderTotal = (props: Props): React.JSX.Element => {
    const ingredients  = useSelector((store) => store.ingredients.data);
    const user = useSelector((store) => store.profile.user);
    const order = useSelector((store) => store.order);

    const ingredientsMap = useMemo(
      () =>
        ingredients ?
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient]))
      : new Map(),
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
      
      props.cartIngredients.forEach(({ _id }) => {
        totalPriceDispatch({
          type: "ingredient",
          payload: ingredientsMap.get(_id),
        });
      });
  
      setValid(Boolean(props.bunItem));
    }, [ingredientsMap, props.bunItem, props.cartIngredients]);

    const handleSubmitOrder = useCallback(() => {
      if (!user) {
        return navigate('/login', { state: { from: location } });
      }
    
    const orderListIds = [
      props.bunItem, 
      ...props.cartIngredients.map(({ _id }) => _id), 
    ].filter(Boolean); 
      
    dispatch(
      createOrder(orderListIds)
    );
  }, [user, navigate, location, dispatch, props.bunItem, props.cartIngredients]);
    

    const onCompleteModalClose = useCallback(() => {
      dispatch(closeOrder());
    }, [dispatch]);
  
    return (
      <>
        {order.error && <p className={styles.error}>{order.error}</p>}
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
            disabled={order.loading || !valid}
            onClick={handleSubmitOrder}
          >
            Оформить заказ
          </Button>
          {order.open && order.data?.number &&(
            <Modal onClose={onCompleteModalClose} header={""}> 
            <article data-testid='order-number'>
              <OrderDetails order={order.data.number} />
            </article>
            </Modal>
          )}
        </div>
      </>
    );
  };
  
  export default memo(OrderTotal);