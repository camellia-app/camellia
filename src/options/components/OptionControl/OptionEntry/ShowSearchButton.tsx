import type { FC } from 'react';
import { OptionCheckbox } from '../OptionCheckbox';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';

export const ShowSearchButton: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bottomToolbar, categoriesMap.search]}>
      <OptionCheckbox
        description={'Show "Search" button in bottom toolbar.'}
        label={'Show "Search" button'}
        optionKey="show_search_button"
      />
    </CategorizedOption>
  );
};
