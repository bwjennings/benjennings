import {LitElement, html, css} from 'lit';

export class MyGreeting extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      padding: 1.5rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, #1f2937, #111827);
      color: #f9fafb;
      font-family: 'Roboto Flex', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 20px 35px -25px rgba(15, 23, 42, 0.65);
      transition: transform 150ms ease, box-shadow 150ms ease;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: 0 28px 45px -30px rgba(15, 23, 42, 0.75);
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      letter-spacing: 0.01em;
    }

    p {
      margin: 0.75rem 0 0;
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.82);
    }

    strong {
      color: #34d399;
    }
  `;

  static properties = {
    name: {type: String},
    mood: {type: String},
  };

  constructor() {
    super();
    this.name = 'Coder';
    this.mood = 'productive';
  }

  #headline() {
    return html`Hey there, <strong>${this.name}</strong> 👋`;
  }

  render() {
    return html`
      <article>
        <h2>${this.#headline()}</h2>
        <p>Glad to see you feeling ${this.mood} today.</p>
      </article>
    `;
  }
}

customElements.define('my-greeting', MyGreeting);
