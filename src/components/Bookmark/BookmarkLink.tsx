import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from '../../bookmarks/Bookmark';
import { Chip, ChipShape } from '../Chip/Chip';
import * as s from './Bookmark.css';

const iconPublic = require('mdi/social/svg/production/ic_public_48px.svg?fill=%23eee');

interface BookmarkProps {
  bookmark: Link;
}

export const BookmarkLink = (props: BookmarkProps) => {
  const [icon, setIcon] = useState(props.bookmark.favicon);

  const handleFaviconLoadingError = () => {
    setIcon(iconPublic);
  };

  return (
    <li className={s.bookmarkItem}>
      <a className={s.bookmark} href={props.bookmark.url} rel="noopener" target="_self">
        <Chip handleFaviconLoadingError={handleFaviconLoadingError} icon={icon} label={props.bookmark.title} shape={ChipShape.Rounded} />
      </a>
    </li>
  );
};
