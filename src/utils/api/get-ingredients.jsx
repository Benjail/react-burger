import request from "./request";

export const getIngredientsApi = () => {
  return request("/ingredients")
  .catch(() => Promise.reject("Ошибка при загрузке ингредиентов"));
};
