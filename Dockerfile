# --- ÉTAPE 1: Étape de Construction (Builder) ---
# Utilise une image complète pour le build et l'installation des dépendances
FROM node:20-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de manifestes pour optimiser le cache Docker
COPY package*.json ./

# Installer les dépendances (y compris les dépendances de développement si nécessaire)
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Si votre application nécessite une compilation (ex: React, TypeScript)
# Décommentez la ligne ci-dessous :
# RUN npm run build

# ---
# --- ÉTAPE 2: Étape de Production (Runtime) ---
# Utilise une image plus petite pour l'exécution finale (plus sécurisée et légère)
FROM node:20-alpine AS production

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers essentiels de l'étape de construction
# 1. Copier les dépendances installées (node_modules)
COPY --from=builder /app/node_modules ./node_modules
# 2. Copier le code source de l'application
COPY . .

# Utiliser un utilisateur non-root est une bonne pratique de sécurité
RUN adduser -D nonroot
USER nonroot

# Le port sur lequel votre application écoute (à adapter)
EXPOSE 3000

# Commande de démarrage de l'application (point d'entrée)
CMD ["npm", "start"]
