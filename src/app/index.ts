import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Overlay } from '../components/overlay/overlay';
import {
  Sidebar,
  initSidebar,
  closeSidebar,
} from '../components/sidebar/sidebar';
import { AuthDialog, initAuthDialog } from '../features/auth/auth-dialog';
import {
  GameDetailsDialog,
  initGameDetailsDialog,
} from '../components/game-details-dialog/game-details-dialog';
import { initRouter, rerenderRoute } from './router';
import {
  initAuthActions,
  renderAuthActions,
} from '@/features/auth/auth-actions';
import { initAutoLogout } from '@/features/auth/auto-logout';
import {
  applyLocale,
  initLanguageSwitcher,
  onLocaleChange,
} from '@/features/i18n';

function replaceElement(selector: string, html: string): void {
  const element = document.querySelector(selector);

  if (element) element.outerHTML = html;
}

function renderChrome(): void {
  replaceElement('.header_content', Header());
  replaceElement('#sidebar', Sidebar());
  replaceElement('.footer_content', Footer());
  renderAuthActions();
}

export function initApp(): void {
  applyLocale();

  document.body.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${Overlay()}
    ${AuthDialog()}
    ${GameDetailsDialog()}

    <main class="main_content" tabindex="-1"></main>

    ${Footer()}
  `;

  initAuthActions();
  initAutoLogout();
  initSidebar();
  initLanguageSwitcher();
  initRouter();
  initAuthDialog();
  initGameDetailsDialog();

  onLocaleChange(() => {
    closeSidebar();
    renderChrome();
    rerenderRoute();
  });
}
