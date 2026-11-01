import './language-switcher.scss';
import { getLocale, LOCALES, setLocale, t, type Locale } from './i18n';

const SELECT_CLASS = 'language_switcher_select';

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  uz: 'O‘zbek',
};

export function LanguageSwitcher(): string {
  const current = getLocale();
  const options = LOCALES.map(
    (locale) =>
      `<option value="${locale}" ${locale === current ? 'selected' : ''}>${LANGUAGE_NAMES[locale]}</option>`,
  ).join('');

  return `
    <div class="language_switcher">
      <select class="${SELECT_CLASS}" aria-label="${t('language.label')}">
        ${options}
      </select>
    </div>
  `;
}

export function initLanguageSwitcher(): void {
  document.addEventListener('change', (event) => {
    const select = event.target;

    if (
      !(select instanceof HTMLSelectElement) ||
      !select.classList.contains(SELECT_CLASS)
    ) {
      return;
    }

    const locale = LOCALES.find((item) => item === select.value);

    if (locale) setLocale(locale);
  });
}
