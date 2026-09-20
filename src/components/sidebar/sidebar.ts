import './sidebar.scss';
import logoUrl from '../../assets/images/brand-logo-white.svg';
import closeIconUrl from '../../assets/icons/close.svg';
import { NAV_LINKS } from '../../app/router';

export function Sidebar(): string {
  const navItems = NAV_LINKS.map(
    ({ href, label }) =>
      `<li class="nav_item"><a href="${href}">${label}</a></li>`,
  ).join('');

  return `
    <aside id="sidebar" aria-label="Mobile navigation">
      <header>
        <div class="logo_content">
          <a href="#/home" class="logo_link" aria-label="MiniGames home">
            <img src="${logoUrl}" alt="MiniGames" width="172" height="32" />
          </a>
        </div>
        <button
          class="sidebar_close_btn"
          type="button"
          aria-label="Close navigation"
        >
          <img src="${closeIconUrl}" alt="" class="sidebar_close_img" />
        </button>
      </header>
      <nav class="sidebar_nav">
        <ul class="nav_items">${navItems}</ul>
      </nav>
      <div class="sidebar_actions">
        <button class="btn btn_outline" type="button" data-auth="login">Log In</button>
        <button class="btn btn_primary" type="button" data-auth="register">Sign Up</button>
      </div>
    </aside>
  `;
}

export function initSidebar(): void {
  const sidebar = document.querySelector<HTMLElement>('#sidebar');
  const burger = document.querySelector<HTMLButtonElement>('.header_burger');
  const overlay = document.querySelector<HTMLDivElement>('.overlay');
  const closeButton =
    document.querySelector<HTMLButtonElement>('.sidebar_close_btn');
  const authButtons =
    document.querySelectorAll<HTMLButtonElement>('[data-auth]');
  if (!sidebar || !burger || !closeButton || !overlay) {
    return;
  }

  const setOpen = (open: boolean): void => {
    sidebar.classList.toggle('is_open', open);
    overlay.classList.toggle('is_open', open);
    document.body.classList.toggle('is_locked', open);

    if (open) {
      closeButton.focus();
    } else {
      burger.focus();
    }
  };

  burger.addEventListener('click', () => {
    setOpen(!sidebar.classList.contains('is_open'));
  });

  closeButton.addEventListener('click', () => {
    setOpen(false);
  });

  sidebar.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.closest('a')) {
      setOpen(false);
    }
  });

  overlay.addEventListener('click', () => {
    setOpen(false);
  });

  for (const authButton of authButtons) {
    authButton.addEventListener('click', () => {
      setOpen(false);
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is_open')) {
      setOpen(false);
    }
  });
}
