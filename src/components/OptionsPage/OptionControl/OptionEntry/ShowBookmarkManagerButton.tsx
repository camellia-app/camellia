import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowBookmarkManagerButton: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={t('option_showBookmarkManagerButton_description')}
        label={t('option_showBookmarkManagerButton_label')}
        optionKey="show_bookmark_manager_button"
      />
    </FilteredOptions>
  );
};
