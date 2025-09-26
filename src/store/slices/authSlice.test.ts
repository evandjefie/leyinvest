import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginUser } from './authSlice';

jest.mock('axios');

describe('authSlice - login thunk (succès)', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios.post.mockReset();
    localStorage.clear();
  }
  );

  it('met loading à false, passe à authenticated et stocke le token', async () => {
    const fakeResponse = {
      access_token: 'jwt.token.value',
      user_id: 1,
      email: 'test@example.com',
      nom: 'Doe',
      prenom: 'John',
      is_verified: true,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: fakeResponse });

    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    // Etat initial
    expect(store.getState().auth.loading).toBe(false);
    expect(store.getState().auth.isAuthenticated).toBe(false);

    // Dispatch du thunk
    await store.dispatch<any>(loginUser({ email: 'test@example.com', password: 'password' }));

    const state = store.getState().auth;

    // loading doit être false après fulfilled
    expect(state.loading).toBe(false);

    // auth doit être true
    expect(state.isAuthenticated).toBe(true);

    // token doit être stocké dans localStorage
    expect(localStorage.getItem('access_token')).toBe('jwt.token.value');
  });
});

