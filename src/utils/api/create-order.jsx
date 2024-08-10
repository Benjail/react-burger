
const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
};

export default function createOrder(orderListIds) {
  return fetch(`${apiConfig.baseUrl}/orders`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: orderListIds,
    }),
  })
    .then(checkResponse)
    .catch(() => Promise.reject("Ошибка при создании заказа"))
    .then(
      (res) => res.order ?? Promise.reject("Не получен номер заказа с сервера")
    );
}

function checkResponse(res) {
  if (res.ok) {
    return res
      .json()
      .then((data) => (
        data.success ? data : Promise.reject(data)
      ));
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(urlApi, options) {
  urlApi = urlApi[0] === "/" ? urlApi.substring(1) : urlApi;

  return fetch(`${apiConfig.baseUrl}/${urlApi}`, options).then(checkResponse);
}