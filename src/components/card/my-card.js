import {LitElement, html, css, nothing} from 'lit';
import {typographyStyles} from '../../styles/typography.js';

export class MyCard extends LitElement {
  static styles = [
    typographyStyles,
    css`
    :host {
      display: block;
      color: inherit;
    }

    .card__link {
      display: block;
      color: inherit;
      text-decoration: none;
      height: 100%;
    }

    .card__link:focus-visible {
      outline: 2px solid var(--color-border-brand, rgba(255, 255, 255, 0.8));
      outline-offset: 4px;
      border-radius: var(--radius-xl);
    }

    .card {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      padding: var(--spacing-x-large);
      width: 100%;
      height: 100%;
      border-radius: var(--radius-xl);
      background-color: var(--color-background-brand);
      color: var(--color-foreground-primary);
    }

    .card__image {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 4 / 3;
      background-color: var(--color-background-neutral-secondary);
    }

    .card__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .card__image--placeholder::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: repeating-linear-gradient(
          -45deg,
          rgba(255, 255, 255, 0.35) 0,
          rgba(255, 255, 255, 0.35) 12px,
          rgba(0, 0, 0, 0.04) 12px,
          rgba(0, 0, 0, 0.04) 24px
        );
    }

    .card__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-medium);
      flex: 1 1 auto;
    }

    .card__title {
      color: inherit;
      font-variation-settings: 'wght' 500;
    }

    .card__body,
    .card__footer {
      margin: 0;
      display: block;
    }

    .card__body[hidden],
    .card__footer[hidden] {
      display: none;
    }

    .card__body ::slotted(*) {
      margin: 0;
      font-size: var(--text-body-md-size);
      line-height: 1.5;
      color: inherit;
    }

    .card__badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-small);
    }

    .card__badges[hidden] {
      display: none;
    }

    .card__footer {
      padding-top: var(--spacing-medium);
      border-top: 1px solid rgba(255, 255, 255, 0.18);
    }

    .card__footer ::slotted(a) {
      color: inherit;
      font-variation-settings: 'wght' 520;
      text-decoration: none;
    }

    .card__footer ::slotted(a:focus-visible),
    .card__footer ::slotted(a:hover) {
      text-decoration: underline;
    }
    :host([href]) .card {
      cursor: pointer;
    }
    `,
  ];

  static properties = {
    title: {type: String},
    imageSrc: {type: String, attribute: 'image-src'},
    imageAlt: {type: String, attribute: 'image-alt'},
    href: {type: String, reflect: true, useDefault: true},
    target: {type: String},
    rel: {type: String},
    _hasBadges: {state: true},
    _hasBody: {state: true},
    _hasFooter: {state: true},
  };

  constructor() {
    super();
    this.title = 'Create Clarity, not simplicity';
    this.imageSrc = '';
    this.imageAlt = '';
    this.href = '';
    this.target = '';
    this.rel = '';
    this._hasBadges = false;
    this._hasBody = false;
    this._hasFooter = false;
  }

  firstUpdated() {
    const badgeSlot = this.renderRoot.querySelector('slot:not([name])');
    if (badgeSlot) {
      this.#updateBadgeVisibility(badgeSlot);
      badgeSlot.addEventListener('slotchange', () => this.#updateBadgeVisibility(badgeSlot));
    }

    const bodySlot = this.renderRoot.querySelector('slot[name="body"]');
    if (bodySlot) {
      this.#updateBodyVisibility(bodySlot);
      bodySlot.addEventListener('slotchange', () => this.#updateBodyVisibility(bodySlot));
    }

    const footerSlot = this.renderRoot.querySelector('slot[name="footer"]');
    if (footerSlot) {
      this.#updateFooterVisibility(footerSlot);
      footerSlot.addEventListener('slotchange', () => this.#updateFooterVisibility(footerSlot));
    }
  }

  #updateBadgeVisibility(slot) {
    const hasBadges =
      slot
        .assignedElements({flatten: true})
        .some((el) => el.tagName?.toLowerCase() === 'my-badge') ?? false;
    this._hasBadges = hasBadges;
  }

  #updateBodyVisibility(slot) {
    this._hasBody = this.#hasAssignedContent(slot);
  }

  #updateFooterVisibility(slot) {
    this._hasFooter = this.#hasAssignedContent(slot);
  }

  #hasAssignedContent(slot) {
    const nodes = slot.assignedNodes({flatten: true});
    return nodes.some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return true;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }

      return false;
    });
  }

  #renderImage() {
    if (!this.imageSrc) {
      return html`<div class="card__image card__image--placeholder" aria-hidden="true"></div>`;
    }

    return html`
      <figure class="card__image">
        <img src=${this.imageSrc} alt=${this.imageAlt || ''} loading="lazy" />
      </figure>
    `;
  }

  render() {
    const cardContent = this.#renderCard();

    if (this.href) {
      return html`
        <a class="card__link" href=${this.href} target=${this.target || nothing} rel=${this.#computedRel()}>
          ${cardContent}
        </a>
      `;
    }

    return cardContent;
  }

  #renderCard() {
    return html`
      <article class="card">
        ${this.#renderImage()}
        <div class="card__content">
          <h3 class="text-heading sm card__title">${this.title}</h3>
          <div class="card__body" ?hidden=${!this._hasBody}>
            <slot name="body"></slot>
          </div>
          <div class="card__badges" ?hidden=${!this._hasBadges}>
            <slot></slot>
          </div>
        </div>
        <footer class="card__footer" ?hidden=${!this._hasFooter}>
          <slot name="footer"></slot>
        </footer>
      </article>
    `;
  }

  #computedRel() {
    if (this.rel) {
      return this.rel;
    }

    if (this.target === '_blank') {
      return 'noopener noreferrer';
    }

    return nothing;
  }
}

customElements.define('my-card', MyCard);
