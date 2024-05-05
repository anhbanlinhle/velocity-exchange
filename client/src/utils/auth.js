export function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

export function isAdmin() {
  return localStorage.getItem('isAdmin');
}
