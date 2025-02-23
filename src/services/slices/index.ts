import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import ingredientDetailsSlice from './ingredients-details-slice';
import orderSlice from './order-slice';
import  ingredientsSlice from "./ingredients-slice";
import  cartSlice from './cart-slice';
import  profileSlice from './profile-slice';
import { cartActions } from './cart-slice';
import { orderDetailsActions } from './order-slice';
import { ingredientDetailsActions } from './ingredients-details-slice';
import webSocketSlice, { webSocketActions, middlewareActions } from './websocket-slice';
import { createWebSocketMiddleware } from '../middleware/createWebSocketMiddleware';
import { WebsocketStatus } from '../../utils/types';

const rootReducer = combineSlices(ingredientsSlice, ingredientDetailsSlice, orderSlice, cartSlice, profileSlice, webSocketSlice);

export const preloadedState = {
  ingredients: {data: [], loading: false,error: false},
  cart: { bun: null, ingredients: [] },
  details: { ingredient: null },
  order: {  data: null, loading: false, error: false, open: false},
  profile: {  user: null, isAuthChecked: false, loading: false, error: false },
  webSocket: {  status: WebsocketStatus.OFFLINE, orders: [], total: 0, totalToday: 0, error: '', }
};

type TApplicationActions = cartActions | orderDetailsActions | ingredientDetailsActions | webSocketActions;
const wsUrl = "wss://norma.nomoreparties.space/";
export default configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createWebSocketMiddleware(wsUrl, middlewareActions)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch  = ThunkDispatch<RootState, unknown, TApplicationActions>;
export  type AppActions = TApplicationActions;