import type { VFC } from 'react';
import { OptionCheckbox } from '../OptionCheckbox';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';

export const ShowOptionsButton: VFC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={'Show "Options" button in bottom toolbar.'}
        label={'Show "Options" button'}
        optionKey="show_options_button"
      />
    </CategorizedOption>
  );
};
