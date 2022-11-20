import Search from '@material-design-icons/svg/filled/search.svg';
import type { MouseEventHandler, FC } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '../../../api/i18n/translate';
import type { AppDispatch } from '../../../store';
import { searchBookmarksThunk } from '../../../store/slice/bookmarkSearchSlice';
import { Chip } from '../../Chip/Chip';

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
      isLoading={false}
      label={label}
      shape={'squared'}
      svg={<Search />}
      tooltip={tooltip}
    />
  );
};
