import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, registerApi, requestUpdateUser, requestUser } from '../../utils/api';

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

const initialState = {
  email: "",
  name: "",
  request: {
    error: null,
    loading: false,
    fetched: false,
  },
  user: null, 
  isAuthChecked: false
};

export const login = createAsyncThunk('profile/login', async (data) => {
  const res = await loginApi(data);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const register = createAsyncThunk('profile/register', async (data) => {
  const res = await registerApi(data);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const logout = createAsyncThunk('profile/logout', async () => {
  await logoutApi();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUser = createAsyncThunk('profile/getUser', requestUser);

export const checkUserAuth = createAsyncThunk('profile/checkUserAuth', async (_, thunkAPI) => {
  if (localStorage.getItem('accessToken')) {
    await thunkAPI.dispatch(getUser()).unwrap().catch(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    });
  }
});

export const updateUser = createAsyncThunk('profile/updateUser', requestUpdateUser);
// Слайс для профиля
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder

    //Обработка login
    .addCase(login.pending, (state) => {
      state.request.loading = true;
      state.request.error = null;
      
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      state.request.loading = false;
    })
    .addCase(login.rejected, (state, { payload }) => {
      state.request.loading = false;
      state.request.error = payload;
      state.isAuthChecked = true;
    })

    // Обработка register
    .addCase(register.pending, (state) => {
      state.request.loading = true;
      state.request.error = null;
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.request.loading = false;
      state.user = payload;
      state.isAuthChecked = true;
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
    .addCase(logout.fulfilled, (state) => 
      {
        state.user = null;
      })
    .addCase(logout.rejected, (state, { payload }) => {
      state.request.loading = false;
      state.request.error = payload;
    })

    // Обработка getUser
    .addCase(getUser.pending, (state) => {
      state.request.loading = true;
      state.request.error = null;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.request.loading = false;
    })
    .addCase(getUser.rejected, (state, { payload }) => {
        state.request.loading = false;
        state.request.error = payload;
        state.isAuthChecked = true;
    })
    
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })

    //Обработка checkUserAuth
    .addCase(checkUserAuth.fulfilled, (state) => {
      state.isAuthChecked = true;
    })
    .addCase(checkUserAuth.rejected, (state) => {
      state.isAuthChecked = true;
    })
  },
});
export default profileSlice;