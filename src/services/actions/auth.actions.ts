import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebaseauth';
import type { TLogin, TRegister } from '@/types';

export async function register(data: TRegister) {
  if(!data.username || !data.email || !data.password) {
    throw new Error('Missing username, email or password');
  }
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: data.username
  })

  return user;
}

export async function login(data: TLogin) {
  if(!data.email || !data.password) {
    throw new Error('Missing email or password');
  }
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  return userCredential.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  const userCredential = await signInWithPopup(auth, provider);

  return userCredential.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}
