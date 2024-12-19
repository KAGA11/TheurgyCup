import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './scoreSlice';
import eventReducer from './eventSlice'

const store = configureStore({
  reducer: {
    scores: scoreReducer, // 注册 scoreSlice
    events: eventReducer,
  },
});

// 导出 RootState 类型，用于定义 Redux 状态的类型
export type RootState = ReturnType<typeof store.getState>;
export default store;
