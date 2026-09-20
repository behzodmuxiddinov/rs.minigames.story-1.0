import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Overlay } from '../components/overlay/overlay';
import { Sidebar, initSidebar } from '../components/sidebar/sidebar';
import { AuthDialog, initAuthDialog } from '../features/auth/auth-dialog';
import { initRouter } from './router';
import { initiMainContent } from '../pages/home/home';

export function initApp(): void {
  document.body.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${Overlay()}
    ${AuthDialog()}

    <main class="main_content" tabindex="-1"></main>

    ${Footer()}
  `;

  initSidebar();
  initRouter();
  initAuthDialog();
  initiMainContent();
}
