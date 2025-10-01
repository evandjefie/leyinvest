import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/services/authApi';
import { cacheManager } from '@/services/offline';
import { RegisterRequest, LoginRequest, VerifyEmailRequest, ChangePasswordRequest, ResendCodeRequest, ResetPasswordRequest, ConfirmResetPasswordRequest } from '@/types/api';

interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  is_verified: boolean;
  age?: number;
  genre?: string;
  numero_whatsapp?: string;
  pays_residence?: string;
  situation_professionnelle?: string;
  role?: string;
  created_at?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  registrationEmail: string | null;
  resetToken: string | null;
  rememberMe: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  registrationEmail: null,
  resetToken: null,
  rememberMe: false,
};

// Async thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return { ...response, email: userData.email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur d\'inscription');
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: VerifyEmailRequest, { rejectWithValue }) => {
    try {
      return await authApi.verifyEmail(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur de vérification');
    }
  }
);

export const resendCode = createAsyncThunk(
  'auth/resendCode',
  async (data: ResendCodeRequest, { rejectWithValue }) => {
    try {
      return await authApi.resendCode(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur lors du renvoi du code');
    }
  }
);

export const completeProfile = createAsyncThunk(
  'auth/completeProfile',
  async (data: any, { rejectWithValue }) => {
    try {
      return await authApi.completeProfile(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur lors de la finalisation du profil');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      localStorage.setItem('access_token', response.access_token);
      
      const userData = {
        id: response.user_id,
        email: response.email,
        nom: response.nom,
        prenom: response.prenom,
        is_verified: response.is_verified,
      };
      
      if (response && response.access_token) {
        await cacheManager.cacheAuthData({ access_token: response.access_token, user: userData });
      }
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur de connexion');
    }
  }
);

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const cachedAuth = await cacheManager.getCachedAuthData();
      const token = localStorage.getItem('access_token');
      
      if (!token && !cachedAuth?.access_token) {
        return rejectWithValue('Aucune session trouvée');
      }

      if (cachedAuth?.access_token && !token) {
        localStorage.setItem('access_token', cachedAuth.access_token);
      }

      const { userApi } = await import('@/services/userApi');
      const userProfile = await userApi.getCurrentUser();
      
      await cacheManager.cacheAuthData({ 
        access_token: token || cachedAuth.access_token, 
        user: userProfile 
      });
      
      return userProfile;
    } catch (error: any) {
      localStorage.removeItem('access_token');
      await cacheManager.clearCache();
      return rejectWithValue(error.message || 'Session expirée');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const { userApi } = await import('@/services/userApi');
      await userApi.updateProfile(data);
      const updatedUser = await userApi.getCurrentUser();
      
      await cacheManager.cacheUserData(updatedUser.id.toString(), updatedUser);
      
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur de mise à jour');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error) {
    } finally {
      localStorage.removeItem('access_token');
      await cacheManager.clearCache();
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      return await authApi.changePassword(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur de changement de mot de passe');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordRequest, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur lors de la réinitialisation du mot de passe');
    }
  }
);

export const confirmResetPassword = createAsyncThunk(
  'auth/confirmResetPassword',
  async ({ token, data }: { token: string; data: ConfirmResetPasswordRequest }, { rejectWithValue }) => {
    try {
      return await authApi.confirmResetPassword(token, data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur lors de la confirmation du mot de passe');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setRegistrationEmail: (state, action: PayloadAction<string>) => {
      state.registrationEmail = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationEmail = action.payload.email;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Resend Code
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Complete Profile
      .addCase(completeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeProfile.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(completeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.user_id,
          email: action.payload.email,
          nom: action.payload.nom,
          prenom: action.payload.prenom,
          is_verified: action.payload.is_verified,
        };
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      
    // Restore Session
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      
    // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.registrationEmail = null;
        state.error = null;
      })
      
    // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetToken = action.payload.token;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
    // Confirm Reset Password
      .addCase(confirmResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetToken = null;
        state.error = null;
      })
      .addCase(confirmResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setRegistrationEmail, setRememberMe } = authSlice.actions;
export default authSlice.reducer;