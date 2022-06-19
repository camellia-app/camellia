import type { FC } from 'react';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowBookmarkManagerButton: FC = () => {
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
