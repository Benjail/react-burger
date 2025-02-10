import { Ingredients, IngredientWithAmount } from "./types";

export const getUniqIngredientsWithAmount = (ingredientsId: string[], ingredients: Ingredients | null) => {
  if (!ingredients) return [];

  // Подсчет количества каждого ингредиента
  const countMap = ingredientsId.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // Создание массива уникальных ингредиентов с их количеством
  return Object.entries(countMap).map(([id, amount]) => ({
    ...ingredients.find((item: { _id: string; }) => item._id === id),
    amount,
  })) as IngredientWithAmount[];
};
