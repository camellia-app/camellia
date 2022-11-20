import Analytics from '@material-design-icons/svg/filled/analytics.svg';
import BookmarkBorder from '@material-design-icons/svg/filled/bookmark_border.svg';
import CallToAction from '@material-design-icons/svg/filled/call_to_action.svg';
import Construction from '@material-design-icons/svg/filled/construction.svg';
import Info from '@material-design-icons/svg/filled/info.svg';
import ManageSearch from '@material-design-icons/svg/filled/manage_search.svg';
import ViewList from '@material-design-icons/svg/filled/view_list.svg';
import Wallpaper from '@material-design-icons/svg/filled/wallpaper.svg';
import type { FC, ReactElement } from 'react';
import { t } from '../../../../api/i18n/translate';
import { OptionsCategory } from '../OptionsCategory/OptionsCategory';
import { optionsSearchFormCategoryList } from './OptionsSearchForm.module.css';

export type OptionCategory = {
  icon: ReactElement;
  id: string;
  label: string;
};

export const categoriesMap = {
  background: {
    label: t('optionsNavigationCategory_background_label'),
    id: 'background',
    icon: <Wallpaper />,
  },
  bookmarks: {
    label: t('optionsNavigationCategory_bookmarks_label'),
    id: 'bookmarks',
    icon: <BookmarkBorder />,
  },
  search: {
    label: t('optionsNavigationCategory_search_label'),
    id: 'search',
    icon: <ManageSearch />,
  },
  bottomToolbar: {
    label: t('optionsNavigationCategory_bottomToolbar_label'),
    id: 'bottom-toolbar',
    icon: <CallToAction />,
  },
  analytics: {
    label: t('optionsNavigationCategory_dataCollection_label'),
    id: 'data-collection',
    icon: <Analytics />,
  },
  advanced: {
    label: t('optionsNavigationCategory_advanced_label'),
    id: 'advanced',
    icon: <Construction />,
  },
  about: {
    label: t('optionsNavigationCategory_about_label'),
    id: 'about',
    icon: <Info />,
  },
};

const allCategories: Array<OptionCategory> = Object.entries(categoriesMap).map((categoryId) => categoryId[1]);

export const OptionsSearchForm: FC<{
  activeCategory: string | undefined;
  onCategoryChange: (id: string) => void;
  onCategoryReset: () => void;
}> = (props) => {
  return (
    <form onSubmit={(event): void => event.preventDefault()}>
      <fieldset>
        <ul className={optionsSearchFormCategoryList}>
          <li>
            <OptionsCategory
              icon={<ViewList />}
              id="all"
              isActive={props.activeCategory === undefined}
              label={t('optionsNavigationCategory_allOptions_label')}
              onClick={props.onCategoryReset}
            />
          </li>

          {allCategories.map((category) => (
            <li key={category.id}>
              <OptionsCategory
                icon={category.icon}
                id={category.id}
                isActive={category.id === props.activeCategory}
                label={category.label}
                onClick={props.onCategoryChange}
              />
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
};
