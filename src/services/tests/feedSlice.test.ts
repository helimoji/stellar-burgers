import { feedReducer, feedThunk, selectOrders, selectTotal, selectTotalToday, selectError, selectIsLoading } from '../slices/feedSlice';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

// Мокирование функции getFeedsApi
jest.mock('../../utils/burger-api');

const getFeedsApiMock = getFeedsApi as jest.MockedFunction<typeof getFeedsApi>;

const ordersMock: TOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    number: 1,
    name: 'Order 1', 
    createdAt: '2021-08-01T14:48:00.000Z',
    updatedAt: '2021-08-01T14:50:00.000Z',
  },
];

describe('feedSlice reducer', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: ''
    };
  });

  it('should handle initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle feedThunk.pending', () => {
    const action = { type: feedThunk.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe('');
  });

  it('should handle feedThunk.fulfilled', () => {
    const payload = {
      orders: ordersMock,
      total: 100,
      totalToday: 10,
    };

    const action = { type: feedThunk.fulfilled.type, payload };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });

  it('should handle feedThunk.rejected', () => {
    const action = { type: feedThunk.rejected.type, error: { message: 'Error fetching feeds' } };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error fetching feeds');
  });

  // Тесты для селекторов
  it('should select orders', () => {
    const state = { feed: initialState }; 
    expect(selectOrders(state)).toEqual(initialState.orders); 
  });

  it('should select total', () => {
    const state = { feed: initialState }; 
    expect(selectTotal(state)).toEqual(initialState.total); 
  });

  it('should select total today', () => {
    const state = { feed: initialState }; 
    expect(selectTotalToday(state)).toEqual(initialState.totalToday); 
  });

  it('should select error', () => {
    const state = { feed: initialState }; 
    expect(selectError(state)).toEqual(initialState.error); 
  });

  it('should select isLoading', () => {
    const state = { feed: initialState }; 
    expect(selectIsLoading(state)).toEqual(initialState.isLoading); 
  });
});
