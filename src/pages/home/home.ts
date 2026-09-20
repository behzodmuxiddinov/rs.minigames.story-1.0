import './home.scss';

export function Home(): string {
  return `
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
  `;
}
