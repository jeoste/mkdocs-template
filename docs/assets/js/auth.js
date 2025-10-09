// Gestion de l'authentification (UI) et masquage des liens protégés
'use strict';

// Chemins protégés côté serveur (Netlify Basic Auth)
const PROTECTED_PREFIXES = ['/private/', '/clients/', '/technical-spec/', '/functional-spec/'];

function isProtectedHref(href) {
  if (!href) return false;
  try {
    const url = new URL(href, window.location.origin);
    const path = url.pathname.toLowerCase();
    return PROTECTED_PREFIXES.some(prefix => path.startsWith(prefix));
  } catch (_e) {
    return false;
  }
}

function getAuthState() {
  const role = sessionStorage.getItem('authRole') || 'guest';
  const username = sessionStorage.getItem('authUsername') || 'guest';
  return { role, username };
}

function setAuthState(role, username) {
  sessionStorage.setItem('authRole', role);
  sessionStorage.setItem('authUsername', username);
}

function isAdminRole(role) {
  return role === 'admin';
}

function hideProtectedLinksForGuests() {
  const { role } = getAuthState();
  if (isAdminRole(role)) return;

  // Masquer les liens vers les sections protégées
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!isProtectedHref(href)) return;

    link.style.display = 'none';

    // Masquer conteneur de navigation si applicable
    const navItem = link.closest('.md-nav__item');
    if (navItem) navItem.style.display = 'none';

    const footerLink = link.closest('.md-footer-nav__link');
    if (footerLink) {
      const direction = footerLink.closest('.md-footer-nav__direction');
      if (direction) direction.style.display = 'none';
    }
  });

  // Masquer la barre de navigation bas si tout est caché
  const footerNav = document.querySelector('.md-footer-nav');
  if (footerNav) {
    const footerLinks = footerNav.querySelectorAll('.md-footer-nav__link');
    const allHidden = Array.from(footerLinks).every(l => {
      const style = window.getComputedStyle(l);
      return l.style.display === 'none' || style.display === 'none';
    });
    if (allHidden) footerNav.style.display = 'none';
  }
}

function showProtectedLinksForAdmins() {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!isProtectedHref(href)) return;

    link.style.display = '';

    const navItem = link.closest('.md-nav__item');
    if (navItem) navItem.style.display = '';

    const footerLink = link.closest('.md-footer-nav__link, .md-footer-nav__direction');
    if (footerLink) footerLink.style.display = '';
  });

  const footerNav = document.querySelector('.md-footer-nav');
  if (footerNav) footerNav.style.display = '';
}

function updateHeaderControls() {
  const { role, username } = getAuthState();
  const header = document.querySelector('.md-header__inner');
  if (!header) return;

  const existingButton = header.querySelector('.auth-button');
  if (existingButton) existingButton.remove();

  const existingIndicator = header.querySelector('.user-indicator');
  if (existingIndicator) existingIndicator.remove();

  const authButton = document.createElement('button');
  authButton.className = 'md-header__button md-icon auth-button';
  authButton.style.marginLeft = 'auto';
  authButton.style.border = 'none';
  authButton.style.background = 'transparent';
  authButton.style.color = 'var(--md-primary-bg-color)';
  authButton.style.cursor = 'pointer';

  if (role === 'guest') {
    authButton.textContent = 'Connexion';
    authButton.addEventListener('click', function() {
      window.location.href = '/login';
    });
  } else {
    authButton.textContent = 'Déconnexion';
    authButton.addEventListener('click', function() {
      setAuthState('guest', 'guest');
      window.location.reload();
    });
  }
  header.appendChild(authButton);

  const userIndicator = document.createElement('span');
  userIndicator.className = 'user-indicator';
  userIndicator.textContent = `Connecté en tant que: ${username}`;
  userIndicator.style.marginRight = '10px';
  userIndicator.style.color = 'var(--md-primary-bg-color)';
  header.appendChild(userIndicator);
}

function applyVisibility() {
  const { role } = getAuthState();
  if (isAdminRole(role)) {
    showProtectedLinksForAdmins();
  } else {
    hideProtectedLinksForGuests();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Valeurs par défaut
  if (!sessionStorage.getItem('authRole')) setAuthState('guest', 'guest');

  updateHeaderControls();
  applyVisibility();

  // Réappliquer après chargement complet (MkDocs peut injecter du contenu)
  window.addEventListener('load', applyVisibility);
});