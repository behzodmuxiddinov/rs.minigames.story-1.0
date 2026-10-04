import {
  FilterCardTypes,
  initFilterCardTypes,
} from '@/components/filter/card-types/filter-card-types';
import {
  FilterCardRatings,
  initFilterCardRatings,
} from '@/components/filter/rating/filter-card-ratings';
import './library.scss';
import type { Game, GameRating } from '@/types';
import { LibraryGameCard } from '@/components/library-game-card/library-game-card';
import { Pagination } from '@/components/pagination/pagination';
import { openGameDetails } from '@/components/game-details-dialog/game-details-dialog';
import { fetchCategories } from '@/services/actions/categories';
import { fetchGames } from '@/services/actions/games.actions';
import { EmptyState } from '@/components/empty-state/empty-state';
import { showErrorBanner } from '@/components/error/error-banner';
import { DEFAULT_GAME_SORT, ERROR_MESSAGE } from '@/constants';

const PAGE_SIZE = 6;

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
                            ${FilterCardRatings()}
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
    container.innerHTML = `
      <div class='no_games_content'>  
        <p class="library_message">No games found</p>
      </div>
    `;
    return;
  }

  container.classList.remove('no_games');
  container.innerHTML = games
    .map((game: Game) => LibraryGameCard(game))
    .join('');
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
  let selectedRating: GameRating = DEFAULT_GAME_SORT;
  let currentPage = 1;

  const loadGames = async (): Promise<void> => {
    try {
      const { data: games, meta } = await fetchGames({
        category: activeType,
        sort: selectedRating,
        page: currentPage,
        limit: PAGE_SIZE,
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
    }
  };

  const loadCategories = async (): Promise<void> => {
    try {
      const categories = await fetchCategories();

      if (categories.length === 0) {
        categoryContainer.innerHTML = EmptyState();
        return;
      }

      if (!categories.some((category) => category.slug === activeType)) {
        activeType =
          categories.find((category) => category.isDefault)?.slug ??
          categories[0].slug;
      }

      categoryContainer.innerHTML = FilterCardTypes(categories);
      initFilterCardTypes(activeType, (type) => {
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
    selectedRating = ratingSelect.value as GameRating;
    currentPage = 1;
    loadGames();
  });

  gamesContainer.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target.closest('.library_game_card_btn')) openGameDetails();
  });

  paginationContainer.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>('.pagination_btn');
    if (!button || button.disabled) return;

    currentPage = Number(button.dataset.page);
    loadGames();
  });
}
