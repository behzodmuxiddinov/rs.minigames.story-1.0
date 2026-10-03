import './new-games.scss';
import { formatCompact } from '@/utils/format-number.utilities';
import arrowLeftIcon from '@/assets/icons/arrow_back.svg';
import arrowRightIcon from '@/assets/icons/arrow_forward.svg';
import starIcon from '@/assets/icons/star.svg';
import heartIcon from '@/assets/icons/heart.svg';
import type { Game } from '@/services/api';
import { fetchGames } from '@/services/actions/games.actions';
import { showErrorBanner } from '@/components/error/error-banner';

const AUTO_SLIDE_DELAY = 4000;
const ERROR_MESSAGE =
  'We couldn’t load new games due to a network or server error. Please try again.';

export function NewGames(): string {
  return `
    <section class="new_games" aria-label="New games">
      <div class="new_games_header">
        <div class="section_stick"></div>
        <p class="section_title">New Games</p>
        <div class="new_games_nav">
          <button class="carousel_btn" type="button" data-carousel="prev" aria-label="Previous game">
            <img class="carousel_icon" src="${arrowLeftIcon}" alt="prev_slider" />
          </button>
          <button class="carousel_btn" type="button" data-carousel="next" aria-label="Next game">
            <img class="carousel_icon" src="${arrowRightIcon}" alt="next_slider" />
          </button>
        </div>
      </div>
      <div class="new_games_track"></div>
    </section>
  `;
}

function gameCard(game: Game, index: number, classes = ''): string {
  return `
    <article class="game_card ${classes}" data-slug="${game.slug}" data-index="${index}" tabindex="0">
      <img class="game_card_img" src="${game.cardImage}" alt="${game.name}" loading="lazy" />
      <div class="game_card_shadow"></div>
      <div class="game_card_info">
        <p class="game_card_name">${game.name}</p>
        <div class="game_card_meta">
          <span class="game_card_rating">
            <img class="meta_icon" src="${starIcon}" alt="Rating" />${game.rating}
          </span>
          <span class="game_card_likes">
            <img class="meta_icon" src="${heartIcon}" alt="Likes" />${formatCompact(game.likesCount)}
          </span>
        </div>
      </div>
    </article>
  `;
}

export async function initNewGames(): Promise<void> {
  const track = document.querySelector<HTMLElement>('.new_games_track');
  const previousButton = document.querySelector<HTMLButtonElement>(
    '[data-carousel="prev"]',
  );
  const nextButton = document.querySelector<HTMLButtonElement>(
    '[data-carousel="next"]',
  );

  if (!track || !previousButton || !nextButton) {
    return;
  }

  const renderCarousel = async (): Promise<void> => {
    const games = await fetchGames();
    track.innerHTML = '';
    setupCarousel(games, track, previousButton, nextButton);
  };

  try {
    await renderCarousel();
  } catch(error: unknown) {
    previousButton.disabled = true;
    nextButton.disabled = true;
    showErrorBanner(track, error instanceof Error ? error.message : ERROR_MESSAGE, renderCarousel);
  }
}

function setupCarousel(
  games: Game[],
  track: HTMLElement,
  previousButton: HTMLButtonElement,
  nextButton: HTMLButtonElement,
): void {
  const getMaxCount = (): number => (window.innerWidth >= 1024 ? 5 : 3);

  let maxCount = getMaxCount();
  let activeIndex = 0;
  let intervalId: number | undefined;

  const wrap = (index: number): number =>
    ((index % games.length) + games.length) % games.length;

  function render(): void {
    const visibleCount = Math.min(maxCount, games.length);
    const offsets = Array.from(
      { length: visibleCount },
      (_, position) => position - Math.floor((visibleCount - 1) / 2),
    );

    track.innerHTML = offsets
      .map((offset) => {
        const gameIndex = wrap(activeIndex + offset);
        const isActive = offset === 0;
        const isHalfActive = Math.abs(offset) === 1 && visibleCount === 5;
        let classes = 'non_active';
        if (isActive) classes = 'is_active';
        else if (isHalfActive) classes = 'half_active';

        return gameCard(games[gameIndex], gameIndex, classes);
      })
      .join('');
  }

  const setActive = (index: number): void => {
    activeIndex = wrap(index);
    render();
  };

  const stopAutoSlide = (): void => {
    globalThis.clearInterval(intervalId);
    intervalId = undefined;
  };

  const startAutoSlide = (): void => {
    stopAutoSlide();
    if (games.length < 2) return;

    intervalId = globalThis.setInterval(() => {
      if (!track.isConnected) {
        stopAutoSlide();
        return;
      }
      setActive(activeIndex + 1);
    }, AUTO_SLIDE_DELAY);
  };

  const slideTo = (index: number): void => {
    setActive(index);
    startAutoSlide();
  };

  if (games.length === 0) {
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  previousButton.disabled = games.length < 2;
  nextButton.disabled = games.length < 2;

  previousButton.addEventListener('click', () => slideTo(activeIndex - 1));
  nextButton.addEventListener('click', () => slideTo(activeIndex + 1));

  track.addEventListener('click', (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      '.game_card',
    );
    if (card) {
      slideTo(Number(card.dataset.index));
    }
  });

  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  track.addEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('game_card_img')) {
        target.classList.add('is_missing');
      }
    },
    true,
  );

  window.addEventListener('resize', () => {
    const nextMaxCount = getMaxCount();
    if (nextMaxCount !== maxCount) {
      maxCount = nextMaxCount;
      render();
    }
  });

  render();
  startAutoSlide();
}
