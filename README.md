# LeyInvest

LeyInvest est une application de gestion d'investissements développée avec React.js, TypeScript, TailwindCSS et Redux. Elle permet aux utilisateurs de suivre leurs investissements en bourse, analyser leurs portefeuilles et accéder aux actualités du marché financier.

## 🚀 Fonctionnalités

### ✅ Authentification complète
- **Connexion** avec email/mot de passe
- **Inscription** avec validation d'email
- **Vérification par code** après inscription
- **Finalisation d'inscription** avec informations complémentaires
- **Récupération de mot de passe** avec code de vérification
- **Réinitialisation de mot de passe** sécurisée

### ✅ Dashboard principal
- Vue d'ensemble des investissements
- Statistiques en temps réel (montant investi, rendement, gains/pertes, valeur totale)
- Top 5 et Flop 5 des actions
- Évaluations (court, moyen, long terme)
- Publications officielles et actualités du marché
- **Modal d'enregistrement d'achat/vente** avec validation

### ✅ Pages fonctionnelles
- **Portfolio** : Gestion détaillée du portefeuille
- **Analyse** : Outils d'analyse financière
- **Page 404** personnalisée

## 🛠 Technologies utilisées

- **Frontend** : React 18, TypeScript, Vite
- **Styling** : TailwindCSS avec système de design personnalisé
- **State Management** : Redux Toolkit
- **Animations** : Framer Motion
- **Routage** : React Router v6
- **Icons** : Lucide React
- **Composants UI** : Composants personnalisés + shadcn/ui

## 🎨 Architecture

### Structure des dossiers
```
src/
├── components/
│   ├── layout/           # Composants de mise en page
│   │   ├── MainLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   └── ui/               # Composants UI réutilisables
│       ├── LeyButton.tsx
│       ├── LeyInput.tsx
│       ├── LeyCard.tsx
│       ├── LeySelect.tsx
│       ├── TradeModal.tsx
│       └── ...
├── pages/
│   ├── auth/             # Pages d'authentification
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── VerifyEmail.tsx
│   │   ├── FinalizeRegistration.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── VerifyCodeReset.tsx
│   │   └── ResetPassword.tsx
│   ├── Dashboard.tsx
│   ├── Portfolio.tsx
│   ├── Analysis.tsx
│   └── NotFound.tsx
├── store/                # Redux store
│   ├── index.ts
│   ├── hooks.ts
│   └── slices/
│       ├── authSlice.ts
│       └── portfolioSlice.ts
└── assets/               # Images et ressources
    ├── logo_leycom.svg
    └── bg_auth_leycom.svg
```

### Système de design
- **Couleurs sémantiques** définies dans `index.css`
- **Tokens de design** configurés dans `tailwind.config.ts`
- **Composants thématisés** avec variants
- **Animations fluides** avec Framer Motion

## 🔧 Installation et développement local

### Prérequis
- Node.js (version 18+)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd leyinvest

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Scripts disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Analyse du code
```

## 🧪 Test de l'application

### Flow d'authentification complet

1. **Inscription**
   - Aller sur `/auth/register`
   - Remplir le formulaire (email, mot de passe, confirmation)
   - Validation : tous les champs sont obligatoires
   - Cliquer sur "Créer un compte"

2. **Vérification email**
   - Redirection automatique vers `/auth/verify-email`
   - Saisir le code de vérification reçu par email
   - Cliquer sur "Vérifier"

3. **Finalisation d'inscription**
   - Redirection vers `/auth/finalize-registration`
   - Compléter les informations (nom, prénom, âge, téléphone)
   - Validation : l'âge doit être strictement positif
   - Cliquer sur "Finaliser mon inscription"

4. **Accès au Dashboard**
   - Redirection automatique vers `/dashboard`
   - Interface principale de gestion des investissements

### Test du modal d'enregistrement d'achat

1. Sur le Dashboard, cliquer sur "Enregistrer achat"
2. Remplir le formulaire :
   - **Action** : Sélectionner une action (obligatoire)
   - **Quantité** : Nombre d'actions (obligatoire, doit être positive)
   - **Prix par action** : Prix en FCFA (obligatoire, doit être positif)
   - **Montant** : Montant total (obligatoire, doit être positif)
   - **Commentaire** : Facultatif
3. Cliquer sur "Enregistrer"

### Test de récupération de mot de passe

1. Sur la page de connexion, cliquer sur "Mot de passe oublié ?"
2. Saisir l'email et cliquer sur "Envoyer le code"
3. Sur la page de vérification, saisir le code reçu
4. Créer un nouveau mot de passe
5. Notification de succès et redirection vers la connexion

## 🔒 Validation des formulaires

### Règles implémentées
- **Champs obligatoires** : Validation côté client avec messages d'erreur
- **Format email** : Validation du format d'email
- **Mot de passe** : Validation de la complexité
- **Âge** : Doit être strictement positif (> 0)
- **Montants** : Doivent être positifs pour les transactions
- **Quantités** : Doivent être positives pour les actions

### Messages d'erreur
- Messages contextuels en français
- Effacement automatique lors de la saisie
- Indication visuelle des champs en erreur

## 🚀 Prochaines étapes

### À développer
- [ ] Intégration avec API backend réelle
- [ ] Authentification JWT
- [ ] Données de marché en temps réel
- [ ] Graphiques interactifs
- [ ] Notifications push
- [ ] Export de données
- [ ] Mode sombre/clair
- [ ] Tests unitaires et e2e

### Optimisations
- [ ] Lazy loading des pages
- [ ] Cache des données
- [ ] Progressive Web App (PWA)
- [ ] Optimisation des images
- [ ] Code splitting avancé

## 📝 Notes de développement

### État actuel
- ✅ Architecture complète mise en place
- ✅ Design system cohérent
- ✅ Flow d'authentification complet
- ✅ Dashboard fonctionnel avec modal
- ✅ Validation des formulaires
- ✅ Animations fluides
- ✅ Responsive design

### Points d'attention
- Les données sont actuellement mockées dans le store Redux
- L'authentification est simulée (pas de véritable API)
- Les modals utilisent des portails pour un meilleur rendu
- Le système de design utilise des tokens HSL pour une cohérence maximale

### Contribution
Pour contribuer au projet :
1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

**LeyInvest** - Plateforme de gestion d'investissements moderne et intuitive.