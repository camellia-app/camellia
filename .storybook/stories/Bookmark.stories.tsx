import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Bookmark } from '../../src/components/Bookmark/Bookmark';

const story: ComponentMeta<typeof Bookmark> = {
  component: Bookmark,
};

export default story;

const Template: ComponentStory<typeof Bookmark> = (args) => <Bookmark {...args} />;

export const Link = Template.bind({});

Link.args = {
  bookmark: {
    id: '123',
    title: 'Bookmark Link',
    type: 'link',
    url: 'https://google.com',
  },
  focus: false,
};

export const Folder = Template.bind({});

Folder.args = {
  bookmark: {
    id: '123',
    title: 'Bookmark Folder',
    type: 'folder',
  },
  focus: false,
};
