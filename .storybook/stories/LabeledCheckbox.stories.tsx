import { faker } from '@faker-js/faker';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Checkbox } from '../../src/options/components/Checkbox/Checkbox';
import { LabeledCheckbox } from '../../src/options/components/Checkbox/LabeledCheckbox';
import { Paragraph } from '../../src/options/components/Paragraph/Paragraph';

const story: ComponentMeta<typeof LabeledCheckbox> = {
  component: LabeledCheckbox,
  subcomponents: { Checkbox, Paragraph },
};

export default story;

const Template: ComponentStory<typeof LabeledCheckbox> = (args) => <LabeledCheckbox {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: true,
  label: 'Checkbox',
  description: faker.lorem.sentence(10),
};

export const WithLongDescription = Template.bind({});

WithLongDescription.args = {
  value: true,
  label: 'With Long Description',
  description: faker.lorem.sentences(200),
};

export const WithInlineHtmlInDescription = Template.bind({});

WithInlineHtmlInDescription.args = {
  value: true,
  label: 'With Inline HTML In Description',
  description: (
    <>
      This description contains <a href="https://google.com">hyperlink</a>.
    </>
  ),
};
