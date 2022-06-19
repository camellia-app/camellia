import type { MouseEventHandler, FC } from 'react';
import { Chip } from '../../Chip/Chip';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconStar = require('mdi/filled/star.svg?fill=%23eee');

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();
};

export const BookmarkManager: FC = () => {
  const label = 'Bookmark manager';
  const tooltip = `${label} (Ctrl+Shift+O)`;

  return (
    <Chip
      clickAction={handleClick}
      focus={false}
      iconSrc={iconStar}
      isLoading={false}
      label={label}
      shape={'squared'}
      tooltip={tooltip}
    />
  );
};
