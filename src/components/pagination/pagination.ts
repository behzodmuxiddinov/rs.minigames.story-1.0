import type { TPagination } from '@/types';
import chevronLeftIcon from '@/assets/icons/chevronLeft.svg?raw';
import chevronRightIcon from '@/assets/icons/chevronRight.svg?raw';
import './pagination.scss';
import { t } from '@/features/i18n';

export function Pagination({ page, totalPages }: TPagination): string {
  if (totalPages <= 1) return '';

  const isMobile = globalThis.matchMedia('(max-width: 767px)').matches;
  const count = Math.min(isMobile ? 3 : 5, totalPages);
  const start = Math.min(
    Math.max(1, page - Math.floor(count / 2)),
    totalPages - count + 1,
  );
  const pages = Array.from({ length: count }, (_, index) => start + index);

  return `
    <nav class="pagination">
      <button class="pagination_btn" type="button" aria-label="${t('pagination.previous')}" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}>
        ${chevronLeftIcon}
      </button>
      ${pages
        .map(
          (pageNumber) =>
            `<button class="pagination_btn ${pageNumber === page ? 'is_active' : ''}" type="button" data-page="${pageNumber}">${pageNumber}</button>`,
        )
        .join('')}
      <button class="pagination_btn" type="button" aria-label="${t('pagination.next')}" data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''}>
        ${chevronRightIcon}
      </button>
    </nav>
  `;
}
