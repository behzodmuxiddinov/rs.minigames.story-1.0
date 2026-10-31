import { Home, Library, Profile, initMainContent, initLibrary } from '@/pages';
import { getCurrentUser } from '@/services/auth-store';
import { t, type TranslationKey } from '@/features/i18n';

export interface NavLink {
  href: string;
  label: string;
}

interface Route {
  labelKey: TranslationKey;
  titleKey: TranslationKey;
  render: () => string;
  init?: () => void;
  hidden?: boolean;
  protected?: boolean;
}

const DEFAULT_PATH = '/home';

const ROUTES: Record<string, Route> = {
  '/home': {
    labelKey: 'nav.home',
    titleKey: 'title.home',
    render: Home,
    init: initMainContent,
  },
  '/library': {
    labelKey: 'nav.library',
    titleKey: 'title.library',
    render: Library,
    init: initLibrary,
  },
  '/tournaments': {
    labelKey: 'nav.tournaments',
    titleKey: 'title.tournaments',
    render: Home,
    init: initMainContent,
  },
  '/community': {
    labelKey: 'nav.community',
    titleKey: 'title.community',
    render: Home,
    init: initMainContent,
  },
  '/profile': {
    labelKey: 'nav.profile',
    titleKey: 'title.profile',
    render: Profile,
    hidden: true,
    protected: true,
  },
};

export function navLinks(): NavLink[] {
  return Object.entries(ROUTES)
    .filter(([, route]) => !route.hidden)
    .map(([href, { labelKey }]) => ({ href, label: t(labelKey) }));
}

let currentPath: string | undefined;
let queryHandler: (() => void) | undefined;

export function onQueryChange(handler: () => void): void {
  queryHandler = handler;
}

function resolvePath(rawPath: string): string {
  const path = rawPath.replace(/\/+$/, '');

  return Object.hasOwn(ROUTES, path) ? path : DEFAULT_PATH;
}

function syncActiveLinks(path: string): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav_items a');

  for (const link of links) {
    const linkPath = resolvePath(
      new URL(link.href, globalThis.location.href).pathname,
    );

    link.classList.toggle('is_active', linkPath === path);
  }
}

function renderRoute(): void {
  const main = document.querySelector<HTMLElement>('.main_content');
  if (!main) return;

  const path = resolvePath(globalThis.location.pathname);

  if (ROUTES[path].protected && !getCurrentUser()) {
    navigate(DEFAULT_PATH, true);
    return;
  }

  if (path === currentPath) {
    queryHandler?.();
    return;
  }

  const isFirstRender = currentPath === undefined;
  const route = ROUTES[path];

  currentPath = path;
  queryHandler = undefined;
  main.innerHTML = route.render();
  route.init?.();
  document.title = t(route.titleKey);
  syncActiveLinks(path);

  if (!isFirstRender) {
    globalThis.scrollTo({ top: 0 });
    main.focus();
  }
}

export function rerenderRoute(): void {
  currentPath = undefined;
  renderRoute();
}

export function navigate(to: string, replace = false): void {
  if (to === `${globalThis.location.pathname}${globalThis.location.search}`) {
    return;
  }

  if (replace) globalThis.history.replaceState({}, '', to);
  else globalThis.history.pushState({}, '', to);

  renderRoute();
}

export function enforceRouteAccess(): void {
  const path = resolvePath(globalThis.location.pathname);

  if (ROUTES[path].protected && !getCurrentUser()) {
    navigate(DEFAULT_PATH, true);
  }
}

function handleLinkClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest('a');
  if (!link || link.target === '_blank') return;

  const url = new URL(link.href, globalThis.location.href);
  if (url.origin !== globalThis.location.origin) return;

  event.preventDefault();
  navigate(`${url.pathname}${url.search}`);
}

export function initRouter(): void {
  if (globalThis.location.hash.startsWith('#/')) {
    globalThis.history.replaceState({}, '', globalThis.location.hash.slice(1));
  }

  document.addEventListener('click', handleLinkClick);
  globalThis.addEventListener('popstate', renderRoute);

  renderRoute();
}
