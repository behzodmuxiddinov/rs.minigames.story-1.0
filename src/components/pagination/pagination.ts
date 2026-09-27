import type { TPagination } from '@/types';
import chevronLeftIcon from '@/assets/icons/chevronLeft.svg';
import chevronRightIcon from '@/assets/icons/chevronRight.svg';
import './pagination.scss';

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
      <button class="pagination_btn" type="button" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}>
        <img src="${chevronLeftIcon}" alt="Previous page" />
      </button>
      ${pages
        .map(
          (pageNumber) =>
            `<button class="pagination_btn ${pageNumber === page ? 'is_active' : ''}" type="button" data-page="${pageNumber}">${pageNumber}</button>`,
        )
        .join('')}
      <button class="pagination_btn" type="button" data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''}>
        <img src="${chevronRightIcon}" alt="Next page" />
      </button>
    </nav>
  `;
}
