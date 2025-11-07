const meta = {
  title: 'Components/My Greeting',
  component: 'my-greeting',
  tags: ['autodocs'],
  argTypes: {
    name: {control: 'text'},
    mood: {control: 'text'}
  },
  parameters: {
    docs: {
      description: {
        component:
          'Greets the current user and mirrors the tone set through the `mood` property.'
      }
    }
  }
};

export default meta;

const renderGreeting = (args) => {
  const element = document.createElement('my-greeting');

  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined) {
      element[key] = value;
    }
  });

  return element;
};

export const Default = {
  args: {
    name: 'Coder',
    mood: 'productive'
  },
  render: renderGreeting
};

export const CustomMood = {
  name: 'CustomMood',
  args: {
    name: 'Jess',
    mood: 'energised'
  },
  render: renderGreeting
};
