import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientDetailsSlice from './ingredients-details-slice';
import orderSlice from './order-slice';
import  ingredientsSlice from "./ingredients-slice";
import  cartSlice from './cart-slice';
import  profileSlice from './profile-slice';

const rootReducer = combineSlices(ingredientsSlice, ingredientDetailsSlice, orderSlice, cartSlice, profileSlice);

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.includes("profile")) {
    console.log("Profile State:", store.getState().profile);
    console.log("Redux Action:", action.type);
  console.log("Redux State:", store.getState());
  }
  return result;
};
export default configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

