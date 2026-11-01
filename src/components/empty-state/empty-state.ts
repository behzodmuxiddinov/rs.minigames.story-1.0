import './empty-state.scss';
import emptyIcon from '@/assets/icons/alertCircle.svg';
import { t } from '@/features/i18n';

export interface EmptyStateProperties {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = t('common.emptyTitle'),
  message = t('common.emptyMessage'),
}: EmptyStateProperties = {}): string {
  return `
    <div class="empty_state" role="status">
      <img class="empty_state_icon" src="${emptyIcon}" alt="" />
      <p class="empty_state_title">${title}</p>
      <p class="empty_state_message">${message}</p>
    </div>
  `;
}
