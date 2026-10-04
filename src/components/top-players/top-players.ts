import { fetchTopPlayers } from '@/services/actions/leaderboard';
import './top-players.scss';
import { formatNumber } from '@/utils/format-number.utilities';
import { EmptyState } from '../empty-state/empty-state';
import type { TopPlayer } from '@/services/api';
import { showErrorBanner } from '../error/error-banner';
import { ERROR_MESSAGE } from '@/constants';

export function TopPlayers(): string {
  return `
    <section class="top_players_content" aria-label="Top players this week">
      <div class="top_players_header">
        <div class="top_players_stick"></div>
        <p class="top_players_title">Top Players This Week</p>
      </div>
      <div class="top_players_table_wrap">
        <table class="top_players_table">
          <thead>
            <tr>
              <th scope="col">rank</th>
              <th scope="col">player</th>
              <th scope="col">games played</th>
              <th scope="col">total score</th>
              <th scope="col">streak</th>
              <th scope="col">favorite game</th>
            </tr>
          </thead>
          <tbody class="leaderboard_table_body">
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function playerRow(item: TopPlayer): string {
  return `
    <tr>
      <td class="cell_rank">#${item.rank}</td>
      <td class="cell_player">
        <div class="player_avatar">
          ${getInitials(item.playerName)}
        </div>
        ${item.playerName}
      </td>
      <td>${item.gamesPlayed}</td>
      <td>${formatNumber(item.totalScore)}</td>
      <td>&#x1F525 ${item.streakDays}</td>
      <td><span class="badge">${item.favoriteGameName}</span></td>
    </tr>
  `;
}

function emptyRow(): string {
  return `
    <tr class="is_empty">
      <td class="cell_empty" colspan="6">${EmptyState()}</td>
    </tr>
  `;
}

function errorRow(): string {
  return `
    <tr class="is_error">
      <td class="cell_error" colspan="6">${ERROR_MESSAGE}</td>
    </tr>
  `;
}

function getInitials(name: string): string {
  if (!name) return '';
  const initials = name.match(/[A-Z]/g)?.join('').slice(0, 2);
  return initials || '';
}

function getColors(index: number): string {
  if (index === 0) return 'rank1_color';
  if (index === 1) return 'rank2_color';
  if (index === 2) return 'rank3_color';
  if (index === 3) return 'rank4_color';
  if (index === 4) return 'rank5_color';
  return '';
}

export function markTopPlayers(): void {
  const rows = document.querySelectorAll('.top_players_table tbody tr');

  for (const [index, row] of rows.entries()) {
    if ((index + 1) % 2 === 0) {
      row.classList.add('is_even');
    }

    row.querySelector('.cell_rank')?.classList.toggle('is_gold', index === 0);
    row.querySelector('.player_avatar')?.classList.add(getColors(index));
  }
}

export async function initLeaderboard(): Promise<void> {
  const tableBody = document.querySelector<HTMLElement>(
    '.leaderboard_table_body',
  );
  if (!tableBody) return;
  const loadLeaderBoard = async (): Promise<void> => {
    try {
      const response = await fetchTopPlayers();
      if ((response ?? []).length === 0) {
        tableBody.innerHTML = emptyRow();
        return;
      }
      tableBody.innerHTML = response
        .map((item: TopPlayer) => playerRow(item))
        .join('');
      markTopPlayers();
    } catch (error) {
      tableBody.innerHTML = errorRow();
      const errorBody = tableBody.querySelector<HTMLElement>('.cell_error');
      if (errorBody) {
        showErrorBanner(
          errorBody,
          error instanceof Error ? error.message : ERROR_MESSAGE,
          loadLeaderBoard,
        );
      }
    }
  };

  loadLeaderBoard();
}
