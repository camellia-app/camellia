import { faker } from '@faker-js/faker';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { DropdownSelect } from '../../src/options/components/DropdownSelect/DropdownSelect';
import { LabeledDropdownSelect } from '../../src/options/components/DropdownSelect/LabeledDropdownSelect';
import { Paragraph } from '../../src/options/components/Paragraph/Paragraph';

const story: ComponentMeta<typeof LabeledDropdownSelect> = {
  component: LabeledDropdownSelect,
  subcomponents: { DropdownSelect, Paragraph },
};

export default story;

const Template: ComponentStory<typeof LabeledDropdownSelect> = (args) => <LabeledDropdownSelect {...args} />;

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

export const Default = Template.bind({});

Default.args = {
  value: 'green',
  options: defaultOptions,
  label: 'This is dropdown select',
  description: faker.lorem.sentence(10),
};

export const WithLongLabel = Template.bind({});

WithLongLabel.args = {
  value: 'green',
  options: defaultOptions,
  label: faker.lorem.words(50),
  description: faker.lorem.sentence(10),
};

export const WithLongDescription = Template.bind({});

WithLongDescription.args = {
  value: 'green',
  options: defaultOptions,
  label: 'With Long Description',
  description: faker.lorem.sentences(200),
};

export const WithInlineHtmlInDescription = Template.bind({});

WithInlineHtmlInDescription.args = {
  value: 'green',
  options: defaultOptions,
  label: 'With Inline HTML In Description',
  description: (
    <>
      This description contains <a href="https://google.com">hyperlink</a>.
    </>
  ),
};
