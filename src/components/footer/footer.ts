import './footer.scss';
import logoUrl from '../../assets/images/brand-logo-white.svg';
import codeIcon from '@/assets/icons/codeIcon.svg?raw';
import chatIcon from '@/assets/icons/chatIcon.svg?raw';
import shareIcon from '@/assets/icons/shareIcon.svg?raw';
import rssIcon from '@/assets/icons/rssIcon.svg?raw';
import rsSchoolIcon from '@/assets/icons/rsSchoolIcon.svg?raw';
import { t, type TranslationKey } from '@/features/i18n';

interface FooterLink {
  href: string;
  labelKey: TranslationKey;
}

interface FooterColumn {
  titleKey: TranslationKey;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    titleKey: 'footer.explore',
    links: [
      { href: '/home', labelKey: 'nav.home' },
      { href: '/library', labelKey: 'nav.library' },
      { href: '/library', labelKey: 'footer.categories' },
      { href: '/tournaments', labelKey: 'nav.tournaments' },
    ],
  },
  {
    titleKey: 'footer.company',
    links: [
      { href: '/home', labelKey: 'footer.about' },
      { href: '/community', labelKey: 'footer.contact' },
      { href: '/home', labelKey: 'footer.privacy' },
      { href: '/home', labelKey: 'footer.terms' },
    ],
  },
];

const SOCIAL_LINKS: FooterLink[] = [
  { href: '/community', labelKey: 'footer.share' },
  { href: '/community', labelKey: 'footer.discussions' },
  { href: '/community', labelKey: 'footer.blog' },
];

const SOCIAL_ICONS = [shareIcon, chatIcon, rssIcon];

export function Footer(): string {
  const columns = FOOTER_COLUMNS.map(
    ({ titleKey, links }) => `
      <div class="footer_column">
        <h2 class="footer_title">${t(titleKey)}</h2>
        <ul class="footer_links">
          ${links
            .map(
              ({ href, labelKey }) =>
                `<li><a href="${href}">${t(labelKey)}</a></li>`,
            )
            .join('')}
        </ul>
      </div>
    `,
  ).join('');

  const socials = SOCIAL_LINKS.map(
    ({ href, labelKey }, index) =>
      `<a href="${href}" class="footer_social" aria-label="${t(labelKey)}">${SOCIAL_ICONS[index]}</a>`,
  ).join('');

  return `
    <footer class="footer_content">
      <div class="footer_top">
        <div class="container">
          <div class="footer_inner_content">
            <div class="footer_brand">
              <a href="/home" class="logo_link" aria-label="${t('common.brandHome')}">
                <img src="${logoUrl}" alt="MiniGames" width="150" height="32" />
              </a>
              <p class="footer_text">${t('footer.description')}</p>
            </div>
            <div class="footer_columns">
              ${columns}
              <div class="footer_column">
                <h2 class="footer_title">${t('footer.community')}</h2>
                <div class="footer_socials">${socials}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_bottom_wrap">
        <div class="container">
          <div class="footer_bottom">
            <p>${t('footer.rights')}</p>
            <a href="https://rs.school" class="footer_credit" target="_blank" rel="noreferrer">
              <div class="footer_credit_icon">${rsSchoolIcon}</div>
              RS School
            </a>
            <a href="https://github.com" class="footer_credit" target="_blank" rel="noreferrer">
              <span class="footer_credit_icon footer_credit_icon_mono">${codeIcon}</span>
              @student-nickname
            </a>
            <p class="footer_note">${t('footer.designed')}</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}
