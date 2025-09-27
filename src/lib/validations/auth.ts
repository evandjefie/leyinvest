import { z } from 'zod';

// Validation des champs communs
const emailSchema = z.string().email('Format d\'email invalide').min(1, 'L\'email est obligatoire');
const passwordSchema = z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').max(100, 'Le mot de passe ne peut pas dépasser 100 caractères');

// Schéma de validation pour le login
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Schéma de validation pour l'inscription (étape 1)
export const registerSchema = z.object({
  nom: z.string().min(1, 'Le nom est obligatoire').max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  prenom: z.string().min(1, 'Le prénom est obligatoire').max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  email: emailSchema,
});

// Schéma de validation pour la vérification d'email
export const verifyEmailSchema = z.object({
  email: emailSchema,
  verification_code: z.string().length(4, 'Le code de vérification doit contenir 4 chiffres'),
});

// Schéma de validation pour la réinitialisation du mot de passe
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// Schéma de validation pour la finalisation du profil
export const completeProfileSchema = z.object({
  // Ajoutez ici les champs nécessaires pour finaliser le profil
  // Par exemple:
  numero_whatsapp: z.string().min(8, 'Le numéro WhatsApp doit contenir au moins 8 chiffres').max(15, 'Le numéro WhatsApp ne peut pas dépasser 15 chiffres'),
  age: z.number().int('L\'âge doit être un nombre entier').min(16, 'Vous devez avoir au moins 16 ans').max(120, 'L\'âge ne peut pas dépasser 120 ans'),
  genre: z.enum(['Homme', 'Femme'], { required_error: 'Le genre est obligatoire' }),
  pays_residence: z.string().min(1, 'Le pays de résidence est obligatoire'),
  situation_professionnelle: z.string().min(1, 'La situation professionnelle est obligatoire'),
  mot_de_passe: passwordSchema,
});

// Types dérivés des schémas
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>;