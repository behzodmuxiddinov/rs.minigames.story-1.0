import './developer-cta.scss';
import illustrationUrl from '@/assets/images/illustration-side.png';
import uploadIcon from '@/assets/icons/upload.svg';
import { t } from '@/features/i18n';

const CONTACT_EMAIL = 'developers@minigames.com';

export function DeveloperCta(): string {
  return `
    <section class="developer_cta" aria-labelledby="developer_cta_title">
      <img
        class="developer_cta_img"
        src="${illustrationUrl}"
        alt="${t('developer.image')}"
        loading="lazy"
      />
      <div class="developer_cta_card">
        <h2 class="developer_cta_title" id="developer_cta_title">${t('developer.title')}</h2>
        <p class="developer_cta_descr">${t('developer.description')}</p>
        <button class="developer_cta_btn">
          <img class="developer_cta_btn_icon" src="${uploadIcon}" alt="upload" />
          <span>${t('developer.submit')}</span>
        </button>
        <p class="developer_cta_contact">
          ${t('developer.contact')}
          <a class="developer_cta_mail" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        </p>
      </div>
    </section>
  `;
}
