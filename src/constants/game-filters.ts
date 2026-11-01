import type { GameRating, TGameRatingSelect } from '@/types';

export const GAME_RATINGS: TGameRatingSelect[] = [
  { value: 'rating-asc', labelKey: 'library.sortRatingAsc' },
  { value: 'rating-desc', labelKey: 'library.sortRatingDesc' },
  { value: 'name-asc', labelKey: 'library.sortNameAsc' },
  { value: 'name-desc', labelKey: 'library.sortNameDesc' },
];

export const DEFAULT_GAME_SORT: GameRating = 'rating-desc';

export function isGameRating(value: unknown): value is GameRating {
  return GAME_RATINGS.some((rating) => rating.value === value);
}
