import './profile.scss';
import { Avatar } from '@/features/auth/auth-actions';
import { getCurrentUser } from '@/services/auth-store';
import { escapeHtml } from '@/utils/escape-html.utilities';

export function Profile(): string {
  const user = getCurrentUser();

  if (!user) {
    return '';
  }

  return `
    <section class="profile_page">
      <h1>Profile</h1>
      <div class="profile_card">
        ${Avatar(user, 'profile_avatar')}
        <p class="profile_name">${escapeHtml(user.displayName ?? 'Account')}</p>
      </div>
    </section>
  `;
}
