import type { VFC } from 'react';
import { OptionCheckbox } from '../OptionCheckbox';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';

export const ShowBookmarkManagerButton: VFC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={'Show "Bookmark Manager" button in bottom toolbar.'}
        label={'Show "Bookmark Manager" button'}
        optionKey="show_bookmark_manager_button"
      />
    </CategorizedOption>
  );
};
