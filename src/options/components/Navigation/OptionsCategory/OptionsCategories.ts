import { Icon } from '../../../../icons';

export type OptionCategory = {
  icon: Icon;
  id: string;
  label: string;
};

export const categoriesMap = {
  background: {
    label: 'Background',
    id: 'background',
    icon: Icon.Wallpaper,
  },
  bookmarks: {
    label: 'Bookmarks',
    id: 'bookmarks',
    icon: Icon.BookmarkBorder,
  },
  bottomToolbar: {
    label: 'Bottom toolbar',
    id: 'bottom-toolbar',
    icon: Icon.CallToAction,
  },
  analytics: {
    label: 'Data collection',
    id: 'data-collection',
    icon: Icon.Analytics,
  },
  advanced: {
    label: 'Advanced',
    id: 'advanced',
    icon: Icon.Construction,
  },
  about: {
    label: 'About',
    id: 'about',
    icon: Icon.Info,
  },
};

export const allCategories: Array<OptionCategory> = Object.entries(categoriesMap).map((categoryId) => categoryId[1]);
