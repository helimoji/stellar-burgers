import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'users/register',
  (data: TRegisterData) => {
    registerUserApi(data);
  }
);

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  selectors: {
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIsInit: (sliceState) => sliceState.isInit
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isInit = true;
      });
  }
});

export const { selectIsLoading, selectIsInit } = userSlice.selectors;
