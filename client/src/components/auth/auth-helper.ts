import { signout } from './api-auth';

export function authenticate(jwt: string, cb: () => void) {
  if (typeof window !== 'undefined')
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
  cb();
}

export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  if (sessionStorage.getItem('jwt'))
    return JSON.parse(sessionStorage.getItem('jwt') as string);
  return false;
}

export function clearJWT(cb: () => void) {
  if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
  cb();
  signout().then((data) => {
    document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return data;
  });
}
