import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ActionButton } from '../../src/options/components/ActionButton/ActionButton';
import { faker } from '@faker-js/faker';

const story: ComponentMeta<typeof ActionButton> = {
  component: ActionButton,
};

export default story;

const Template: ComponentStory<typeof ActionButton> = (args) => <ActionButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  buttonHtmlType: 'button',
  label: 'Button',
};

export const Disabled = Template.bind({});

Disabled.args = {
  buttonHtmlType: 'button',
  disabled: true,
  label: 'Disabled',
};

export const WithClickHandler = Template.bind({});

WithClickHandler.args = {
  buttonHtmlType: 'button',
  clickHandler: (): void => {
    alert('Clicked on the button!');
  },
  label: 'With Click Handler',
};

export const WithClickHandlerAndDisabled = Template.bind({});

WithClickHandlerAndDisabled.args = {
  buttonHtmlType: 'button',
  clickHandler: (): void => {
    alert('Clicked on the button!');
  },
  disabled: true,
  label: 'With Click Handler And Disabled',
};

export const InLoadingState = Template.bind({});

InLoadingState.args = {
  buttonHtmlType: 'button',
  label: 'In Loading State',
  loading: true,
};

export const InLoadingStateAndDisabled = Template.bind({});

InLoadingStateAndDisabled.args = {
  buttonHtmlType: 'button',
  label: 'In Loading State And Disabled',
  loading: true,
  disabled: true,
};

export const WithVeryLongLabel = Template.bind({});

WithVeryLongLabel.args = {
  buttonHtmlType: 'button',
  label: faker.lorem.words(100),
};
