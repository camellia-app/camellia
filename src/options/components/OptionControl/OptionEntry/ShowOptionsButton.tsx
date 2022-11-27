import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowOptionsButton: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={t('option_showOptionsButton_description')}
        label={t('option_showOptionsButton_label')}
        optionKey="show_options_button"
      />
    </FilteredOptions>
  );
};
