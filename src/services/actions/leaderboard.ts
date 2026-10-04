import { API_BASE_URL, ENDPOINTS, type TopPlayer } from '../api';

export const fetchTopPlayers = async (): Promise<TopPlayer[]> => {
  const response = await fetch(API_BASE_URL + ENDPOINTS.leaderboard);

  if (!response.ok) {
    throw new Error(
      `Failed to load games: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as { data: TopPlayer[] };

  return data;
};
