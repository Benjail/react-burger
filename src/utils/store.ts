import { CartIngredient, CartIngredients, Ingredient, Ingredients, User, ServerOrderResponse } from './types';

export interface CartStore {
  bun: CartIngredient | null;
  ingredients: CartIngredients;
}

export interface UserStore {
  user: User | null;
  isAuthChecked: boolean;
}

export interface BurgerIngredientStore {
  data: Ingredients | null;
  isLoading: boolean;
  isError: boolean;
}

export interface IngredientDetailsStore {
  data: Ingredient | null;
}

export interface OrderDetailsStore {
  data: ServerOrderResponse | null;
  isLoading: boolean;
  isError: boolean;
}

export interface Store {
  user: UserStore;
  burgerConstructor: CartStore;
  burgerIngredients: BurgerIngredientStore;
  ingredientDetails: IngredientDetailsStore;
  orderDetails: OrderDetailsStore;
}
