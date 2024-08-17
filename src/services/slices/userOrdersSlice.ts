import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USER_ORDERS_SLICE_NAME } from '../constants';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const getUserOrdersThunk = createAsyncThunk(
  'users/userOrders',
  getOrdersApi
);

export interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: ''
};

export const userOrdersSlice = createSlice({
  name: USER_ORDERS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectOrders: (state) => state.orders,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { selectOrders, selectIsLoading, selectError } =
  userOrdersSlice.selectors;
