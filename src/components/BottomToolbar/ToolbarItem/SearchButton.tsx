import type { MouseEventHandler, VFC } from 'react';
import bookmarkStyles from '../../Bookmark/Bookmark.module.css';
import { Chip, ChipShape } from '../../Chip/Chip';
import { search } from '../../../store/actionCreators/bookmarkSearch';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconSearch = require('mdi/filled/search.svg?fill=%23eee');

export const SearchButton: VFC = () => {
  const label = 'Search';
  const tooltip = `${label} [Ctrl + F]`;

  const dispatch = useDispatch();

  const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
    event.preventDefault();

    dispatch(search(''));
  };

  return (
    <button className={bookmarkStyles.bookmark} onClick={handleClick}>
      <Chip inlineIcon={iconSearch} label={label} loading={false} shape={ChipShape.Squared} tooltip={tooltip} />
    </button>
  );
};
