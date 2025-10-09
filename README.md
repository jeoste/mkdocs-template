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

## VI. : Authentification et accès

Ce template fournit une séparation simple entre contenu public et privé :

- Contrôle serveur : Netlify Basic Auth protège les chemins `/private/`, `/technical-spec/`, `/functional-spec/` et `/clients/` (voir `netlify.toml`).
- Contrôle UI : un script (`docs/assets/js/auth.js`) masque les liens privés aux invités et affiche un indicateur d’utilisateur.

Identifiants par défaut (démo) :

- Admin : `admin` / `test123` — accès aux sections protégées (navigateur affichera l’invite HTTP Basic lors de l’accès).
- Invité : `invite` / `invite123` — accès public uniquement.

Notes de sécurité :

- Le script client ne stocke aucun mot de passe, uniquement le rôle et le nom d’utilisateur en `sessionStorage`.
- L’accès effectif aux ressources privées est garanti par Netlify (HTTP Basic). Le masquage UI n’est qu’un confort.

Modifier les chemins protégés :

- Ajuster `PROTECTED_PREFIXES` dans `docs/assets/js/auth.js` pour le masquage UI.
- Ajuster les blocs `[[headers]]` dans `netlify.toml` pour la protection serveur.

## V. : Useful resources

- [MkDocs Documentation](https://www.mkdocs.org)
- [Material for MkDocs theme](https://squidfunk.github.io/mkdocs-material/)
- [Getting started guide with Material](https://jameswillett.dev/getting-started-with-material-for-mkdocs/)
