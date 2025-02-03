import {Ingredient, Ingredients, User, ServerOrderResponse, CartIngredients } from './types';

export interface CartStore {
  bun: string | null;
  ingredients: CartIngredients;
}

export interface UserStore {
  user: User | null;
  isAuthChecked: boolean;
}

export interface BurgerIngredientStore {
  data: Ingredients | null;
  loading: boolean;
  error: boolean;
}

export interface IngredientDetailsStore {
  ingredient: Ingredient | null;
}

export interface OrderDetailsStore {
  data: ServerOrderResponse | null;
  loading: boolean;
  error: boolean;
  open: boolean;
}

export interface Store {
  user: UserStore;
  burgerConstructor: CartStore;
  burgerIngredients: BurgerIngredientStore;
  ingredientDetails: IngredientDetailsStore;
  orderDetails: OrderDetailsStore;
}
