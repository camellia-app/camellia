import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { DropdownSelect } from '../../src/options/components/DropdownSelect/DropdownSelect';
import { faker } from '@faker-js/faker';

const story: ComponentMeta<typeof DropdownSelect> = {
  component: DropdownSelect,
};

export default story;

const defaultOptions = [
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Blue',
    value: 'Blue',
  },
  {
    title: 'Additional colors',
    options: [
      {
        label: 'Pink',
        value: 'pink',
      },
      {
        label: 'Brown',
        value: 'brown',
      },
    ],
  },
];

const Template: ComponentStory<typeof DropdownSelect> = (args) => <DropdownSelect {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: 'green',
  options: defaultOptions,
};

export const Disabled = Template.bind({});

Disabled.args = {
  value: 'green',
  options: defaultOptions,
  disabled: true,
};

export const WithChangeHandler = Template.bind({});

WithChangeHandler.args = {
  value: 'green',
  options: defaultOptions,
  changeHandler: (): void => {
    alert('Changed new value!');
  },
};

export const WithChangeHandlerAndDisabled = Template.bind({});

WithChangeHandlerAndDisabled.args = {
  value: 'green',
  options: defaultOptions,
  changeHandler: (): void => {
    alert('Changed new value!');
  },
  disabled: true,
};

export const InLoadingState = Template.bind({});

InLoadingState.args = {
  value: 'green',
  options: defaultOptions,
  loading: true,
};

export const InLoadingStateAndDisabled = Template.bind({});

InLoadingStateAndDisabled.args = {
  value: 'green',
  options: defaultOptions,
  loading: true,
  disabled: true,
};

export const WithVeryLongOptions = Template.bind({});

const longOption = faker.lorem.words(100);

WithVeryLongOptions.args = {
  value: 'long',
  options: [
    {
      label: longOption,
      value: 'long',
    },
  ],
};
