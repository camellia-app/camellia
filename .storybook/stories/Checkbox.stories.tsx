import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Checkbox } from '../../src/options/components/Checkbox/Checkbox';
import { faker } from '@faker-js/faker';

const story: ComponentMeta<typeof Checkbox> = {
  component: Checkbox,
};

export default story;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'Checkbox',
  value: true,
};

export const InCheckedState = Template.bind({});

InCheckedState.args = {
  label: 'In Checked State',
  value: true,
};

export const InNotCheckedState = Template.bind({});

InNotCheckedState.args = {
  label: 'In Not Checked State',
  value: false,
};

export const InIndeterminateCheckedState = Template.bind({});

InIndeterminateCheckedState.args = {
  label: 'In Indeterminate Checked State',
  value: undefined,
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  label: 'Disabled',
  value: true,
};

export const WithChangeHandler = Template.bind({});

WithChangeHandler.args = {
  changeHandler: (): void => {
    alert('Clicked on the checkbox!');
  },
  label: 'With Change Handler',
  value: true,
};

export const WithChangeHandlerAndDisabled = Template.bind({});

WithChangeHandlerAndDisabled.args = {
  changeHandler: (): void => {
    alert('Clicked on the checkbox!');
  },
  disabled: true,
  label: 'With Change Handler And Disabled',
  value: true,
};

export const InLoadingState = Template.bind({});

InLoadingState.args = {
  label: 'In Loading State',
  loading: true,
  value: true,
};

export const InLoadingStateAndDisabled = Template.bind({});

InLoadingStateAndDisabled.args = {
  label: 'In Loading State And Disabled',
  loading: true,
  disabled: true,
  value: true,
};

export const WithVeryLongLabel = Template.bind({});

WithVeryLongLabel.args = {
  value: true,
  label: faker.lorem.words(100),
};
