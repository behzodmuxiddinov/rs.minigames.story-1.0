import './styles/globals.scss';
import { initApp } from './app';
import { authReady } from './services/auth-store';
import { applyTheme } from './features/theme';

applyTheme();

await authReady;

initApp();
