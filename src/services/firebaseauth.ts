import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCEYpOUaNbatA-2smrVsAgVy2i3-gz6B8Y',
  authDomain: 'minigame-c01b8.firebaseapp.com',
  projectId: 'minigame-c01b8',
  storageBucket: 'minigame-c01b8.firebasestorage.app',
  messagingSenderId: '213457324505',
  appId: '1:213457324505:web:6e27d143ce3dc14017b1c8',
  measurementId: 'G-TQ1GBGMY3T',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
