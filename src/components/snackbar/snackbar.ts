import './snackbar.scss';

export type SnackbarStatus = 'success' | 'error' | 'info' | 'warning';

export type SnackbarPosition =
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface SnackbarOptions {
  status?: SnackbarStatus;
  position?: SnackbarPosition;
  duration?: number;
}

const DEFAULT_STATUS: SnackbarStatus = 'info';
const DEFAULT_POSITION: SnackbarPosition = 'top-right';
const DEFAULT_DURATION = 5000;
const LEAVE_DURATION = 200;
const CLOSE_LABEL = 'Close notification';

const ICONS: Record<SnackbarStatus, string> = {
  success: '<path d="M5 12.5 10 17.5 19 7" />',
  error: '<path d="M6 6 18 18M18 6 6 18" />',
  info: '<circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.01" />',
  warning: '<path d="M12 4 21 19.5H3L12 4Z" /><path d="M12 10v4M12 17v.01" />',
};

function getHost(): HTMLElement {
  const dialogs = [...document.querySelectorAll('dialog')];

  return (
    dialogs.findLast((dialog) => dialog.matches(':modal')) ?? document.body
  );
}

function getContainer(position: SnackbarPosition): HTMLElement {
  const className = `snackbars_${position}`;
  const existing = document.querySelector<HTMLElement>(`.${className}`);
  const container = existing ?? document.createElement('div');
  container.className = `snackbars ${className}`;

  const host = getHost();
  if (container.parentElement !== host) {
    host.append(container);

    if (host !== document.body) {
      host.addEventListener(
        'close',
        () => {
          if (container.isConnected) document.body.append(container);
        },
        { once: true },
      );
    }
  }

  return container;
}

export function showSnackbar(
  message: string,
  {
    status = DEFAULT_STATUS,
    position = DEFAULT_POSITION,
    duration = DEFAULT_DURATION,
  }: SnackbarOptions = {},
): () => void {
  const container = getContainer(position);

  const snackbar = document.createElement('div');
  snackbar.className = `snackbar snackbar_${status}`;
  snackbar.setAttribute('role', status === 'error' ? 'alert' : 'status');
  snackbar.innerHTML = `
    <svg class="snackbar_icon" viewBox="0 0 24 24" aria-hidden="true">
      ${ICONS[status]}
    </svg>
    <p class="snackbar_message">${message}</p>
    <button class="snackbar_close" type="button" aria-label="${CLOSE_LABEL}">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6 18 18M18 6 6 18" />
      </svg>
    </button>
  `;
  container.append(snackbar);

  let timer: ReturnType<typeof setTimeout> | undefined;
  let isClosing = false;

  const close = (): void => {
    if (isClosing) return;
    isClosing = true;
    clearTimeout(timer);
    snackbar.classList.add('is_leaving');

    setTimeout(() => {
      snackbar.remove();
      if (container.childElementCount === 0) container.remove();
    }, LEAVE_DURATION);
  };

  snackbar
    .querySelector('.snackbar_close')
    ?.addEventListener('click', () => close());

  if (duration > 0) timer = setTimeout(close, duration);

  return close;
}
