import './game-details-dialog.scss';
import { formatCompact, formatNumber } from '@/utils/format-number.utilities';
import starIcon from '@/assets/icons/star.svg';
import heartIcon from '@/assets/icons/heart.svg';
import heartOutlineIcon from '@/assets/icons/outlineHeart.svg';
import closeIcon from '@/assets/icons/primaryClose.svg';
import sendIcon from '@/assets/icons/sendIcon.svg';
import type { GameComment, GameDetails, GameRecord } from '@/services/api';
import {
  fetchGame,
  fetchGameComments,
  likeComment,
  postGameComment,
  toggleFavoriteGame,
} from '@/services/actions/games.actions';
import { getCurrentUser } from '@/services/auth-store';
import { showErrorBanner } from '../error/error-banner';
import { showSnackbar } from '../snackbar/snackbar';

export const GAME_URL_PARAMETER = 'game';

const DIALOG_SELECTOR = '.game_details_dialog';
const BODY_SELECTOR = '.game_details_body';
const MEDIA_SELECTOR = '.game_details_media';
const COMMENTS_SELECTOR = '.game_details_comments';
const COMMENT_INPUT_SELECTOR = '.game_details_comment_input';
const COMMENT_ERROR_SELECTOR = '.game_details_comment_error';
const COMMENT_LIKE_SELECTOR = '[data-comment-like]';
const FAVORITE_SELECTOR = '.game_details_favorite';
const FAVORITE_LIKES_SELECTOR = '.game_details_meta_likes';
const ERROR_MESSAGE = 'Failed to load the game details.';
const COMMENT_ERROR_MESSAGE = 'Failed to post the comment. Try again.';
const FAVORITE_ERROR = 'Failed to update favorites. Try again.';
const MEDALS = ['🥇', '🥈', '🥉'];
const SKELETON_STAT_COUNT = 4;
const SKELETON_RECORD_COUNT = 3;
const SKELETON_COMMENT_COUNT = 2;
const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

let loadedSlug: string | undefined;
let requestId = 0;

function escapeHtml(value: string): string {
  const element = document.createElement('div');
  element.textContent = value;

  return element.innerHTML;
}

function pluralAgo(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? '' : 's'} ago`;
}

function formatRelativeDate(isoDate: string): string {
  const timestamp = Date.parse(isoDate);
  if (Number.isNaN(timestamp)) return '';

  const elapsed = Date.now() - timestamp;

  if (elapsed < MINUTE) return 'just now';
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)} min ago`;
  if (elapsed < DAY) return pluralAgo(Math.floor(elapsed / HOUR), 'hour');
  if (elapsed < WEEK) return pluralAgo(Math.floor(elapsed / DAY), 'day');
  if (elapsed < 4 * WEEK) return pluralAgo(Math.floor(elapsed / WEEK), 'week');
  if (elapsed < 12 * MONTH)
    return pluralAgo(Math.max(1, Math.floor(elapsed / MONTH)), 'month');

  return pluralAgo(Math.max(1, Math.floor(elapsed / YEAR)), 'year');
}

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
      <span class="game_details_record_medal">${MEDALS[record.position - 1] ?? record.position}</span>
      <span class="game_details_record_player">${escapeHtml(record.playerName)}</span>
      <span class="game_details_record_score">${formatNumber(record.score)} pts</span>
      <span class="game_details_record_date">${formatRelativeDate(record.achievedAt)}</span>
    </li>
  `;
}

function commentItem(comment: GameComment): string {
  return `
    <li class="game_details_comment">
      <div class="game_details_comment_header">
        <span class="game_details_avatar is_small">${escapeHtml(comment.authorName[0] ?? '?')}</span>
        <span class="game_details_comment_author">${escapeHtml(comment.authorName)}</span>
        <span class="game_details_comment_date">${formatRelativeDate(comment.createdAt)}</span>
      </div>
      <p class="game_details_comment_text">${escapeHtml(comment.text)}</p>
      <button
        class="game_details_comment_likes"
        type="button"
        data-comment-like
        aria-label="Like the comment"
        aria-pressed="${comment.isLikedByCurrentUser}"
        data-comment-id="${escapeHtml(comment.commentId)}"
      >
        <img src="${comment.isLikedByCurrentUser ? heartIcon : heartOutlineIcon}" alt="" />
        <span class="game_details_comment_likes_count">${comment.likesCount}</span>
      </button>
    </li>
  `;
}

function favoriteLabel(isFavorited: boolean): string {
  return isFavorited ? 'Remove from Favorites' : 'Add to Favorites';
}

function gameDetailsBody(game: GameDetails, comments: GameComment[]): string {
  return `
    <div class="game_details_header">
      <h2 class="game_details_title" id="game_details_title">${escapeHtml(game.name)}</h2>
      <div class="game_details_meta">
        <span class="game_details_meta_item"><img src="${starIcon}" alt="Rating" />${game.rating}</span>
        <span class="game_details_meta_item game_details_meta_likes"><img src="${heartIcon}" alt="Likes" />${formatCompact(game.likesCount)}</span>
      </div>
    </div>
    <p class="game_details_description">${escapeHtml(game.fullDescription)}</p>
    <div class="game_details_stats">
      ${stat('Genre', escapeHtml(game.specs.genre))}
      ${stat('Players', escapeHtml(game.specs.players))}
      ${stat('Duration', escapeHtml(game.specs.duration))}
      ${stat('Price', escapeHtml(game.specs.price))}
    </div>
    <div class="game_details_actions">
      <button class="game_details_play" type="button">Play Now</button>
      <button class="game_details_favorite" type="button" aria-label="${favoriteLabel(game.isLikedByCurrentUser)}" aria-pressed="${game.isLikedByCurrentUser}">
        <img src="${game.isLikedByCurrentUser ? heartIcon : heartOutlineIcon}" alt="" /><span>${favoriteLabel(game.isLikedByCurrentUser)}</span>
      </button>
    </div>
    <section>
      <h3 class="game_details_section_title">🏆 Top Records</h3>
      <ul class="game_details_records">${game.topRecords.map((record) => recordRow(record)).join('')}</ul>
    </section>
    <section>
      <h3 class="game_details_section_title">Comments (${comments.length})</h3>
      <form class="game_details_comment_form">
        <span class="game_details_avatar">U</span>
        <input class="game_details_comment_input" type="text" name="comment" placeholder="Write a comment..." />
        <button class="game_details_send" type="submit" aria-label="Send"><img src="${sendIcon}" alt="" /></button>
      </form>
      <ul class="game_details_comments">${comments.map((comment) => commentItem(comment)).join('')}</ul>
    </section>
  `;
}

function repeat(count: number, item: () => string): string {
  return Array.from({ length: count }, () => item()).join('');
}

function skeletonStat(): string {
  return `
    <div class="game_details_stat">
      <div class="skeleton skeleton_line is_label"></div>
      <div class="skeleton skeleton_line is_value"></div>
    </div>
  `;
}

function skeletonRecord(): string {
  return `
    <li class="game_details_record">
      <div class="skeleton skeleton_line is_medal"></div>
      <div class="skeleton skeleton_line is_player"></div>
      <div class="skeleton skeleton_line is_score"></div>
    </li>
  `;
}

function skeletonComment(): string {
  return `
    <li class="game_details_comment">
      <div class="game_details_comment_header">
        <div class="skeleton skeleton_avatar"></div>
        <div class="skeleton skeleton_line is_author"></div>
      </div>
      <div class="skeleton skeleton_line"></div>
      <div class="skeleton skeleton_line is_short"></div>
    </li>
  `;
}

export function GameDetailsSkeleton(): string {
  return `
    <div class="game_details_header">
      <div class="skeleton skeleton_line is_title"></div>
      <div class="game_details_meta">
        <div class="skeleton skeleton_line is_meta"></div>
        <div class="skeleton skeleton_line is_meta"></div>
      </div>
    </div>
    <div class="game_details_description">
      <div class="skeleton skeleton_line"></div>
      <div class="skeleton skeleton_line"></div>
      <div class="skeleton skeleton_line is_short"></div>
    </div>
    <div class="game_details_stats">
      ${repeat(SKELETON_STAT_COUNT, skeletonStat)}
    </div>
    <div class="game_details_actions">
      <div class="skeleton skeleton_button"></div>
      <div class="skeleton skeleton_button"></div>
    </div>
    <section>
      <div class="skeleton skeleton_line is_section_title"></div>
      <ul class="game_details_records">
        ${repeat(SKELETON_RECORD_COUNT, skeletonRecord)}
      </ul>
    </section>
    <section>
      <div class="skeleton skeleton_line is_section_title"></div>
      <ul class="game_details_comments">
        ${repeat(SKELETON_COMMENT_COUNT, skeletonComment)}
      </ul>
    </section>
  `;
}

export function GameDetailsDialog(): string {
  return `
    <dialog class="game_details_dialog" aria-labelledby="game_details_title">
      <div class="game_details_inner">
        <button class="game_details_close" type="button" aria-label="Close" data-details-close><img src="${closeIcon}" alt="" /></button>
        <div class="game_details_media"></div>
        <div class="game_details_body"></div>
      </div>
    </dialog>
  `;
}

function getSlugFromUrl(): string | null {
  return new URLSearchParams(globalThis.location.search).get(
    GAME_URL_PARAMETER,
  );
}

function pushSlugToUrl(slug?: string): void {
  const url = new URL(globalThis.location.href);

  if (slug) url.searchParams.set(GAME_URL_PARAMETER, slug);
  else url.searchParams.delete(GAME_URL_PARAMETER);

  globalThis.history.pushState({}, '', url);
}

async function loadGame(slug: string): Promise<void> {
  const dialog = document.querySelector<HTMLDialogElement>(DIALOG_SELECTOR);
  const body = dialog?.querySelector<HTMLElement>(BODY_SELECTOR);
  const media = dialog?.querySelector<HTMLElement>(MEDIA_SELECTOR);
  if (!body || !media) return;

  const currentRequest = ++requestId;

  body.classList.add('is_skeleton');
  body.setAttribute('aria-busy', 'true');
  body.innerHTML = GameDetailsSkeleton();
  media.innerHTML = '<div class="game_details_img skeleton"></div>';

  try {
    const [game, comments] = await Promise.all([
      fetchGame(slug, getCurrentUser()?.email ?? undefined),
      fetchGameComments(slug),
    ]);

    if (currentRequest !== requestId) return;

    media.innerHTML = `<img class="game_details_img" src="${game.heroImage}" alt="${escapeHtml(game.name)}" />`;
    body.classList.remove('is_skeleton');
    body.removeAttribute('aria-busy');
    body.innerHTML = gameDetailsBody(game, comments);
    loadedSlug = slug;
  } catch (error: unknown) {
    if (currentRequest !== requestId) return;

    loadedSlug = undefined;
    media.innerHTML = '';
    body.classList.remove('is_skeleton');
    body.removeAttribute('aria-busy');
    body.innerHTML = '';
    showErrorBanner(
      body,
      error instanceof Error ? error.message : ERROR_MESSAGE,
      () => loadGame(slug),
    );
  }
}

function showDialog(slug: string): void {
  const dialog = document.querySelector<HTMLDialogElement>(DIALOG_SELECTOR);
  const inner = dialog?.querySelector<HTMLElement>('.game_details_inner');
  if (!dialog || !inner) return;

  dialog.dataset.slug = slug;

  if (!dialog.open) {
    inner.scrollTop = 0;
    dialog.showModal();
    document.body.classList.add('is_locked');
  }

  if (loadedSlug !== slug) loadGame(slug);
}

export function openGameDetails(slug: string): void {
  pushSlugToUrl(slug);
  showDialog(slug);
}

async function submitComment(
  form: HTMLFormElement,
  slug: string | undefined,
): Promise<void> {
  const input = form.querySelector<HTMLInputElement>(COMMENT_INPUT_SELECTOR);
  const list = form
    .closest('section')
    ?.querySelector<HTMLElement>(COMMENTS_SELECTOR);
  const text = input?.value.trim();
  const user = getCurrentUser();
  if (!slug || !input || !list || !text) return;
  if (!user?.email) {
    showSnackbar('You need to be logged in to comment', { status: 'info' });
    return;
  }

  input.disabled = true;

  form.parentElement?.querySelector(COMMENT_ERROR_SELECTOR)?.remove();

  try {
    const comment = await postGameComment(slug, {
      userEmail: user.email,
      authorName: user.displayName ?? 'Anonymous',
      text,
    });

    list.insertAdjacentHTML('afterbegin', commentItem(comment));
    input.value = '';
  } catch {
    form.insertAdjacentHTML(
      'afterend',
      `<p class="game_details_comment_error" role="alert">${COMMENT_ERROR_MESSAGE}</p>`,
    );
  } finally {
    input.disabled = false;
    input.focus();
  }
}

async function toggleCommentLike(button: HTMLButtonElement): Promise<void> {
  const commentId = button.dataset.commentId;
  const count = button.querySelector<HTMLElement>(
    '.game_details_comment_likes_count',
  );
  const icon = button.querySelector('img');
  const user = getCurrentUser();
  if (!commentId || !count || !icon) return;
  if (!user?.email) {
    showSnackbar('You need to be logged in to like a comment', {
      status: 'info',
    });
    return;
  }

  const isLiked = button.getAttribute('aria-pressed') === 'true';
  const likesCount = Number(count.textContent);

  button.disabled = true;
  button.setAttribute('aria-pressed', String(!isLiked));
  count.textContent = String(isLiked ? likesCount - 1 : likesCount + 1);
  icon.src = isLiked ? heartOutlineIcon : heartIcon;

  try {
    await likeComment(commentId, { userEmail: user.email });
  } catch {
    button.setAttribute('aria-pressed', String(isLiked));
    count.textContent = String(likesCount);
    icon.src = isLiked ? heartIcon : heartOutlineIcon;
  } finally {
    button.disabled = false;
  }
}

async function toggleFavorite(
  button: HTMLButtonElement,
  slug: string | undefined,
): Promise<void> {
  const icon = button.querySelector('img');
  const label = button.querySelector('span');
  const user = getCurrentUser();
  if (!slug || !icon || !label) return;
  if (!user?.email) {
    showSnackbar('You need to be logged in to add favorites', {
      status: 'info',
    });
    return;
  }

  button.disabled = true;

  try {
    const { isFavorited, likesCount } = await toggleFavoriteGame(slug, {
      userEmail: user.email,
    });

    button.setAttribute('aria-pressed', String(isFavorited));
    button.setAttribute('aria-label', favoriteLabel(isFavorited));
    label.textContent = favoriteLabel(isFavorited);
    icon.src = isFavorited ? heartIcon : heartOutlineIcon;

    const likes = button
      .closest(BODY_SELECTOR)
      ?.querySelector<HTMLElement>(FAVORITE_LIKES_SELECTOR);
    const likesText = likes?.lastChild;
    if (likesText) likesText.textContent = formatCompact(likesCount);
  } catch (error: unknown) {
    showSnackbar(error instanceof Error ? error.message : FAVORITE_ERROR, {
      status: 'error',
    });
  } finally {
    button.disabled = false;
  }
}

export function initGameDetailsDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>(DIALOG_SELECTOR);
  if (!dialog) return;

  dialog.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (
      event.target === dialog ||
      event.target.closest('[data-details-close]')
    ) {
      dialog.close();
      return;
    }

    const likeButton = event.target.closest<HTMLButtonElement>(
      COMMENT_LIKE_SELECTOR,
    );
    if (likeButton) {
      void toggleCommentLike(likeButton);
      return;
    }

    const favoriteButton =
      event.target.closest<HTMLButtonElement>(FAVORITE_SELECTOR);
    if (favoriteButton)
      void toggleFavorite(favoriteButton, dialog.dataset.slug);
  });

  dialog.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    void submitComment(form, dialog.dataset.slug);
  });

  dialog.addEventListener('close', () => {
    delete dialog.dataset.slug;
    document.body.classList.remove('is_locked');
    if (getSlugFromUrl()) pushSlugToUrl();
  });

  globalThis.addEventListener('popstate', () => {
    const slug = getSlugFromUrl();

    if (slug) showDialog(slug);
    else dialog.close();
  });

  const slug = getSlugFromUrl();
  if (slug) showDialog(slug);
}
