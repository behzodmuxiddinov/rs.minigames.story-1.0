import './new-games.scss';
import { formatCompact } from '@/utils/format-number.utilities';
import arrowLeftIcon from '@/assets/icons/arrow_back.svg';
import arrowRightIcon from '@/assets/icons/arrow_forward.svg';
import starIcon from '@/assets/icons/star.svg';
import heartIcon from '@/assets/icons/heart.svg';

type Game = {
  slug: string;
  name: string;
  rating: number;
  likesCount: number;
  cardImage: string;
  featured: boolean;
};

const DB_URL = '/db.json';

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

async function fetchFeaturedGames(): Promise<Game[]> {
  const response = await fetch(DB_URL);

  if (!response.ok) {
    throw new Error(`Failed to load games: ${response.status}`);
  }

  const { data }: { data: Game[] } = await response.json();

  return data.filter((game) => game.featured);
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

  let games: Game[];

  try {
    games = await fetchFeaturedGames();
  } catch {
    track.innerHTML = `<p class="new_games_message">Games are taking a break. Please try again later.</p>`;
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  const getMaxCount = (): number => (window.innerWidth >= 1024 ? 5 : 3);

  let maxCount = getMaxCount();
  let activeIndex = 0;

  const wrap = (index: number): number =>
    ((index % games.length) + games.length) % games.length;

  function render(): void {
    if (!track) return;

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

  if (games.length === 0) {
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  previousButton.disabled = games.length < 2;
  nextButton.disabled = games.length < 2;

  previousButton.addEventListener('click', () => setActive(activeIndex - 1));
  nextButton.addEventListener('click', () => setActive(activeIndex + 1));

  track.addEventListener('click', (event) => {
    const card = (event.target as HTMLElement).closest<HTMLElement>(
      '.game_card',
    );
    if (card) {
      setActive(Number(card.dataset.index));
    }
  });

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
}
