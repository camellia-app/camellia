import type { FC } from 'react';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionCheckbox } from '../OptionCheckbox';

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
