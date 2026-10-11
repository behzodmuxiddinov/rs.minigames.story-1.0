import type { User } from 'firebase/auth';
import { logout } from '@/services/actions/auth.actions';
import { getCurrentUser, subscribe } from '@/services/auth-store';
import { showSnackbar } from '@/components/snackbar/snackbar';

const SESSION_LIMIT = 5 * 60 * 1000;
const EXPIRED_MESSAGE = 'Your session expired. Please log in again.';

let timer: ReturnType<typeof setTimeout> | undefined;

function stopTimer(): void {
  if (timer !== undefined) {
    globalThis.clearTimeout(timer);
    timer = undefined;
  }
}

function expire(): void {
  stopTimer();

  void logout()
    .then(() => {
      showSnackbar(EXPIRED_MESSAGE, { status: 'info' });
    })
    .catch((error: unknown) => {
      showSnackbar(String(error), { status: 'error' });
    });
}

function startTimer(user: User): void {
  stopTimer();

  const signedInAt = Date.parse(user.metadata.lastSignInTime ?? '');
  const remaining = Number.isNaN(signedInAt)
    ? SESSION_LIMIT
    : signedInAt + SESSION_LIMIT - Date.now();

  if (remaining <= 0) {
    expire();
    return;
  }

  timer = globalThis.setTimeout(expire, remaining);
}

export function initAutoLogout(): void {
  subscribe((user) => {
    if (user) {
      startTimer(user);
      return;
    }

    stopTimer();
  });

  document.addEventListener('visibilitychange', () => {
    const user = getCurrentUser();

    if (document.visibilityState === 'visible' && user) {
      startTimer(user);
    }
  });
}
