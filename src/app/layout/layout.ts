import { Header, initHeader } from './header';

export function renderLayout(): void {
  document.body.innerHTML = `
    ${Header()}
    <main class="main_content"></main>
  `;

  initHeader();
}
