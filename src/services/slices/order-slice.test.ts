
import { Order } from '../../utils/types';
import orderSlice, { initialState, clearOrder, updateOrder, createOrder, getOrder, closeOrder, openOrder } from './order-slice';

const order: Order = {
  _id: '67b64b79133acd001be52454',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2025-02-19T21:22:01.050Z',
  updatedAt: '2025-02-19T21:22:01.723Z',
  number: 68886,
};

describe('orderSlice', () => {
  it('should initialize correctly', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should openOrder', () => {
    const action = { type: openOrder.type };
    const state = orderSlice.reducer({ ...initialState, open: false }, action);
    expect(state).toEqual({ ...initialState, open: true });
  });

  it('should closeOrder', () => {
    const action = { type: closeOrder.type };
    const state = orderSlice.reducer({ ...initialState, open: true }, action);
    expect(state).toEqual(initialState);
  });

  it('should clearOrder', () => {
    const action = { type: clearOrder.type };
    const state = orderSlice.reducer({ ...initialState, data: order }, action);
    expect(state).toEqual(initialState);
  });

  it('should updateOrder', () => {
    const action = { type: updateOrder.type, payload: order };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, data: order });
  });

  describe('createOrder', () => {
    it('should pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true, error: false });
    });

    it('should fulfilled', () => {
      const action = { type: createOrder.fulfilled.type, payload: {order: order} };
      const state = orderSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, data: order, loading: false, error: false, open: true });
    });

    it('should rejected', () => {
      const action = { type: createOrder.rejected.type };
      const state = orderSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false,  data: null });
    });
  });

  describe('getOrder', () => {
    it('should pending', () => {
      const action = { type: getOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true, error: false });
    });

    it('should fulfilled', () => {
      const action = { type: getOrder.fulfilled.type, payload: order };
      const state = orderSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, error: false, data: order });
    });

    it('should rejected', () => {
      const action = { type: getOrder.rejected.type };
      const state = orderSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, error: true, data: null });
    });
  });
});
