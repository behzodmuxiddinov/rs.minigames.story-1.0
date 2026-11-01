export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'minigames-theme';
const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const THEMES: Theme[] = ['light', 'dark'];

function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

function readStoredTheme(): Theme {
  const stored = globalThis.localStorage.getItem(STORAGE_KEY);

  if (isTheme(stored)) return stored;

  return globalThis.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';
}

let currentTheme = readStoredTheme();

export function getTheme(): Theme {
  return currentTheme;
}

export function applyTheme(): void {
  document.documentElement.dataset.theme = currentTheme;
}

export function setTheme(theme: Theme): void {
  if (theme === currentTheme) return;

  currentTheme = theme;
  globalThis.localStorage.setItem(STORAGE_KEY, theme);
  applyTheme();
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
