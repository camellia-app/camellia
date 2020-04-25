import { h } from 'preact';
import * as bookmarkStyles from '../../Bookmark/Bookmark.css';
import Chip, { ChipShape } from '../../Chip/Chip';
import { openBookmarkManager } from '../../../bookmarks/BookmarkManager';

const iconStar = require('../../../../node_modules/material-design-icons/toggle/svg/production/ic_star_24px.svg?fill=%23eee');

const handleClick = (event: MouseEvent): void => {
  event.preventDefault();

  openBookmarkManager();
};

export default () => {
  const label = 'Bookmark manager';
  const tooltip = `${label} (Ctrl+Shift+O)`;
  const url = 'chrome://bookmarks';

  return (
    <li className={bookmarkStyles.bookmarkItem}>
      <a className={bookmarkStyles.bookmark} href={url} rel="noopener" target="_self" onClick={handleClick}>
        <Chip label={label} tooltip={tooltip} icon={iconStar} shape={ChipShape.Squared} />
      </a>
    </li>
  );
};
