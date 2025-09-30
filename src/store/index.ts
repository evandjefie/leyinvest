import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import portfolioSlice from './slices/portfolioSlice';
import { persistMiddleware } from './middleware/persistMiddleware';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    portfolio: portfolioSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;