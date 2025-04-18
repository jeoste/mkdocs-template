#!/bin/bash

# Installer MkDocs
pip install mkdocs

# Se déplacer dans le répertoire du projet
cd le-bastion-spec

# Construire le site
mkdocs build

# Déplacer le site construit au bon endroit
mv site ../site 