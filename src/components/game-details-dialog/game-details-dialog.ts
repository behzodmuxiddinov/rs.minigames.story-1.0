import './game-details-dialog.scss';
import { formatCompact, formatNumber } from '@/utils/format-number.utilities';
import starIcon from '@/assets/icons/star.svg';
import heartIcon from '@/assets/icons/heart.svg';
import heartOutlineIcon from '@/assets/icons/outlineHeart.svg';
import closeIcon from '@/assets/icons/primaryClose.svg';
import sendIcon from '@/assets/icons/sendIcon.svg';
import type { Game } from '@/types';

const DIALOG_ID = 'game_details_dialog';

type GameRecord = {
  medal: string;
  player: string;
  score: number;
  date: string;
};

type GameComment = {
  author: string;
  date: string;
  text: string;
  likes: number;
};

const MOCK_GAME: Game = {
  slug: 'tukoni-forest-keepers',
  name: 'Tukoni: Forest Keepers',
  category: 'puzzle',
  price: 'Free',
  shortDescription:
    'Tukoni: Forest Keepers — a cozy hand-drawn puzzle-adventure. You are Traveller, a little forest spirit on an important mission. Wander storybook meadows, visit mushroom villages, meet adorable inhabitants, solve gentle hand-crafted puzzles, brew herbal teas and help the Tukoni forest prepare peacefully for the coming winter.',
  rating: 4.9,
  likesCount: 31_200,
  cardImage: '/assets/images/games/tukoni-forest-keepers-card.jpg',
  featured: false,
};

const RECORDS: GameRecord[] = [
  { medal: '🥇', player: 'ForestSpirit', score: 356_700, date: '2 days ago' },
  { medal: '🥈', player: 'TeaBrewer', score: 332_400, date: '5 days ago' },
  { medal: '🥉', player: 'HerbalistPath', score: 308_900, date: '1 week ago' },
];

const COMMENTS: GameComment[] = [
  {
    author: 'ForestDweller',
    date: '3 hours ago',
    text: 'The hand-drawn art is absolutely magical 💖 Every location feels like a page from a children’s storybook. The mushroom village made me cry happy tears!',
    likes: 12,
  },
  {
    author: 'HerbalTeaLover',
    date: '1 day ago',
    text: 'Perfect cozy evening game — brew a cup of chamomile, wrap in a blanket and help the little Tukoni prepare for winter. The puzzles are gentle but satisfying.',
    likes: 5,
  },
  {
    author: 'CottageCoreMia',
    date: '3 days ago',
    text: 'I want to live inside this game forever 🌿 The NPCs are so charming, the tea recipes are real, and the atmosphere is pure warmth and calm.',
    likes: 8,
  },
];

function stat(label: string, value: string): string {
  return `
    <div class="game_details_stat">
      <span class="game_details_stat_label">${label}</span>
      <span class="game_details_stat_value">${value}</span>
    </div>
  `;
}

function recordRow(record: GameRecord): string {
  return `
    <li class="game_details_record">
      <span class="game_details_record_medal">${record.medal}</span>
      <span class="game_details_record_player">${record.player}</span>
      <span class="game_details_record_score">${formatNumber(record.score)} pts</span>
      <span class="game_details_record_date">${record.date}</span>
    </li>
  `;
}

function commentItem(comment: GameComment): string {
  return `
    <li class="game_details_comment">
      <div class="game_details_comment_header">
        <span class="game_details_avatar is_small">${comment.author[0]}</span>
        <span class="game_details_comment_author">${comment.author}</span>
        <span class="game_details_comment_date">${comment.date}</span>
      </div>
      <p class="game_details_comment_text">${comment.text}</p>
      <span class="game_details_comment_likes">
        <img src="${heartIcon}" alt="Likes" />${comment.likes}
      </span>
    </li>
  `;
}

export function GameDetailsDialog(game: Game = MOCK_GAME): string {
  return `
    <dialog class="game_details_dialog" id="${DIALOG_ID}" aria-labelledby="game_details_title">
      <div class="game_details_inner">
    <button class="game_details_close" type="button" aria-label="Close" data-details-close><img src="${closeIcon}" alt="" /></button>
    <img class="game_details_img" src="${game.cardImage}" alt="${game.name}" />
    <div class="game_details_body">
      <div class="game_details_header">
        <h2 class="game_details_title" id="game_details_title">${game.name}</h2>
        <div class="game_details_meta">
          <span class="game_details_meta_item"><img src="${starIcon}" alt="Rating" />${game.rating}</span>
          <span class="game_details_meta_item"><img src="${heartIcon}" alt="Likes" />${formatCompact(game.likesCount)}</span>
        </div>
      </div>
      <p class="game_details_description">${game.shortDescription}</p>
      <div class="game_details_stats">
        ${stat('Genre', game.category)}
        ${stat('Players', 'Solo')}
        ${stat('Duration', '40-90 min')}
        ${stat('Price', game.price)}
      </div>
      <div class="game_details_actions">
        <button class="game_details_play" type="button">Play Now</button>
        <button class="game_details_favorite" type="button" aria-label="Add to Favorites">
          <img src="${heartOutlineIcon}" alt="" /><span>Add to Favorites</span>
        </button>
      </div>
      <section>
        <h3 class="game_details_section_title">🏆 Top Records</h3>
        <ul class="game_details_records">${RECORDS.map((record) => recordRow(record)).join('')}</ul>
      </section>
      <section>
        <h3 class="game_details_section_title">Comments (${COMMENTS.length})</h3>
        <form class="game_details_comment_form">
          <span class="game_details_avatar">U</span>
          <input class="game_details_comment_input" type="text" name="comment" placeholder="Write a comment..." />
          <button class="game_details_send" type="submit" aria-label="Send"><img src="${sendIcon}" alt="" /></button>
        </form>
        <ul class="game_details_comments">${COMMENTS.map((comment) => commentItem(comment)).join('')}</ul>
      </section>
    </div>
      </div>
    </dialog>
  `;
}

export function openGameDetails(): void {
  const dialog = document.querySelector<HTMLDialogElement>(`#${DIALOG_ID}`);
  const inner = dialog?.querySelector<HTMLElement>('.game_details_inner');
  if (!dialog || !inner) return;

  inner.scrollTop = 0;
  dialog.showModal();
  document.body.classList.add('is_locked');
}

export function initGameDetailsDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>(`#${DIALOG_ID}`);
  if (!dialog) return;

  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (
      event.target === dialog ||
      event.target.closest('[data-details-close]')
    ) {
      dialog.close();
    }
  });

  dialog.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('is_locked');
  });
}
