import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    appendBunCart: (state, action) => {
      state.bun = action.payload;
    },
    appendIngredientCart: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeCart: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.uuid !== action.payload
      );
    },
    sortCart: (state, action) => {
      const prevItem = state.ingredients.find(
        ({ uuid }) => uuid === action.payload.prevUuid
      );
      const newItem = state.ingredients.find(
        ({ uuid }) => uuid === action.payload.newUuid
      );
      const prevIndex = state.ingredients.indexOf(prevItem);
      const newIndex = state.ingredients.indexOf(newItem);

      state.ingredients.splice(prevIndex, 1, newItem);
      state.ingredients.splice(newIndex, 1, prevItem);
    },
    resetCart: () => initialState,
  },
});

export const {
  appendBunCart,
  appendIngredientCart,
  removeCart,
  sortCart,
  resetCart,
} = cartSlice.actions;
