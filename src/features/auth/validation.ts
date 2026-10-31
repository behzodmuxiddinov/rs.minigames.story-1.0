import { t } from '@/features/i18n';

export const USERNAME_MIN_LENGTH = 3;
export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Record<string, string>;

export function validateUsername(value: string): string | undefined {
  const username = value.trim();

  if (!username) {
    return t('validation.usernameRequired');
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    return t('validation.usernameMin', { count: USERNAME_MIN_LENGTH });
  }

  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const email = value.trim();

  if (!email) {
    return t('validation.emailRequired');
  }

  if (!EMAIL_PATTERN.test(email)) {
    return t('validation.emailInvalid');
  }

  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return t('validation.passwordRequired');
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return t('validation.passwordMin', { count: PASSWORD_MIN_LENGTH });
  }

  return undefined;
}

export function validateConfirmPassword(
  value: string,
  password: string,
): string | undefined {
  if (!value) {
    return t('validation.confirmRequired');
  }

  if (value !== password) {
    return t('validation.confirmMismatch');
  }

  return undefined;
}

function collect(entries: [string, string | undefined][]): FieldErrors {
  const errors: FieldErrors = {};

  for (const [field, message] of entries) {
    if (message) {
      errors[field] = message;
    }
  }

  return errors;
}

export function validateLogin(values: FormData): FieldErrors {
  const email = String(values.get('email') ?? '');
  const password = String(values.get('password') ?? '');

  return collect([
    ['email', validateEmail(email)],
    ['password', validatePassword(password)],
  ]);
}

export function validateRegister(values: FormData): FieldErrors {
  const username = String(values.get('username') ?? '');
  const email = String(values.get('email') ?? '');
  const password = String(values.get('password') ?? '');
  const confirmPassword = String(values.get('confirmPassword') ?? '');

  return collect([
    ['username', validateUsername(username)],
    ['email', validateEmail(email)],
    ['password', validatePassword(password)],
    ['confirmPassword', validateConfirmPassword(confirmPassword, password)],
  ]);
}
