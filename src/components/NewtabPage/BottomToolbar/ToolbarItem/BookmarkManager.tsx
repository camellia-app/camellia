import Star from '@material-design-icons/svg/filled/star.svg';
import type { MouseEventHandler, FC } from 'react';
import { openBookmarkManager } from '../../../../api/applicationRuntime/navigation';
import { t } from '../../../../api/i18n/translate';
import { Chip } from '../../../common/Chip/Chip';

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();

  openBookmarkManager();
};

export const BookmarkManager: FC = () => {
  const label = t('bottomToolbar_bookmarkManager_label');
  const tooltip = `${label} (Ctrl+Shift+O)`;

  return (
    <Chip
      clickAction={handleClick}
      focus={false}
      isLoading={false}
      label={label}
      shape={'squared'}
      svg={<Star />}
      tooltip={tooltip}
    />
  );
};
