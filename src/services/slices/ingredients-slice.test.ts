import { Ingredient } from "../../utils/types";
import ingredientsSlice, {getIngredients, initialState} from "./ingredients-slice";

const ingredients: Ingredient[] = [
    {
      _id: "643d69a5c3f7b9001cfa093e",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image :"https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile :"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large:"https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v:0
    },
  ];

  describe('ingredientsSlice', () => {
    it('should initialize state', () => {
      const state = ingredientsSlice.reducer(undefined, {type: ''})
      expect(state).toEqual(initialState);
    });

    it ('should pending ingredients',() => {
      const action = { type: getIngredients.pending.type}
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true, error: false});
    });

    it ('should fulfilled ingredients',() => {
      const action = { type: getIngredients.fulfilled.type, payload: {data: ingredients} }
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, data: ingredients, loading: false,error: false});
    });

    it ('should rejected ingredients',() => {
      const action = { type: getIngredients.rejected.type }
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, error: true});
    });
  });
