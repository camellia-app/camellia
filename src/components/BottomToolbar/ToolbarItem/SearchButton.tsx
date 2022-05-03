import type { MouseEventHandler, FC } from 'react';
import bookmarkStyles from '../../Bookmark/Bookmark.module.css';
import { Chip, ChipShape } from '../../Chip/Chip';
import { useDispatch } from 'react-redux';
import { searchBookmarksThunk } from '../../../store/slice/bookmarkSearchSlice';
import type { AppDispatch } from '../../../store';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconSearch = require('mdi/filled/search.svg?fill=%23eee');

export const SearchButton: FC = () => {
  const label = 'Search';
  const tooltip = `${label} [Ctrl + F]`;

  const dispatch = useDispatch<AppDispatch>();

  const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
    event.preventDefault();

    dispatch(searchBookmarksThunk(''));
  };

  return (
    <button className={bookmarkStyles.bookmark} onClick={handleClick}>
      <Chip inlineIcon={iconSearch} label={label} loading={false} shape={ChipShape.Squared} tooltip={tooltip} />
    </button>
  );
};
