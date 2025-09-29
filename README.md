# LeyInvest

LeyInvest est une plateforme moderne d'investissement sur la Bourse Régionale des Valeurs Mobilières (BRVM), développée avec React et TypeScript.

## 🚀 Technologies

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit
- **UI**: Tailwind CSS + Shadcn/ui + Framer Motion
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notifications**: Shadcn Toast
- **Offline**: IndexedDB

## 🏗️ Architecture

### Services Layer
- **apiConfig.ts**: Configuration Axios centrale avec gestion d'erreurs
- **authApi.ts**: Endpoints d'authentification
- **userApi.ts**: Endpoints utilisateur  
- **offline.ts**: Cache IndexedDB pour mode hors ligne

### Workflow d'inscription
1. **Register** (`/auth/register`) - Création compte
2. **VerifyEmail** (`/auth/verify-email`) - Vérification email
3. **CompleteProfile** (`/auth/complete-profile`) - Finalisation profil
4. **Dashboard** (`/dashboard`) - Accès application

### API Endpoints

#### Authentification
- `POST /register/step1/` - Inscription initiale
- `POST /register/step2/verify-email/` - Vérification email
- `POST /register/step2/resend-code/` - Renvoyer code
- `POST /register/step3/complete-profile/` - Finaliser profil
- `POST /auth/login/` - Connexion
- `POST /auth/logout/` - Déconnexion
- `POST /auth/change-password/` - Changer mot de passe

#### Utilisateur
- `GET /users/me/` - Profil utilisateur
- `DELETE /users/me/` - Supprimer compte

## 🔧 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 📝 Validation des formulaires

### Règles de validation
- **Âge**: Entier strictement positif (16-120 ans)
- **Mot de passe**: Minimum 8 caractères
- **Email**: Format email valide
- **Téléphone**: 8-15 chiffres
- **Nom/Prénom**: 1-50 caractères
- **Genre**: "Homme" ou "Femme"

### Gestion d'erreurs
- Validation client avec Zod
- Messages d'erreur localisés en français
- Gestion d'erreurs réseau (CORS, timeout, etc.)
- Cache hors ligne avec IndexedDB

## 🌐 Configuration

Variables d'environnement:
```env
VITE_API_BASE_URL=
```

## 📱 Pages

- **Authentification**: Login, Register, Verify Email, Complete Profile
- **Dashboard**: Tableau de bord principal
- **Portfolio**: Gestion du portefeuille
- **Analysis**: Analyse des investissements

## 🔒 Sécurité

- Tokens JWT stockés en localStorage
- Intercepteurs Axios pour authentification
- Validation côté client et serveur
- Gestion des erreurs d'authentification
- Cache sécurisé avec IndexedDB

## 🎨 Design System

- **Couleurs**: Système de tokens sémantiques HSL
- **Composants**: Shadcn/ui customisés (LeyButton, LeyInput, LeyCard)
- **Responsive**: Mobile-first avec Tailwind CSS
- **Animations**: Framer Motion pour les transitions

## 📊 État de l'application

Redux Toolkit avec slices:
- **authSlice**: Authentification et utilisateur
- **portfolioSlice**: Données du portefeuille

## 🔄 Offline Support

- Cache automatique des données utilisateur
- Synchronisation à la reconnexion
- Nettoyage automatique du cache expiré
- Fallback mode hors ligne