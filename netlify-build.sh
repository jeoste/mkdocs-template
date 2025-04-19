#!/bin/bash

# Script d'après-construction pour Netlify
echo "Exécution du script de post-build"

# Créer le fichier .htaccess dans le dossier de publication
cat > site/.htaccess << 'EOL'
AuthType Basic
AuthName "Zone protégée"
AuthUserFile /opt/build/repo/site/.htpasswd
Require valid-user

# Pages accessibles à tous les utilisateurs authentifiés
<Files "index.html">
    Require valid-user
</Files>

<Files "admonition.html">
    Require valid-user
</Files>

<Files "login.html">
    Require valid-user
</Files>

# Les pages du dossier clients sont réservées à l'admin
<FilesMatch "clients/.*\.html$">
    Require user admin
</FilesMatch>

# Pages spécifiques réservées à l'admin
<FilesMatch "(uperio|alliance-marine)\.html$">
    Require user admin
</FilesMatch>

# Autoriser l'accès aux fichiers statiques pour tous
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    Satisfy Any
    Allow from all
</FilesMatch>
EOL

# Créer le fichier .htpasswd avec les identifiants
cat > site/.htpasswd << 'EOL'
admin:$apr1$rZhJo8GV$jwNMDXbhQouKRPjH3FLQt0
guest:$apr1$Xp17uLJw$gfJkPx7rKW7BIXQy2bMwp1
EOL

# Copier le fichier _redirects dans le dossier de publication
cat > site/_redirects << 'EOL'
# Rediriger vers la page de connexion personnalisée en cas d'accès non autorisé
/login /login.html 200
/* /index.html 401!
EOL

echo "Fichiers de configuration créés avec succès" 