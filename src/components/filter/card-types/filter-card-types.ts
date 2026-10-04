import type { GameCategories } from '@/services/api';
import './filter-card-types.scss';

export function FilterCardTypes(types: GameCategories[]): string {
  if (types.length === 0) return '';

  return `
        <div class="filter_card_types">
            ${types
              .map(
                (type) =>
                  `<button class="filter_card_type_btn" type="button" data-filter-type="${type.slug}">${type.label}</button>`,
              )
              .join('')}
        </div>
    `;
}

export function setActiveFilterType(type: string): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    '.filter_card_types .filter_card_type_btn',
  );

  for (const button of buttons) {
    button.classList.toggle('is_active', button.dataset.filterType === type);
  }
}

export function initFilterCardTypes(onChange: (type: string) => void): void {
  const filterContainer =
    document.querySelector<HTMLDivElement>('.filter_card_types');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;

    const target = event.target.closest<HTMLButtonElement>(
      '.filter_card_type_btn',
    );
    const type = target?.dataset.filterType;
    if (!type || target.classList.contains('is_active')) return;

    onChange(type);
  });
}

export function FilterCardTypesSkeleton(count = 5): string {
  return `
        <div class="filter_card_types" aria-hidden="true">
            ${Array.from(
              { length: count },
              () => '<div class="skeleton filter_card_type_skeleton"></div>',
            ).join('')}
        </div>
    `;
}
