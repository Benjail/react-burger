import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getUser as getUserApi,
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
  updateUser as updateUserApi,
  token as token
} from "../../utils/api/auth";
import { getCookie, setCookie } from "../../utils/cookie";


export const REQUEST_PROFILE = createAction("profile/request");
export const SUCCESS_PROFILE = createAction("profile/success");
export const ERROR_PROFILE = createAction("profile/error");
export const CLEAR_PROFILE = createAction("profile/clear");

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
const EXPIRES_TOKEN = 365 * 24 * 60 * 60;

const initialState = {
  email: "",
  name: "",
  request: {
    error: null,
    loading: false,
    fetched: false,
  },
};

// Функция для обновления токенов
function updateTokens({ refreshToken, accessToken }) {
  setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
    expires: EXPIRES_TOKEN,
    path: "/",
  });
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

// Функция для удаления токенов
function removeTokens() {
  setCookie(ACCESS_TOKEN_COOKIE, "", { expires: -1, path: "/" });
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Функция для обработки обновления токенов
function withUpdateToken(requestFn) {
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
  const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return Promise.reject("Ошибка авторизации");
  }

  return (accessToken ? requestFn() : Promise.reject()).catch((err) => {
    if (err?.message !== "jwt expired") {
      return Promise.reject();
    }

    return token({ refreshToken })
      .catch(() => {
        removeTokens();
        return Promise.reject("Ошибка авторизации");
      })
      .then(({ refreshToken, accessToken }) => {
        updateTokens({ refreshToken, accessToken });
        return requestFn();
      });
  });
}

// Асинхронные экшены
export const login = createAsyncThunk(
  "profile/login",
  async (userData, { dispatch, rejectWithValue }) => {
    dispatch(REQUEST_PROFILE());
    try {
      const data = await loginApi(userData);
      updateTokens({ refreshToken: data.refreshToken, accessToken: data.accessToken });
      dispatch(SUCCESS_PROFILE({ email: data.user.email, name: data.user.name }));
      return { email: data.user.email, name: data.user.name };
    } catch (err) {
      dispatch(ERROR_PROFILE(err.message));
      return rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "profile/register",
  async (userData, { dispatch, rejectWithValue }) => {
    dispatch(REQUEST_PROFILE());
    try {
      const data = await registerApi(userData);
      updateTokens({ refreshToken: data.refreshToken, accessToken: data.accessToken });
      dispatch(SUCCESS_PROFILE({ email: data.user.email, name: data.user.name }));
      return { email: data.user.email, name: data.user.name };
    } catch (err) {
      dispatch(ERROR_PROFILE(err.message));
      return rejectWithValue(err.message);
    }
  }
);

export const logout = createAsyncThunk(
  "profile/logout",
  async (_, { dispatch, rejectWithValue }) => {
    const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_KEY);
    dispatch(REQUEST_PROFILE());
    try {
      await logoutApi({ refreshToken });
      dispatch(CLEAR_PROFILE());
      removeTokens();
      return true;
    } catch (err) {
      dispatch(ERROR_PROFILE(err.message));
      return rejectWithValue(err.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "profile/getUser",
  async (_, { dispatch, rejectWithValue }) => {
    console.log("GET USER");
    dispatch(REQUEST_PROFILE());
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
    try {
      console.log("GET COOKIE");
      const data = await getUserApi({ accessToken });
      dispatch(SUCCESS_PROFILE({ email: data.user.email, name: data.user.name }));
      return { email: data.user.email, name: data.user.name };
    } catch (err) {
      dispatch(ERROR_PROFILE(err.message));
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (user, { dispatch, rejectWithValue }) => {
    dispatch(REQUEST_PROFILE());
    try {
      const data = await withUpdateToken(() =>
        updateUserApi({ accessToken: getCookie(ACCESS_TOKEN_COOKIE), ...user }) // Исправлено имя функции
      );
      dispatch(SUCCESS_PROFILE({ email: data.user.email, name: data.user.name }));
      return { email: data.user.email, name: data.user.name };
    } catch (err) {
      dispatch(ERROR_PROFILE(err.message || "Ошибка обновления пользователя"));
      return rejectWithValue(err.message);
    }
  }
);

// Слайс для профиля
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(REQUEST_PROFILE, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(SUCCESS_PROFILE, (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.request.loading = false;
        state.request.fetched = true;
      })
      .addCase(ERROR_PROFILE, (state, { payload }) => {
        state.request.loading = false;
        state.request.error = payload;
      })
      .addCase(CLEAR_PROFILE, () => initialState)

      // Обработка login
      .addCase(login.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.request.loading = false;
        state.request.fetched = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.request.loading = false;
        state.request.error = payload;
      })

      // Обработка register
      .addCase(register.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.request.loading = false;
        state.request.fetched = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.request.loading = false;
        state.request.error = payload;
      })

      // Обработка logout
      .addCase(logout.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, (state, { payload }) => {
        state.request.loading = false;
        state.request.error = payload;
      })

      // Обработка getUser
      .addCase(getUser.pending, (state) => {
        state.request.loading = true;
        state.request.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.email = payload.email;
        state.name = payload.name;
        state.request.loading = false;
        state.request.fetched = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.request.loading = false;
        state.request.error = payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
