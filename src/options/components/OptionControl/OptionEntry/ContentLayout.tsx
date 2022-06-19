import type { FC } from 'react';
import { ContentLayoutType } from '../../../../api/options/options';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionDropdownSelect } from '../OptionDropdownSelect';

export const ContentLayout: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bookmarks]}>
      <OptionDropdownSelect
        description="Should content be centered or not. Centering content may be useful for people with wide displays."
        dropdownOptions={[
          {
            value: ContentLayoutType.Centered,
            label: 'Centered',
          },
          {
            value: ContentLayoutType.Fluid,
            label: 'Fluid',
          },
        ]}
        label="Content layout"
        optionKey="content_layout"
      />
    </CategorizedOption>
  );
};
