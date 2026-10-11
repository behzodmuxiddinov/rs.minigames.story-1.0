import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebaseauth';

export const authReady = new Promise<User | null>((resolve) => {
  onAuthStateChanged(auth, resolve);
});

export function subscribe(listener: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, listener);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}
