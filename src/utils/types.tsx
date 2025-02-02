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

export type CartIngredient ={
  _id: string;
  uuid: string;
}
export type CartIngredients = Array<CartIngredient>;

export interface FormData {
  [name: string]: string;
}

export type User ={
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

export type ServerResponse = {
  success: boolean;
};

export type ServerResponseGeneric<T> = ServerResponse & T;

export type ServerOrderResponse = ServerResponseGeneric<{
  name: string;
  order: Order;
}>;

export interface Order {
  ingredients: Ingredients;
  _id: string;
  owner: Owner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export interface Owner extends User {
  createdAt: string;
  updatedAt: string;
}