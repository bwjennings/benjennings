const sampleNavItems = [
  {label: 'Overview', icon: 'dashboard', href: 'index.html'},
  {label: 'Fundamentals', icon: 'psychology', href: 'fundamentals/index.html'},
  {label: 'Designs', icon: 'view_day', href: 'designs/index.html'},
  {label: 'Experiments', icon: 'biotech', href: 'experiments/index.html'},
  {label: 'Resources', icon: 'folder', href: 'resources/index.html'}
];

const meta = {
  title: 'Components/My App Layout',
  component: 'my-app-layout',
  tags: ['autodocs'],
  argTypes: {
    navLabel: {control: 'text'},
    navSize: {
      control: {type: 'radio'},
      options: ['desktop', 'mobile']
    },
    activeHref: {control: 'text'},
    navItems: {
      control: 'object',
      description:
        'Optional array of items to pass through to the internal `my-nav` instance.'
    },
    contentMarkup: {
      control: 'text',
      description: 'HTML string rendered inside the main content slot.'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'High-level layout scaffold that aligns the primary navigation rail alongside flowing content.'
      }
    }
  }
};

export default meta;

const renderLayout = ({contentMarkup, navItems, ...args}) => {
  const element = document.createElement('my-app-layout');

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined) {
      element[key] = value;
    }
  });

  if (navItems) {
    element.navItems = navItems;
  }

  if (contentMarkup) {
    element.innerHTML = contentMarkup;
  } else {
    element.innerHTML = '';
  }

  return element;
};

export const Desktop = {
  args: {
    navLabel: 'Primary navigation',
    navSize: 'desktop',
    activeHref: 'fundamentals/index.html',
    navItems: sampleNavItems,
    contentMarkup:
      `
      <section>
        <h1>Welcome to the playground</h1>
        <p>Use this surface to develop, review, and iterate on Lit components before they reach production.</p>
        <my-card title="Lifecycle status">
          <my-badge variant="brand" icon="bolt" label="Live"></my-badge>
        </my-card>
      </section>
    `
  },
  render: renderLayout
};

export const CustomNavSlot = {
  args: {
    navLabel: 'Project sections',
    navSize: 'mobile',
    activeHref: 'resources/index.html',
    navItems: null,
    contentMarkup:
      `
      <section>
        <h1>Mobile shell</h1>
        <p>
          Provide your own <code>my-nav</code> instance inside the <code>slot="nav"</code> area
          to customise layout behaviour.
        </p>
      </section>
      `
  },
  render: (args) => {
    const layout = renderLayout(args);

    const customNav = document.createElement('my-nav');
    customNav.setAttribute('slot', 'nav');
    customNav.itemSize = 'mobile';
    customNav.items = sampleNavItems.slice();
    customNav.activeHref = args.activeHref;

    layout.prepend(customNav);
    return layout;
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
};
