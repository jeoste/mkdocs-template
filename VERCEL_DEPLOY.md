# Guide de déploiement sur Vercel

Ce projet est maintenant configuré pour être déployé sur Vercel.

## Configuration

### Fichiers créés/modifiés

- `vercel.json` : Configuration principale de Vercel
  - Commande de build : `pip install -r requirements.txt && mkdocs build`
  - Répertoire de sortie : `site`
  - Redirections et en-têtes HTTP

- `middleware.js` : Middleware Edge pour l'authentification HTTP Basic
  - Protège les chemins `/private/`, `/technical-spec/`, `/functional-spec/`, `/clients/`
  - Utilise HTTP Basic Auth avec les identifiants configurés

- `.vercelignore` : Fichiers à ignorer lors du déploiement

- `mkdocs.yml` : Mis à jour pour retirer la référence à `netlify-auth.js`

## Déploiement

### Option 1 : Via Vercel CLI

1. Installer Vercel CLI :
```bash
npm i -g vercel
```

2. Se connecter :
```bash
vercel login
```

3. Déployer :
```bash
vercel
```

Pour la production :
```bash
vercel --prod
```

### Option 2 : Via GitHub (recommandé)

1. Connecter votre dépôt GitHub à Vercel depuis [vercel.com](https://vercel.com)
2. Vercel détectera automatiquement la configuration Python et MkDocs
3. Le déploiement se fera automatiquement à chaque push

## Variables d'environnement (optionnel)

Vous pouvez configurer les mots de passe via les variables d'environnement Vercel :

- `AUTH_ADMIN_PASSWORD` : Mot de passe admin (défaut: `test123`)
- `AUTH_GUEST_PASSWORD` : Mot de passe guest (défaut: `guest123`)
- `AUTH_INVITE_PASSWORD` : Mot de passe invite (défaut: `invite123`)

## Authentification

L'authentification HTTP Basic est gérée par le middleware Edge (`middleware.js`).

Les identifiants par défaut sont :
- Admin : `admin` / `test123`
- Guest : `guest` / `guest123`
- Invité : `invite` / `invite123`

## Différences avec Netlify

- L'authentification est gérée par un middleware Edge au lieu de Netlify Basic Auth
- Les fichiers `.htaccess` et `.htpasswd` ne sont plus nécessaires
- Le script `netlify-build.sh` n'est plus utilisé
- Le fichier `_redirects` est remplacé par les `rewrites` dans `vercel.json`

## Support

Pour plus d'informations, consultez la [documentation Vercel](https://vercel.com/docs).

