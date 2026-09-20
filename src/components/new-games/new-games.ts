import './new-games.scss';
import { formatCompact } from '@/utils/formatNumber.utils';
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
            <img class="carousel_icon" src="${arrowLeftIcon}" alt="" />
          </button>
          <button class="carousel_btn" type="button" data-carousel="next" aria-label="Next game">
            <img class="carousel_icon" src="${arrowRightIcon}" alt="" />
          </button>
        </div>
      </div>
      <div class="new_games_track"></div>
    </section>
  `;
}

function gameCard(game: Game): string {
  return `
    <article class="game_card" data-slug="${game.slug}" tabindex="0">
      <img class="game_card_img" src="${game.cardImage}" alt="${game.name}" loading="lazy" />
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

  track.innerHTML = games.map((game) => gameCard(game)).join('');

  const cards = [...track.querySelectorAll<HTMLElement>('.game_card')];
  let activeIndex = 0;

  if (cards.length === 0) {
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  const setActive = (index: number): void => {
    activeIndex = Math.min(Math.max(index, 0), cards.length - 1);

    for (const [cardIndex, card] of cards.entries()) {
      card.classList.toggle('is_active', cardIndex === activeIndex);
    }

    cards[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });

    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === cards.length - 1;
  };

  previousButton.addEventListener('click', () => setActive(activeIndex - 1));
  nextButton.addEventListener('click', () => setActive(activeIndex + 1));

  track.addEventListener('click', (event) => {
    const card = (event.target as HTMLElement).closest('.game_card');
    if (card) {
      setActive(cards.indexOf(card as HTMLElement));
    }
  });

  for (const image of track.querySelectorAll<HTMLImageElement>(
    '.game_card_img',
  )) {
    image.addEventListener('error', () => image.classList.add('is_missing'));
  }

  setActive(0);
}
