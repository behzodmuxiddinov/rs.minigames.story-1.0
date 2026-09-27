import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Overlay } from '../components/overlay/overlay';
import { Sidebar, initSidebar } from '../components/sidebar/sidebar';
import { AuthDialog, initAuthDialog } from '../features/auth/auth-dialog';
import {
  GameDetailsDialog,
  initGameDetailsDialog,
} from '../components/game-details-dialog/game-details-dialog';
import { initRouter } from './router';

export function initApp(): void {
  document.body.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${Overlay()}
    ${AuthDialog()}
    ${GameDetailsDialog()}

    <main class="main_content" tabindex="-1"></main>

    ${Footer()}
  `;

  initSidebar();
  initRouter();
  initAuthDialog();
  initGameDetailsDialog();
}
