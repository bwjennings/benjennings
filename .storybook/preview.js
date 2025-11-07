import '../styles/global/base.css';
import '../styles/global/view-transitions.css';
import '../src/main.js';

/** @type {import('@storybook/web-components').Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'surface',
      values: [
        {name: 'surface', value: 'var(--surface-color, #ffffff)'},
        {name: 'contrast', value: 'var(--surface-inverse-color, #0f172a)'}
      ]
    }
  }
};

export default preview;
