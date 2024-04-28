# Utilisation du Service Web par Titouan Reynaud et Mario Ferrali

## Introduction

Ce projet est un service web développé par Titouan Reynaud et Mario Ferrali. Il fournit une API pour gérer des données de films. Ce document explique comment utiliser et tester ce service web.

Projet réalisé par REYNAUD Titouan et FERRALI Mario

## Conditions Préalables

Avant de commencer, vérifiez que Docker est bien installé sur votre machine.

## Démarrage du Projet

Pour lancer le projet, ouvrez un terminal à la racine du dossier du projet et exécutez la commande suivante :

```bash
docker-compose up -d
```

Cette commande permet de démarrer tous les services spécifiés dans le fichier docker-compose.yml.

## Tester l'API

Pour effectuer les requêtes, utilisez un outil comme postman.

## Documentation de l'API

Pour des informations détaillées sur les points d'accès de l'API, veuillez consulter la documentation Swagger de l'API disponible aux adresses suivantes :

- Service d'authentification : [http://localhost:3000/api/auth]
- Service de films : [http://localhost:3001/api/movies]
