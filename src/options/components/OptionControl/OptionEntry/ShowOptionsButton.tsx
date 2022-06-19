import type { FC } from 'react';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowOptionsButton: FC = () => {
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
