import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NEWORDER_SLICE_NAME } from '../constants';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface NewOrder {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

export const makeNewOrder = createAsyncThunk(
  `order/${NEWORDER_SLICE_NAME}`,
  orderBurgerApi
);

const initialState: NewOrder = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: NEWORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeNewOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(makeNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(makeNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      });
  }
});

export const { getOrderRequest, getOrderModalData } = newOrderSlice.selectors;
export const { resetOrder } = newOrderSlice.actions;
