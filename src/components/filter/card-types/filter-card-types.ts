import './filter-card-types.scss';
export function FilterCardTypes(types: string[]): string {
  if (types.length === 0) return '';
  return `
        <div class="filter_card_types">
            ${types.map((type) => `<button class="filter_card_type_btn" data-filter-type="${type}">${type}</button>`).join('')}
        </div>
    `;
}

export function initFilterCardTypes(): void {
  const filterContainer =
    document.querySelector<HTMLDivElement>('.filter_card_types');
  if (!filterContainer) return;
  const filterItems = document.querySelectorAll('.filter_card_type_btn');
  if (filterItems.length === 0) return;
  let active_filter = filterItems[0];
  active_filter.classList.add('is_active');
  filterContainer?.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '.filter_card_type_btn',
    );
    if (target) {
      active_filter.classList.remove('is_active');
      target.classList.add('is_active');
      active_filter = target;
    }
  });
}
