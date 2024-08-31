import { ingredientsSlice, ingredientsThunk } from '../slices/ingregientsSlice';

describe('ingredients slice test', () => {
  const testCaseOne = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  const testCaseTwo = {
    ingredients: [],
    isLoading: true,
    error: null
  };

  const testCaseThree = {
    ingredients: [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'main',
        proteins: 10,
        fat: 10,
        carbohydrates: 10,
        calories: 100,
        price: 100,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 20,
        fat: 20,
        carbohydrates: 20,
        calories: 200,
        price: 200,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ],
    isLoading: false,
    error: null
  };

  const error = 'An error occurred';

  it('pending ingredients fetch', () => {
    const state = ingredientsSlice.reducer(testCaseOne, ingredientsThunk.pending(''));
    expect(state).toEqual(testCaseTwo);
  });

  it('rejected ingredients fetch', () => {
    const state = ingredientsSlice.reducer(testCaseOne, ingredientsThunk.rejected(new Error(error), ''));
    expect(state).toEqual({ ...testCaseOne, isLoading: false, error });
  });

  it('fulfilled ingredients fetch', () => {
    const state = ingredientsSlice.reducer(testCaseOne, ingredientsThunk.fulfilled(testCaseThree.ingredients, ''));
    expect(state).toEqual(testCaseThree);
  });
});
