import './header.scss';
import logoUrl from '../../assets/images/brand-logo.svg';
import { navLinks } from '../../app/router';
import { LanguageSwitcher, t } from '@/features/i18n';

export function Header(): string {
  const navItems = navLinks()
    .map(
      ({ href, label }) =>
        `<li class="nav_item"><a href="${href}">${label}</a></li>`,
    )
    .join('');

  return `
    <header class="header_content">
      <div class="header_container">
        <div class="header_inner_content">
          <div class="logo_content">
            <a href="/home" class="logo_link" aria-label="${t('common.brandHome')}">
              <img src="${logoUrl}" alt="MiniGames" width="172" height="32" />
            </a>
          </div>
          <div class="tablet_nav">
            <div class="tablet_actions"></div>
            <button
              class="header_burger"
              type="button"
              aria-label="${t('header.toggleNav')}"
              aria-expanded="false"
              aria-controls="sidebar"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <nav class="header_nav" id="header_nav" aria-label="${t('header.mainNav')}">
            <ul class="nav_items">${navItems}</ul>
            <div class="header_language">${LanguageSwitcher()}</div>
            <div class="header_actions"></div>
          </nav>
        </div>
      </div>
    </header>
  `;
}
