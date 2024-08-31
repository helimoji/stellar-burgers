import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CONSTRUCTORE_SLICE_NAME } from '../constants';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: CONSTRUCTORE_SLICE_NAME,
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearAll: (state) => (state = initialState),
    moveDown: (state, action: PayloadAction<number>) => {
      const arr = state.ingredients;
      const indx1 = action.payload;
      const indx2 = indx1 + 1;
      if (indx2 < arr.length) {
        const temp = arr[indx1];
        arr[indx1] = arr[indx2];
        arr[indx2] = temp;
      }
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const arr = state.ingredients;
      const indx1 = action.payload;
      const indx2 = indx1 - 1;
      if (indx1 >= 0) {
        const temp = arr[indx1];
        arr[indx1] = arr[indx2];
        arr[indx2] = temp;
      }
    }
  },
  selectors: {
    selectItems: (state: ConstructorState) => state
  }
});

export const { addItem, deleteItem, clearAll, moveDown, moveUp } =
  constructorSlice.actions;
export const { selectItems } = constructorSlice.selectors;
export const constructorReducer = constructorSlice.reducer;
