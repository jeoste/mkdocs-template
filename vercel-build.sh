#!/bin/bash

# Installer Python si nécessaire
if ! command -v python3 &> /dev/null; then
    echo "Python n'est pas installé. Installation en cours..."
    apt-get update && apt-get install -y python3 python3-pip
fi

# Installer les dépendances
pip3 install -r requirements.txt

# Construire le site
mkdocs build -d public 