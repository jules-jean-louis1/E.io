# E.io

Pour convertir les fichiers `.ts` en `.js`, utilisez la commande suivante :

```bash
tsc src/index.ts --outDir dist
```

## Initialisation

Pour installer les dépendances, utilisez les commandes suivantes :

```bash
cd server && npm i
cd client && npm i
```

Pour créer et démarrer les conteneurs, utilisez la commande suivante :

```bash
docker compose up --build
```

Pour supprimer les images, utilisez la commande suivante :

```bash
docker compose down
```

### Démarrage

Pour démarrer les conteneurs, utilisez la commande suivante :

```bash
docker compose start
```

### Arrêt

Pour stopper les conteneurs, utilisez la commande suivante :

```bash
docker compose stop
```

L'adresse URL du serveur est `http://localhost:3000`. Pour lancer le serveur en mode développement, utilisez la commande suivante :

```bash
npm run dev
```

L'adresse URL du client est `http://localhost:8080`. Pour lancer le client en mode développement, utilisez la commande suivante :

```bash
npm run dev
```

### Conteneurs

Pour lister les conteneurs, utilisez la commande suivante :

```bash
docker ps
```

Pour accéder à un conteneur, utilisez la commande suivante :

```bash
docker exec -it <container_id> /bin/bash
```
