import {
  API_BASE_URL,
  buildPath,
  ENDPOINTS,
  type CommentLikePayload,
  type GameComment,
  type GameCommentPayload,
  type GameCommentResponse,
  type GameCommentsResponse,
  type GameDetails,
  type GameDetailsResponse,
  type GamesQuery,
  type GamesResponse,
} from '../api';

export const fetchGames = async (
  query: GamesQuery = {},
): Promise<GamesResponse> => {
  const parameters = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '') continue;
    parameters.set(key, String(value));
  }

  const response = await fetch(
    API_BASE_URL + ENDPOINTS.games + '?' + parameters,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load games: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as GamesResponse;
};

export const fetchGame = async (gameSlug: string): Promise<GameDetails> => {
  const response = await fetch(
    API_BASE_URL + buildPath(ENDPOINTS.game, { gameSlug }),
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load game: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as GameDetailsResponse;

  return data;
};

export const fetchGameComments = async (
  gameSlug: string,
): Promise<GameComment[]> => {
  const response = await fetch(
    API_BASE_URL + buildPath(ENDPOINTS.gameComments, { gameSlug }),
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load comments: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as GameCommentsResponse;

  return data;
};

export const postGameComment = async (
  gameSlug: string,
  payload: GameCommentPayload,
): Promise<GameComment> => {
  const response = await fetch(
    API_BASE_URL + buildPath(ENDPOINTS.gameComments, { gameSlug }),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to post comment: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as GameCommentResponse;

  return data;
};

export const likeComment = async (
  commentId: string,
  payload: CommentLikePayload,
): Promise<void> => {
  await fetch(API_BASE_URL + buildPath(ENDPOINTS.commentLike, { commentId }), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};
