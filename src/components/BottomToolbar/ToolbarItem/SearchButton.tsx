import type { MouseEventHandler, FC } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../api/i18n/translate';
import type { AppDispatch } from '../../../store';
import { searchBookmarksThunk } from '../../../store/slice/bookmarkSearchSlice';
import { Chip } from '../../Chip/Chip';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconSearch = require('mdi/filled/search.svg?fill=%23eee');

export const SearchButton: FC = () => {
  const label = t('bottomToolbar_search_label');
  const tooltip = `${label} [Ctrl + F]`;

  const dispatch = useDispatch<AppDispatch>();

  const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
    event.preventDefault();

    dispatch(searchBookmarksThunk(''));
  };

  return (
    <Chip
      clickAction={handleClick}
      focus={false}
      iconSrc={iconSearch}
      isLoading={false}
      label={label}
      shape={'squared'}
      tooltip={tooltip}
    />
  );
};
