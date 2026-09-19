import { Header } from '../components/header/header';
import { Overlay } from '../components/overlay/overlay';
import { Sidebar, initSidebar } from '../components/sidebar/sidebar';
import { initRouter } from './router';

export function initApp(): void {
  document.body.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${Overlay()}
    <main class="main_content"></main>
  `;

  initSidebar();
  initRouter();
}
