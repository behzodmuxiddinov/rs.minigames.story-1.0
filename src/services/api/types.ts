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

export type TopPlayer = {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameName: string;
  favoriteGameSlug: string;
};

export type GameCategories = {
  slug: string;
  label: string;
  isDefault: boolean;
};

export type GamesQuery = {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
};

export type GamesMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type GamesResponse = {
  data: Game[];
  meta: GamesMeta;
};
