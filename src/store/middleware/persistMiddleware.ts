import { Middleware } from '@reduxjs/toolkit';
import { cacheManager } from '@/services/offline';
import { AnyAction } from '@reduxjs/toolkit';

export const persistMiddleware: Middleware = (store) => (next) => async (action: AnyAction) => {
  const result = next(action);
  
  if (action.type === 'auth/login/fulfilled') {
    const state = store.getState();
    if (state.auth.user) {
      await cacheManager.cacheUserData(state.auth.user.id.toString(), state.auth.user);
    }
  }
  
  if (action.type === 'portfolio/fetchPortfolioSuccess') {
    const state = store.getState();
    const userId = state.auth.user?.id;
    if (userId) {
      await cacheManager.cacheUserData(`portfolio_${userId}`, state.portfolio);
    }
  }
  
  return result;
};
