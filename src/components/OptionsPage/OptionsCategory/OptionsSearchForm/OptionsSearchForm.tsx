import type { FC, ReactElement } from 'react';

import Analytics from '@material-design-icons/svg/filled/analytics.svg';
import BookmarkBorder from '@material-design-icons/svg/filled/bookmark_border.svg';
import CallToAction from '@material-design-icons/svg/filled/call_to_action.svg';
import Construction from '@material-design-icons/svg/filled/construction.svg';
import Info from '@material-design-icons/svg/filled/info.svg';
import ManageSearch from '@material-design-icons/svg/filled/manage_search.svg';
import SettingsAccessibility from '@material-design-icons/svg/filled/settings_accessibility.svg';
import ViewList from '@material-design-icons/svg/filled/view_list.svg';
import Wallpaper from '@material-design-icons/svg/filled/wallpaper.svg';

import { t } from '../../../../api/i18n/translate';
import { useOptionFilters } from '../../../../store/hooks/useOptionFiltersHook';
import { OptionsCategory } from './OptionsCategory/OptionsCategory';
import { optionsSearchFormCategoryList } from './OptionsSearchForm.module.css';

export type OptionCategory = {
  icon: ReactElement;
  id: string;
  label: string;
};

export const categoriesMap = {
  about: {
    icon: <Info />,
    id: 'about',
    label: t('optionsNavigationCategory_about_label'),
  },
  accessibility: {
    icon: <SettingsAccessibility />,
    id: 'accessibility',
    label: t('optionsNavigationCategory_accessibility_label'),
  },
  advanced: {
    icon: <Construction />,
    id: 'advanced',
    label: t('optionsNavigationCategory_advanced_label'),
  },
  analytics: {
    icon: <Analytics />,
    id: 'data-collection',
    label: t('optionsNavigationCategory_dataCollection_label'),
  },
  background: {
    icon: <Wallpaper />,
    id: 'background',
    label: t('optionsNavigationCategory_background_label'),
  },
  bookmarks: {
    icon: <BookmarkBorder />,
    id: 'bookmarks',
    label: t('optionsNavigationCategory_bookmarks_label'),
  },
  bottomToolbar: {
    icon: <CallToAction />,
    id: 'bottom-toolbar',
    label: t('optionsNavigationCategory_bottomToolbar_label'),
  },
  search: {
    icon: <ManageSearch />,
    id: 'search',
    label: t('optionsNavigationCategory_search_label'),
  },
};

const allCategories: Array<OptionCategory> = Object.entries(categoriesMap).map((categoryId) => categoryId[1]);

export const OptionsSearchForm: FC = () => {
  const [activeOptionCategory, setActiveOptionCategory] = useOptionFilters();

  return (
    <form onSubmit={(event): void => event.preventDefault()}>
      <fieldset>
        <ul className={optionsSearchFormCategoryList}>
          <li>
            <OptionsCategory
              onClick={(): void => {
                setActiveOptionCategory(undefined);
              }}
              icon={<ViewList />}
              id="all"
              isActive={activeOptionCategory === undefined}
              label={t('optionsNavigationCategory_allOptions_label')}
            />
          </li>

          {allCategories.map((category) => (
            <li key={category.id}>
              <OptionsCategory
                onClick={(): void => {
                  setActiveOptionCategory(category.id);
                }}
                icon={category.icon}
                id={category.id}
                isActive={category.id === activeOptionCategory}
                label={category.label}
              />
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
};
