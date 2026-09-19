import './header.scss';
import logoUrl from '../../assets/images/brand-logo.svg';
import { NAV_LINKS } from '../../app/router';

export function Header(): string {
  const navItems = NAV_LINKS.map(
    ({ href, label }) =>
      `<li class="nav_item"><a href="${href}">${label}</a></li>`,
  ).join('');

  return `
    <header class="header_content">
      <div class="container">
        <div class="header_inner_content">
          <div class="logo_content">
            <a href="#/home" class="logo_link" aria-label="MiniGames home">
              <img src="${logoUrl}" alt="MiniGames" width="172" height="32" />
            </a>
          </div>
          <div class="tablet_nav">
            <button class="btn btn_primary" type="button">Sign up</button>
            <button
              class="header_burger"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="sidebar"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <nav class="header_nav" id="header_nav" aria-label="Main navigation">
            <ul class="nav_items">${navItems}</ul>
            <div class="header_actions">
              <button class="btn btn_ghost" type="button">Log in</button>
              <button class="btn btn_primary" type="button">Sign up</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  `;
}
