import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowSearchButton: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.bottomToolbar, categoriesMap.search]}>
      <OptionCheckbox
        description={t('option_showSearchButton_description')}
        label={t('option_showSearchButton_label')}
        optionKey="show_search_button"
      />
    </FilteredOptions>
  );
};
