import type { FC } from 'react';
import { getSupportedRuntimeFeatures } from '../../api/applicationRuntime/features';
import { useOption } from '../../api/options/hook';
import { bottomToolbar, bottomToolbarItems } from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import { OptionsButton } from './ToolbarItem/OptionsButton';
import { SearchButton } from './ToolbarItem/SearchButton';

export const BottomToolbar: FC = () => {
  const [showOptionsButton] = useOption('show_options_button');
  const [showBookmarkManagerButton] = useOption('show_bookmark_manager_button');
  const [showSearchButton] = useOption('show_search_button');

  return (
    <footer className={bottomToolbar}>
      <ul className={bottomToolbarItems}>
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
