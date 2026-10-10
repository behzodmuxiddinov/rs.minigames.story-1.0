import './styles/globals.scss';
import { initApp } from './app';
import { authReady } from './services/auth-store';

await authReady;

initApp();
