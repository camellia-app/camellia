import type { MouseEventHandler, FC } from 'react';
import { ChipButton, ChipShape } from '../../Chip/Chip';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconStar = require('mdi/filled/star.svg?fill=%23eee');

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();
};

export const BookmarkManager: FC = () => {
  const label = 'Bookmark manager';
  const tooltip = `${label} (Ctrl+Shift+O)`;

  return (
    <ChipButton
      clickAction={handleClick}
      focus={false}
      iconSrc={iconStar}
      isLoading={false}
      label={label}
      shape={ChipShape.Squared}
      tooltip={tooltip}
    />
  );
};
