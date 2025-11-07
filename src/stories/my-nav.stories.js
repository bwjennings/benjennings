const baseItems = [
  {label: 'Home', icon: 'waving_hand', href: 'index.html'},
  {label: 'Fundamentals', icon: 'psychology', href: 'fundamentals/index.html'},
  {label: 'Designs', icon: 'view_day', href: 'designs/index.html'},
  {label: 'Experiments', icon: 'biotech', href: 'experiments/index.html'},
  {label: 'Resources', icon: 'folder', href: 'resources/index.html'}
];

const meta = {
  title: 'Components/My Nav',
  component: 'my-nav',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    itemSize: {
      control: {type: 'radio'},
      options: ['desktop', 'mobile']
    },
    activeHref: {control: 'text', name: 'active-href'},
    items: {
      control: 'object',
      description:
        'Array of nav item definitions. When omitted, the component uses the default navigation list.'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'Primary navigation shell that renders `my-nav-item` entries and handles the active state.'
      }
    }
  }
};

export default meta;

const renderNav = ({items, ...args}) => {
  const element = document.createElement('my-nav');

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined) {
      element[key] = value;
    }
  });

  if (items) {
    element.items = items;
  }

  return element;
};

export const Desktop = {
  args: {
    label: 'Main navigation',
    itemSize: 'desktop',
    activeHref: 'designs/index.html',
    items: baseItems
  },
  render: renderNav
};

export const Mobile = {
  args: {
    label: 'Main navigation',
    itemSize: 'mobile',
    activeHref: 'resources/index.html',
    items: baseItems.map((item) => ({
      ...item,
      icon: item.icon.replace(/_/g, ' ') // mimic sentence case icons for mobile story
    }))
  },
  render: renderNav,
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
};
