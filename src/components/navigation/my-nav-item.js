import {LitElement, html, css, nothing} from 'lit';
import {typographyStyles} from '../../styles/typography.js';

/**
 * Navigational item used within the primary navigation rail.
 * Supports desktop and mobile presentations and exposes an `active` state.
 */
export class MyNavItem extends LitElement {
  static styles = [
    typographyStyles,
    css`
    :host {
      display: block;
      color: inherit;
    }

    :host([active]) {
      view-transition-name: nav-item-active;
    }

    .nav-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-medium);
      padding: var(--spacing-large);
      border-radius: var(--radius-lg);
      background-color: transparent;
      color: var(--color-foreground-secondary);
      text-decoration: none;
      transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
      cursor: pointer;
    }

    .nav-item:focus {
      outline: none;
    }

    .nav-item:focus-visible {
      outline: 2px solid var(--color-border-brand);
      outline-offset: 2px;
    }

    .nav-item__icon {
      font-variation-settings: 'FILL' 1, 'GRAD' 0,  'wght' var(--icon-weight-medium, 400);
      font-feature-settings: 'liga';
      color: currentColor;
    }

    .nav-item__label {
      display: inline-flex;
      align-items: center;
      color: inherit;
      white-space: nowrap;
    }

    .nav-item--mobile {
      flex-direction: column;
      gap: 2px;
      padding: var(--spacing-x-small) var(--spacing-small);
      min-height: 48px;
    }

    .nav-item--active {
      background-color: var(--color-background-neutral-secondary);
      color: var(--color-foreground-primary);
    }

    .nav-item--active .nav-item__icon {
      color: var(--color-foreground-brand);
      font-variation-settings: 'FILL' 1, 'GRAD' 0,  'wght' var(--icon-weight-large, 500);
    }

    :host(:not([active])) .nav-item:hover {
      color: var(--color-foreground-tertiary);
    }

    :host(:not([active])) .nav-item:hover .nav-item__icon {
      color: var(--color-foreground-tertiary);
    }
    `,
  ];

  static properties = {
    label: {type: String},
    icon: {type: String},
    href: {type: String},
    active: {type: Boolean, reflect: true, useDefault: true},
    size: {type: String, reflect: true, useDefault: true},
    target: {type: String},
    rel: {type: String},
  };

  constructor() {
    super();
    this.label = 'Title';
    this.icon = 'Psychology';
    this.href = '#';
    this.active = false;
    this.size = 'desktop';
    this.target = '';
    this.rel = '';
  }

  #classList() {
    const normalizedSize = this.#normalizedSize();
    const classes = ['nav-item', `nav-item--${normalizedSize}`];
    if (this.active) {
      classes.push('nav-item--active');
    }
    return classes.join(' ');
  }

  #normalizedSize() {
    return this.size?.toLowerCase() === 'mobile' ? 'mobile' : 'desktop';
  }

  render() {
    const className = this.#classList();
    const ariaCurrent = this.active ? 'page' : nothing;
    const relValue = this.rel || (this.target === '_blank' ? 'noopener noreferrer' : '');
    const rel = relValue ? relValue : nothing;
    const target = this.target || nothing;
    const isMobile = this.#normalizedSize() === 'mobile';
    const iconSize = isMobile ? 'md' : 'lg';
    const textSize = isMobile ? 'xs' : 'lg';

    return html`
      <a
        class="text-body ${textSize} ${className}"
        href=${this.href || '#'}
        aria-current=${ariaCurrent}
        target=${target}
        rel=${rel}
      >
        <span class="text-icon ${iconSize} nav-item__icon" aria-hidden="true">${this.icon}</span>
        <span class="nav-item__label">
          <slot>${this.label}</slot>
        </span>
      </a>
    `;
  }
}

customElements.define('my-nav-item', MyNavItem);
