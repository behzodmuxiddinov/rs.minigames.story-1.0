import './auth-dialog.scss';
import { LoginForm, RegisterForm } from './auth-form';
import { eyeIcon, eyeOffIcon } from './icons';
import {
  type FieldErrors,
  validateLogin,
  validateRegister,
} from './validation';

const DIALOG_ID = 'auth_dialog';

type AuthMode = 'login' | 'register';

export function AuthDialog(): string {
  return `
    <dialog
      class="auth_dialog"
      id="${DIALOG_ID}"
      aria-labelledby="auth_dialog_title"
    >
      <div class="auth_dialog_inner">
        <div class="auth_tabs">
          <button class="auth_tab" type="button" data-auth-tab="login">
            Login
          </button>
          <button class="auth_tab" type="button" data-auth-tab="register">
            Register
          </button>
        </div>
        <div class="auth_dialog_body"></div>
      </div>
    </dialog>
  `;
}

function isAuthMode(value: string | undefined): value is AuthMode {
  return value === 'login' || value === 'register';
}

function setFieldError(input: HTMLInputElement, message: string): void {
  const errorNode = input
    .closest('.auth_field')
    ?.querySelector<HTMLElement>('.auth_error');

  input.classList.toggle('is_invalid', Boolean(message));
  input.setAttribute('aria-invalid', String(Boolean(message)));

  if (errorNode) {
    errorNode.textContent = message;
  }
}

export function initAuthDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>(`#${DIALOG_ID}`);
  const dialogBody = dialog?.querySelector<HTMLElement>('.auth_dialog_body');

  if (!dialog || !dialogBody) {
    return;
  }

  const tabs = dialog.querySelectorAll<HTMLButtonElement>('[data-auth-tab]');
  let mode: AuthMode = 'login';

  const validate = (form: HTMLFormElement): FieldErrors =>
    mode === 'login'
      ? validateLogin(new FormData(form))
      : validateRegister(new FormData(form));

  const setMode = (next: AuthMode): void => {
    mode = next;
    dialogBody.innerHTML = mode === 'login' ? LoginForm() : RegisterForm();

    for (const tab of tabs) {
      const isActive = tab.dataset.authTab === mode;
      tab.classList.toggle('is_active', isActive);
      tab.setAttribute('aria-pressed', String(isActive));
    }
  };

  const open = (next: AuthMode): void => {
    setMode(next);
    dialog.showModal();
    dialog.querySelector<HTMLInputElement>('.auth_input')?.focus();
    document.body.classList.add('is_locked');
  };

  const togglePassword = (toggle: HTMLButtonElement): void => {
    const input = toggle
      .closest('.auth_control')
      ?.querySelector<HTMLInputElement>('.auth_input');

    if (!input) {
      return;
    }

    const willShow = input.type === 'password';
    input.type = willShow ? 'text' : 'password';
    toggle.innerHTML = willShow ? eyeOffIcon : eyeIcon;
    toggle.setAttribute('aria-pressed', String(willShow));
    toggle.setAttribute(
      'aria-label',
      willShow ? 'Hide password' : 'Show password',
    );
  };

  document.body.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const trigger = event.target.closest<HTMLElement>('[data-auth]');

    if (trigger && isAuthMode(trigger.dataset.auth)) {
      open(trigger.dataset.auth);
    }
  });

  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const tab = event.target.closest<HTMLButtonElement>('[data-auth-tab]');

    if (tab && isAuthMode(tab.dataset.authTab)) {
      setMode(tab.dataset.authTab);
      return;
    }

    const switcher =
      event.target.closest<HTMLButtonElement>('[data-auth-switch]');

    if (switcher && isAuthMode(switcher.dataset.authSwitch)) {
      setMode(switcher.dataset.authSwitch);
      return;
    }

    const toggle =
      event.target.closest<HTMLButtonElement>('[data-auth-toggle]');

    if (toggle) {
      togglePassword(toggle);
      return;
    }

    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener('focusout', (event) => {
    const input = event.target;

    if (
      !(input instanceof HTMLInputElement) ||
      !input.classList.contains('auth_input') ||
      !input.form
    ) {
      return;
    }

    setFieldError(input, validate(input.form)[input.name] ?? '');
  });

  dialog.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    const errors = validate(form);

    for (const input of form.querySelectorAll<HTMLInputElement>(
      '.auth_input',
    )) {
      setFieldError(input, errors[input.name] ?? '');
    }

    if (Object.keys(errors).length > 0) {
      form.querySelector<HTMLInputElement>('.auth_input.is_invalid')?.focus();
      return;
    }

    dialog.close();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('is_locked');
  });
}
