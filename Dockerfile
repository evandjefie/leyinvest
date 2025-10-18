<<<<<<< HEAD
FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY . .
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ENV NODE_ENV=production
RUN pnpm run build

FROM base AS dokploy
WORKDIR /app
ENV NODE_ENV=production

# Copy only the necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "start"]
=======
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
>>>>>>> f7d6f1f8ea31dab11792a01def71fa782007ecbb
