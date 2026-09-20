import { Home } from '@/pages/home/home';

export interface NavLink {
  href: string;
  label: string;
}

interface Route {
  label: string;
  title: string;
  render: () => string;
  init?: () => void;
}

const DEFAULT_HASH = '#/home';

const ROUTES: Record<string, Route> = {
  '#/home': { label: 'Home', title: 'MiniGames', render: Home },
  '#/library': { label: 'Library', title: 'Library | MiniGames', render: Home },
  '#/tournaments': {
    label: 'Tournaments',
    title: 'Tournaments | MiniGames',
    render: Home,
  },
  '#/community': {
    label: 'Community',
    title: 'Community | MiniGames',
    render: Home,
  },
};

export const NAV_LINKS: NavLink[] = Object.entries(ROUTES).map(
  ([href, { label }]) => ({ href, label }),
);

function resolveHash(rawHash: string): string {
  const hash = ['', '#', '#/'].includes(rawHash) ? DEFAULT_HASH : rawHash;

  return Object.hasOwn(ROUTES, hash) ? hash : DEFAULT_HASH;
}

function syncActiveLinks(hash: string): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav_items a');
  for (const link of links) {
    link.classList.toggle('is_active', link.hash === hash);
  }
}

function renderRoute(): void {
  const main = document.querySelector<HTMLElement>('.main_content');
  if (!main) {
    return;
  }

  const hash = resolveHash(globalThis.location.hash);
  const route = ROUTES[hash];

  main.innerHTML = route.render();
  route.init?.();
  document.title = route.title;
  syncActiveLinks(hash);
}

export function initRouter(): void {
  renderRoute();

  globalThis.addEventListener('hashchange', () => {
    renderRoute();
    globalThis.scrollTo({ top: 0 });
    document.querySelector<HTMLElement>('.main_content')?.focus();
  });
}
