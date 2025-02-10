import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {createOrderApi, getOrderApi} from "../../utils/api";
import { resetCart } from "./cart-slice";
import { OrderStore } from "../../utils/store";
import { Order, ServerResponseGeneric } from "../../utils/types";

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderListIds: (string | null)[], { dispatch }) => {
    const data = await createOrderApi(orderListIds);
    dispatch(resetCart());
    return data;   
  }
);

export const getOrder = createAsyncThunk("order/get", getOrderApi);
const initialState: OrderStore = {
  data: null,
  loading: false,
  error: false,
  open: false
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    openOrder: (state) => {
      state.open = true;
    },
    closeOrder: (state) => {
      state.open = false;
    },
    clearOrder: (state) => ({ ...state, loading: false, error: false, data: null }),
    updateOrder: (state, action: PayloadAction<Order>) => ({ ...state, data: action.payload })
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true;})
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<ServerResponseGeneric<{name: string; order: Order;}>> ) => 
        { state.data = action.payload.order; state.loading = false; state.open = true;})
      .addCase(createOrder.rejected, (state) => {  state.loading = false; state.data = null;})
      .addCase(getOrder.pending, (state) => ({ ...state, loading: true, error: false, data: null }))
      .addCase(getOrder.fulfilled, (state, action) => ({ ...state, loading: false, error: false, data: action.payload }))
      .addCase(getOrder.rejected, (state) => ({ ...state, loading: false, error: true, data: null }));
  },
});

export const { openOrder, closeOrder, clearOrder, updateOrder } = orderSlice.actions;
type orderActionCreators = typeof orderSlice.actions;
export type orderDetailsActions = ReturnType<orderActionCreators[keyof orderActionCreators]>;
export default orderSlice;