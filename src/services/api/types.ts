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

export type GameSpecs = {
  genre: string;
  players: string;
  duration: string;
  price: string;
};

export type GameRecord = {
  position: number;
  playerName: string;
  score: number;
  achievedAt: string;
};

export type GameDetails = {
  slug: string;
  name: string;
  heroImage: string;
  rating: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  fullDescription: string;
  specs: GameSpecs;
  topRecords: GameRecord[];
};

export type GameDetailsResponse = {
  data: GameDetails;
};

export type GameComment = {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
};

export type GameCommentsMeta = {
  totalComments: number;
  returnedCount: number;
};

export type GameCommentsResponse = {
  data: GameComment[];
  meta: GameCommentsMeta;
};
