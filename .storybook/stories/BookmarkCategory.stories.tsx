import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { BookmarkCategory } from '../../src/components/BookmarkCategory/BookmarkCategory';
import { faker } from '@faker-js/faker';

const story: ComponentMeta<typeof BookmarkCategory> = {
  component: BookmarkCategory,
};

export default story;

const Template: ComponentStory<typeof BookmarkCategory> = (args) => <BookmarkCategory {...args} />;

export const Default = Template.bind({});

Default.args = {
  bookmarks: Array(
    faker.datatype.number({
      min: 20,
      max: 50,
    }),
  )
    .fill(undefined)
    .map(() => ({
      id: faker.datatype.uuid(),
      type: 'link',
      title: faker.company.companyName(),
      url: faker.internet.url(),
    })),
  categoryTitle: 'Bookmark Category',
};

export const WithOneBookmark = Template.bind({});

WithOneBookmark.args = {
  bookmarks: [
    {
      id: faker.datatype.uuid(),
      type: 'link',
      title: faker.company.companyName(),
      url: faker.internet.url(),
    },
  ],
  categoryTitle: 'Bookmark Category With One Bookmark',
};

export const WithVeryLongTitle = Template.bind({});

WithVeryLongTitle.args = {
  bookmarks: [
    {
      id: faker.datatype.uuid(),
      type: 'link',
      title: faker.company.companyName(),
      url: faker.internet.url(),
    },
  ],
  categoryTitle: faker.lorem.words(100),
};

export const WithoutBookmarks = Template.bind({});

WithoutBookmarks.args = {
  bookmarks: [],
  categoryTitle: 'Without Bookmarks',
};
