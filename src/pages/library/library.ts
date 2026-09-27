import {
  FilterCardTypes,
  initFilterCardTypes,
} from '@/components/filter/card-types/filter-card-types';
import {
  FilterCardRatings,
  initFilterCardRatings,
} from '@/components/filter/rating/filter-card-ratings';
import { GAME_FILTERS } from '@/constants';
import './library.scss';
import database from '../../../public/db.json';
import type { Game, GameRating } from '@/types';
import { LibraryGameCard } from '@/components/library-game-card/library-game-card';
import { Pagination } from '@/components/pagination/pagination';
import { openGameDetails } from '@/components/game-details-dialog/game-details-dialog';
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
                        <div class="sort_by_type_section">
                            ${FilterCardTypes(GAME_FILTERS)}
                        </div>
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

function renderGames(games: Game[]): void {
  const gamesContainer = document.querySelector('.games_container');
  if (!gamesContainer) return;
  if (games.length === 0) {
    gamesContainer.classList.add('no_games');
    gamesContainer.innerHTML = `
      <div class='no_games_content'>  
        <p class="library_message">No games found</p>
      </div>
    `;
    return;
  }
  gamesContainer.classList.remove('no_games');
  gamesContainer.innerHTML = games
    .map((game: Game) => LibraryGameCard(game))
    .join('');
}

function renderPagination(page: number, totalPages: number): void {
  const paginationContainer = document.querySelector('.games_pagination');
  if (!paginationContainer) return;
  paginationContainer.innerHTML = Pagination({ page, totalPages });
}

export function initLibrary(): void {
  initFilterCardTypes();
  initFilterCardRatings();
  const games = database.data as Game[];
  const filterTypeBtns =
    document.querySelector<HTMLDivElement>('.filter_card_types');
  const ratingSelect = document.querySelector(
    '#rating_select',
  ) as HTMLSelectElement;
  const paginationContainer = document.querySelector('.games_pagination');
  const gamesContainer = document.querySelector('.games_container');
  let activeType = 'all games';
  let selectedRating: GameRating = 'name-asc';
  const PAGE_SIZE = 6;
  let currentPage = 1;

  function applyFilters(): void {
    let filteredGames = games.filter((game) => {
      if (activeType === 'all games') {
        return true;
      }

      return game.category === activeType;
    });
    filteredGames = [...filteredGames];

    switch (selectedRating) {
      case 'name-asc': {
        filteredGames.sort((a, b) => a.name.localeCompare(b.name));
        break;
      }
      case 'name-desc': {
        filteredGames.sort((a, b) => b.name.localeCompare(a.name));
        break;
      }

      case 'rating-asc': {
        filteredGames.sort((a, b) => a.rating - b.rating);
        break;
      }

      case 'rating-desc': {
        filteredGames.sort((a, b) => b.rating - a.rating);
        break;
      }
    }
    const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const paginatedGames = filteredGames.slice(startIndex, endIndex);

    renderGames(paginatedGames);
    renderPagination(currentPage, totalPages);
  }
  applyFilters();

  filterTypeBtns?.addEventListener('click', (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;

    activeType = event.target.dataset.filterType ?? 'all games';
    currentPage = 1;
    applyFilters();
  });

  ratingSelect?.addEventListener('change', () => {
    selectedRating = ratingSelect.value as GameRating;
    currentPage = 1;
    applyFilters();
  });
  gamesContainer?.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>(
      '.library_game_card_btn',
    );
    const game = games.find((item) => item.slug === button?.dataset.slug);
    if (game) openGameDetails(game);
  });
  paginationContainer?.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest<HTMLButtonElement>('.pagination_btn');
    if (!button || button.disabled) return;

    currentPage = Number(button.dataset.page);

    applyFilters();
  });
}
