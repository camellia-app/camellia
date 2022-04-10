import s from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import type { VFC } from 'react';
import { AppPlatform, getPlatform } from '../../api/appEnvironment';

export const BottomToolbar: VFC = () => {
  const toolbarItems = [];

  if (getPlatform() === AppPlatform.Chromium) {
    toolbarItems.push(<BookmarkManager />);
  }

  return (
    <footer className={s.bottomToolbar}>
      <ul className={s.bottomToolbarItems}>{toolbarItems}</ul>
    </footer>
  );
};
