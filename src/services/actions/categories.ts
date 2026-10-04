import { API_BASE_URL, ENDPOINTS, type GameCategories } from '../api';

export const fetchCategories = async (): Promise<GameCategories[]> => {
  const response = await fetch(API_BASE_URL + ENDPOINTS.categories);

  if (!response.ok) {
    throw new Error(
      `Failed to load categories: ${response.status} ${response.statusText}`,
    );
  }

  const { data } = (await response.json()) as { data: GameCategories[] };

  return data;
};
