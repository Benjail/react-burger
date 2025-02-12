import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartStore } from "../../utils/store";
import { CartIngredient } from "../../utils/types";

const initialState = {
  bun: null,
  ingredients: [],
} satisfies CartStore as CartStore;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    appendBunCart: (state, action) => { state.bun = action.payload; },
    appendIngredientCart: (state, action: PayloadAction<{_id: string, uuid: string}>) => { state.ingredients.push(action.payload); },
    removeCart: (state, action) => { state.ingredients = state.ingredients.filter((ingredient) => ingredient.uuid !== action.payload );},
    sortCart: (state, action) => { const prevItem = state.ingredients.find(({ uuid }) => uuid === action.payload.prevUuid ) as CartIngredient;
      const newItem = state.ingredients.find(({ uuid }) => uuid === action.payload.newUuid ) as CartIngredient;
      const prevIndex = state.ingredients.indexOf(prevItem);
      const newIndex = state.ingredients.indexOf(newItem);
      state.ingredients.splice(prevIndex, 1, newItem);
      state.ingredients.splice(newIndex, 1, prevItem);
    },
    resetCart: () => initialState,
  },
});

export const { appendBunCart, appendIngredientCart, removeCart, sortCart, resetCart } = cartSlice.actions;
type cartActionCreators = typeof cartSlice.actions;
export type cartActions = ReturnType<cartActionCreators[keyof cartActionCreators]>;
export default cartSlice;