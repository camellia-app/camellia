import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { ContentLayoutType } from '../../../../api/options/options';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';

export const ContentLayout: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.bookmarks]}>
      <OptionDropdownSelect
        description={t('option_contentLayout_description')}
        dropdownOptions={[
          {
            value: ContentLayoutType.Centered,
            label: t('option_contentLayout_optionCentered'),
          },
          {
            value: ContentLayoutType.Fluid,
            label: t('option_contentLayout_optionFluid'),
          },
        ]}
        label={t('option_contentLayout_label')}
        optionKey="content_layout"
      />
    </FilteredOptions>
  );
};
