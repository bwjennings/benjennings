import {LitElement, html, css, nothing} from 'lit';
import {typographyStyles} from '../../styles/typography.js';

export class MyBadge extends LitElement {
  static styles = [
    typographyStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-x-small);
        padding: var(--spacing-x-small, 4px) var(--spacing-small, 8px)
          var(--spacing-x-small, 4px) var(--spacing-x-small, 4px);
        border-radius: 999px;
        background-color: var(--color-background-neutral-secondary);
        color: var(--color-foreground-secondary);
        font-family: 'Roboto Flex', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: var(--text-body-xs-size);
        line-height: var(--text-body-xs-line-height);
        font-variation-settings: 'wght' 450;
        letter-spacing: 0.02em;
        white-space: nowrap;
      }

      :host([variant='brand']) {
        background-color: var(--color-background-brand-secondary);
        color: var(--color-foreground-primary);
      }

      .badge__icon {
        font-variation-settings: 'FILL' 1, 'GRAD' 0, 'wght' 400;
        font-feature-settings: 'liga';
      }

      .badge__label {
        display: inline-flex;
        align-items: center;
        min-height: 1em;
      }
    `,
  ];

  static properties = {
    label: {type: String},
    icon: {type: String},
    variant: {type: String, reflect: true, useDefault: true},
  };

  constructor() {
    super();
    this.label = 'Badge';
    this.icon = 'edit';
    this.variant = 'default';
  }

  render() {
    return html`
      ${this.icon
        ? html`<span class="text-icon xs badge__icon" aria-hidden="true">${this.icon}</span>`
        : nothing}
      <span class="badge__label">${this.label}</span>
    `;
  }
}

customElements.define('my-badge', MyBadge);
