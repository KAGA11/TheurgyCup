import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';
import eventReducer from './eventSlice'

const store = configureStore({
  reducer: {
    scores: scoreReducer, // 注册 scoreSlice
    events: eventReducer,
  },
});

export default store;
