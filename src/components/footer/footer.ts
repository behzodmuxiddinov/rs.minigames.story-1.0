import './footer.scss';
import logoUrl from '../../assets/images/brand-logo-white.svg';
import codeIcon from '@/assets/icons/codeIcon.svg?raw';
import chatIcon from '@/assets/icons/chatIcon.svg?raw';
import shareIcon from '@/assets/icons/shareIcon.svg?raw';
import rssIcon from '@/assets/icons/rssIcon.svg?raw';
import rsSchoolIcon from '@/assets/icons/rsSchoolIcon.svg?raw';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { href: '#/home', label: 'Home' },
      { href: '#/library', label: 'Library' },
      { href: '#/categories', label: 'Categories' },
      { href: '#/tournaments', label: 'Tournaments' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#/about', label: 'About Us' },
      { href: '#/contact', label: 'Contact' },
      { href: '#/privacy', label: 'Privacy Policy' },
      { href: '#/terms', label: 'Terms of Service' },
    ],
  },
];

const SOCIAL_LINKS: FooterLink[] = [
  { href: '#/community', label: 'Share' },
  { href: '#/community', label: 'Discussions' },
  { href: '#/community', label: 'Blog' },
];

const SOCIAL_ICONS = [shareIcon, chatIcon, rssIcon];

export function Footer(): string {
  const columns = FOOTER_COLUMNS.map(
    ({ title, links }) => `
      <div class="footer_column">
        <h2 class="footer_title">${title}</h2>
        <ul class="footer_links">
          ${links
            .map(({ href, label }) => `<li><a href="${href}">${label}</a></li>`)
            .join('')}
        </ul>
      </div>
    `,
  ).join('');

  const socials = SOCIAL_LINKS.map(
    ({ href, label }, index) =>
      `<a href="${href}" class="footer_social" aria-label="${label}">${SOCIAL_ICONS[index]}</a>`,
  ).join('');

  return `
    <footer class="footer_content">
      <div class="footer_top">
        <div class="container">
          <div class="footer_inner_content">
            <div class="footer_brand">
              <a href="#/home" class="logo_link" aria-label="MiniGames home">
                <img src="${logoUrl}" alt="MiniGames" width="150" height="32" />
              </a>
              <p class="footer_text">
                Take a short break and have fun. Hundreds of curated casual
                mini-games right in your web browser. No download required.
              </p>
            </div>
            <div class="footer_columns">
              ${columns}
              <div class="footer_column">
                <h2 class="footer_title">Community</h2>
                <div class="footer_socials">${socials}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_bottom_wrap">
        <div class="container">
          <div class="footer_bottom">
            <p>&copy; 2026 MiniGames. All rights reserved.</p>
            <a href="https://rs.school" class="footer_credit" target="_blank" rel="noreferrer">
              <span class="footer_credit_icon">${rsSchoolIcon}</span>
              RS School
            </a>
            <a href="https://github.com" class="footer_credit" target="_blank" rel="noreferrer">
              <span class="footer_credit_icon footer_credit_icon_mono">${codeIcon}</span>
              @student-nickname
            </a>
            <p class="footer_note">Designed with love</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}
