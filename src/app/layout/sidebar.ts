import logoUrl from '../../assets/brand-logo(white).svg';
import closeIconUrl from '../../assets/icons/close.svg';

export function Sidebar(): string {
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
        <ul class="nav_items">
          <li class="nav_item">
            <a href="#/home">Home</a>
          </li>
          <li class="nav_item"><a href="#/library">Library</a></li>
          <li class="nav_item"><a href="#/tournaments">Tournaments</a></li>
          <li class="nav_item"><a href="#/community">Community</a></li>
        </ul>
      </nav>
      <div class="sidebar_actions">
        <button class="btn btn_outline" type="button">Log In</button>
        <button class="btn btn_primary" type="button">Sign Up</button>
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

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('is_open')) {
      setOpen(false);
    }
  });

  function updateActiveLink(): void {
    const nav_items =
      document.querySelectorAll<HTMLAnchorElement>('.nav_items a');
    const currentHash = window.location.hash;
    const normalizedHash =
      currentHash === '#' || currentHash === '' || currentHash === '#/'
        ? '#/home'
        : currentHash;
    nav_items.forEach((item) => {
      item.classList.toggle('is_active', item.hash === normalizedHash);
    });
  }
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);
}
