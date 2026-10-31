import './home.scss';
import { NewGames, initNewGames } from '@/components/new-games/new-games';
import {
  TopPlayers,
  initLeaderboard,
  markTopPlayers,
} from '@/components/top-players/top-players';
import { DeveloperCta } from '@/components/developer-cta/developer-cta';
import { t } from '@/features/i18n';

export function Home(): string {
  return `
    <div class="home_content">
      <section class="home_hero">
        <div class="hero_container container">
          <div class="hero_card">
            <h1 class="hero_title">
              ${t('home.heroTitleTop')} <br />
              ${t('home.heroTitleBottom')}
            </h1>
            <p class="hero_descr hero_descr_large">
              ${t('home.heroDescriptionLong')}
            </p>
            <p class="hero_descr hero_descr_short">
              ${t('home.heroDescriptionShort')}
            </p>
            <a class="hero_card_btn" href="/library">
              <span>${t('home.browseLibrary')}</span>
            </a>
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
  initLeaderboard();
  markTopPlayers();
}
