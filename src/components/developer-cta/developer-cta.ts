import './developer-cta.scss';
import illustrationUrl from '@/assets/images/illustration-side.png';
import uploadIcon from '@/assets/icons/upload.svg';

const CONTACT_EMAIL = 'developers@minigames.com';

export function DeveloperCta(): string {
  return `
    <section class="developer_cta" aria-labelledby="developer_cta_title">
      <img
        class="developer_cta_img"
        src="${illustrationUrl}"
        alt="Developer workspace with a mini game on screen"
        loading="lazy"
      />
      <div class="developer_cta_card">
        <h2 class="developer_cta_title" id="developer_cta_title">Are You a Game Developer?</h2>
        <p class="developer_cta_descr">
          Want to see your game on MiniGames? We're always looking for fun,
          engaging mini games to add to our platform. Submit your game
          and reach thousands of players!
        </p>
        <button class="developer_cta_btn">
          <img class="developer_cta_btn_icon" src="${uploadIcon}" alt="upload" />
          <span>Submit Form</span>
        </button>
        <p class="developer_cta_contact">
          or contact us at
          <a class="developer_cta_mail" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        </p>
      </div>
    </section>
  `;
}
