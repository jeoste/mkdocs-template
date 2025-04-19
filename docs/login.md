# Connexion Administrateur

Vous êtes actuellement connecté en tant qu'utilisateur invité (guest). Pour accéder à toutes les pages, veuillez vous connecter avec un compte autorisé.

<div class="login-form">
  <form name="login">
    <div class="form-group">
      <label for="username">Nom d'utilisateur</label>
      <input type="text" id="username" name="username" required autofocus>
    </div>
    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" name="password" required>
    </div>
    <button type="submit" class="md-button md-button--primary">Se connecter</button>
  </form>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[name="login"]');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Vérifier les identifiants
    if (username === 'admin' && password === 'test123') {
      // Admin - accès complet
      const credentials = btoa(`${username}:${password}`);
      sessionStorage.setItem('auth', credentials);
      window.location.href = '/';
    } else if (username === 'invite' && password === 'invite123') {
      // Utilisateur standard - accès limité
      const credentials = btoa(`${username}:${password}`);
      sessionStorage.setItem('auth', credentials);
      window.location.href = '/';
    } else {
      // Identifiants incorrects
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  });
});
</script>

<style>
.login-form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group input[readonly] {
  background-color: #f0f0f0;
}

button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--md-primary-fg-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
</style> 