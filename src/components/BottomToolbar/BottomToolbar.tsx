import s from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import type { FC } from 'react';
import { OptionsButton } from './ToolbarItem/OptionsButton';
import { useOption } from '../../api/options/hook';
import { getSupportedRuntimeFeatures } from '../../api/applicationRuntime/features';
import { SearchButton } from './ToolbarItem/SearchButton';

export const BottomToolbar: FC = () => {
  const [showOptionsButton] = useOption('show_options_button');
  const [showBookmarkManagerButton] = useOption('show_bookmark_manager_button');
  const [showSearchButton] = useOption('show_search_button');

  return (
    <footer className={s.bottomToolbar}>
      <ul className={s.bottomToolbarItems}>
        {showOptionsButton === true ? (
          <li>
            <OptionsButton />
          </li>
        ) : undefined}
        {getSupportedRuntimeFeatures().bookmarkManagerPage && showBookmarkManagerButton === true ? (
          <li>
            <BookmarkManager />
          </li>
        ) : undefined}
        {showSearchButton === true ? (
          <li>
            <SearchButton />
          </li>
        ) : undefined}
      </ul>
    </footer>
  );
};
