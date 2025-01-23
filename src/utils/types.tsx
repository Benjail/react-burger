export interface Ingredient {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
  }

export type Ingredients = Ingredient[];

export type IngredientType = 'bun' | 'sauce' | 'main';

export type OrderIngredient ={
  id: string;
  uuid: string;
}

export interface ConstructorIngredient extends Ingredient {
  id: string;
}

export type ConstructorIngredients = Array<ConstructorIngredient>;

export interface FormData {
  [name: string]: string;
}

export interface User {
  email: string;
  name: string;
}

export type Route = {
  to: string;
  text: string;
}

export interface ArrayData {
  [name: string]: Array<string>;
}