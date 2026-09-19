export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#/home', label: 'Home' },
  { href: '#/library', label: 'Library' },
  { href: '#/tournaments', label: 'Tournaments' },
  { href: '#/community', label: 'Community' },
];

const DEFAULT_HASH = '#/home';

function syncActiveLinks(): void {
  const currentHash = globalThis.location.hash;
  const normalizedHash = ['', '#', '#/'].includes(currentHash)
    ? DEFAULT_HASH
    : currentHash;

  const links = document.querySelectorAll<HTMLAnchorElement>('.nav_items a');
  for (const link of links) {
    link.classList.toggle('is_active', link.hash === normalizedHash);
  }
}

export function initRouter(): void {
  syncActiveLinks();
  globalThis.addEventListener('hashchange', syncActiveLinks);
}
