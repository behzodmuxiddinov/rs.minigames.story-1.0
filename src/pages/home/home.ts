import './home.scss';
import { formatNumber } from '@/utils/formatNumber.utils';

export function Home(): string {
  const tableBody = tableData()
    .map(
      (item: TableData) => `
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
  `,
    )
    .join('');
  return `
    <div class="home_content">
      <section class="home_hero">
        <div class="hero_container container">
          <div class="hero_card">
            <h1 class="hero_title">
              Take a Short Break <br />
              & Have Fun
            </h1>
            <p class="hero_descr hero_descr_large">
              Discover hundreds of curated casual mini-games. Play instantly in your
              browser — puzzle, match 3, farm, and board classics.
            </p>
            <p class="hero_descr hero_descr_short">
              Discover hundreds of curated casual mini-games right in your browser.
            </p>
            <button class="hero_card_btn">
              <span>Browse Library</span>
            </button>
          </div>
        </div>
        </section>
        <div class="main_section">
          <div class="container">
            <div class="top_players_content">
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
            </div>
          </div>
        </div>
    </div>
  `;
}

type TableData = {
  rank: number;
  player: string;
  gamesPlayed: number;
  totalScore: number;
  streak: number;
  favoriteGame: string;
};
function tableData(): TableData[] {
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
  return TABLE_DATA;
}

function getInitials(name: string): string {
  if (!name) return '';
  let initials = name.match(/[A-Z]/g)?.join('').slice(0, 2);
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

export function initiMainContent(): void {
  const playersTable = document.querySelectorAll('.top_players_table tbody tr');
  playersTable.forEach((player, index) => {
    if ((index + 1) % 2 === 0) {
      player.classList.add('is_even');
    }
  });
  const ranks = document.querySelectorAll('.cell_rank');
  ranks.forEach((rank, index) => {
    if (index === 0) {
      rank.classList.add('is_gold');
    }
  });

  const cell_players = document.querySelectorAll('.cell_player .player_avatar');
  cell_players.forEach((player, index) => {
    const color = getColors(index);
    player.classList.add(color);
  });
}
