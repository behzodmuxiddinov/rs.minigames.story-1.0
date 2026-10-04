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

export function initFilterCardTypes(
  activeType: string,
  onChange: (type: string) => void,
): void {
  const filterContainer =
    document.querySelector<HTMLDivElement>('.filter_card_types');
  if (!filterContainer) return;

  const setActive = (type: string): void => {
    const buttons = filterContainer.querySelectorAll<HTMLButtonElement>(
      '.filter_card_type_btn',
    );

    for (const button of buttons) {
      button.classList.toggle('is_active', button.dataset.filterType === type);
    }
  };

  setActive(activeType);

  filterContainer.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '.filter_card_type_btn',
    );
    const type = target?.dataset.filterType;
    if (!type || target.classList.contains('is_active')) return;

    setActive(type);
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
