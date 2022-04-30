import type { MouseEventHandler, VFC } from 'react';
import bookmarkStyles from '../../Bookmark/Bookmark.module.css';
import { Chip, ChipShape } from '../../Chip/Chip';
import { openOptionsPage } from '../../../api/applicationRuntime/navigation';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconSettings = require('mdi/filled/settings.svg?fill=%23eee');

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();

  openOptionsPage();
};

export const OptionsButton: VFC = () => {
  const label = 'Options';

  return (
    <button className={bookmarkStyles.bookmark} onClick={handleClick}>
      <Chip inlineIcon={iconSettings} label={label} loading={false} shape={ChipShape.Squared} tooltip={label} />
    </button>
  );
};
