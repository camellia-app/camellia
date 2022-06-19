import { faker } from '@faker-js/faker';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paragraph } from '../../src/options/components/Paragraph/Paragraph';

const story: ComponentMeta<typeof Paragraph> = {
  component: Paragraph,
};

export default story;

const Template: ComponentStory<typeof Paragraph> = (args) => <Paragraph {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'This is paragraph!',
};

export const WithLongContent = Template.bind({});

WithLongContent.args = {
  children: faker.lorem.sentences(200),
};

export const WithInlineHtmlInContent = Template.bind({});

WithInlineHtmlInContent.args = {
  children: (
    <>
      This description contains <a href="https://google.com">hyperlink</a>.
    </>
  ),
};
