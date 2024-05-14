import { configureStore } from '@reduxjs/toolkit';
import calculateReducer from './calculate';

const store = configureStore({
  reducer: {
    calculate: calculateReducer
  }
});

export default store;

export const increment = calculateReducer.actions.increment;
