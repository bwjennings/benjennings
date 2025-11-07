const meta = {
  title: 'Components/My Page Header',
  component: 'my-page-header',
  tags: ['autodocs'],
  argTypes: {
    title: {control: 'text'},
    imageSrc: {control: 'text', name: 'image-src'},
    imageAlt: {control: 'text', name: 'image-alt'},
    href: {control: 'text'},
    target: {control: 'text'},
    rel: {control: 'text'},
    badgesMarkup: {
      control: 'text',
      description: 'HTML string rendered as badges inside the component slot'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'Prominent hero header featuring a square media slot, display headline, and optional badge list.'
      }
    }
  }
};

export default meta;

const renderHeader = ({badgesMarkup, ...args}) => {
  const element = document.createElement('my-page-header');

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      element[key] = value;
    }
  });

  element.innerHTML = badgesMarkup ?? '';

  return element;
};

export const Default = {
  args: {
    title: "Don't make it simple",
    badgesMarkup:
      '<my-badge icon="edit" label="Badge"></my-badge> <my-badge variant="brand" icon="bolt" label="Badge"></my-badge>'
  },
  render: renderHeader
};

export const WithImage = {
  args: {
    title: 'Design from the big picture',
    imageSrc:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Laptop on a desk with design sketches',
    badgesMarkup:
      '<my-badge icon="integration_instructions" label="Documentation"></my-badge> <my-badge variant="brand" icon="bolt" label="Beta"></my-badge>'
  },
  render: renderHeader
};

export const Interactive = {
  args: {
    title: 'Explore the component catalog',
    href: 'https://example.com',
    target: '_blank',
    badgesMarkup:
      '<my-badge icon="open_in_new" label="Opens new tab"></my-badge> <my-badge variant="brand" icon="rocket_launch" label="Launch"></my-badge>'
  },
  render: renderHeader,
  parameters: {
    docs: {
      description: {
        story:
          'Providing an `href` turns the component into an anchor. When `target` is set to `_blank`, a safe default `rel` value is applied unless overridden.'
      }
    }
  }
};
