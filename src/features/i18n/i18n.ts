import { en, type TranslationKey } from './locales/en';

export type { TranslationKey } from './locales/en';
import { ru } from './locales/ru';
import { uz } from './locales/uz';

export type Locale = 'en' | 'ru' | 'uz';

export type TranslationValues = Record<string, string | number>;

const DICTIONARIES = { en, ru, uz };

const STORAGE_KEY = 'minigames-locale';
const DEFAULT_LOCALE: Locale = 'en';
const VALUE_PATTERN = /{(\w+)}/g;

export const LOCALES = Object.keys(DICTIONARIES) as Locale[];

const listeners = new Set<() => void>();

function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

function readStoredLocale(): Locale {
  const stored = globalThis.localStorage.getItem(STORAGE_KEY);

  return isLocale(stored) ? stored : DEFAULT_LOCALE;
}

let currentLocale = readStoredLocale();

export function getLocale(): Locale {
  return currentLocale;
}

export function applyLocale(): void {
  document.documentElement.lang = currentLocale;
}

export function setLocale(locale: Locale): void {
  if (locale === currentLocale) return;

  currentLocale = locale;
  globalThis.localStorage.setItem(STORAGE_KEY, locale);
  applyLocale();

  for (const listener of listeners) {
    listener();
  }
}

export function onLocaleChange(listener: () => void): void {
  listeners.add(listener);
}

export function t(key: TranslationKey, values: TranslationValues = {}): string {
  return DICTIONARIES[currentLocale][key].replaceAll(
    VALUE_PATTERN,
    (_, name: string) => String(values[name] ?? ''),
  );
}
