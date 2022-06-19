import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ActionButton } from '../../src/options/components/ActionButton/ActionButton';
import { LabeledActionButton } from '../../src/options/components/ActionButton/LabeledActionButton';
import { faker } from '@faker-js/faker';
import { Paragraph } from '../../src/options/components/Paragraph/Paragraph';

const story: ComponentMeta<typeof LabeledActionButton> = {
  component: LabeledActionButton,
  subcomponents: { ActionButton, Paragraph },
};

export default story;

const Template: ComponentStory<typeof LabeledActionButton> = (args) => <LabeledActionButton {...args} />;

export const Default = Template.bind({});

Default.args = {
  buttonHtmlType: 'button',
  label: 'Button',
  description: faker.lorem.sentence(10),
};

export const WithLongDescription = Template.bind({});

WithLongDescription.args = {
  buttonHtmlType: 'button',
  label: 'With Long Description',
  description: faker.lorem.sentences(200),
};

export const WithInlineHtmlInDescription = Template.bind({});

WithInlineHtmlInDescription.args = {
  buttonHtmlType: 'button',
  label: 'With Inline HTML In Description',
  description: (
    <>
      This description contains <a href="https://google.com">hyperlink</a>.
    </>
  ),
};
