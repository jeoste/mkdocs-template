# MkDocs Template

This project contains my MkDocs template with Material theme.
I'm using this template and theme for my client if they want to host their documentation internally, as a viable alternative to Microsoft Word (still mostly used)

## I. : Installation

1. Make sure Python is installed on your system
2. Install MkDocs and the required dependencies:

```bash
pip install mkdocs
pip install mkdocs-material
```

## II. : Usage

### A. : Local development

To start a local development server with live reload:

```bash
mkdocs serve
```

### B. : Building the documentation

To build the documentation as a static site:

```bash
mkdocs build
```

## III. : Project structure

```text
.
├── mkdocs.yml    # MkDocs configuration
└── docs/         # Documentation content
    ├── index.md  # Home page
    └── ...       # Other documentation pages
```

## IV. : Configuration

The main configuration is located in the `mkdocs.yml` file. See the [official MkDocs documentation](https://www.mkdocs.org) for more details.

## V. : Déploiement

### A. : Déploiement sur Vercel

Ce projet est configuré pour être déployé sur Vercel.

1. **Installation de Vercel CLI** (optionnel) :
```bash
npm i -g vercel
```

2. **Déploiement** :
```bash
vercel
```

Ou connectez votre dépôt GitHub à Vercel depuis le dashboard Vercel.

3. **Configuration des variables d'environnement** (optionnel) :
   - `AUTH_ADMIN_PASSWORD` : Mot de passe pour l'utilisateur admin (défaut: `test123`)
   - `AUTH_GUEST_PASSWORD` : Mot de passe pour l'utilisateur guest (défaut: `guest123`)
   - `AUTH_INVITE_PASSWORD` : Mot de passe pour l'utilisateur invite (défaut: `invite123`)

Le fichier `vercel.json` configure automatiquement :
- La commande de build (`pip install -r requirements.txt && mkdocs build`)
- Le répertoire de sortie (`site`)
- Les redirections et en-têtes HTTP

### B. : Déploiement sur Netlify (ancien)

Le projet supporte également Netlify (voir `netlify.toml` et `netlify-build.sh`).

## VI. : Authentification et accès

Ce template fournit une séparation simple entre contenu public et privé :

- **Contrôle serveur** : 
  - Sur Vercel : Le middleware (`middleware.js`) protège les chemins `/private/`, `/technical-spec/`, `/functional-spec/` et `/clients/` avec HTTP Basic Auth.
  - Sur Netlify : Netlify Basic Auth protège les mêmes chemins (voir `netlify.toml`).
- **Contrôle UI** : Un script (`docs/assets/js/auth.js`) masque les liens privés aux invités et affiche un indicateur d'utilisateur.

Identifiants par défaut (démo) :

- Admin : `admin` / `test123` — accès aux sections protégées (navigateur affichera l'invite HTTP Basic lors de l'accès).
- Invité : `invite` / `invite123` — accès public uniquement.
- Guest : `guest` / `guest123` — accès public uniquement.

Notes de sécurité :

- Le script client ne stocke aucun mot de passe, uniquement le rôle et le nom d'utilisateur en `sessionStorage`.
- L'accès effectif aux ressources privées est garanti par le middleware Vercel ou Netlify (HTTP Basic). Le masquage UI n'est qu'un confort.

Modifier les chemins protégés :

- Ajuster `PROTECTED_PREFIXES` dans `docs/assets/js/auth.js` pour le masquage UI.
- Ajuster `PROTECTED_PATHS` dans `middleware.js` pour la protection serveur sur Vercel.
- Ajuster les blocs `[[headers]]` dans `netlify.toml` pour la protection serveur sur Netlify.

## VII. : Useful resources

- [MkDocs Documentation](https://www.mkdocs.org)
- [Material for MkDocs theme](https://squidfunk.github.io/mkdocs-material/)
- [Getting started guide with Material](https://jameswillett.dev/getting-started-with-material-for-mkdocs/)
