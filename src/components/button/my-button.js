import {LitElement, html, css, nothing} from 'lit';
import {typographyStyles} from '../../styles/typography.js';

export class MyButton extends LitElement {
  static styles = [
    typographyStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-x-small, 4px);
        border: none;
        cursor: pointer;
        font-family: 'Roboto Flex', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        white-space: nowrap;
        box-sizing: border-box;
        overflow: hidden;
        transition: opacity 0.2s ease;
      }

      button:hover {
        opacity: 0.9;
      }

      button:active {
        opacity: 0.8;
      }

      button:focus-visible {
        outline: 2px solid var(--color-border-brand, rgba(65, 96, 185, 0.5));
        outline-offset: 2px;
      }

      /* Primary variant (default) */
      :host([variant='primary']) button,
      :host(:not([variant])) button {
        background-color: var(--color-background-brand-emphasis, #4160b9);
        color: var(--color-foreground-on-emphasis, #ffffff);
      }

      /* Secondary variant */
      :host([variant='secondary']) button {
        background-color: var(--color-background-neutral-secondary, #e8e9eb);
        color: var(--color-foreground-primary, #2d2e30);
      }

      /* Brand Secondary variant */
      :host([variant='brand-secondary']) button {
        background-color: var(--color-background-brand-secondary, #e6f7ff);
        color: var(--color-foreground-primary, #2d2e30);
      }

      /* Default size */
      :host([size='default']) button,
      :host(:not([size])) button {
        height: 48px;
        padding: var(--spacing-medium, 12px);
        border-radius: var(--radius-xl, 16px);
      }

      /* Small size */
      :host([size='small']) button {
        height: 32px;
        padding: var(--spacing-small, 8px);
        border-radius: var(--radius-md, 8px);
      }

      .button__icon {
        flex-shrink: 0;
        font-variation-settings: 'FILL' 1, 'GRAD' 0;
      }

      :host([size='small']) .button__icon {
        font-weight: 300;
        font-variation-settings: 'FILL' 1, 'GRAD' 72;
      }

      .button__label {
        flex-shrink: 0;
        font-weight: 400;
        font-style: normal;
        font-variation-settings: 'GRAD' 0, 'wdth' 100, 'XOPQ' 80, 'YOPQ' 80, 'XTRA' 468,
          'YTUC' 712, 'YTLC' 514, 'YTAS' 750, 'YTDE' -203, 'YTFI' 738;
      }
    `,
  ];

  static properties = {
    label: {type: String},
    icon: {type: String},
    showIcon: {type: Boolean, attribute: 'show-icon'},
    variant: {type: String, reflect: true},
    size: {type: String, reflect: true},
    disabled: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.label = 'Button';
    this.icon = 'edit';
    this.showIcon = true;
    this.variant = 'primary';
    this.size = 'default';
    this.disabled = false;
  }

  render() {
    const iconSize = this.size === 'small' ? 'sm' : 'md';
    return html`
      <button ?disabled=${this.disabled}>
        ${this.showIcon && this.icon
          ? html`<span class="text-icon ${iconSize} button__icon" aria-hidden="true">${this.icon}</span>`
          : nothing}
        <span class="button__label">${this.label}</span>
      </button>
    `;
  }
}

customElements.define('my-button', MyButton);
