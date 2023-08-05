import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';

export const ContentLayout: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.bookmarks]}>
      <OptionDropdownSelect
        dropdownOptions={[
          {
            label: t('option_contentLayout_optionCentered'),
            value: 'centered',
          },
          {
            label: t('option_contentLayout_optionFluid'),
            value: 'fluid',
          },
        ]}
        description={t('option_contentLayout_description')}
        label={t('option_contentLayout_label')}
        optionKey="content_layout"
      />
    </FilteredOptions>
  );
};
