import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';

export const BackgroundBrightness: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.background, categoriesMap.accessibility]}>
      <OptionDropdownSelect
        description={t('option_backgroundBrightness_description')}
        dropdownOptions={[
          {
            label: t('option_backgroundBrightness_optionBright'),
            value: 'bright',
          },
          {
            label: t('option_backgroundBrightness_optionReducedBrightness'),
            value: 'reduced_brightness',
          },
        ]}
        label={t('option_backgroundBrightness_label')}
        optionKey="background_brightness"
      />
    </FilteredOptions>
  );
};
