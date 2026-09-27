import { eyeIcon, googleIcon, lockIcon, mailIcon, userIcon } from './icons';
import { PASSWORD_MIN_LENGTH } from './validation';

export function LoginForm(): string {
  return `
    <h2 class="auth_title" id="auth_dialog_title">Welcome Back!</h2>
    <p class="auth_subtitle">Sign in to resume your games and progress.</p>

    <form class="auth_form" novalidate>
      <div class="auth_field">
        <label class="auth_label" for="auth_email">Email Address</label>
        <div class="auth_control">
          <span class="auth_control_icon">${mailIcon}</span>
          <input
            class="auth_input"
            id="auth_email"
            name="email"
            type="email"
            placeholder="e.g. alex@minigames.com"
            autocomplete="email"
            aria-describedby="auth_email_error"
          />
        </div>
        <p class="auth_error" id="auth_email_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_password">Password</label>
        <div class="auth_control">
          <span class="auth_control_icon">${lockIcon}</span>
          <input
            class="auth_input"
            id="auth_password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            aria-describedby="auth_password_error"
          />
          <button
            class="auth_toggle"
            type="button"
            data-auth-toggle
            aria-label="Show password"
            aria-pressed="false"
          >${eyeIcon}</button>
        </div>
        <p class="auth_error" id="auth_password_error" role="alert"></p>
      </div>

      <a class="auth_forgot" href="#/forgot-password">Forgot Password?</a>

      <button class="btn btn_primary auth_submit" type="submit">Login</button>
    </form>

    <div class="auth_divider"><span>OR</span></div>

    <button class="btn auth_google" type="button">
      ${googleIcon}
      <span>Continue with Google</span>
    </button>

    <p class="auth_switch">
      Don't have an account?
      <button class="auth_switch_btn" type="button" data-auth-switch="register">
        Register
      </button>
    </p>
  `;
}

export function RegisterForm(): string {
  return `
    <h2 class="auth_title" id="auth_dialog_title">Create Account</h2>
    <p class="auth_subtitle">Join MiniGames to track your score &amp; streak.</p>

    <form class="auth_form" novalidate>
      <div class="auth_field">
        <label class="auth_label" for="auth_username">Username</label>
        <div class="auth_control">
          <span class="auth_control_icon">${userIcon}</span>
          <input
            class="auth_input"
            id="auth_username"
            name="username"
            type="text"
            placeholder="e.g. CozyGamer_99"
            autocomplete="username"
            aria-describedby="auth_username_error"
          />
        </div>
        <p class="auth_error" id="auth_username_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_email">Email Address</label>
        <div class="auth_control">
          <span class="auth_control_icon">${mailIcon}</span>
          <input
            class="auth_input"
            id="auth_email"
            name="email"
            type="email"
            placeholder="your.email@domain.com"
            autocomplete="email"
            aria-describedby="auth_email_error"
          />
        </div>
        <p class="auth_error" id="auth_email_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_password">Password</label>
        <div class="auth_control">
          <span class="auth_control_icon">${lockIcon}</span>
          <input
            class="auth_input"
            id="auth_password"
            name="password"
            type="password"
            placeholder="Min. ${PASSWORD_MIN_LENGTH} characters"
            autocomplete="new-password"
            aria-describedby="auth_password_error"
          />
        </div>
        <p class="auth_error" id="auth_password_error" role="alert"></p>
      </div>

      <div class="auth_field">
        <label class="auth_label" for="auth_confirm_password">
          Confirm Password
        </label>
        <div class="auth_control">
          <span class="auth_control_icon">${lockIcon}</span>
          <input
            class="auth_input"
            id="auth_confirm_password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autocomplete="new-password"
            aria-describedby="auth_confirm_password_error"
          />
        </div>
        <p class="auth_error" id="auth_confirm_password_error" role="alert"></p>
      </div>

      <button class="btn btn_primary auth_submit" type="submit">
        Create Account
      </button>
    </form>

    <div class="auth_divider"><span>OR</span></div>

    <button class="btn auth_google" type="button">
      ${googleIcon}
      <span>Sign up with Google</span>
    </button>

    <p class="auth_switch">
      Already have an account?
      <button class="auth_switch_btn" type="button" data-auth-switch="login">
        Login
      </button>
    </p>
  `;
}
