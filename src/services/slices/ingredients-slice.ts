import {getIngredientsApi} from "../../utils/api";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import { BurgerIngredientStore } from "../../utils/store";

export const initialState : BurgerIngredientStore= {
    data: [],
    loading: false,
    error: false
  };

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getIngredients.pending, (state) => {state.loading = true; state.error = false;})
            .addCase(getIngredients.fulfilled, (state, action) => {state.data = action.payload.data; state.loading = false; })            
            .addCase(getIngredients.rejected, (state, action) => {state.error = true; state.loading = false; })
    }
});

export const getIngredients = createAsyncThunk(
    "ingredients/get",
    getIngredientsApi
  )
 export default ingredientsSlice;
