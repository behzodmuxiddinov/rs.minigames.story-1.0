import { eyeIcon, googleIcon, lockIcon, mailIcon, userIcon } from './icons';
import { PASSWORD_MIN_LENGTH } from './validation';
import { t } from '@/features/i18n';

export function LoginForm(): string {
  return `
    <h2 class="auth_title" id="auth_dialog_title">${t('auth.loginTitle')}</h2>
    <p class="auth_subtitle">${t('auth.loginSubtitle')}</p>

    <form class="auth_form" novalidate>
      <div class="auth_field">
        <label class="auth_label" for="auth_email">${t('auth.email')}</label>
        <div class="auth_control">
          <span class="auth_control_icon">${mailIcon}</span>
          <input
            class="auth_input"
            id="auth_email"
            name="email"
            type="email"
            placeholder="${t('auth.loginEmailPlaceholder')}"
            autocomplete="email"
            aria-describedby="auth_email_error"
          />
        </div>
        <p class="auth_error" id="auth_email_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_password">${t('auth.password')}</label>
        <div class="auth_control">
          <span class="auth_control_icon">${lockIcon}</span>
          <input
            class="auth_input"
            id="auth_password"
            name="password"
            type="password"
            placeholder="${t('auth.loginPasswordPlaceholder')}"
            autocomplete="current-password"
            aria-describedby="auth_password_error"
          />
          <button
            class="auth_toggle"
            type="button"
            data-auth-toggle
            aria-label="${t('auth.showPassword')}"
            aria-pressed="false"
          >${eyeIcon}</button>
        </div>
        <p class="auth_error" id="auth_password_error" role="alert"></p>
      </div>

      <a class="auth_forgot" href="#/forgot-password">${t('auth.forgot')}</a>

      <button class="btn btn_primary auth_submit" type="submit">${t('auth.login')}</button>
    </form>

    <div class="auth_divider"><span>${t('auth.or')}</span></div>

    <button class="btn auth_google" type="button">
      ${googleIcon}
      <span>${t('auth.continueWithGoogle')}</span>
    </button>

    <p class="auth_switch">
      ${t('auth.noAccount')}
      <button class="auth_switch_btn" type="button" data-auth-switch="register">
        ${t('auth.register')}
      </button>
    </p>
  `;
}

export function RegisterForm(): string {
  return `
    <h2 class="auth_title" id="auth_dialog_title">${t('auth.registerTitle')}</h2>
    <p class="auth_subtitle">${t('auth.registerSubtitle')}</p>

    <form class="auth_form" novalidate>
      <div class="auth_field">
        <label class="auth_label" for="auth_username">${t('auth.username')}</label>
        <div class="auth_control">
          <span class="auth_control_icon">${userIcon}</span>
          <input
            class="auth_input"
            id="auth_username"
            name="username"
            type="text"
            placeholder="${t('auth.usernamePlaceholder')}"
            autocomplete="username"
            aria-describedby="auth_username_error"
          />
        </div>
        <p class="auth_error" id="auth_username_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_email">${t('auth.email')}</label>
        <div class="auth_control">
          <span class="auth_control_icon">${mailIcon}</span>
          <input
            class="auth_input"
            id="auth_email"
            name="email"
            type="email"
            placeholder="${t('auth.registerEmailPlaceholder')}"
            autocomplete="email"
            aria-describedby="auth_email_error"
          />
        </div>
        <p class="auth_error" id="auth_email_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_password">${t('auth.password')}</label>
        <div class="auth_control">
          <span class="auth_control_icon">${lockIcon}</span>
          <input
            class="auth_input"
            id="auth_password"
            name="password"
            type="password"
            placeholder="${t('auth.registerPasswordPlaceholder', { count: PASSWORD_MIN_LENGTH })}"
            autocomplete="new-password"
            aria-describedby="auth_password_error"
          />
          <button
            class="auth_toggle"
            type="button"
            data-auth-toggle
            aria-label="${t('auth.showPassword')}"
            aria-pressed="false"
          >${eyeIcon}</button>
        </div>
        <p class="auth_error" id="auth_password_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_confirm_password">
          ${t('auth.confirmPassword')}
        </label>
        <div class="auth_control">
          <span class="auth_control_icon">${lockIcon}</span>
          <input
            class="auth_input"
            id="auth_confirm_password"
            name="confirmPassword"
            type="password"
            placeholder="${t('auth.confirmPasswordPlaceholder')}"
            autocomplete="new-password"
            aria-describedby="auth_confirm_password_error"
          />
          <button
            class="auth_toggle"
            type="button"
            data-auth-toggle
            aria-label="${t('auth.showConfirmPassword')}"
            aria-pressed="false"
          >${eyeIcon}</button>
        </div>
        <p class="auth_error" id="auth_confirm_password_error" role="alert"></p>
      </div>

      <button class="btn btn_primary auth_submit" type="submit">
        ${t('auth.createAccount')}
      </button>
    </form>

    <div class="auth_divider"><span>${t('auth.or')}</span></div>

    <button class="btn auth_google" type="button">
      ${googleIcon}
      <span>${t('auth.signUpWithGoogle')}</span>
    </button>

    <p class="auth_switch">
      ${t('auth.haveAccount')}
      <button class="auth_switch_btn" type="button" data-auth-switch="login">
        ${t('auth.login')}
      </button>
    </p>
  `;
}
