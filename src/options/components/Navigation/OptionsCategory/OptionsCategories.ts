import { t } from '../../../../api/i18n/translate';
import { Icon } from '../../../../icons';

export type OptionCategory = {
  icon: Icon;
  id: string;
  label: string;
};

export const categoriesMap = {
  background: {
    label: t('optionsNavigationCategory_background_label'),
    id: 'background',
    icon: Icon.Wallpaper,
  },
  bookmarks: {
    label: t('optionsNavigationCategory_bookmarks_label'),
    id: 'bookmarks',
    icon: Icon.BookmarkBorder,
  },
  search: {
    label: t('optionsNavigationCategory_search_label'),
    id: 'search',
    icon: Icon.ManageSearch,
  },
  bottomToolbar: {
    label: t('optionsNavigationCategory_bottomToolbar_label'),
    id: 'bottom-toolbar',
    icon: Icon.CallToAction,
  },
  analytics: {
    label: t('optionsNavigationCategory_dataCollection_label'),
    id: 'data-collection',
    icon: Icon.Analytics,
  },
  advanced: {
    label: t('optionsNavigationCategory_advanced_label'),
    id: 'advanced',
    icon: Icon.Construction,
  },
  about: {
    label: t('optionsNavigationCategory_about_label'),
    id: 'about',
    icon: Icon.Info,
  },
};

export const allCategories: Array<OptionCategory> = Object.entries(categoriesMap).map((categoryId) => categoryId[1]);
