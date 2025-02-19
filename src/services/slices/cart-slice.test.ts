import { CartIngredient } from "../../utils/types";
import cartSlice, { appendBunCart, appendIngredientCart, removeCart, sortCart, resetCart, initialState} from "./cart-slice";

const cartIngredientOne: CartIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  uuid: 'zklLf72bD-iH0H1cJU8WE'
};

const cartIngredientTwo: CartIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  uuid: 'zklLf72bD-iH0H1cJU8WE2'
};

  describe('cartSlice', () => {
    it('should add a bun', () => {
      const bun = "643d69a5c3f7b9001cfa093d";
      const action = { type: appendBunCart.type, payload: bun };
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, bun: bun, ingredients:[] });
    });

    it('should add cartingredient', () => {
      const action = { type: appendIngredientCart.type, payload: cartIngredientOne };
      const state = cartSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, bun: null,ingredients:[cartIngredientOne] });
    });

    it('should remove cartIngredient', () => {
      const action = { type: removeCart.type, payload: cartIngredientOne.uuid };
      const state = cartSlice.reducer({...initialState, ingredients: [cartIngredientOne]}, action);
      expect(state).toEqual({ ...initialState, ingredients: [] });
    });

    it('should sort cartIngredients', () => {
      const action = { type: sortCart.type, payload: { prevUuid: cartIngredientOne.uuid, newUuid: cartIngredientTwo.uuid } };
      const state = cartSlice.reducer(
        {
          ...initialState,
          ingredients: [cartIngredientOne, cartIngredientTwo],
        },
        action
      );
      expect(state).toEqual({ ...initialState, ingredients: [cartIngredientTwo, cartIngredientOne] });
    });

    it('should reset cart', () => {
      const action = { type: resetCart.type };
      const state = cartSlice.reducer({...initialState, ingredients: [cartIngredientOne]}, action);
      expect(state).toEqual({ ...initialState, ingredients: [] ,bun: null});
    });
  });
