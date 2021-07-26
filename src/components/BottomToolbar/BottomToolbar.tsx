import s from './BottomToolbar.module.css';
import { BookmarkManager } from './ToolbarItem/BookmarkManager';

export const BottomToolbar = () => {
  const toolbarItems = [];

  if (process.env.TARGET_PLATFORM === 'chromium') {
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
