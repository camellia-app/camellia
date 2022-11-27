import Search from '@material-design-icons/svg/filled/search.svg';
import type { MouseEventHandler, FC } from 'react';
import { t } from '../../../api/i18n/translate';
import { useBookmarkSearch } from '../../../store/hooks/useBookmarkSearchHook';
import { Chip } from '../../Chip/Chip';

export const SearchButton: FC = () => {
  const label = t('bottomToolbar_search_label');
  const tooltip = `${label} [Ctrl + F]`;

  const [isActive, , toggleSearch] = useBookmarkSearch();

  const handleClick: MouseEventHandler<HTMLElement> = (event): void => {
    event.preventDefault();

    toggleSearch(!isActive);
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
