import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import ingredientDetailsSlice from './ingredients-details-slice';
import orderSlice from './order-slice';
import  ingredientsSlice from "./ingredients-slice";
import  cartSlice from './cart-slice';
import  profileSlice from './profile-slice';
import { cartActions } from './cart-slice';
import { orderDetailsActions } from './order-slice';
import { ingredientDetailsActions } from './ingredients-details-slice';

const rootReducer = combineSlices(ingredientsSlice, ingredientDetailsSlice, orderSlice, cartSlice, profileSlice);
type TApplicationActions = cartActions | orderDetailsActions | ingredientDetailsActions;
export default configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch  = ThunkDispatch<RootState, unknown, TApplicationActions>;