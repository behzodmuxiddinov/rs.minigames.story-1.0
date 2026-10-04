export const ENDPOINTS = {
  categories: '/api/categories',
  leaderboard: '/api/leaderboard',
  games: '/api/games',
  game: '/api/games/:gameSlug',
  gameFavorite: '/api/games/:gameSlug/favorite',
  gameComments: '/api/games/:gameSlug/comments',
  commentLike: '/api/comments/:commentId/like',
} as const;
