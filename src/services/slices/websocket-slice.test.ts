

import { Order, WebsocketStatus, WSOrderResponse } from '../../utils/types';
import webSocketSlice, { initialState, connect, disconnect, wsOpen, wsClose, wsError, wsMessage } from './websocket-slice';

const order: Order = {
  _id: '67b64b79133acd001be52454',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2025-02-19T21:22:01.050Z',
  updatedAt: '2025-02-19T21:22:01.723Z',
  number: 68886,
};

const message: WSOrderResponse = {
  success: true,
  orders: [order],
  total: 100,
  totalToday: 1,
};

describe('webSocketSlice', () => {
  it('should initialize correctly', () => {
    const state = webSocketSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('connect', () => {
    const action = { type: connect.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: WebsocketStatus.OPENING });
  });

  it('disconnect', () => {
    const action = { type: disconnect.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: WebsocketStatus.CLOSING });
  });

  it('wsOpen', () => {
    const action = { type: wsOpen.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: WebsocketStatus.ONLINE, error: '' });
  });

  it('wsClose', () => {
    const action = { type: wsClose.type };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('wsError', () => {
    const action = { type: wsError.type, payload: 'Error message' };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: WebsocketStatus.OFFLINE, error: 'Error message' });
  });

  it('wsMessage', () => {
    const action = { type: wsMessage.type, payload: message };
    const state = webSocketSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orders: message.orders, total: message.total, totalToday: message.totalToday });
  });
});
