import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { USER_SLICE_NAME } from '../constants';
import { setCookie } from '../../utils/cookie';

export const registerUserThunk = createAsyncThunk(
  'users/register',
  registerUserApi
);

export const loginUserThunk = createAsyncThunk('users/login', loginUserApi);

export const getUserThunk = createAsyncThunk('users/getUser', getUserApi);

export const updateUserThunk = createAsyncThunk(
  'users/updateUser',
  updateUserApi
);

export const logoutUserThunk = createAsyncThunk('users/logout', logoutApi);

export interface UserState {
  isLoading: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: UserState = {
  isLoading: false,
  user: {
    name: '',
    email: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectError: (sliceState) => sliceState.error,
    selectUser: (sliceState) => sliceState.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      });
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      });
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });
    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = { name: '', email: '' };
      });
  }
});

export const { selectIsLoading, selectError, selectUser } = userSlice.selectors;
