import { h } from 'preact';
import * as s from './BottomToolbar.css';
import BookmarkManager from './ToolbarItem/BookmarkManager';

export default () => {
  const toolbarItems = [];

  if (process.env.TARGET_PLATFORM === 'chrome') {
    toolbarItems.push(<BookmarkManager />);
  }

  return (
    <footer className={s.bottomToolbar}>
      <ul className={s.bottomToolbarItems}>
        {toolbarItems}
      </ul>
    </footer>
  );
};
