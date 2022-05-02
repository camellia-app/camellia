import type { VFC } from 'react';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionDropdownSelect } from '../OptionDropdownSelect';
import { ContentLayoutType } from '../../../../api/options/options';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';

export const ContentLayout: VFC = () => {
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