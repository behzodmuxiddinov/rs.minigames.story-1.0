import './auth-actions.scss';
import type { User } from 'firebase/auth';
import { logout } from '@/services/actions/auth.actions';
import { getCurrentUser, subscribe } from '@/services/auth-store';
import { enforceRouteAccess } from '@/app/router';
import { escapeHtml } from '@/utils/escape-html.utilities';
import { showSnackbar } from '@/components/snackbar/snackbar';
import { t } from '@/features/i18n';

const MENU_ID = 'auth_menu_list';

function GuestHeader(): string {
  return `
    <button class="btn btn_ghost" type="button" data-auth="login">${t('auth.logInAction')}</button>
    <button class="btn btn_primary" type="button" data-auth="register">${t('auth.register')}</button>
  `;
}

function GuestTablet(): string {
  return `
    <button class="btn btn_primary" type="button" data-auth="register">${t('auth.register')}</button>
  `;
}

function GuestSidebar(): string {
  return `
    <button class="btn btn_outline" type="button" data-auth="login">${t('auth.logInAction')}</button>
    <button class="btn btn_primary" type="button" data-auth="register">${t('auth.register')}</button>
  `;
}

function AccountSidebar(): string {
  return `
    <a class="btn btn_outline" href="/profile">${t('auth.profile')}</a>
    <button class="btn btn_primary" type="button" data-auth-logout>${t('auth.logout')}</button>
  `;
}

export function Avatar(user: User, className: string): string {
  if (user.photoURL) {
    return `<img class="${className}" src="${escapeHtml(user.photoURL)}" alt="" />`;
  }

  const initial = (user.displayName ?? 'A').slice(0, 1).toUpperCase();

  return `<span class="${className}" aria-hidden="true">${escapeHtml(initial)}</span>`;
}

function ProfileMenu(user: User): string {
  return `
    <div class="auth_menu">
      <button
        class="auth_menu_trigger"
        type="button"
        aria-label="${t('auth.accountMenu')}"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="${MENU_ID}"
      >
        ${Avatar(user, 'auth_avatar')}
      </button>
      <div class="auth_menu_list" id="${MENU_ID}" hidden>
        <a class="auth_menu_item" href="/profile">${t('auth.profile')}</a>
        <button class="auth_menu_item" type="button" data-auth-logout>
          ${t('auth.logout')}
        </button>
      </div>
    </div>
  `;
}

function setRegion(selector: string, html: string): void {
  const region = document.querySelector(selector);

  if (region) {
    region.innerHTML = html;
  }
}

export function renderAuthActions(): void {
  const user = getCurrentUser();

  setRegion('.header_actions', user ? ProfileMenu(user) : GuestHeader());
  setRegion('.tablet_actions', user ? '' : GuestTablet());
  setRegion('.sidebar_actions', user ? AccountSidebar() : GuestSidebar());
}

function setMenuOpen(open: boolean): void {
  const trigger = document.querySelector('.auth_menu_trigger');
  const list = document.querySelector(`#${MENU_ID}`);

  if (!trigger || !list) {
    return;
  }

  trigger.setAttribute('aria-expanded', String(open));
  list.toggleAttribute('hidden', !open);
}

export function initAuthActions(): void {
  renderAuthActions();

  subscribe(() => {
    renderAuthActions();
    enforceRouteAccess();
  });

  document.body.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    if (event.target.closest('[data-auth-logout]')) {
      void logout().catch((error: unknown) => {
        showSnackbar(String(error), { status: 'error' });
      });
      return;
    }

    const trigger = event.target.closest('.auth_menu_trigger');

    setMenuOpen(trigger?.getAttribute('aria-expanded') === 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });
}
