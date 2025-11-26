// Middleware Vercel pour l'authentification HTTP Basic
// Pour un site statique MkDocs

// Chemins protégés nécessitant une authentification
const PROTECTED_PATHS = [
  '/private/',
  '/technical-spec/',
  '/functional-spec/',
  '/clients/'
];

// Identifiants (en production, utilisez des variables d'environnement Vercel)
// Vous pouvez définir VERCEL_ENV_AUTH_CREDENTIALS dans les variables d'environnement Vercel
const VALID_CREDENTIALS = {
  admin: process.env.AUTH_ADMIN_PASSWORD || 'test123',
  guest: process.env.AUTH_GUEST_PASSWORD || 'guest123',
  invite: process.env.AUTH_INVITE_PASSWORD || 'invite123'
};

function isProtectedPath(pathname) {
  return PROTECTED_PATHS.some(path => pathname.startsWith(path));
}

function parseBasicAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  try {
    const base64 = authHeader.substring(6);
    // Utiliser atob() qui est disponible dans l'environnement Edge
    const decoded = atob(base64);
    const [username, password] = decoded.split(':');
    return { username, password };
  } catch {
    return null;
  }
}

function isValidCredentials(username, password) {
  return VALID_CREDENTIALS[username] === password;
}

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Vérifier si le chemin est protégé
  if (!isProtectedPath(pathname)) {
    return null; // Laisser passer la requête
  }

  // Vérifier l'authentification HTTP Basic
  const authHeader = request.headers.get('authorization');
  const credentials = parseBasicAuth(authHeader);

  if (!credentials || !isValidCredentials(credentials.username, credentials.password)) {
    // Retourner une réponse 401 avec en-tête WWW-Authenticate
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Zone protégée"',
        'Content-Type': 'text/plain'
      }
    });
  }

  // Authentification réussie, laisser passer
  return null;
}

export const config = {
  matcher: [
    '/private/:path*',
    '/technical-spec/:path*',
    '/functional-spec/:path*',
    '/clients/:path*'
  ]
};

