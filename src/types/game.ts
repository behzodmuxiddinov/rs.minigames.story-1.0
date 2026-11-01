import type { TranslationKey } from '@/features/i18n';

export type GameCategory =
  'puzzle' | 'card' | 'match' | 'farm' | 'strategy' | 'arcade';

export type GameRating =
  'rating-asc' | 'rating-desc' | 'name-asc' | 'name-desc';

export type TGameRatingSelect = {
  value: GameRating;
  labelKey: TranslationKey;
};
export type Game = {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
  featured: boolean;
};
