import './profile.scss';
import { Avatar } from '@/features/auth/auth-actions';
import { getCurrentUser } from '@/services/auth-store';
import { escapeHtml } from '@/utils/escape-html.utilities';
import { t } from '@/features/i18n';

export function Profile(): string {
  const user = getCurrentUser();

  if (!user) {
    return '';
  }

  return `
    <section class="profile_page">
      <h1>${t('profile.title')}</h1>
      <div class="profile_card">
        ${Avatar(user, 'profile_avatar')}
        <p class="profile_name">${escapeHtml(user.displayName ?? t('profile.account'))}</p>
      </div>
    </section>
  `;
}
