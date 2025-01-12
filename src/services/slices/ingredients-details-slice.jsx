import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

const ingredientDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    openDetails: (state, action) => { state.ingredient = action.payload; },
    closeDetails: (state) => { state.ingredient = null; },
  },
});

export const { openDetails, closeDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice;