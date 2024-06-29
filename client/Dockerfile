# Étape de construction
FROM node:16 AS build

# Répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM nginx:alpine

# Supprimer la configuration par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copier la configuration personnalisée de nginx
COPY nginx/nginx.conf /etc/nginx/conf.d

# Copier les fichiers construits de l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 4000
EXPOSE 4000

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
