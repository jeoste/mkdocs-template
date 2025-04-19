// Script de gestion de l'authentification

// Liste des chemins protégés
const PROTECTED_PATHS = [
  '/private/',
  '/clients/',
  '/uperio/',
  '/alliance-marine/',
];

// Liste des utilisateurs administrateurs
const ADMIN_USERS = ['admin'];

// Fonction pour vérifier si un utilisateur est admin
function isAdmin(username) {
  return ADMIN_USERS.includes(username);
}

// Fonction pour masquer les éléments du menu Private pour les utilisateurs non-admin
function hidePrivateMenuItems() {
  // Vérifier si l'utilisateur est administrateur
  const auth = sessionStorage.getItem('auth');
  if (auth) {
    const username = atob(auth).split(':')[0];
    // Si c'est un admin, ne pas masquer les éléments privés
    if (isAdmin(username)) {
      // Pour les admin, on s'assure que les éléments sont visibles
      showPrivateMenuItems();
      return;
    }
  }
  
  // Pour les utilisateurs non-admin, masquer les éléments
  // Masquer les éléments dans le menu principal
  const navItems = document.querySelectorAll('.md-nav__item');
  navItems.forEach(item => {
    const link = item.querySelector('.md-nav__link');
    if (link && (link.textContent.includes('Private') || link.textContent.includes('Clients') || link.textContent.includes('Uperio') || link.textContent.includes('Alliance Marine'))) {
      item.style.display = 'none';
    }
  });
  
  // Masquer TOUS les liens qui contiennent ces termes ou URL
  document.querySelectorAll('a').forEach(link => {
    // Vérifier le href
    const href = link.getAttribute('href');
    // Vérifier le texte du lien
    const text = link.textContent;
    
    if ((href && (
        href.includes('/private/') || 
        href.includes('/clients/') || 
        href.includes('/uperio/') || 
        href.includes('/alliance-marine/')
      )) || 
      (text && (
        text.includes('Private') || 
        text.includes('Clients') || 
        text.includes('Uperio') || 
        text.includes('Alliance Marine')
      ))
    ) {
      // Masquer l'élément lui-même
      link.style.display = 'none';
      
      // Chercher des conteneurs parents à masquer
      const containers = [
        link.closest('.md-footer-nav__link'),
        link.closest('.md-footer-nav__direction'),
        link.closest('article'),
        link.closest('nav'),
        link.closest('div')
      ];
      
      containers.forEach(container => {
        if (container) {
          // Examiner si le conteneur est spécifique à cet élément
          const otherLinks = container.querySelectorAll('a');
          if (otherLinks.length === 1) {
            container.style.display = 'none';
          }
        }
      });
    }
  });
  
  // Masquer les liens de navigation en bas de page (prev/next)
  const footerNav = document.querySelector('.md-footer-nav');
  if (footerNav) {
    // Vérifier spécifiquement les titres dans la barre de navigation
    const footerLinks = footerNav.querySelectorAll('.md-footer-nav__link');
    footerLinks.forEach(link => {
      const title = link.querySelector('.md-footer-nav__title');
      if (title && (
          title.textContent.includes('Private') || 
          title.textContent.includes('Uperio') || 
          title.textContent.includes('Alliance Marine') || 
          title.textContent.includes('Clients')
        )) {
        link.style.display = 'none';
        // Masquer aussi le parent si c'est un élément de direction
        const direction = link.closest('.md-footer-nav__direction');
        if (direction) direction.style.display = 'none';
      }
    });
    
    // Si tous les liens sont masqués, masquer la barre de navigation entière
    if (Array.from(footerLinks).every(link => link.style.display === 'none' || window.getComputedStyle(link).display === 'none')) {
      footerNav.style.display = 'none';
    }
  }
}

// Fonction pour montrer les éléments privés (uniquement pour les administrateurs)
function showPrivateMenuItems() {
  // Afficher les éléments dans le menu principal
  const navItems = document.querySelectorAll('.md-nav__item');
  navItems.forEach(item => {
    const link = item.querySelector('.md-nav__link');
    if (link && (link.textContent.includes('Private') || link.textContent.includes('Clients') || link.textContent.includes('Uperio') || link.textContent.includes('Alliance Marine'))) {
      item.style.display = '';
    }
  });
  
  // Afficher tous les liens qui contiennent ces termes ou URL
  document.querySelectorAll('a').forEach(link => {
    // Vérifier le href
    const href = link.getAttribute('href');
    // Vérifier le texte du lien
    const text = link.textContent;
    
    if ((href && (
        href.includes('/private/') || 
        href.includes('/clients/') || 
        href.includes('/uperio/') || 
        href.includes('/alliance-marine/')
      )) || 
      (text && (
        text.includes('Private') || 
        text.includes('Clients') || 
        text.includes('Uperio') || 
        text.includes('Alliance Marine')
      ))
    ) {
      // Afficher l'élément
      link.style.display = '';
      
      // Chercher des conteneurs parents à afficher
      const containers = [
        link.closest('.md-footer-nav__link'),
        link.closest('.md-footer-nav__direction'),
        link.closest('article'),
        link.closest('nav'),
        link.closest('div')
      ];
      
      containers.forEach(container => {
        if (container) {
          container.style.display = '';
        }
      });
    }
  });
  
  // Afficher les liens de navigation en bas de page
  const footerNav = document.querySelector('.md-footer-nav');
  if (footerNav) {
    footerNav.style.display = '';
    
    // Afficher tous les liens dans le footer
    const footerLinks = footerNav.querySelectorAll('.md-footer-nav__link, .md-footer-nav__direction');
    footerLinks.forEach(link => {
      link.style.display = '';
    });
  }
}

// Fonction pour rediriger les utilisateurs non-admin des pages protégées
function blockProtectedPages() {
  const currentPath = window.location.pathname.toLowerCase();
  const auth = sessionStorage.getItem('auth');
  
  if (!auth) {
    // Pas d'authentification du tout
    if (PROTECTED_PATHS.some(path => currentPath.includes(path.toLowerCase()))) {
      alert('Accès refusé: Cette page est réservée aux administrateurs.');
      window.location.href = '/';
    }
    return;
  }
  
  // Extraire le nom d'utilisateur
  const username = atob(auth).split(':')[0];
  
  // Vérifier si l'utilisateur est un administrateur
  if (!isAdmin(username)) {
    // Vérifier si l'utilisateur est sur une page protégée
    if (PROTECTED_PATHS.some(path => currentPath.includes(path.toLowerCase()))) {
      alert('Accès refusé: Cette page est réservée aux administrateurs.');
      window.location.href = '/';
    }
  }
}

// Fonction pour observer le DOM et appliquer le masquage/affichage quand nécessaire
function setupDOMObserver() {
  // Observer les changements pour les éléments qui peuvent apparaître après le chargement initial
  const observer = new MutationObserver((mutations) => {
    // Vérifier le statut de l'utilisateur pour décider si on masque ou affiche
    const auth = sessionStorage.getItem('auth');
    if (auth) {
      const username = atob(auth).split(':')[0];
      if (isAdmin(username)) {
        showPrivateMenuItems();
      } else {
        hidePrivateMenuItems();
      }
    } else {
      hidePrivateMenuItems();
    }
  });
  
  // Observer tout le document pour les changements
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  return observer;
}

// Fonction principale exécutée immédiatement
(function() {
  // Bloquer immédiatement l'accès aux pages protégées
  blockProtectedPages();
  
  // Vérifier si l'utilisateur est admin
  const auth = sessionStorage.getItem('auth');
  if (auth) {
    const username = atob(auth).split(':')[0];
    if (isAdmin(username)) {
      showPrivateMenuItems();
    } else {
      hidePrivateMenuItems();
    }
  } else {
    hidePrivateMenuItems();
  }
  
  // Mettre en place l'observateur pour attraper les éléments qui se chargent dynamiquement
  const observer = setupDOMObserver();
  
  // Arrêter l'observation après un certain temps pour éviter la surcharge
  setTimeout(() => {
    observer.disconnect();
  }, 5000); // Observer pendant 5 secondes après le chargement initial
})();

document.addEventListener('DOMContentLoaded', function() {
  let auth = sessionStorage.getItem('auth');
  const currentPath = window.location.pathname;
  
  // Vérifier l'accès protégé
  blockProtectedPages();
  
  // Si on est déjà sur la page de login, ne pas rediriger
  if (currentPath.includes('login')) {
    return;
  }
  
  // Si pas d'authentification, attribuer "guest" par défaut
  if (!auth) {
    // Créer les credentials pour guest
    auth = btoa('guest:guest');
    sessionStorage.setItem('auth', auth);
  }
  
  // Vérifier le type d'utilisateur
  const [username, _] = atob(auth).split(':');
  
  // Masquer ou afficher les sections privées en fonction du statut de l'utilisateur
  if (isAdmin(username)) {
    showPrivateMenuItems();
  } else {
    hidePrivateMenuItems();
  }
  
  // Si l'utilisateur n'est pas admin et essaie d'accéder à une page admin
  if (!isAdmin(username) && PROTECTED_PATHS.some(page => currentPath.includes(page.toLowerCase()))) {
    alert('Accès refusé: Cette page est réservée aux administrateurs.');
    window.location.href = '/';
    return;
  }
  
  // Ajouter l'en-tête d'autorisation à toutes les requêtes fetch
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    if (!options.headers) {
      options.headers = {};
    }
    
    options.headers['Authorization'] = `Basic ${auth}`;
    return originalFetch(url, options);
  };
  
  // Ajouter un bouton de connexion/déconnexion dans le header
  const header = document.querySelector('.md-header__inner');
  if (header) {
    // Supprimer les boutons existants s'il y en a
    const existingButton = header.querySelector('.auth-button');
    if (existingButton) {
      existingButton.remove();
    }
    
    const existingIndicator = header.querySelector('.user-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }
    
    // Ajouter le bouton approprié
    const authButton = document.createElement('button');
    authButton.className = 'md-header__button md-icon auth-button';
    authButton.style.marginLeft = 'auto';
    authButton.style.border = 'none';
    authButton.style.background = 'transparent';
    authButton.style.color = 'var(--md-primary-bg-color)';
    authButton.style.cursor = 'pointer';
    
    if (username === 'guest') {
      // Bouton de connexion pour guest
      authButton.textContent = 'Connexion';
      authButton.addEventListener('click', function() {
        window.location.href = '/login';
      });
    } else {
      // Bouton de déconnexion pour les autres
      authButton.textContent = 'Déconnexion';
      authButton.addEventListener('click', function() {
        // Remettre guest par défaut au lieu de supprimer l'auth
        const guestAuth = btoa('guest:guest');
        sessionStorage.setItem('auth', guestAuth);
        window.location.reload();
      });
    }
    
    header.appendChild(authButton);
    
    // Ajouter un indicateur d'utilisateur
    const userIndicator = document.createElement('span');
    userIndicator.className = 'user-indicator';
    userIndicator.textContent = `Connecté en tant que: ${username}`;
    userIndicator.style.marginRight = '10px';
    userIndicator.style.color = 'var(--md-primary-bg-color)';
    header.appendChild(userIndicator);
  }
  
  // Réappliquer le masquage/affichage après le chargement complet
  window.addEventListener('load', function() {
    if (isAdmin(username)) {
      showPrivateMenuItems();
      // Réappliquer plusieurs fois pour s'assurer que tout est affiché
      setTimeout(showPrivateMenuItems, 500);
      setTimeout(showPrivateMenuItems, 1000);
      setTimeout(showPrivateMenuItems, 2000);
    } else {
      hidePrivateMenuItems();
      // Réappliquer plusieurs fois pour s'assurer que tout est masqué
      setTimeout(hidePrivateMenuItems, 500);
      setTimeout(hidePrivateMenuItems, 1000);
      setTimeout(hidePrivateMenuItems, 2000);
    }
  });
}); 