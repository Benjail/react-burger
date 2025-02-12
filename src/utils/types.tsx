export interface IngredientWithAmount extends Ingredient {
  amount: number;
}

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


export type Orders = Array<Order>;


export interface Order {
  ingredients: string[];
  _id: string;
  status: 'done' | 'pending' | 'created';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: Owner;
  price?: number;
}

export interface Owner extends User {
  createdAt: string;
  updatedAt: string;
}

export type User ={
  email: string;
  name: string;
}

export interface FormData {
  [name: string]: string;
}

export interface ArrayData {
  [name: string]: Array<string>;
}

export type Route = {
  to: string;
  text: string;
}


export enum Statuses {
  done = 'Выполнен',
  created = 'Создан',
  pending = 'Готовится',
  canceled = 'Отменен',
}

export type ServerResponse = {
  success: boolean;
};

export type ServerResponseGeneric<T> = ServerResponse & T;

export type ServerMessageResponse = ServerResponseGeneric<{
  message: string;
}>;

export type ServerRefreshResponse = ServerResponseGeneric<{
  refreshToken: string;
  accessToken: string;
}>;

export type ServerUserResponse = ServerRefreshResponse & {
  user: User | null;
};

export type ServerIngredientsResponse = ServerResponseGeneric<{
  data: Ingredients;
}>;

export type ServerOrderResponse = ServerResponseGeneric<{
  name: string;
  order: Order;
}>;

export type ServerOrdersResponse = ServerResponseGeneric<{
  name: string;
  orders: Orders;
}>;

export type HTTPMethods = 'GET' | 'POST' | 'PATCH';

export interface Options {
  method?: HTTPMethods;
  body?: string;
  headers: {
    'Content-Type'?: string;
    authorization?: string;
  };
}

export type RequestData = FormData | ArrayData;

export interface WSOrderResponse {
  success: boolean;
  orders: Orders;
  total: number;
  totalToday: number;
}

export enum WebsocketStatus {
  OPENING = 'opening...',
  CLOSING = 'closing...',
  ONLINE = 'online',
  OFFLINE = 'offline',
}