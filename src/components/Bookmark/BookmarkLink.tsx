import type { FC, MouseEventHandler } from 'react';
import { createRef, useEffect, useState } from 'react';
import { Chip, ChipShape } from '../Chip/Chip';
import s from './Bookmark.module.css';
import { getFaviconProcessor } from '../../faviconProcessor';
import type { Link } from '../../api/bookmark/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconPublic = require('mdi/filled/public.svg?fill=%23eee');

export const BookmarkLink: FC<{
  bookmark: Link;
  focus: boolean;
}> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick: MouseEventHandler<HTMLElement> = async (): Promise<void> => {
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
    <a
      className={s.bookmark}
      href={props.bookmark.url}
      onClick={handleClick}
      ref={linkElementRef}
      rel="noopener"
      target="_self"
    >
      <Chip
        fallbackInlineIcon={iconPublic}
        favicon={getFaviconProcessor().generateUrl(props.bookmark.url)}
        label={props.bookmark.title}
        loading={isLoading}
        shape={ChipShape.Rounded}
      />
    </a>
  );
};
