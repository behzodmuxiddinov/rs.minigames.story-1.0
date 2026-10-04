import {
  API_BASE_URL,
  ENDPOINTS,
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
