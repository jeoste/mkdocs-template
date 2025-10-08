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

```
.
├── mkdocs.yml    # MkDocs configuration
└── docs/         # Documentation content
    ├── index.md  # Home page
    └── ...       # Other documentation pages
```

## IV. : Configuration

The main configuration is located in the `mkdocs.yml` file. See the [official MkDocs documentation](https://www.mkdocs.org) for more details.

## V. : Useful resources

- [MkDocs Documentation](https://www.mkdocs.org)
- [Material for MkDocs theme](https://squidfunk.github.io/mkdocs-material/)
- [Getting started guide with Material](https://jameswillett.dev/getting-started-with-material-for-mkdocs/)
