import {combineSlices} from "@reduxjs/toolkit";
import  {ingredientsSlice} from "./slices/ingredients";
import  {detailsSlice} from "./slices/details";
import {cartSlice} from "./slices/cart";
import {orderSlice} from "./slices/order"
export const rootReducer = combineSlices(ingredientsSlice, detailsSlice, cartSlice, orderSlice);