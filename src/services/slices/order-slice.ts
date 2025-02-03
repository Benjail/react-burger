import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {createOrderApi} from "../../utils/api";
import { resetCart } from "./cart-slice";
import { OrderDetailsStore } from "../../utils/store";
import { Order, ServerResponseGeneric } from "../../utils/types";

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderListIds, { dispatch, rejectWithValue }) => {
    const data = await createOrderApi(orderListIds);
    dispatch(resetCart());
    return data;   
  }
);

const initialState = {
  data: null,
  loading: false,
  error: false,
  open: false
} satisfies OrderDetailsStore as OrderDetailsStore;

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true;})
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<ServerResponseGeneric<{name: string;order: Order;}>> ) => 
        { state.data = action.payload; state.loading = false; state.open = true;})
      .addCase(createOrder.rejected, (state) => {  state.loading = false; state.data = null;});
  },
});

export const { openOrder, closeOrder } = orderSlice.actions;
type orderActionCreators = typeof orderSlice.actions;
export type orderDetailsActions = ReturnType<orderActionCreators[keyof orderActionCreators]>;
export default orderSlice;