import { h } from 'preact';
import { openBookmarkManager } from '../../../bookmarks/BookmarkManager';
import * as bookmarkStyles from '../../Bookmark/Bookmark.css';
import { Chip, ChipShape } from '../../Chip/Chip';

const iconStar = require('mdi/toggle/svg/production/ic_star_24px.svg?fill=%23eee');

const handleClick = (event: MouseEvent): void => {
  event.preventDefault();

  openBookmarkManager();
};

export const BookmarkManager = () => {
  const label = 'Bookmark manager';
  const tooltip = `${label} (Ctrl+Shift+O)`;
  const url = 'chrome://bookmarks';

  return (
    <li className={bookmarkStyles.bookmarkItem}>
      <a className={bookmarkStyles.bookmark} href={url} onClick={handleClick} rel="noopener" target="_self">
        <Chip icon={iconStar} label={label} loading={false} shape={ChipShape.Squared} tooltip={tooltip} />
      </a>
    </li>
  );
};
