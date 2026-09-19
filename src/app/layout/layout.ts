import { Header } from './header';
import { Overlay } from './overlay';
import { Sidebar, initSidebar } from './sidebar';

export function renderLayout(): void {
  document.body.innerHTML = `
    ${Header()}
    ${Sidebar()}
    ${Overlay()}
    <main class="main_content"></main>
  `;

  initSidebar();
}
