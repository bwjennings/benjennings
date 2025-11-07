import {LitElement, html, css, nothing} from 'lit';

import '../navigation/my-nav.js';

const deriveBaseHref = () => {
  try {
    return import.meta?.env?.BASE_URL ?? '';
  } catch (error) {
    return '';
  }
};

/**
 * Application layout shell that pairs the primary navigation with a content slot.
 */
export class MyAppLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      color: inherit;
      box-sizing: border-box;
    }

    .layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: var(--spacing-xx-large);
      min-height: 100vh;
      background-color: rgba(255, 255, 255, 0.65);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }

    .layout__nav {
      display: block;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }

    .layout__nav ::slotted(*) {
      display: block;
      min-height: 100%;
    }

    .layout__content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xx-large);
      height: 100%;
      overflow-y: auto;
      padding: 0 var(--spacing-large) var(--spacing-xx-large) 0;
    }

    @media (max-width: 900px) {
      .layout {
        grid-template-columns: 1fr;
        min-height: auto;
        overflow: visible;
      }

      .layout__nav {
        position: static;
        height: auto;
        overflow: visible;
      }

      .layout__content {
        height: auto;
        overflow: visible;
        padding-right: 0;
      }
    }
  `;

  static properties = {
    navLabel: {type: String, attribute: 'nav-label'},
    navItems: {type: Array, attribute: false},
    navSize: {type: String, attribute: 'nav-size', reflect: true, useDefault: true},
    activeHref: {type: String, attribute: 'active-href'},
    baseHref: {type: String, attribute: 'base-href'},
  };

  constructor() {
    super();
    this.navLabel = 'Primary navigation';
    this.navItems = null;
    this.navSize = 'desktop';
    this.activeHref = '';
    this.baseHref = deriveBaseHref();
  }

  render() {
    const navItems = Array.isArray(this.navItems) ? this.navItems : null;
    const activeHref = this.activeHref ?? '';

    return html`
      <div class="layout">
        <aside class="layout__nav" aria-label=${this.navLabel || nothing}>
          <slot name="nav">
            ${this.#renderDefaultNav(navItems, activeHref)}
          </slot>
        </aside>
        <main class="layout__content">
          <slot></slot>
        </main>
      </div>
    `;
  }

  #renderDefaultNav(navItems, activeHref) {
    const baseHref = this.baseHref ?? '';
    if (navItems) {
      return html`
        <my-nav
          label=${this.navLabel || nothing}
          item-size=${this.navSize || nothing}
          active-href=${activeHref || nothing}
          base-href=${baseHref || nothing}
          .items=${navItems}
        ></my-nav>
      `;
    }

    return html`
      <my-nav
        label=${this.navLabel || nothing}
        item-size=${this.navSize || nothing}
        active-href=${activeHref || nothing}
        base-href=${baseHref || nothing}
      ></my-nav>
    `;
  }
}

customElements.define('my-app-layout', MyAppLayout);
