import './auth-actions.scss';
import type { User } from 'firebase/auth';
import { logout } from '@/services/actions/auth.actions';
import { getCurrentUser, subscribe } from '@/services/auth-store';
import { enforceRouteAccess } from '@/app/router';
import { escapeHtml } from '@/utils/escape-html.utilities';

const MENU_ID = 'auth_menu_list';

const GUEST_HEADER = `
  <button class="btn btn_ghost" type="button" data-auth="login">Log in</button>
  <button class="btn btn_primary" type="button" data-auth="register">Sign up</button>
`;

const GUEST_TABLET = `
  <button class="btn btn_primary" type="button" data-auth="register">Sign up</button>
`;

const GUEST_SIDEBAR = `
  <button class="btn btn_outline" type="button" data-auth="login">Log In</button>
  <button class="btn btn_primary" type="button" data-auth="register">Sign Up</button>
`;

const ACCOUNT_SIDEBAR = `
  <a class="btn btn_outline" href="/profile">Profile</a>
  <button class="btn btn_primary" type="button" data-auth-logout>Log out</button>
`;

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
        aria-label="Account menu"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="${MENU_ID}"
      >
        ${Avatar(user, 'auth_avatar')}
      </button>
      <div class="auth_menu_list" id="${MENU_ID}" hidden>
        <a class="auth_menu_item" href="/profile">Profile</a>
        <button class="auth_menu_item" type="button" data-auth-logout>
          Log out
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

function render(user: User | null): void {
  setRegion('.header_actions', user ? ProfileMenu(user) : GUEST_HEADER);
  setRegion('.tablet_actions', user ? '' : GUEST_TABLET);
  setRegion('.sidebar_actions', user ? ACCOUNT_SIDEBAR : GUEST_SIDEBAR);
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
  render(getCurrentUser());

  subscribe((user) => {
    render(user);
    enforceRouteAccess();
  });

  document.body.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    if (event.target.closest('[data-auth-logout]')) {
      void logout().catch((error: unknown) => {
        console.error(error);
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
