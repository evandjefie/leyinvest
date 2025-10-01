// API Types for LeyInvest Backend

export interface RegisterRequest {
  nom: string;
  prenom: string;
  age: number;
  genre: 'Homme' | 'Femme';
  email: string;
  numero_whatsapp: string;
  pays_residence: string;
  situation_professionnelle: string;
  mot_de_passe: string;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
  email: string;
}

export interface VerifyEmailRequest {
  email: string;
  verification_code: string;
}

export interface VerifyEmailResponse {
  message: string;
  user_id: number;
}

export interface ResendCodeRequest {
  email: string;
}

export interface ResendCodeResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  email: string;
  nom: string;
  prenom: string;
  is_verified: boolean;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordResponse {
  message: string;
  token: string;
}

export interface ConfirmResetPasswordRequest {
  password: string;
  confirm_password: string;
}

export interface ConfirmResetPasswordResponse {
  message: string;
}

export interface UserProfile {
  nom: string;
  prenom: string;
  age: number;
  genre: string;
  email: string;
  numero_whatsapp: string;
  pays_residence: string;
  situation_professionnelle: string;
  id: number;
  role: string;
  is_verified: boolean;
  created_at: string;
}

export interface ApiError {
  detail: Array<{
    loc: string[];
    msg: string;
    type: string;
    input?: any;
    ctx?: any;
  }>;
}