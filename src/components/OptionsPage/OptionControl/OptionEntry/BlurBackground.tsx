import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionCheckbox } from '../OptionCheckbox';

export const BlurBackground: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.background, categoriesMap.accessibility]}>
      <OptionCheckbox
        description={t('option_blurBackground_description')}
        label={t('option_blurBackground_label')}
        optionKey="blur_background"
      />
    </FilteredOptions>
  );
};
