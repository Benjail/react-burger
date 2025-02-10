import {
  FormData, 
  Options,
  ServerIngredientsResponse,
  ServerMessageResponse,
  ServerOrderResponse,
  ServerOrdersResponse,
  ServerRefreshResponse,
  ServerResponse,
  ServerUserResponse,
} from '../utils/types';

export default function request<T>(endpoint: string, options?: Options): Promise<T> {
  const BASE_URL_API = 'https://norma.nomoreparties.space/api/';
  const checkResponse = (res: Response):Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  return fetch(`${BASE_URL_API}${endpoint}`, options).then(checkResponse);
}


const requestPost = <T>(endpoint: string, data: FormData): Promise<T> => {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then((data) => ((data as ServerResponse).success ? data : Promise.reject(data)));
};

const requestWithRefresh = async <T>(endpoint: string, options: Options): Promise<T> => {
  const refreshToken = () => {
    const token = localStorage.getItem('refreshToken');
    if(token)
    return requestPost<ServerRefreshResponse>('auth/token', { token }).then((refreshData) => {
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      return refreshData;
    });
  };

  try {
    return await request(endpoint, options);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if(refreshData)
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshToken = () => {
  const token = localStorage.getItem('refreshToken');
  if (token) {
    return requestPost<ServerRefreshResponse>('auth/token', { token }).then((refreshData) => {
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      return refreshData;
    });
  } else {
    return Promise.reject();
  }
};

export const getIngredientsApi = () => {
  return request<ServerIngredientsResponse>('ingredients')
  .catch(() => Promise.reject("Ошибка при загрузке ингредиентов"));
};

export const createOrderApi = (orderListIds: (string | null)[]) => {
  return requestWithRefresh<ServerOrderResponse>('orders', {
    method: "POST",
    body: JSON.stringify({ingredients: orderListIds}),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const getOrderApi = (orderNumber: string) => request<ServerOrdersResponse>(`orders/${orderNumber}`).then(res => res.success ? res.orders[0] : Promise.reject(res));

export const loginApi = (data :FormData) => {
  return requestPost<ServerUserResponse>('auth/login', data);
};

export const registerApi = (data:FormData) => {
  return requestPost<ServerUserResponse>('auth/register', data);
};

export const logoutApi = () => {
  const token = localStorage.getItem('refreshToken');
  if(token)
  return requestPost<ServerUserResponse>('auth/logout', { token });
};

export const passwordReset = (email : string) => {
  return requestPost<ServerMessageResponse>("password-reset", {email});
  };

export const confirmReset = (password: string, token: string) => {
  return requestPost<ServerMessageResponse>('password-reset/reset', {password, token});
}

export const requestUser = () => {
  const authorization = localStorage.getItem('accessToken');
  if(authorization)
  return requestWithRefresh<ServerUserResponse>('auth/user', { headers: {authorization } }).then(res => res.success ? res.user : Promise.reject(res));
};

export const requestUpdateUser = (data: FormData) => {
  const authorization = localStorage.getItem('accessToken');
  if(authorization)
  return request<ServerUserResponse>('auth/user', {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization
    },
  });
};
