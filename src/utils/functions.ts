import { Ingredients, IngredientWithAmount } from "./types";

export const getUniqIngredientsWithAmount = (ingredientsId: string[], ingredients: Ingredients | null) => {
  if (!ingredients) return [];

  const countMap = ingredientsId.reduce<Record<string, number>>((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(countMap).map(([id, amount]) => ({
    ...ingredients.find((item: { _id: string; }) => item._id === id),
    amount,
  })) as IngredientWithAmount[];
};
