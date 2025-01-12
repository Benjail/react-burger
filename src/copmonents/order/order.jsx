import {
    Button,
    CurrencyIcon,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import PropTypes from "prop-types";
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
  import Modal from "../modal/modal";
  import OrderDetails from "../order-details/order-details";
  import styles from "./order.module.css";
  
  const initialState = { totalPrice: 0 };
  function totalPriceReducer(state, action) {
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
  
  const orderDataSelector = (state) => ({
    ingredients: state.ingredients.data,
    order: state.order.data,
    orderLoading: state.order.loading,
    error: state.order.error,
    orderOpen: state.order.open,
    user: state.profile.user
  });
  
  const OrderTotal = (props) => {
    const { ingredients, order, orderLoading, error, orderOpen, user } =
      useSelector(orderDataSelector);

    const ingredientsMap = useMemo(
      () =>
        new Map(ingredients.map((ingredient) => [ingredient._id, ingredient])),
      [ingredients]
    );
    const [valid, setValid] = useState(false);
  
    const [totalPriceState, totalPriceDispatch] = useReducer(
      totalPriceReducer,
      initialState
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      totalPriceDispatch({ type: "reset" });
  
      if (props.bunItem) {
        totalPriceDispatch({
          type: "bun",
          payload: ingredientsMap.get(props.bunItem),
        });
      }
  
      props.orderIngredients.forEach(({ id }) => {
        totalPriceDispatch({
          type: "ingredient",
          payload: ingredientsMap.get(id),
        });
      });
  
      setValid(Boolean(props.bunItem));
    }, [ingredientsMap, props.bunItem, props.orderIngredients]);
  
    // const onCompleteClick = useCallback(() => {
    //   if (!user) {
    //     return navigate('/login', { state: { from: location } });
    //   }

    //   dispatch(
    //     createOrder(
    //       [props.bunItem, ...props.orderIngredients.map(({ id }) => id)].filter(
    //         Boolean
    //       )
    //     )
    //   );
    //   navigate('/', { state: { backgroundLocation: location } });
    // }, [props.bunItem, props.orderIngredients]);

    const handleSubmitOrder = useCallback(() => {
      if (!user) {
        return navigate('/login', { state: { from: location } });
      }
    
      dispatch(
        createOrder(
          [props.bunItem, ...props.orderIngredients.map(({ id }) => id)].filter(
            Boolean
          )
        )
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
            <Modal onClose={onCompleteModalClose}>
              <OrderDetails order={order.order?.number} />
            </Modal>
          )}
        </div>
      </>
    );
  };
  OrderTotal.propTypes = {
    bunItem: PropTypes.string,
    orderIngredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  export default memo(OrderTotal);