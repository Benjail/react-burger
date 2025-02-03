import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredient } from "../../utils/types";
import { IngredientDetailsStore } from "../../utils/store";

const initialState = {
  ingredient: null,
} satisfies IngredientDetailsStore as IngredientDetailsStore;

const ingredientDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    openDetails: (state, action: PayloadAction<Ingredient>) => { state.ingredient = action.payload; },
    closeDetails: (state) => { state.ingredient = null; },
  },
});

export const { openDetails, closeDetails } = ingredientDetailsSlice.actions;
type ingredientDetailsActionCreators = typeof ingredientDetailsSlice.actions;
export type ingredientDetailsActions = ReturnType<ingredientDetailsActionCreators[keyof ingredientDetailsActionCreators]>;
export default ingredientDetailsSlice;