import {
    constructorReducer,
    addItem,
    deleteItem,
    moveUp,
    moveDown,
    clearAll
  } from '../slices/constructorSlice';
  import { TConstructorIngredient } from '@utils-types'; 
  
  describe('constructorSlice reducer', () => {
    it('should handle addItem action', () => {
      const initialState = {
        bun: null,
        ingredients: []
      };
  
      const ingredient: TConstructorIngredient = {
        _id: '1',
        name: 'Lettuce',
        type: 'vegetable',
        proteins: 1,
        fat: 0,
        carbohydrates: 2,
        calories: 10,
        price: 50,
        image: 'lettuce.png',
        image_large: 'lettuce_large.png',
        image_mobile: 'lettuce_mobile.png',
        id: '1'
      };
  
      const action = addItem(ingredient);
  
      const newState = constructorReducer(initialState, action);
      expect(newState.ingredients).toHaveLength(1);
      expect({ ...newState.ingredients[0], id: '1' }).toEqual(ingredient);
    });
  
    it('should handle deleteItem action', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { _id: '1', name: 'Lettuce', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 2, calories: 10, price: 50, image: 'lettuce.png', image_large: 'lettuce_large.png', image_mobile: 'lettuce_mobile.png', id: '1' },
          { _id: '2', name: 'Tomato', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 3, calories: 15, price: 60, image: 'tomato.png', image_large: 'tomato_large.png', image_mobile: 'tomato_mobile.png', id: '2' }
        ]
      };
  
      const action = deleteItem({
        _id: '1',
        name: 'Lettuce',
        type: 'vegetable',
        proteins: 1,
        fat: 0,
        carbohydrates: 2,
        calories: 10,
        price: 50,
        image: 'lettuce.png',
        image_large: 'lettuce_large.png',
        image_mobile: 'lettuce_mobile.png',
        id: '1'
      });
  
      const newState = constructorReducer(initialState, action);
      expect(newState.ingredients).toHaveLength(1);
      expect(newState.ingredients[0].id).toBe('2');
    });
  
    it('should handle moveUp action', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { _id: '1', name: 'Lettuce', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 2, calories: 10, price: 50, image: 'lettuce.png', image_large: 'lettuce_large.png', image_mobile: 'lettuce_mobile.png', id: '1' },
          { _id: '2', name: 'Tomato', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 3, calories: 15, price: 60, image: 'tomato.png', image_large: 'tomato_large.png', image_mobile: 'tomato_mobile.png', id: '2' }
        ]
      };
  
      const action = moveUp(1);
  
      const newState = constructorReducer(initialState, action);
      expect(newState.ingredients[0].id).toBe('2');
      expect(newState.ingredients[1].id).toBe('1');
    });
  
    it('should handle moveDown action', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { _id: '1', name: 'Lettuce', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 2, calories: 10, price: 50, image: 'lettuce.png', image_large: 'lettuce_large.png', image_mobile: 'lettuce_mobile.png', id: '1' },
          { _id: '2', name: 'Tomato', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 3, calories: 15, price: 60, image: 'tomato.png', image_large: 'tomato_large.png', image_mobile: 'tomato_mobile.png', id: '2' }
        ]
      };
  
      const action = moveDown(0);
  
      const newState = constructorReducer(initialState, action);
      expect(newState.ingredients[0].id).toBe('2');
      expect(newState.ingredients[1].id).toBe('1');
    });
  
    it('should handle clearAll action', () => {
      const initialState = {
        bun: { _id: '3', name: 'Bun', type: 'bun', proteins: 5, fat: 1, carbohydrates: 15, calories: 200, price: 100, image: 'bun.png', image_large: 'bun_large.png', image_mobile: 'bun_mobile.png', id: '3' },
        ingredients: [{ _id: '1', name: 'Lettuce', type: 'vegetable', proteins: 1, fat: 0, carbohydrates: 2, calories: 10, price: 50, image: 'lettuce.png', image_large: 'lettuce_large.png', image_mobile: 'lettuce_mobile.png', id: '1' }]
      };
  
      const action = clearAll();
  
      const newState = constructorReducer(initialState, action);
      expect(newState.bun).toBeNull();
      expect(newState.ingredients).toHaveLength(0);
    });
  });
  