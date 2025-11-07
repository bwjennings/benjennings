import {LitElement, html, css, nothing} from 'lit';
import {typographyStyles} from '../../styles/typography.js';

export class MyResourceCard extends LitElement {
  static styles = [
    typographyStyles,
    css`
    :host {
      display: block;
    }

    .card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border-radius: 32px;
      background-color: var(--color-background-brand, #cce8ff);
      box-sizing: border-box;
      overflow: hidden;
    }

    .card__icon {
      color: var(--color-foreground-brand, #4160b9);
      flex-shrink: 0;
      font-variation-settings: 'FILL' 1, 'GRAD' 0;
    }

    .card__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      flex: 1 1 0;
      min-width: 150px;
      min-height: 1px;
    }

    .card__title {
      color: var(--color-foreground-primary, #2d2e30);
      width: 100%;
      font-weight: 500;
      font-variation-settings: 'GRAD' 120, 'wdth' 110, 'XOPQ' 80, 'YOPQ' 80, 'XTRA' 468,
        'YTUC' 712, 'YTLC' 514, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
    }

    .card__description {
      color: var(--color-foreground-secondary, #4d4f51);
      width: 100%;
      font-weight: 450;
      font-variation-settings: 'GRAD' 0, 'wdth' 100, 'XOPQ' 80, 'YOPQ' 80, 'XTRA' 468,
        'YTUC' 712, 'YTLC' 514, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
    }

    .card__button {
      flex-shrink: 0;
    }
    `,
  ];

  static properties = {
    icon: {type: String},
    title: {type: String},
    description: {type: String},
    showDescription: {type: Boolean, attribute: 'show-description'},
    buttonLabel: {type: String, attribute: 'button-label'},
    buttonIcon: {type: String, attribute: 'button-icon'},
    buttonVariant: {type: String, attribute: 'button-variant'},
    buttonSize: {type: String, attribute: 'button-size'},
    showButton: {type: Boolean, attribute: 'show-button'},
  };

  constructor() {
    super();
    this.icon = 'demography';
    this.title = 'Title';
    this.description = 'Description';
    this.showDescription = true;
    this.buttonLabel = 'Download';
    this.buttonIcon = 'download';
    this.buttonVariant = 'brand-secondary';
    this.buttonSize = 'default';
    this.showButton = true;
  }

  render() {
    return html`
      <div class="card">
        <span class="text-icon lg card__icon" aria-hidden="true">${this.icon}</span>
        <div class="card__content">
          <h3 class="text-heading sm card__title">${this.title}</h3>
          ${this.showDescription
            ? html`<p class="text-body xs card__description">${this.description}</p>`
            : nothing}
        </div>
        ${this.showButton
          ? html`
              <div class="card__button">
                <my-button
                  icon=${this.buttonIcon}
                  label=${this.buttonLabel}
                  variant=${this.buttonVariant}
                  size=${this.buttonSize}
                  show-icon
                ></my-button>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

customElements.define('my-resource-card', MyResourceCard);
