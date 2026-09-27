import { DEFAULT_GAME_SORT, GAME_RATINGS } from '@/constants';
import './filter-card-ratings.scss';

export const FilterCardRatings = (): string => {
  return `
    <div class="filter_card_rating">
      <label for="rating_select" class="filter_card_rating_label">Sort by:</label>
      <select id="rating_select" class="filter_card_rating_select">
        ${GAME_RATINGS.map(
          ({ value, label }) =>
            `<option value="${value}" ${value === DEFAULT_GAME_SORT ? 'selected' : ''}>${label}</option>`,
        ).join('')}
      </select>
    </div>
  `;
};

export const initFilterCardRatings = (): void => {
  const container = document.querySelector<HTMLElement>('.filter_card_rating');
  const select = document.querySelector<HTMLSelectElement>('#rating_select');

  if (!container || !select) return;

  container.addEventListener('click', (event) => {
    if (select.contains(event.target as Node)) return;

    select.focus();
    if ('showPicker' in HTMLSelectElement.prototype) {
      select.showPicker();
    }
  });
};
