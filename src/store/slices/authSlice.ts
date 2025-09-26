import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/services/authApi';
import { RegisterRequest, LoginRequest, VerifyEmailRequest, ChangePasswordRequest, ResendCodeRequest } from '@/types/api';

interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  is_verified: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  registrationEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  registrationEmail: null,
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
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erreur de connexion');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
    } finally {
      localStorage.removeItem('access_token');
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
      });
  },
});

export const { clearError, setRegistrationEmail } = authSlice.actions;
export default authSlice.reducer;