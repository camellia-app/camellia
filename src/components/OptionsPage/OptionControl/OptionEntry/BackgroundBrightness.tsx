import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { BackgroundBrightnessType } from '../../../../api/options/options';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';

export const BackgroundBrightness: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.background]}>
      <OptionDropdownSelect
        description={t('option_backgroundBrightness_description')}
        dropdownOptions={[
          {
            value: BackgroundBrightnessType.Bright,
            label: t('option_backgroundBrightness_optionBright'),
          },
          {
            value: BackgroundBrightnessType.ReducedBrightness,
            label: t('option_backgroundBrightness_optionReducedBrightness'),
          },
        ]}
        label={t('option_backgroundBrightness_label')}
        optionKey="background_brightness"
      />
    </FilteredOptions>
  );
};