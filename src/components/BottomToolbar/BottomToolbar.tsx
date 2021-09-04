import s from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';
import { VoidFunctionComponent } from 'react';

export const BottomToolbar: VoidFunctionComponent = () => {
  const toolbarItems = [];

  if (process.env.TARGET_PLATFORM === 'chromium') {
    toolbarItems.push(<BookmarkManager />);
  }

  return (
    <footer className={s.bottomToolbar}>
      <ul className={s.bottomToolbarItems}>{toolbarItems}</ul>
    </footer>
  );
};
