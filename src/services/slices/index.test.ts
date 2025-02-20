import { preloadedState } from '.';
import { initialState as ingredientsInitialState } from './ingredients-slice';
import { initialState as cartInitialState } from './cart-slice';
import { initialState as ingredientDetailsInitialState } from './ingredients-details-slice';
import { initialState as orderDetailsInitialState } from './order-slice';
import { initialState as profileInitialState } from './profile-slice';
import { initialState as webSocketInitialState } from './websocket-slice';

describe('store', () => {
    it('should initialize ingredients', () => {
      expect(preloadedState.ingredients).toEqual(ingredientsInitialState);
    });

    it('should initialize cart', () => {
      expect(preloadedState.cart).toEqual(cartInitialState);
    });

    it('should initialize details', () => {
      expect(preloadedState.details).toEqual(ingredientDetailsInitialState);
    });

    it('should initialize order', () => {
      expect(preloadedState.order).toEqual(orderDetailsInitialState);
    });

    it('should initialize profile', () => {
      expect(preloadedState.profile).toEqual(profileInitialState);
    });

    it('should initialize webSocket', () => {
      expect(preloadedState.webSocket).toEqual(webSocketInitialState);
    });
});
