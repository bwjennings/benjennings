# Component Authoring Guide

This project serves as a playground for a growing set of Lit-based web components. Follow the steps below whenever you create or update a component so everything stays consistent and easy to scale.

## 1. Plan the Component
- Decide on a clear, kebab-case tag name (e.g. `my-card-section`).
- Identify any subcomponents or shared utilities the feature may need.
- Prefer reusing existing design tokens defined in `styles/global/base.css` before introducing new values.

## 2. Scaffold the Files
- Create a dedicated folder under `src/components/<feature>/`.
- Add `<feature>/<tag-name>.js` for the Lit component.
- Keep markup templates small; extract helpers or child components into their own modules when they grow complex.

## 3. Implement the Component
- Import Lit from the local dependency (`npm i lit` and `import {...} from 'lit';`).
- Define scoped styles with a `static styles = css\`\`` block instead of linking external stylesheets.
- Reflect public attributes with `static properties` so they work with HTML and in tests.
- Keep rendering self-contained: do not assume external CSS beyond base tokens.

## 4. Register the Component
- Import the new module inside `src/main.js`; the file statically pulls in every component so demos and Storybook auto-register the custom elements.
- If you ship supporting utilities (helpers, styles, metadata), export them from the component folder so other modules can import them directly.

## 5. Document in Storybook
- Add a matching story file under `src/stories/<tag-name>.stories.js`.
- Use the DOM-based pattern from existing stories so attributes and properties stay reactive.
- Cover the primary/default state plus any notable variants or slot permutations.
- Update `src/stories/Introduction.mdx` if the component requires special setup or usage notes.

## 6. Wire Up the Demo (Optional During Development)
- Use the existing `index.html` demo or create a dedicated showcase page.
- Import the global entry (`src/main.js`) only; it automatically registers every component in the registry.

## 7. Validate the Result
- Run `npm run storybook -- --smoke-test` to ensure Storybook can build.
- Load Storybook (`npm run storybook`) and interact with the controls to confirm props, slots, and accessibility metadata behave as expected.
- Load the HTML demo in the browser and confirm the component renders as expected.
- **After making styling changes, open Chrome DevTools MCP and inspect the rendered component** to verify spacing, type ramp, and responsive behavior. Note any tool issues (e.g. existing sessions) in your handoff.
- Manually test key interactions or property changes within the demo page.

## 8. Document and Share
- Update README or feature documentation if the component introduces new capabilities.
- Include usage examples or notes on required attributes, variants, and recommended layout constraints.
- Mention any TODO items or follow-up work in your commit message or task notes.

Following this checklist keeps the component library organized and makes future additions straightforward for the entire team.

## Design System Reference

- **Tokens** – All color ramps, spacing, radii, and typography primitives live in `styles/global/base.css`. Tokens use CSS custom properties (with `light-dark()` for modes) and should be referenced via `var(--token-name)` instead of re-declaring raw values.
- **Typography mixin** – `src/styles/typography.js` exports Lit `css` that mirrors the `.text-heading`, `.text-body`, and `.text-icon` utilities from the global stylesheet. Import it when components need consistent type styles.
- **Icons** – Material Symbols Sharp is registered in `styles/global/base.css` and consumed through the `text-icon` utility. Keep icon names in Google’s text format (e.g., `waving_hand`, `psychology`) and adjust weight/fill via the shared utility instead of per-component overrides.
- **Storybook** – Stories live beside components in `src/stories/*.stories.js` and use DOM-based renders (create the element, set properties, project slots). Storybook pulls in the entire library via `src/main.js`, so there is no per-story import boilerplate.
- **Assets & demos** – HTML demos under `index.html`, `designs/`, `fundamentals/`, `experiments/`, and `resources/` all preload the fonts in `styles/fonts/` and import `styles/global/base.css` plus `src/main.js`. Reuse that pattern for any new showcase page.
