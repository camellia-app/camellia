import type { VoidFunctionComponent } from 'react';
import { createRef, useEffect, useState } from 'react';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';
import type { Link } from '../../bookmarkManager/bookmark';
import type { Favicon } from '../../faviconProcessor/favicon';
import { getFaviconProcessor } from '../../faviconProcessor';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconPublic = require('mdi/social/svg/production/ic_public_48px.svg?fill=%23eee');

type BookmarkProps = {
  bookmark: Link;
  focus: boolean;
};

export const BookmarkLink: VoidFunctionComponent<BookmarkProps> = (props) => {
  const [icon, setIcon] = useState<Favicon | string>(getFaviconProcessor().generateUrl(props.bookmark.url));
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleFaviconLoadingError = (): void => {
    setIcon(iconPublic);
  };

  const handleClick = async (): Promise<void> => {
    setLoading(true);

    if (isLoading) {
      return;
    }

    setTimeout(() => {
      setLoading(false);
    }, 15000);
  };

  const linkElementRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (props.focus) {
      linkElementRef.current?.focus();
    }
  });

  return (
    <li className={s.bookmarkItem}>
      <a
        className={s.bookmark}
        href={props.bookmark.url}
        onClick={handleClick}
        ref={linkElementRef}
        rel="noopener"
        target="_self"
      >
        <Chip
          handleFaviconLoadingError={handleFaviconLoadingError}
          icon={icon}
          label={props.bookmark.title}
          loading={isLoading}
          shape={ChipShape.Rounded}
        />
      </a>
    </li>
  );
};
