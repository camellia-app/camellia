import { faker } from '@faker-js/faker';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paragraph } from '../../src/options/components/Paragraph/Paragraph';
import { LabeledTextField } from '../../src/options/components/TextField/LabeledTextField';
import { TextField } from '../../src/options/components/TextField/TextField';

const story: ComponentMeta<typeof LabeledTextField> = {
  component: LabeledTextField,
  subcomponents: { TextField, Paragraph },
};

export default story;

const Template: ComponentStory<typeof LabeledTextField> = (args) => <LabeledTextField {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  label: 'Labeled text field',
  description: faker.lorem.sentence(10),
};

export const WithLongLabel = Template.bind({});

WithLongLabel.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  label: faker.lorem.words(50),
  description: faker.lorem.sentence(10),
};

export const WithLongDescription = Template.bind({});

WithLongDescription.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  label: 'With Long Description',
  description: faker.lorem.sentences(200),
};

export const WithInlineHtmlInDescription = Template.bind({});

WithInlineHtmlInDescription.args = {
  value: 'https://google.com',
  placeholder: 'Placeholder when input is empty',
  type: 'url',
  label: 'With Inline HTML In Description',
  description: (
    <>
      This description contains <a href="https://google.com">hyperlink</a>.
    </>
  ),
};
