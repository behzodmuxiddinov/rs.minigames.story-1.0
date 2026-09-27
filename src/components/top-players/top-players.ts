import './top-players.scss';
import { formatNumber } from '@/utils/format-number.utilities';

type TableData = {
  rank: number;
  player: string;
  gamesPlayed: number;
  totalScore: number;
  streak: number;
  favoriteGame: string;
};

const TABLE_DATA: TableData[] = [
  {
    rank: 1,
    player: 'Alex_Pro99',
    gamesPlayed: 142,
    totalScore: 94_250,
    streak: 12,
    favoriteGame: 'Heartopia',
  },
  {
    rank: 2,
    player: 'CozyGamer_x',
    gamesPlayed: 118,
    totalScore: 81_400,
    streak: 8,
    favoriteGame: 'Cat Mail Co.',
  },
  {
    rank: 3,
    player: 'MatchMaster',
    gamesPlayed: 98,
    totalScore: 72_110,
    streak: 5,
    favoriteGame: 'Tiny Glade',
  },
  {
    rank: 4,
    player: 'BubblePop',
    gamesPlayed: 87,
    totalScore: 65_900,
    streak: 3,
    favoriteGame: 'Whisper of the House',
  },
  {
    rank: 5,
    player: 'SudokuGod',
    gamesPlayed: 74,
    totalScore: 59_320,
    streak: 2,
    favoriteGame: 'Cat Chess',
  },
];

export function TopPlayers(): string {
  const tableBody = TABLE_DATA.map((item) => playerRow(item)).join('');

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
          <tbody>
            ${tableBody}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function playerRow(item: TableData): string {
  return `
    <tr>
      <td class="cell_rank">#${item.rank}</td>
      <td class="cell_player">
        <div class="player_avatar">
          ${getInitials(item.player)}
        </div>
        ${item.player}
      </td>
      <td>${item.gamesPlayed}</td>
      <td>${formatNumber(item.totalScore)}</td>
      <td>&#x1F525 ${item.streak}</td>
      <td><span class="badge">${item.favoriteGame}</span></td>
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

export function initTopPlayers(): void {
  const rows = document.querySelectorAll('.top_players_table tbody tr');

  for (const [index, row] of rows.entries()) {
    if ((index + 1) % 2 === 0) {
      row.classList.add('is_even');
    }

    row.querySelector('.cell_rank')?.classList.toggle('is_gold', index === 0);
    row.querySelector('.player_avatar')?.classList.add(getColors(index));
  }
}
