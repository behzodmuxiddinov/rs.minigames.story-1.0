import './empty-state.scss';
import emptyIcon from '@/assets/icons/alertCircle.svg';

const DEFAULT_TITLE = 'Nothing here yet';
const DEFAULT_MESSAGE = 'There is nothing to show right now. Try again later.';

export interface EmptyStateProperties {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
}: EmptyStateProperties = {}): string {
  return `
    <div class="empty_state" role="status">
      <img class="empty_state_icon" src="${emptyIcon}" alt="" />
      <p class="empty_state_title">${title}</p>
      <p class="empty_state_message">${message}</p>
    </div>
  `;
}
