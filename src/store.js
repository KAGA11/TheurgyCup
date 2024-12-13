import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';

const store = configureStore({
  reducer: {
    scores: scoreReducer, // 注册 scoreSlice
  },
});

export default store;
