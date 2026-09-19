import { Header } from '../components/header/header';
import { Overlay } from '../components/overlay/overlay';
import { Sidebar, initSidebar } from '../components/sidebar/sidebar';
import { AuthDialog, initAuthDialog } from '../features/auth/auth-dialog';
import { initRouter } from './router';

export function initApp(): void {
  document.body.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${Overlay()}
    ${AuthDialog()}

    <main class="main_content"></main>
  `;

  initSidebar();
  initRouter();
  initAuthDialog();
}
