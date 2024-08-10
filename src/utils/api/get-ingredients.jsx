const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка при загрузке ингредиентов" ${res.status}`);
};

export const getIngredientsApi = () => {
  return fetch(`https://norma.nomoreparties.space/api/ingredients`, {
  }).then(getResponse);
};
