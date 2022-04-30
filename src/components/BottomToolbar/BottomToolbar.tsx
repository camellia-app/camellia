import s from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import type { VFC } from 'react';
import { OptionsButton } from './ToolbarItem/OptionsButton';
import { useOption } from '../../api/options/hook';
import { getSupportedRuntimeFeatures } from '../../api/applicationRuntime/features';

export const BottomToolbar: VFC = () => {
  const [showOptionsButton] = useOption('show_options_button');
  const [showBookmarkManagerButton] = useOption('show_bookmark_manager_button');

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
      </ul>
    </footer>
  );
};
