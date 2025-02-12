import {Ingredient, Ingredients, User, CartIngredients, Orders, Order } from './types';
import { WebsocketStatus } from './types';

export interface CartStore {
  bun: string | null;
  ingredients: CartIngredients;
}

export interface ProfileStore {
  loading: boolean;
  user: User | null;
  isAuthChecked: boolean;
  error: boolean;
}

export interface BurgerIngredientStore {
  data: Ingredients | null;
  loading: boolean;
  error: boolean;
}

export interface IngredientDetailsStore {
  ingredient: Ingredient | null;
}

export interface OrderStore {
  data: Order | null;
  loading: boolean;
  error: boolean;
  open: boolean;
}

export interface Store {
  user: ProfileStore;
  burgerConstructor: CartStore;
  burgerIngredients: BurgerIngredientStore;
  ingredientDetails: IngredientDetailsStore;
  orderDetails: OrderStore;
}

export interface WebSocketStore {
  status: WebsocketStatus;
  orders: Orders;
  total: number;
  totalToday: number;
  error: string;
}
