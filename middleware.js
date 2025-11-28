// Middleware Vercel Edge pour l'authentification HTTP Basic
// TEMPORAIREMENT DÉSACTIVÉ - Le middleware cause une erreur 500
// L'authentification est gérée côté client via sessionStorage (auth.js)
// Pour réactiver l'authentification serveur, décommentez le code ci-dessous

// const VALID_CREDENTIALS = {
//   admin: 'test123',
//   guest: 'guest123',
//   invite: 'invite123'
// };

// const PROTECTED_PATHS = ['/private/', '/technical-spec/', '/functional-spec/', '/clients/'];

export default function middleware(request) {
  // Middleware désactivé temporairement
  // L'authentification est gérée côté client
  return;
  
  // Code commenté pour référence future :
  // const url = new URL(request.url);
  // const pathname = url.pathname;
  // const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path));
  // if (!isProtected) return;
  // const authHeader = request.headers.get('authorization');
  // if (!authHeader || !authHeader.startsWith('Basic ')) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //     headers: { 'WWW-Authenticate': 'Basic realm="Zone protégée"' }
  //   });
  // }
  // try {
  //   const base64 = authHeader.substring(6);
  //   const decoded = atob(base64);
  //   const [username, password] = decoded.split(':');
  //   if (VALID_CREDENTIALS[username] === password) return;
  // } catch (e) {}
  // return new Response('Unauthorized', {
  //   status: 401,
  //   headers: { 'WWW-Authenticate': 'Basic realm="Zone protégée"' }
  // });
}

export const config = {
  matcher: ['/private/:path*', '/technical-spec/:path*', '/functional-spec/:path*', '/clients/:path*']
};

