import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredient: null,
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    openDetails: (state, action) => {
      state.ingredient = action.payload;
    },
    closeDetails: (state) => {
      state.ingredient = null;
    },
  },
});

export const { openDetails, closeDetails } = detailsSlice.actions;
 