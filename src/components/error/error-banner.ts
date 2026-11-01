import './error-banner.scss';
import alertIcon from '@/assets/icons/alertCircle.svg';
import retryIcon from '@/assets/icons/refresh.svg';
import { t } from '@/features/i18n';

export function ErrorBanner(message: string): string {
  return `
    <div class="error_banner" role="alert">
      <img class="error_banner_icon" src="${alertIcon}" alt="${t('common.errorIcon')}" />
      <div class="error_banner_text">
        <p class="error_banner_title">${t('common.errorTitle')}</p>
        <p class="error_banner_message">${message}</p>
      </div>
      <button class="btn error_banner_retry" type="button">
        <img class="error_banner_retry_icon" src="${retryIcon}" alt="" />
        <span>${t('common.retry')}</span>
      </button>
    </div>
  `;
}

export function showErrorBanner(
  container: HTMLElement,
  message: string,
  reload: () => void | Promise<void>,
): void {
  container.innerHTML = ErrorBanner(message);

  const banner = container.querySelector<HTMLElement>('.error_banner');
  const retryButton = container.querySelector<HTMLButtonElement>(
    '.error_banner_retry',
  );
  if (!banner || !retryButton) return;

  retryButton.addEventListener('click', async () => {
    retryButton.disabled = true;
    retryButton.classList.add('is_loading');

    try {
      await reload();
      banner.remove();
    } catch {
      retryButton.disabled = false;
      retryButton.classList.remove('is_loading');
    }
  });
}
