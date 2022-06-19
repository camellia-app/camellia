import { faker } from '@faker-js/faker';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Chip } from '../../src/components/Chip/Chip';
import { ChipList } from '../../src/components/ChipList/ChipList';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const icon = require('mdi/filled/local_florist.svg?fill=%23eee');

const story: ComponentMeta<typeof ChipList> = {
  component: ChipList,
  subcomponents: { Chip },
};

export default story;

const Template: ComponentStory<typeof ChipList> = (args) => <ChipList {...args} />;

export const Default = Template.bind({});

Default.args = {
  chips: Array(3).fill(<Chip iconSrc={icon} label="Chip link" shape={'rounded'} url={'https://google.com'} />),
  type: 'inline',
};

export const WithTypeInline = Template.bind({});

WithTypeInline.args = {
  chips: Array(3).fill(<Chip iconSrc={icon} label="Chip link" shape={'rounded'} url={'https://google.com'} />),
  type: 'inline',
};

export const WithTypeColumns = Template.bind({});

WithTypeColumns.args = {
  chips: Array(3).fill(<Chip iconSrc={icon} label="Chip link" shape={'rounded'} url={'https://google.com'} />),
  type: 'columns',
};

export const WithTypeInlineAndManyChips = Template.bind({});

WithTypeInlineAndManyChips.args = {
  chips: Array(
    faker.datatype.number({
      min: 20,
      max: 50,
    }),
  )
    .fill(undefined)
    .map((_, index) => (
      <Chip
        iconSrc={icon}
        key={index}
        label={faker.company.companyName()}
        shape={faker.helpers.arrayElement(['rounded', 'squared'])}
        url={faker.internet.url()}
      />
    )),
  type: 'inline',
};

export const WithTypeColumnsAndManyChips = Template.bind({});

WithTypeColumnsAndManyChips.args = {
  chips: Array(
    faker.datatype.number({
      min: 20,
      max: 50,
    }),
  )
    .fill(undefined)
    .map((_, index) => (
      <Chip
        iconSrc={icon}
        key={index}
        label={faker.company.companyName()}
        shape={faker.helpers.arrayElement(['rounded', 'squared'])}
        url={faker.internet.url()}
      />
    )),
  type: 'columns',
};

export const WithTypeInlineAndManyOverloadedChips = Template.bind({});

WithTypeInlineAndManyOverloadedChips.args = {
  chips: Array(
    faker.datatype.number({
      min: 20,
      max: 50,
    }),
  )
    .fill(undefined)
    .map((_, index) => (
      <Chip
        iconSrc={icon}
        key={index}
        label={faker.lorem.words(10)}
        shape={faker.helpers.arrayElement(['rounded', 'squared'])}
        url={faker.internet.url()}
      />
    )),
  type: 'inline',
};

export const WithTypeColumnsAndManyOverloadedChips = Template.bind({});

WithTypeColumnsAndManyOverloadedChips.args = {
  chips: Array(
    faker.datatype.number({
      min: 20,
      max: 50,
    }),
  )
    .fill(undefined)
    .map((_, index) => (
      <Chip
        iconSrc={icon}
        key={index}
        label={faker.lorem.words(10)}
        shape={faker.helpers.arrayElement(['rounded', 'squared'])}
        url={faker.internet.url()}
      />
    )),
  type: 'columns',
};
