import './theme-toggle.scss';
import { moonIcon, sunIcon } from './icons';
import { getTheme, toggleTheme } from './theme';
import { t } from '@/features/i18n';

const BUTTON_CLASS = 'theme_toggle';

export function ThemeToggle(): string {
  return `
    <button
      class="${BUTTON_CLASS}"
      type="button"
      aria-label="${t('theme.toggle')}"
      aria-pressed="${getTheme() === 'dark'}"
    >
      <span class="theme_toggle_icon theme_toggle_moon">${moonIcon}</span>
      <span class="theme_toggle_icon theme_toggle_sun">${sunIcon}</span>
    </button>
  `;
}

export function initThemeToggle(): void {
  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest(`.${BUTTON_CLASS}`);

    if (!button) return;

    toggleTheme();
    button.setAttribute('aria-pressed', String(getTheme() === 'dark'));
  });
}
