const meta = {
  title: 'Components/My Badge',
  component: 'my-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {type: 'radio'},
      options: ['default', 'brand']
    },
    icon: {control: 'text'},
    label: {control: 'text'}
  },
  parameters: {
    docs: {
      description: {
        component:
          'Compact label paired with an optional Material Symbol icon. Variants map directly to the global color tokens.'
      }
    }
  }
};

export default meta;

const renderBadge = ({variant, ...args}) => {
  const element = document.createElement('my-badge');

  if (variant && variant !== 'default') {
    element.setAttribute('variant', variant);
  } else {
    element.removeAttribute('variant');
  }

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined) {
      element[key] = value;
    }
  });

  return element;
};

export const Default = {
  args: {
    label: 'Draft',
    icon: 'edit',
    variant: 'default'
  },
  render: renderBadge
};

export const Brand = {
  args: {
    label: 'New',
    icon: 'auto_awesome',
    variant: 'brand'
  },
  render: renderBadge
};

export const LabelOnly = {
  args: {
    label: 'No icon',
    icon: '',
    variant: 'default'
  },
  render: renderBadge
};
