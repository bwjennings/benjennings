const meta = {
  title: 'Components/My Nav Item',
  component: 'my-nav-item',
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    icon: {control: 'text'},
    href: {control: 'text'},
    active: {control: 'boolean'},
    size: {
      control: {type: 'radio'},
      options: ['desktop', 'mobile']
    },
    target: {control: 'text'},
    rel: {control: 'text'}
  },
  parameters: {
    docs: {
      description: {
        component:
          'Single navigation entry that renders a semantic anchor. Supports desktop and mobile presentations.'
      }
    }
  }
};

export default meta;

const renderNavItem = (args) => {
  const element = document.createElement('my-nav-item');

  Object.entries(args).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (typeof element[key] === 'boolean') {
      element[key] = Boolean(value);
    } else {
      element[key] = value;
    }
  });

  return element;
};

export const Default = {
  args: {
    label: 'Fundamentals',
    icon: 'psychology',
    href: 'fundamentals/index.html',
    active: false,
    size: 'desktop'
  },
  render: renderNavItem
};

export const Active = {
  args: {
    label: 'Home',
    icon: 'waving_hand',
    href: 'index.html',
    active: true,
    size: 'desktop'
  },
  render: renderNavItem
};

export const ExternalLink = {
  args: {
    label: 'Design guidelines',
    icon: 'open_in_new',
    href: 'https://design.example.com',
    active: false,
    size: 'mobile',
    target: '_blank',
    rel: 'noopener'
  },
  render: renderNavItem
};
