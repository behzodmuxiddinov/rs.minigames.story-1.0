export const USERNAME_MIN_LENGTH = 3;
export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Record<string, string>;

export function validateUsername(value: string): string | undefined {
  const username = value.trim();

  if (!username) {
    return 'Username is required.';
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters.`;
  }

  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const email = value.trim();

  if (!email) {
    return 'Email address is required.';
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Enter a valid email address.';
  }

  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) {
    return 'Password is required.';
  }

  if (value.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  return undefined;
}

export function validateConfirmPassword(
  value: string,
  password: string,
): string | undefined {
  if (!value) {
    return 'Please repeat your password.';
  }

  if (value !== password) {
    return 'Passwords do not match.';
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
