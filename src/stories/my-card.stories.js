const meta = {
  title: 'Components/My Card',
  component: 'my-card',
  tags: ['autodocs'],
  argTypes: {
    title: {control: 'text'},
    imageSrc: {control: 'text', name: 'image-src'},
    imageAlt: {control: 'text', name: 'image-alt'},
    bodyMarkup: {
      control: 'text',
      description: 'HTML string projected into the optional body slot'
    },
    badgesMarkup: {
      control: 'text',
      description: 'HTML string rendered inside the badge slot'
    },
    footerMarkup: {
      control: 'text',
      description: 'HTML string projected into the optional footer slot'
    },
    href: {
      control: 'text',
      description: 'When set, the entire card becomes a navigable link'
    },
    target: {
      control: 'text',
      description: 'Forwarded to the wrapping anchor when `href` is provided'
    },
    rel: {
      control: 'text',
      description: 'Custom rel attribute when `href` is provided'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'Feature card supporting an image header and an optional badge slot for status indicators.'
      }
    }
  }
};

export default meta;

const renderCard = ({bodyMarkup, badgesMarkup, footerMarkup, ...args}) => {
  const element = document.createElement('my-card');

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined) {
      element[key] = value;
    }
  });

  const markupParts = [];
  if (bodyMarkup) {
    markupParts.push(bodyMarkup);
  }
  if (badgesMarkup) {
    markupParts.push(badgesMarkup);
  }
  if (footerMarkup) {
    markupParts.push(footerMarkup);
  }

  if (markupParts.length > 0) {
    element.innerHTML = markupParts.join(' ');
  }

  return element;
};

export const Placeholder = {
  args: {
    title: 'Create Clarity, not simplicity',
    imageSrc: '',
    imageAlt: '',
    bodyMarkup: '',
    badgesMarkup: '',
    footerMarkup: ''
  },
  render: renderCard
};

export const WithImage = {
  args: {
    title: 'Design tokens in practice',
    imageSrc: 'https://images.unsplash.com/photo-1523473827534-1862ae08fb1e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Desk setup with swatches and a notebook',
    bodyMarkup: '',
    badgesMarkup: '',
    footerMarkup: ''
  },
  render: renderCard
};

export const WithBadges = {
  args: {
    title: 'Ship with confidence',
    imageSrc: '',
    imageAlt: '',
    bodyMarkup: '',
    badgesMarkup:
      '<my-badge icon="rocket_launch" label="Launch"></my-badge> <my-badge variant="brand" icon="bolt" label="Beta"></my-badge>',
    footerMarkup: ''
  },
  render: renderCard,
  parameters: {
    docs: {
      description: {
        story:
          'Badges are projected via the default slot. The card automatically toggles the badge container based on slotted child elements.'
      }
    }
  }
};

export const WithBodyAndFooter = {
  args: {
    title: 'Adoption checklist',
    imageSrc: '',
    imageAlt: '',
    bodyMarkup:
      '<p slot="body">Use this card to surface onboarding reminders, pull requests, or design artefacts tied to a feature squad.</p>',
    badgesMarkup:
      '<my-badge label="Enablement"></my-badge> <my-badge variant="brand" label="Shared"></my-badge>',
    footerMarkup: '<span slot="footer">View setup guide</span>',
    href: 'resources/starter-kit/index.html'
  },
  render: renderCard,
  parameters: {
    docs: {
      description: {
        story:
          'The optional <code>body</code> and <code>footer</code> slots let the card support richer content on landing pages.'
      }
    }
  }
};
