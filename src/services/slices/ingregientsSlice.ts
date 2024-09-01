import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { INGEDIENTS_SLICE_NAME } from '../constants';

// Определение типа состояния
interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

// Начальное состояние
const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsThunk = createAsyncThunk(
  `${INGEDIENTS_SLICE_NAME}/getIngredients`,
  getIngredientsApi
);

// Создание слайса
export const ingredientsSlice = createSlice({
  name: INGEDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state,
    getIngredientsLoadingState: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(ingredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ingredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(ingredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  getIngredientsState,
  getIngredientsLoadingState,
  getIngredients
} = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
