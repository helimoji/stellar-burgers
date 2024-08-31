import { TOrder } from '@utils-types';
import { userOrdersSlice, OrdersState, getUserOrdersThunk } from '../slices/userOrdersSlice';

describe('userOrders slice test', () => {
  const initialState: OrdersState = {
    orders: [],
    isLoading: false,
    error: ''
  };

  const testCaseTwo: OrdersState = {
    orders: [],
    isLoading: true,
    error: ''
  };
  
  const responseOrders = [
    {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    } as TOrder
  ];

  const testCaseFour: OrdersState = {
    orders: responseOrders,
    isLoading: false,
    error: ''
  };

  const orders = [
    {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    } as TOrder,
    {
      _id: '2',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 2,
      ingredients: ['', '']
    } as TOrder
  ];

  const testCaseFive: OrdersState = {
    orders,
    isLoading: false,
    error: ''
  };

  const testCaseSix: OrdersState = {
    orders: [],
    isLoading: false,
    error: 'Error message'
  };

  it('pending get user orders test', () => {
    const state = userOrdersSlice.reducer(initialState, getUserOrdersThunk.pending(''));
    expect(state).toEqual(testCaseTwo);
  });

  it('rejected get user orders test', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrdersThunk.rejected(new Error('Error message'), '')
    );
    expect(state).toEqual(testCaseSix);
  });

  it('fulfilled get user orders test', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrdersThunk.fulfilled(responseOrders, '')
    );
    expect(state).toEqual(testCaseFour);
  });

  it('fetch user orders success test', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrdersThunk.fulfilled(orders, '')
    );
    expect(state).toEqual(testCaseFive);
  });
});
