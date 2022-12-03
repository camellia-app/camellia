import Settings from '@material-design-icons/svg/filled/settings.svg';
import type { MouseEventHandler, FC } from 'react';
import { openOptionsPage } from '../../../../api/applicationRuntime/navigation';
import { t } from '../../../../api/i18n/translate';
import { Chip } from '../../../common/Chip/Chip';

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();

  openOptionsPage();
};

export const OptionsButton: FC = () => {
  const label = t('bottomToolbar_options_label');

  return (
    <Chip
      clickAction={handleClick}
      focus={false}
      isLoading={false}
      label={label}
      shape={'squared'}
      svg={<Settings />}
      tooltip={label}
    />
  );
};
