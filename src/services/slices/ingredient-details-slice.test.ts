
import { Ingredient } from '../../utils/types';
import ingredientDetailsSlice, { closeDetails, initialState, openDetails } from './ingredients-details-slice';

const ingredient: Ingredient = 
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
  };

describe('ingredientDetailsSlice', () => {
  it('should initialize correctly', () => {
    const state = ingredientDetailsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should openDetails', () => {
    const action = { type: openDetails.type, payload: ingredient };
    const state = ingredientDetailsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredient: ingredient });
  });

  it('should closeDetails', () => {
    const action = { type: closeDetails.type };
    const state = ingredientDetailsSlice.reducer({ ...initialState, ingredient }, action);
    expect(state).toEqual(initialState);
  });
});
