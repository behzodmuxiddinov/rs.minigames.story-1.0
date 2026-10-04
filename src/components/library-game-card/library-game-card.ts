import './library-game-card.scss';
import { formatCompact } from '@/utils/format-number.utilities';
import starIcon from '@/assets/icons/star.svg';
import heartIcon from '@/assets/icons/heart.svg';
import type { Game } from '@/types';
const FREE_PRICE = 'Free';

export function LibraryGameCard(game: Game): string {
  const priceClass = game.price === FREE_PRICE ? 'is_free' : '';

  return `
    <article class="library_game_card" data-slug="${game.slug}">
      <div class="library_game_card_media">
        <img class="library_game_card_img" src="${game.cardImage}" alt="${game.name}" loading="lazy" />
      </div>
      <div class="library_game_card_body">
        <div class="library_game_card_header">
          <div class="game_name_category">
            <h3 class="library_game_card_name">${game.name}</h3>
            <span class="library_game_card_category">${game.category}</span>
          </div>
          <span class="library_game_card_price ${priceClass}">${game.price}</span>
        </div>
        <p class="library_game_card_description">${game.shortDescription}</p>
        <div class="library_game_card_footer">
          <div class="library_game_card_meta">
            <span class="library_game_card_stat">
              <img class="library_game_card_icon" src="${starIcon}" alt="Rating" />${game.rating}
            </span>
            <span class="library_game_card_stat">
              <img class="library_game_card_icon" src="${heartIcon}" alt="Likes" />${formatCompact(game.likesCount)}
            </span>
          </div>
          <button class="library_game_card_btn" type="button" data-slug="${game.slug}">Details</button>
        </div>
      </div>
    </article>
  `;
}

export function LibraryGameCardSkeleton(): string {
  return `
    <article class="library_game_card is_skeleton" aria-hidden="true">
      <div class="library_game_card_media skeleton"></div>
      <div class="library_game_card_body">
        <div class="skeleton skeleton_line is_title"></div>
        <div class="skeleton skeleton_line"></div>
        <div class="skeleton skeleton_line is_short"></div>
      </div>
    </article>
  `;
}
