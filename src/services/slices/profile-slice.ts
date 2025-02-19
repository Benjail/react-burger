import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { loginApi, logoutApi, registerApi, requestUpdateUser, requestUser } from '../../utils/api';
import { ProfileStore } from "../../utils/store";
import { FormData, User } from "../../utils/types";

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const initialState: ProfileStore = {
  user: null, 
  isAuthChecked: false,
  loading: false,
  error: false
};

export const login = createAsyncThunk('profile/login', 
  async (formData: FormData) => {
  const res = await loginApi(formData);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const register = createAsyncThunk('profile/register', async (data: FormData) => {
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    },
  extraReducers: (builder) => {
    builder

    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
      state.loading = false;
    })
    .addCase(login.rejected, (state) => {
      state.loading = false;
      state.isAuthChecked = true;
    })

    .addCase(register.pending, (state) => {
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthChecked = true;
    })
    .addCase(register.rejected, (state, { payload }) => {
      state.loading = false;
    })

    .addCase(logout.pending, (state) => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, (state) => 
      {
        state.user = null;
      })
    .addCase(logout.rejected, (state) => {
      state.loading = false;
    })

    .addCase(getUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload as (User | null);
      state.loading = false;
    })
    .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.error = true;
    })
    
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload?.user as (User | null) ;
    })

    .addCase(checkUserAuth.fulfilled, (state) => {
      state.isAuthChecked = true;
    })
    .addCase(checkUserAuth.rejected, (state) => {
      state.isAuthChecked = true;
      state.error = true;
    })
  },
});
export default profileSlice;