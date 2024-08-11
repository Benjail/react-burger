import {getIngredientsApi} from "../../utils/api/get-ingredients";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
  };

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadIngredients.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.data = action.payload.data;  
                state.loading = false;
            })            
            .addCase(loadIngredients.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
});

export const loadIngredients = createAsyncThunk(
    "ingredients/load",
    getIngredientsApi
  )