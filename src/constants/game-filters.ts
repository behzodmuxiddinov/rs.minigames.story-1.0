import type { GameRating, TGameRatingSelect } from '@/types';

export const GAME_RATINGS: TGameRatingSelect[] = [
  { value: 'rating-asc', label: 'Rating ↑' },
  { value: 'rating-desc', label: 'Rating ↓' },
  { value: 'name-asc', label: 'Name A→Z' },
  { value: 'name-desc', label: 'Name Z→A' },
];

export const DEFAULT_GAME_SORT: GameRating = 'rating-desc';

export function isGameRating(value: unknown): value is GameRating {
  return GAME_RATINGS.some((rating) => rating.value === value);
}
