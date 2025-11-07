import {LitElement, html, css, nothing} from 'lit';
import {typographyStyles} from '../../styles/typography.js';

export class MyPageHeader extends LitElement {
  static styles = [
    typographyStyles,
    css`
    :host {
      display: block;
      color: inherit;
    }

    .header {
      display: grid;
      grid-template-columns: minmax(220px, 260px) minmax(0, 1fr);
      grid-template-rows: auto auto;
      column-gap: var(--spacing-large, 16px);
      row-gap: var(--spacing-small, 8px);
      padding: var(--spacing-x-large, 24px);
      border-radius: calc(var(--radius-xl, 16px) * 2);
      background-color: var(--color-background-brand, #cce8ff);
      color: var(--color-foreground-primary, #2d2e30);
      text-decoration: none;
    }

    .header__image {
      position: relative;
      grid-row: 1 / span 2;
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      aspect-ratio: 1 / 1;
      background-color: var(--color-background-neutral-secondary);
      margin: 0;
    }

    .header__image--placeholder::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
          -45deg,
          rgba(255, 255, 255, 0.35) 0,
          rgba(255, 255, 255, 0.35) 12px,
          rgba(0, 0, 0, 0.05) 12px,
          rgba(0, 0, 0, 0.05) 24px
        );
    }

    .header__image > img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .header__title {
      grid-column: 2;
      grid-row: 1;
      align-self: end;
      font-variation-settings: 'wght' 500;
      letter-spacing: -0.01em;
    }

    .header__badges {
      grid-column: 2;
      grid-row: 2;
      display: inline-flex;
      flex-wrap: wrap;
      gap: var(--spacing-small, 8px);
      align-items: center;
    }

    .header__badges[hidden] {
      display: none;
    }

    .header--interactive {
      cursor: pointer;
    }

    @media (max-width: 640px) {
      .header {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }

      .header__image {
        grid-row: 1;
        width: 100%;
      }

      .header__title,
      .header__badges {
        grid-column: 1;
      }

      .header__title {
        grid-row: 2;
      }

      .header__badges {
        grid-row: 3;
      }
    }
    `,
  ];

  static properties = {
    title: {type: String},
    imageSrc: {type: String, attribute: 'image-src'},
    imageAlt: {type: String, attribute: 'image-alt'},
    href: {type: String},
    target: {type: String},
    rel: {type: String},
    _hasBadges: {state: true},
  };

  constructor() {
    super();
    this.title = "Don't make it simple";
    this.imageSrc = '';
    this.imageAlt = '';
    this.href = '';
    this.target = '';
    this.rel = '';
    this._hasBadges = false;
  }

  firstUpdated() {
    const slot = this.renderRoot.querySelector('slot');
    if (!slot) {
      return;
    }

    this.#updateBadgeVisibility(slot);
    slot.addEventListener('slotchange', () => this.#updateBadgeVisibility(slot));
  }

  #updateBadgeVisibility(slot) {
    const hasBadges =
      slot.assignedElements({flatten: true}).length > 0;
    this._hasBadges = hasBadges;
  }

  #renderImage() {
    if (!this.imageSrc) {
      return html`<div class="header__image header__image--placeholder" aria-hidden="true"></div>`;
    }

    return html`
      <figure class="header__image">
        <img src=${this.imageSrc} alt=${this.imageAlt || ''} loading="lazy" />
      </figure>
    `;
  }

  #renderBadges() {
    return html`
      <div class="header__badges" ?hidden=${!this._hasBadges}>
        <slot></slot>
      </div>
    `;
  }

  #renderInner() {
    return html`${this.#renderImage()}<h2 class="text-heading md header__title">${this.title}</h2>${this.#renderBadges()}`;
  }

  render() {
    const inner = this.#renderInner();

    if (this.href) {
      const targetValue = this.target ? this.target : nothing;
      const relValue = this.rel || (this.target === '_blank' ? 'noopener noreferrer' : '');
      return html`
        <a
          class="header header--interactive"
          href=${this.href}
          target=${targetValue}
          rel=${relValue ? relValue : nothing}
        >
          ${inner}
        </a>
      `;
    }

    return html`<article class="header">${inner}</article>`;
  }
}

customElements.define('my-page-header', MyPageHeader);
