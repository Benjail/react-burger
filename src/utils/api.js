export default function request(endpoint, options) {
  const BASE_URL_API = 'https://norma.nomoreparties.space/api/';
  const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  return fetch(`${BASE_URL_API}${endpoint}`, options).then(checkResponse);
}


const requestPost = (endpoint, data) => {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then((data) => (data.success ? data : Promise.reject(data)));
};

const requestWithRefresh = async (endpoint, options) => {
  const refreshToken = () => {
    return requestPost('auth/token', { token: localStorage.getItem('refreshToken') }).then((refreshData) => {
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      return refreshData;
    });
  };

  try {
    return await request(endpoint, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsApi = () => {
  return request('ingredients')
  .catch(() => Promise.reject("Ошибка при загрузке ингредиентов"));
};

export const createOrderApi = (orderListIds) => {
  return requestWithRefresh('orders', {
    method: "POST",
    body: JSON.stringify({ingredients: orderListIds}),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const loginApi = (data) => {
  return requestPost('auth/login', data);
};

export const registerApi = (data) => {
  return requestPost('auth/register', data);
};

export const logoutApi = () => {
  return requestPost('auth/logout', { token: localStorage.getItem('refreshToken') });
};

export const passwordReset = (email) => {
  return requestPost("password-reset", {email});
  };

export const confirmReset = (password, token) => {
  return requestPost('password-reset/reset', {password, token});
}

export const requestUser = () => {
  return requestWithRefresh('auth/user', { headers: { authorization: localStorage.getItem('accessToken') } });
};

export const requestUpdateUser = (data) => {
  return request('auth/user', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    },
  });
};
