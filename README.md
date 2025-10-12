# LeyInvest - Plateforme d'Investissement

Application web React pour la gestion de portefeuilles d'investissement.

## 🚀 Technologies

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **UI**: Tailwind CSS, Framer Motion, Shadcn UI
- **Formulaires**: React Hook Form, Zod
- **Persistance**: IndexedDB
- **API**: Axios
- **Toast**: Sonner

## 📦 Installation

```bash
npm install
npm run dev
npm run build
```

## 🔐 Authentification

### Fonctionnalités

- **Inscription** avec vérification email
- **Connexion** avec persistance de session
- **Réinitialisation** de mot de passe
- **Session persistante** avec refresh automatique
- **IndexedDB** pour le stockage offline
- **Validation avancée** des numéros de téléphone par pays

### Flux d'Authentification

1. **Inscription** → Vérification email → Complétion du profil
2. **Connexion** → Restauration automatique de la session
3. **Mot de passe oublié** → Reset par email → Nouveau mot de passe

### Validation Numéro de Téléphone

Le système valide automatiquement que le numéro correspond au format du pays sélectionné:

```typescript
// Combine l'indicatif + numéro et vérifie la validité
const fullNumber = `${countryCode}${phoneNumber}`;
const isValid = parsePhoneNumberFromString(fullNumber).isValid();
```

### Endpoints API

```typescript
// Inscription
POST /auth/register/
Body: { nom, prenom, email }

// Vérification email
POST /auth/verify-email/
Body: { email, verification_code }

// Complétion du profil
PATCH /auth/complete-profile/?email={email}
Body: { 
  age, genre, numero_whatsapp, pays_residence, 
  situation_professionnelle, mot_de_passe 
}

// Connexion
POST /auth/login/
Body: { email, password }

// Réinitialisation mot de passe
POST /auth/reset-password/
Body: { email }

// Changement mot de passe avec token
POST /auth/change-password/{token}
Body: { password, confirm_password }
```

### Persistance de Session

La session utilisateur est automatiquement restaurée au chargement grâce à:

- **IndexedDB**: Stockage sécurisé des données
- **Token validation**: Vérification automatique au démarrage
- **Refresh automatique**: Récupération du profil complet depuis l'API

```typescript
useEffect(() => {
  dispatch(restoreSession());
}, [dispatch]);
```

## 👤 Profil Utilisateur

### Pages Disponibles

1. **Mon compte**: Vue d'ensemble avec avatar et informations principales
2. **Modification des informations**: Formulaire complet de mise à jour du profil
3. **Changement de mot de passe**: Sécurisé avec validation
4. **Documents d'identification**: Upload et gestion de fichiers (PDF, JPG, PNG - 5 Mo max)

### Endpoints API Profil

```typescript
// Récupérer le profil
GET /users/me/

// Mettre à jour le profil
PATCH /user/me/
Body: { nom, prenom, email, numero_whatsapp, pays_residence, genre, situation_professionnelle }

// Changer le mot de passe
POST /auth/change-password/
Body: { old_password, new_password }

// Upload documents d'identification
POST /users/documents/
FormData: { file }
```

## 💼 Trading et Transactions

### Fonctionnalités

- **Modal d'achat/vente** avec formulaire complet
- **Chargement dynamique** des actions depuis l'API
- **Validation** des quantités et montants
- **Enregistrement** des transactions avec commentaires

### Endpoints API

```typescript
// Obtenir la liste des actions
GET /api/v1/actions/?secteur={secteur}&search={search}
Response: {
  actions: [
    {
      id: number,
      nom: string,
      symbole: string,
      secteur: string,
      prix_actuel: number,
      variation: number
    }
  ],
  total: number
}

// Enregistrer une transaction
POST /api/v1/transactions/
Body: {
  action_id: number,
  type_transaction: 'achat' | 'vente',
  quantite: number,
  prix_unitaire: number,
  commentaire: string
}
```

## 🔄 Redux Store

### Slices

- **authSlice**: Authentification et profil utilisateur
- **portfolioSlice**: Gestion du portefeuille

### Actions Principales

```typescript
// Authentification
dispatch(loginUser({ email, password }))
dispatch(registerUser({ ...userData }))
dispatch(logoutUser())
dispatch(restoreSession())

// Profil
dispatch(updateUserProfile({ ...data }))
dispatch(changePassword({ old_password, new_password }))

// Mot de passe
dispatch(resetPassword({ email }))
dispatch(confirmResetPassword({ token, data }))
```

## 📱 Layout Responsive

- **Desktop**: Sidebar + TopBar
- **Mobile**: TopBar + Bottom Navigation

## 🎨 Design System

Tokens sémantiques HSL pour une cohérence visuelle:

```css
--primary: hsl(...)
--secondary: hsl(...)
--accent: hsl(...)
--success: hsl(...)
--warning: hsl(...)
--destructive: hsl(...)
```

## 📱 Pages

- **Authentification**: Login, Register, Verify Email, Complete Profile, Reset Password
- **Dashboard** (`/dashboard`): Statistiques et vue d'ensemble
- **Portefeuille** (`/portfolio`): Gestion des investissements
- **Analyse** (`/analysis`): Analyse approfondie par secteur
- **Profil** (`/profile`): Gestion du profil utilisateur avec 4 sections

### Navigation

- **Desktop**: Sidebar à gauche + TopBar en haut
- **Mobile**: TopBar + Barre de navigation en bas (5 onglets)

## ✅ Fonctionnalités Développées

### Authentification Complète

- ✅ Inscription en 3 étapes avec vérification email
- ✅ Connexion avec gestion d'erreurs
- ✅ Réinitialisation de mot de passe par email
- ✅ Session persistante avec IndexedDB
- ✅ Refresh token automatique
- ✅ Restauration automatique de session au chargement

### Profil Utilisateur

- ✅ **Mon compte**: Vue d'ensemble avec avatar et données principales
- ✅ **Modification du profil**: Formulaire complet (nom, prénom, email, téléphone, pays, genre, situation professionnelle)
- ✅ **Changement de mot de passe**: Formulaire sécurisé avec validation
- ✅ **Documents d'identification**: Upload de fichiers (PDF, JPG, PNG - 5 Mo max)
- ✅ Navigation fluide entre les sections
- ✅ Mise à jour en temps réel des informations

### Interface Utilisateur

- ✅ **Dashboard** avec statistiques d'investissement
- ✅ **Portefeuille** avec graphiques et positions
- ✅ **Analyse** par secteurs avec prévisions
- ✅ **Design responsive** (mobile, tablette, desktop)
- ✅ Navigation mobile en bas avec 5 sections

### Architecture Technique

- ✅ Services API centralisés (authApi, userApi, actionsApi, transactionApi)
- ✅ Gestion d'erreurs détaillée
- ✅ **Cache hors ligne avec IndexedDB**
- ✅ Redux Toolkit avec middleware de persistance
- ✅ Validation Zod pour les formulaires
- ✅ Toasts et modals pour les notifications
- ✅ Validation avancée des numéros de téléphone par pays

### Trading et Transactions

- ✅ **Modal Achat/Vente** avec formulaire complet
- ✅ **Chargement dynamique** des actions depuis l'API
- ✅ **Validation** des quantités, prix et montants
- ✅ **Enregistrement** des transactions avec commentaires obligatoires
- ✅ **Gestion d'erreurs** avec messages détaillés

## 🚧 Prochaines Étapes

### Fonctionnalités Métier

- [ ] Intégration données temps réel BRVM
- [ ] Système de trading (achat/vente)
- [ ] Notifications push
- [ ] Alertes personnalisées
- [ ] Historique des transactions
- [ ] Export de données (PDF, Excel)
- [ ] Graphiques avancés avec indicateurs
- [ ] Watchlist personnalisée

### Optimisations

- [ ] Tests unitaires et E2E
- [ ] PWA avec service workers
- [ ] Mode hors ligne complet
- [ ] Performance optimisée
- [ ] Accessibilité WCAG AA
- [ ] Analytics

## 🔒 Sécurité

- Tokens JWT avec refresh automatique
- Intercepteurs Axios pour authentification
- Validation Zod côté client
- Gestion d'erreurs d'authentification
- Cache sécurisé avec IndexedDB
- Protection CSRF et XSS
- **Les mots de passe ne sont JAMAIS stockés localement**

## 🔄 Offline Support

### Persistance avec IndexedDB

L'application utilise IndexedDB pour stocker les données localement.

#### Données Stockées

- **Authentification**: Token et informations utilisateur
- **Portefeuille**: Statistiques et positions
- **Cache**: Données temporaires avec timestamp

#### Fonctionnalités

- ✅ Sauvegarde automatique après connexion
- ✅ Synchronisation Redux ↔ IndexedDB via middleware
- ✅ Nettoyage automatique des données expirées (24h)
- ✅ Fallback mode hors ligne pour consultation
- ✅ **Les mots de passe ne sont JAMAIS stockés localement**

#### Structure IndexedDB

```javascript
DB: LeyInvestDB
├── auth: { key, data, timestamp }
├── user: { key, data, timestamp }
└── cache: { key, data, timestamp }
```

### Middleware de Persistance

Le middleware `persistMiddleware` synchronise automatiquement:
- `auth/login/fulfilled` → Cache des données utilisateur
- `portfolio/fetchPortfolioSuccess` → Cache du portefeuille

## 📝 Configuration

```env
VITE_API_BASE_URL=https://api.leyinvest.com/v1
```

## 📄 Licence

Propriétaire - LeyInvest © 2025