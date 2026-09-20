import './home.scss';
import { NewGames, initNewGames } from '@/components/new-games/new-games';
import {
  TopPlayers,
  initTopPlayers,
} from '@/components/top-players/top-players';
import { DeveloperCta } from '@/components/developer-cta/developer-cta';

export function Home(): string {
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
            ${NewGames()}
            ${TopPlayers()}
            ${DeveloperCta()}
          </div>
        </div>
    </div>
  `;
}

export function initMainContent(): void {
  void initNewGames();
  initTopPlayers();
}
