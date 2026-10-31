import './sidebar.scss';
import logoUrl from '../../assets/images/brand-logo-white.svg';
import closeIconUrl from '../../assets/icons/close.svg';
import { navLinks } from '../../app/router';
import { LanguageSwitcher, t } from '@/features/i18n';

const CLOSE_TRIGGERS =
  '.sidebar_close_btn, .overlay, #sidebar a, [data-auth], [data-auth-logout]';

export function Sidebar(): string {
  const navItems = navLinks()
    .map(
      ({ href, label }) =>
        `<li class="nav_item"><a href="${href}">${label}</a></li>`,
    )
    .join('');

  return `
    <aside id="sidebar" aria-label="${t('sidebar.nav')}">
      <header>
        <div class="logo_content">
          <a href="/home" class="logo_link" aria-label="${t('common.brandHome')}">
            <img src="${logoUrl}" alt="MiniGames" width="172" height="32" />
          </a>
        </div>
        <button
          class="sidebar_close_btn"
          type="button"
          aria-label="${t('sidebar.close')}"
        >
          <img src="${closeIconUrl}" alt="" class="sidebar_close_img" />
        </button>
      </header>
      <nav class="sidebar_nav">
        <ul class="nav_items">${navItems}</ul>
      </nav>
      <div class="sidebar_language">${LanguageSwitcher()}</div>
      <div class="sidebar_actions"></div>
    </aside>
  `;
}

function isSidebarOpen(): boolean {
  return Boolean(
    document.querySelector('#sidebar')?.classList.contains('is_open'),
  );
}

function setSidebarOpen(open: boolean): void {
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  const overlay = document.querySelector<HTMLElement>('.overlay');
  const burger = document.querySelector<HTMLButtonElement>('.header_burger');
  const closeButton =
    document.querySelector<HTMLButtonElement>('.sidebar_close_btn');

  if (!sidebar || !overlay || !burger || !closeButton) return;

  sidebar.classList.toggle('is_open', open);
  overlay.classList.toggle('is_open', open);
  document.body.classList.toggle('is_locked', open);

  if (open) {
    closeButton.focus();
  } else {
    burger.focus();
  }
}

export function closeSidebar(): void {
  if (isSidebarOpen()) setSidebarOpen(false);
}

export function initSidebar(): void {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target.closest('.header_burger')) {
      setSidebarOpen(!isSidebarOpen());
      return;
    }

    if (event.target.closest(CLOSE_TRIGGERS)) {
      closeSidebar();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSidebar();
  });
}
