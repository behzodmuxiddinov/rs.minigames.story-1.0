import logoUrl from '../../assets/brand-logo.svg';

export function Header(): string {
  return `
    <header class="header_content">
      <div class="container">
        <div class="header_inner_content">
          <div class="logo_content">
            <a href="#/home" class="logo_link" aria-label="MiniGames home">
              <img src="${logoUrl}" alt="MiniGames" width="172" height="32" />
            </a>
          </div>
          <div class="tablet_nav">
            <button class="btn btn_primary" type="button">Sign up</button>
            <button
              class="header_burger"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="sidebar"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <nav class="header_nav" id="header_nav" aria-label="Main navigation">
            <ul class="nav_items">
              <li class="nav_item"><a href="#/home">Home</a></li>
              <li class="nav_item"><a href="#/library">Library</a></li>
              <li class="nav_item"><a href="#/tournaments">Tournaments</a></li>
              <li class="nav_item"><a href="#/community">Community</a></li>
            </ul>
            <div class="header_actions">
              <button class="btn btn_ghost" type="button">Log in</button>
              <button class="btn btn_primary" type="button">Sign up</button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  `;
}
