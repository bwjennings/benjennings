import {LitElement, html, css, nothing} from 'lit';

import './my-nav-item.js';

const defaultItems = [
  {label: 'Home', icon: 'waving_hand', href: 'index.html', active: true},
  {label: 'Fundamentals', icon: 'psychology', href: 'fundamentals/index.html'},
  {label: 'Designs', icon: 'view_day', href: 'designs/index.html'},
  {label: 'Experiments', icon: 'biotech', href: 'experiments/index.html'},
  {label: 'Resources', icon: 'folder', href: 'resources/index.html'},
];

/**
 * Primary navigation rail composed of `my-nav-item` entries.
 */
export class MyNav extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: inherit;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .nav {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-large);
      padding: var(--spacing-xx-large) var(--spacing-large);
      border-radius: var(--radius-xl);
      background-color: var(--color-background-neutral);
      color: inherit;
      width: 100%;
      min-height: 100%;
      justify-content: flex-start;
      box-sizing: border-box;
    }

    .nav__list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-small);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav__list-item {
      margin: 0;
    }

    :host([item-size='mobile']) .nav {
      padding: var(--spacing-large);
    }

    :host([item-size='mobile']) .nav__list {
      flex-direction: row;
      justify-content: space-between;
      gap: var(--spacing-medium);
    }
  `;

  static properties = {
    label: {type: String},
    items: {type: Array},
    itemSize: {type: String, attribute: 'item-size', reflect: true, useDefault: true},
    activeHref: {type: String, attribute: 'active-href'},
    baseHref: {type: String, attribute: 'base-href'},
  };

  constructor() {
    super();
    this.label = 'Main navigation';
    this.items = [...defaultItems];
    this.itemSize = 'desktop';
    this.activeHref = '';
    this.baseHref = '';
  }

  #normalizedSize() {
    return this.itemSize?.toLowerCase() === 'mobile' ? 'mobile' : 'desktop';
  }

  render() {
    const normalizedSize = this.#normalizedSize();
    const items = Array.isArray(this.items) ? this.items : defaultItems;
    const activeHref = this.#resolveActiveHref();
    const resolvedItems = this.#resolveItems(items, activeHref);

    return html`
      <nav class="nav" aria-label=${this.label || nothing}>
        <ul class="nav__list" role="list">
          ${resolvedItems.map((item) => this.#renderItem(item, normalizedSize))}
        </ul>
      </nav>
    `;
  }

  #renderItem(item, size) {
    const {
      label = '',
      icon = '',
      href = '#',
      active = false,
      target,
      rel,
      resolvedHref,
    } = item ?? {};
    const finalHref = resolvedHref ?? this.#applyBaseHref(href);

    return html`
      <li class="nav__list-item">
        <my-nav-item
          label=${label}
          icon=${icon}
          href=${finalHref}
          size=${size}
          ?active=${active}
          target=${target || nothing}
          rel=${rel || nothing}
        ></my-nav-item>
      </li>
    `;
  }

  #resolveItems(items, activeHref) {
    const hasActiveHref = Boolean(activeHref);
    const normalizedActive = hasActiveHref ? activeHref : '';
    return items.map((item) => {
      const resolvedHref = this.#applyBaseHref(item?.href ?? '');
      const normalizedItemHref = this.#normalizeHref(resolvedHref);
      const isActive = normalizedActive
        ? normalizedItemHref === normalizedActive
        : Boolean(item?.active);
      return {
        ...item,
        resolvedHref,
        active: isActive,
      };
    });
  }

  #resolveActiveHref() {
    const normalized = this.#normalizeHref(this.activeHref);
    if (normalized) {
      return normalized;
    }

    if (typeof window !== 'undefined' && window.location) {
      return this.#normalizeHref(window.location.pathname);
    }

    return '';
  }

  #normalizeHref(href) {
    if (!href) {
      return '';
    }

    const withoutHash = href.split('#')[0] ?? '';
    const withoutQuery = withoutHash.split('?')[0] ?? '';
    if (!withoutQuery) {
      return '';
    }

    try {
      const base = this.#siteRootHref();
      const url = new URL(withoutQuery, base);
      let path = url.pathname || '';

      if (!path || path === '/') {
        return 'index.html';
      }

      if (path.endsWith('/')) {
        path = `${path}index.html`;
      }

      if (path.startsWith('/')) {
        path = path.slice(1);
      }

      const rootPath = this.#siteRootPath();
      if (rootPath && path.startsWith(rootPath)) {
        path = path.slice(rootPath.length);
      }

      return path || 'index.html';
    } catch (error) {
      return withoutQuery;
    }
  }

  #applyBaseHref(href) {
    if (!href) {
      return '#';
    }

    if (href.startsWith('#')) {
      return href;
    }

    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(href) || href.startsWith('//')) {
      return href;
    }

    if (href.startsWith('/')) {
      return href;
    }

    const prefix = this.baseHref && this.baseHref.trim() ? this.baseHref : this.#deriveBaseHref();
    if (!prefix) {
      return href;
    }

    return `${prefix}${href}`;
  }

  #deriveBaseHref() {
    if (typeof document !== 'undefined') {
      const script = document.querySelector('script[type="module"][src$="src/main.js"]');
      if (script) {
        const rawSrc = script.getAttribute('src') ?? '';
        if (rawSrc) {
          const prefix = rawSrc.replace(/src\/main\.js(?:\?.*)?$/, '');
          if (!prefix || prefix === './') {
            return '';
          }

          return prefix;
        }
      }
    }

    if (typeof window === 'undefined' || !window.location) {
      return '';
    }

    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return '';
    }

    // Remove the file portion, leaving only directory depth
    segments.pop();

    if (segments.length === 0) {
      return '';
    }

    return '../'.repeat(segments.length);
  }

  #siteRootHref() {
    if (typeof window === 'undefined' || !window.location) {
      return 'http://localhost/';
    }

    const prefix = this.baseHref && this.baseHref.trim() ? this.baseHref : this.#deriveBaseHref();
    const reference = prefix && prefix !== './' ? prefix : './';

    try {
      return new URL(reference, window.location.href).href;
    } catch (error) {
      return window.location.origin + '/';
    }
  }

  #siteRootPath() {
    try {
      const rootUrl = new URL(this.#siteRootHref());
      let path = rootUrl.pathname || '/';

      if (path === '/' || path === '') {
        return '';
      }

      if (path.startsWith('/')) {
        path = path.slice(1);
      }

      if (!path.endsWith('/')) {
        path = `${path}/`;
      }

      return path;
    } catch (error) {
      return '';
    }
  }
}

customElements.define('my-nav', MyNav);
