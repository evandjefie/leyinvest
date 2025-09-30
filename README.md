# LeyInvest

LeyInvest est une plateforme moderne d'investissement sur la Bourse Régionale des Valeurs Mobilières (BRVM), développée avec React et TypeScript.

## 📱 Comment utiliser l'application localement

### Prérequis
- Node.js 18+ et npm installés
- Backend API disponible (voir configuration ci-dessous)

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

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd leyinvest

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env à la racine du projet
echo "VITE_API_BASE_URL=https://backend.com" > .env

# Lancer le serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:5173
```

### Build pour la production
```bash
npm run build
# Les fichiers compilés seront dans le dossier dist/
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

## ✅ Fonctionnalités développées

### Authentification complète
- ✅ Inscription en 3 étapes (Step1 → Verify Email → Complete Profile)
- ✅ Connexion avec gestion d'erreurs avancée
- ✅ Modal d'erreur pour comptes inexistants avec lien vers inscription
- ✅ Vérification email avec code à 4 chiffres
- ✅ Renvoi de code de vérification
- ✅ Changement de mot de passe
- ✅ Déconnexion

### Interface utilisateur
- ✅ Dashboard avec statistiques d'investissement
  - Vue d'ensemble des investissements
  - Top 5 et Flop 5 des entreprises
  - Évaluations (court, moyen, long terme)
  - Publications officielles
- ✅ Page Portefeuille
  - Graphique de performance vs BRVM Composite
  - Tableau détaillé des positions
  - Indicateurs de gains/pertes
- ✅ Page Analyse
  - Analyse par secteurs
  - Prévision de rendements
  - Calendrier de paiement des dividendes
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Profil utilisateur dans la sidebar

### Architecture technique
- ✅ Services API centralisés (authApi, userApi)
- ✅ Gestion d'erreurs détaillée (CORS, network, timeout)
- ✅ Cache hors ligne avec IndexedDB
- ✅ Redux Toolkit pour la gestion d'état
- ✅ Validation Zod pour les formulaires
- ✅ Toasts et modals pour les notifications

## 🚧 Prochaines étapes à développer

### Fonctionnalités métier
- [ ] Page détaillée d'une entreprise avec historique
- [ ] Système de trading (achat/vente d'actions)
- [ ] Notifications en temps réel des mouvements du marché
- [ ] Alertes personnalisées (prix, dividendes)
- [ ] Historique des transactions
- [ ] Export des données (PDF, Excel)
- [ ] Graphiques avancés avec indicateurs techniques

### Profil utilisateur
- [ ] Modification du profil utilisateur
- [ ] Photo de profil
- [ ] Préférences de notification
- [ ] Paramètres de sécurité (2FA)
- [ ] Suppression de compte

### Optimisations
- [ ] Tests unitaires et E2E
- [ ] PWA (Progressive Web App)
- [ ] Mode hors ligne complet
- [ ] Performance optimisée (lazy loading, code splitting)
- [ ] Accessibilité WCAG AA

## 🔒 Sécurité

- Tokens JWT stockés en localStorage avec refresh automatique
- Intercepteurs Axios pour authentification automatique
- Validation Zod côté client et serveur
- Gestion des erreurs d'authentification avec redirections
- Cache sécurisé avec IndexedDB
- Protection CSRF et XSS

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