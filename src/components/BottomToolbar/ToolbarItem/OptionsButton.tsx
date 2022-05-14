import type { MouseEventHandler, FC } from 'react';
import { ChipButton, ChipShape } from '../../Chip/Chip';
import { openOptionsPage } from '../../../api/applicationRuntime/navigation';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconSettings = require('mdi/filled/settings.svg?fill=%23eee');

const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
  event.preventDefault();

  openOptionsPage();
};

export const OptionsButton: FC = () => {
  const label = 'Options';

  return (
    <ChipButton
      clickAction={handleClick}
      focus={false}
      iconSrc={iconSettings}
      isLoading={false}
      label={label}
      shape={ChipShape.Squared}
      tooltip={label}
    />
  );
};
