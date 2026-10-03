import { API_BASE_URL, ENDPOINTS, type Game } from '../api';

export const fetchGames = async (): Promise<Game[]> => {
  const parameters = new URLSearchParams({
    featured: 'true',
  });
  const response = await fetch(
    API_BASE_URL + ENDPOINTS.games + '?' + parameters,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load games: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as { data: Game[] };

  return data;
};
