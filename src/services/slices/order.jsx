import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createOrderApi from "../../utils/api/create-order";
import { resetCart } from "./cart";

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderListIds, { dispatch, rejectWithValue }) => {
    try {
      const data = await createOrderApi(orderListIds);
      dispatch(resetCart());
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: false,
  open: false,
};

export const orderSlice = createSlice({
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
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.open = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { openOrder, closeOrder } = orderSlice.actions;
