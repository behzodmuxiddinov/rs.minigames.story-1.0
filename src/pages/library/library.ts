import {
  FilterCardTypes,
  FilterCardTypesSkeleton,
  initFilterCardTypes,
  setActiveFilterType,
} from '@/components/filter/card-types/filter-card-types';
import {
  FilterCardRatings,
  initFilterCardRatings,
} from '@/components/filter/rating/filter-card-ratings';
import './library.scss';
import type { Game, GameRating } from '@/types';
import {
  LibraryGameCard,
  LibraryGameCardSkeleton,
} from '@/components/library-game-card/library-game-card';
import { Pagination } from '@/components/pagination/pagination';
import { openGameDetails } from '@/components/game-details-dialog/game-details-dialog';
import { fetchCategories } from '@/services/actions/categories';
import { fetchGames } from '@/services/actions/games.actions';
import { EmptyState } from '@/components/empty-state/empty-state';
import { showErrorBanner } from '@/components/error/error-banner';
import { DEFAULT_GAME_SORT, ERROR_MESSAGE, isGameRating } from '@/constants';

const PAGE_SIZE = 6;

function readPositiveNumber(
  query: URLSearchParams,
  key: string,
  fallback: number,
): number {
  const parsed = Number(query.get(key));

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function toSort(value: unknown): GameRating {
  return isGameRating(value) ? value : DEFAULT_GAME_SORT;
}

export function Library(): string {
  return `
        <div class="library_content">
            <div class="library_inner_content">
                <div class="library_header_content">
                    <h1>Game Library</h1>
                    <p>Browse our collection of casual mini-games</p>
                </div>
                <div class="games_section">
                    <div class="library_filter_content">
                        <div class="sort_by_type_section"></div>
                        <div class="sort_by_type_ratings">
                            ${FilterCardRatings(toSort(new URLSearchParams(globalThis.location.search).get('sort')))}
                        </div>
                    </div>
                    <div class="games_container">
                    </div>
                    <div class="games_pagination"></div>
                </div>
            </div>
        </div>
    `;
}

function renderGames(container: HTMLElement, games: Game[]): void {
  if (games.length === 0) {
    container.classList.add('no_games');
    container.innerHTML = EmptyState({
      title: 'No games found',
      message: 'Try another category or sorting option.',
    });
    return;
  }

  container.classList.remove('no_games');
  container.innerHTML = games
    .map((game: Game) => LibraryGameCard(game))
    .join('');
}

function renderGamesSkeleton(container: HTMLElement): void {
  container.classList.remove('no_games');
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = Array.from({ length: PAGE_SIZE }, () =>
    LibraryGameCardSkeleton(),
  ).join('');
}

export function initLibrary(): void {
  initFilterCardRatings();

  const categoryContainer = document.querySelector<HTMLElement>(
    '.sort_by_type_section',
  );
  const gamesContainer =
    document.querySelector<HTMLElement>('.games_container');
  const paginationContainer =
    document.querySelector<HTMLElement>('.games_pagination');
  const ratingSelect =
    document.querySelector<HTMLSelectElement>('#rating_select');
  if (!categoryContainer || !gamesContainer || !paginationContainer) return;

  const parameters = new URLSearchParams(globalThis.location.search);
  let activeType = parameters.get('category') ?? '';
  let selectedRating = toSort(parameters.get('sort'));
  let currentPage = readPositiveNumber(parameters, 'page', 1);
  const limit = readPositiveNumber(parameters, 'limit', PAGE_SIZE);

  const loadGames = async (): Promise<void> => {
    renderGamesSkeleton(gamesContainer);
    paginationContainer.innerHTML = '';

    try {
      const { data: games, meta } = await fetchGames({
        category: activeType,
        sort: selectedRating,
        page: currentPage,
        limit,
      });

      renderGames(gamesContainer, games);
      paginationContainer.innerHTML = Pagination({
        page: meta.page,
        totalPages: meta.totalPages,
      });
    } catch (error: unknown) {
      paginationContainer.innerHTML = '';
      showErrorBanner(
        gamesContainer,
        error instanceof Error ? error.message : ERROR_MESSAGE,
        loadGames,
      );
    } finally {
      gamesContainer.removeAttribute('aria-busy');
    }
  };

  const loadCategories = async (): Promise<void> => {
    categoryContainer.innerHTML = FilterCardTypesSkeleton();

    try {
      const categories = await fetchCategories();

      if (categories.length === 0) {
        categoryContainer.innerHTML = EmptyState({
          title: 'No categories',
          message: 'Categories are unavailable right now.',
        });
        return;
      }

      if (!categories.some((category) => category.slug === activeType)) {
        activeType =
          categories.find((category) => category.isDefault)?.slug ??
          categories[0].slug;
      }

      categoryContainer.innerHTML = FilterCardTypes(categories);
      setActiveFilterType(activeType);
      initFilterCardTypes((type) => {
        setActiveFilterType(type);
        activeType = type;
        currentPage = 1;
        parameters.set('category', type);
        globalThis.history.replaceState(
          {},
          '',
          `${globalThis.location.pathname}?${parameters}`,
        );
        loadGames();
      });
    } catch (error: unknown) {
      showErrorBanner(
        categoryContainer,
        error instanceof Error ? error.message : ERROR_MESSAGE,
        loadCategories,
      );
    }
  };

  loadCategories();
  loadGames();

  ratingSelect?.addEventListener('change', () => {
    selectedRating = toSort(ratingSelect.value);
    parameters.set('sort', selectedRating);
    globalThis.history.replaceState(
      {},
      '',
      `${globalThis.location.pathname}?${parameters}`,
    );
    currentPage = 1;
    loadGames();
  });

  gamesContainer.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const slug = event.target.attributes.getNamedItem('data-slug')?.value;
    if (event.target.closest('.library_game_card_btn') && slug) {
      openGameDetails(slug);
    }
  });

  paginationContainer.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>('.pagination_btn');
    if (!button || button.disabled) return;

    currentPage = Number(button.dataset.page);
    parameters.set('page', String(currentPage));
    globalThis.history.replaceState(
      {},
      '',
      `${globalThis.location.pathname}?${parameters}`,
    );
    loadGames();
  });
}
