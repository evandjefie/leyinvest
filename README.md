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

- **Authentification**: Login, Register (Step 1-3), Verify Email, Complete Profile
- **Dashboard** (`/dashboard`): Tableau de bord principal avec statistiques
- **Portefeuille** (`/portfolio`): Gestion et suivi du portefeuille d'investissements
- **Analyse** (`/analysis`): Analyse approfondie des investissements par secteur
- **Profil** (`/profile`): Profil utilisateur et paramètres du compte

### Navigation
- **Desktop**: Sidebar à gauche + TopBar en haut
- **Mobile**: TopBar en haut + Barre de navigation en bas (5 onglets)

## ✅ Fonctionnalités développées

### Authentification complète
- ✅ Inscription en 3 étapes (Step1 → Verify Email → Complete Profile)
- ✅ Connexion avec gestion d'erreurs avancée
- ✅ Modal d'erreur pour comptes inexistants avec lien vers inscription
- ✅ Vérification email avec code à 4 chiffres
- ✅ Renvoi de code de vérification
- ✅ Changement de mot de passe
- ✅ Déconnexion
- ✅ Persistance de la session avec IndexedDB

### Interface utilisateur
- ✅ **Dashboard** avec statistiques d'investissement
  - Vue d'ensemble des investissements
  - Affichage des informations utilisateur (nom, prénom)
  - Top 5 et Flop 5 des entreprises
  - Évaluations (court, moyen, long terme)
  - Publications officielles
- ✅ **Page Portefeuille**
  - Graphique de performance vs BRVM Composite
  - Tableau détaillé des positions
  - Indicateurs de gains/pertes
- ✅ **Page Analyse**
  - Analyse par secteurs
  - Prévision de rendements
  - Calendrier de paiement des dividendes
- ✅ **Page Profil utilisateur**
  - Affichage des informations personnelles
  - Actions du compte (modifier, déconnexion)
  - Accessible depuis l'icône user (en haut à droite et profil en bas sur mobile)
- ✅ **Design responsive** (mobile, tablette, desktop)
  - Navigation mobile en bas avec 5 sections (Accueil, Portefeuille, +, Analyse, Profil)
  - Sidebar cachée sur mobile
  - Tables avec scroll horizontal sur mobile
  - Toutes les pages optimisées pour mobile (pb-24 pour éviter le chevauchement)

### Architecture technique
- ✅ Services API centralisés (authApi, userApi)
- ✅ Gestion d'erreurs détaillée (CORS, network, timeout)
- ✅ **Cache hors ligne avec IndexedDB**
  - Persistance automatique des données utilisateur
  - Sauvegarde du portfolio dans IndexedDB
  - Synchronisation Redux ↔ IndexedDB via middleware
  - Nettoyage automatique du cache expiré
- ✅ Redux Toolkit pour la gestion d'état
- ✅ Validation Zod pour les formulaires
- ✅ Toasts et modals pour les notifications
- ✅ Middleware de persistance personnalisé

## 🚧 Prochaines étapes à développer

### Fonctionnalités métier
- [ ] Intégration données temps réel de la BRVM
- [ ] Page détaillée d'une entreprise avec historique complet
- [ ] **Système de trading** (achat/vente d'actions via API)
  - Modal d'achat/vente fonctionnel avec API backend
  - Validation et confirmation des transactions
  - Mise à jour automatique du portefeuille
- [ ] Notifications push en temps réel des mouvements du marché
- [ ] Alertes personnalisées (prix cibles, dividendes à venir)
- [ ] Historique détaillé des transactions avec filtres
- [ ] Export des données (PDF, Excel, CSV)
- [ ] Graphiques avancés avec indicateurs techniques (RSI, MACD, etc.)
- [ ] Watchlist personnalisée
- [ ] Comparaison de performances entre entreprises

### Profil utilisateur et paramètres
- [ ] **Modification complète du profil utilisateur**
- [ ] Upload et gestion de photo de profil
- [ ] Préférences de notification (email, push)
- [ ] Paramètres de sécurité (2FA, biométrie)
- [ ] Gestion des sessions actives
- [ ] Historique d'activité du compte
- [ ] Suppression de compte avec confirmation

### Optimisations et performance
- [ ] Tests unitaires avec Jest/Vitest
- [ ] Tests E2E avec Playwright/Cypress
- [ ] PWA (Progressive Web App) avec service workers
- [ ] Mode hors ligne complet avec synchronisation différée
- [ ] Performance optimisée (lazy loading routes, code splitting)
- [ ] Accessibilité WCAG AA complète
- [ ] Optimisation SEO
- [ ] Analytics et tracking utilisateur

### Analyses avancées
- [ ] Tableau de bord analytique personnalisé
- [ ] Recommandations d'investissement basées sur l'IA
- [ ] Simulateur de portefeuille
- [ ] Calcul automatique des taxes et frais
- [ ] Rapports périodiques automatiques (mensuel, annuel)

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

### Persistance avec IndexedDB
L'application utilise IndexedDB pour stocker les données localement et permettre un fonctionnement hors ligne partiel.

#### Données stockées
- **Authentification**: Token et informations utilisateur
- **Portefeuille**: Statistiques et positions
- **Cache**: Données temporaires avec timestamp

#### Fonctionnalités
- ✅ Sauvegarde automatique après connexion
- ✅ Synchronisation Redux ↔ IndexedDB via middleware personnalisé
- ✅ Nettoyage automatique des données expirées (24h par défaut)
- ✅ Fallback mode hors ligne pour consultation des données en cache
- ✅ Les mots de passe ne sont JAMAIS stockés localement

#### Structure des stores IndexedDB
```javascript
DB: LeyInvestDB
├── auth: { id, data, timestamp }
├── user: { id, data, timestamp }
└── cache: { key, data, timestamp }
```

### Middleware de persistance
Le middleware `persistMiddleware` intercepte les actions Redux et synchronise automatiquement:
- `auth/login/fulfilled` → Cache des données utilisateur
- `portfolio/fetchPortfolioSuccess` → Cache du portefeuille