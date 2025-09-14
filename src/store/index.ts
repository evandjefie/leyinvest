import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import portfolioSlice from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    portfolio: portfolioSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;