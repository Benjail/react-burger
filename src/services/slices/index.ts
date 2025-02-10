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

const rootReducer = combineSlices(ingredientsSlice, ingredientDetailsSlice, orderSlice, cartSlice, profileSlice, webSocketSlice);
type TApplicationActions = cartActions | orderDetailsActions | ingredientDetailsActions | webSocketActions;
const wsUrl = "wss://norma.nomoreparties.space/";
export default configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createWebSocketMiddleware(wsUrl, middlewareActions)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch  = ThunkDispatch<RootState, unknown, TApplicationActions>;
export  type AppActions = TApplicationActions;