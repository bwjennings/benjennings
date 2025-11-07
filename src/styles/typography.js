import {css} from 'lit';

/**
 * Shared typography styles for Lit components
 * Based on design system tokens defined in styles/global/base.css
 */
export const typographyStyles = css`
  /* Heading styles */
  .text-heading {
    margin: 0;
    font-family: var(--text-heading-font-family, 'Roboto Flex', sans-serif);
    font-weight: var(--text-heading-weight, 400);
    line-height: 1.1;
  }

  .text-heading.xl {
    font-size: var(--text-heading-xl-size, var(--font-size-10));
  }

  .text-heading.lg {
    font-size: var(--text-heading-lg-size, var(--font-size-9));
    line-height: var(--text-heading-lg-line-height, 1.1);
  }

  .text-heading.md {
    font-size: var(--text-heading-md-size, var(--font-size-8));
    line-height: var(--text-heading-md-line-height, 1.1);
  }

  .text-heading.sm {
    font-size: var(--text-heading-sm-size, var(--font-size-5));
    line-height: var(--text-heading-sm-line-height, 1.1);
  }

  /* Body text styles */
  .text-body {
    margin: 0;
    font-family: var(--text-body-font-family, 'Roboto Flex', sans-serif);
    font-weight: var(--text-body-weight, 400);
    font-size: var(--text-body-md-size, var(--font-size-4));
    line-height: var(--text-body-md-line-height, 1.4);
  }

  .text-body.lg {
    font-size: var(--text-body-lg-size, var(--font-size-5));
    line-height: var(--text-body-lg-line-height, var(--font-size-6));
  }

  .text-body.md {
    font-size: var(--text-body-md-size, var(--font-size-4));
    line-height: var(--text-body-md-line-height, var(--font-size-5));
  }

  .text-body.sm {
    font-size: var(--text-body-sm-size, var(--font-size-3));
    line-height: var(--text-body-sm-line-height, var(--font-size-4));
  }

  .text-body.xs {
    font-size: var(--text-body-xs-size, var(--font-size-1));
    line-height: var(--text-body-xs-line-height, var(--font-size-2));
  }

  /* Icon text styles */
  .text-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--icon-Font-Family, 'Material Symbols Sharp');
    font-style: normal;
    font-size: var(--icon-size-md, var(--font-size-5));
    line-height: 1;
    font-weight: var(--icon-weight-medium, 400);
    font-variation-settings: 'wght' var(--icon-weight-medium, 400),'FILL' 1;
    
  
  }

  .text-icon.lg {
    font-size: var(--icon-size-lg, var(--font-size-6));
    font-weight: var(--icon-weight-large, 500);
    font-variation-settings: 'wght' var(--icon-weight-large, 500),'FILL' 1;
  }

  .text-icon.md {
    font-size: var(--icon-size-md, var(--font-size-5));
    font-weight: var(--icon-weight-medium, 400);
    font-variation-settings: 'wght' var(--icon-weight-medium, 400),'FILL' 1;
  }

  .text-icon.sm {
    font-size: var(--icon-size-sm, var(--font-size-3));
    font-weight: var(--icon-weight-small, 300);
    font-variation-settings: 'wght' var(--icon-weight-small, 300),'FILL' 1;
  }

  .text-icon.xs {
    font-size: var(--icon-size-xs, var(--font-size-2));
    font-weight: var(--icon-weight-small, 300);
    font-variation-settings: 'wght' var(--icon-weight-small, 300),'FILL' 1;
  }
`;
