import { signout } from './api-auth';

export function authenticate(jwt: string, cb: () => void) {
  if (typeof window !== 'undefined')
    localStorage.setItem('jwt', JSON.stringify(jwt));
  cb();
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  const storedToken = localStorage.getItem('jwt');
  return storedToken ? JSON.parse(storedToken) : false;
}

export async function clearJWT(cb: () => void) {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt');
  cb();
  await signout().then((data) => {
    document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return data;
  });
}
