import { TOrder } from '@utils-types';
import { newOrderSlice, resetOrder, makeNewOrder } from '../slices/newOrderSlice';

describe('newOrder slice test', () => {
  const testCaseOne = {
    orderRequest: false,
    orderModalData: null,
    error: undefined
  };

  const testCaseTwo = {
    orderRequest: true,
    orderModalData: null,
    error: null
  };

  const testCaseThree = {
    orderRequest: false,
    orderModalData: {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    } as TOrder,
    error: null
  };

  const responseData = {
    success: true,
    order: {
      _id: '1',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['', '']
    } as TOrder,
    name: 'fake order'  // Добавлено поле name
  };

  it('pending makeNewOrder test', () => {
    const state = newOrderSlice.reducer(testCaseOne, makeNewOrder.pending('', ['']));
    expect(state).toEqual(testCaseTwo);
  });

  it('rejected makeNewOrder test', () => {
    const state = newOrderSlice.reducer(
      testCaseOne,
      makeNewOrder.rejected(new Error('Some error'), '', [''])
    );
    expect({
      ...testCaseOne,
      orderRequest: false,
      error: 'Some error'
    }).toEqual(state);
  });

  it('fulfilled makeNewOrder test', () => {
    const state = newOrderSlice.reducer(
      testCaseTwo,
      makeNewOrder.fulfilled(responseData, '', [''])
    );
    expect({
      ...testCaseThree,
      orderRequest: false
    }).toEqual(state);
  });

  it('resetOrder test', () => {
    const state = newOrderSlice.reducer(testCaseThree, resetOrder());
    expect({
      ...testCaseThree,
      orderModalData: null
    }).toEqual(state);
  });

  it('selectors test', () => {
    const state = {
      newOrder: testCaseThree
    };
    expect(newOrderSlice.selectors.getOrderRequest(state)).toBe(testCaseThree.orderRequest);
    expect(newOrderSlice.selectors.getOrderModalData(state)).toEqual(testCaseThree.orderModalData);
  });
});
