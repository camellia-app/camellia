import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { resetOptionsToDefaultValues } from '../../../../api/options';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';

export const ResetOptions: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.advanced]}>
      <LabeledActionButton
        clickHandler={(): void => {
          resetOptionsToDefaultValues();
        }}
        buttonHtmlType={'button'}
        description={t('option_resetOptions_description')}
        disabled={false}
        label={t('option_resetOptions_label')}
        loading={false}
      />
    </FilteredOptions>
  );
};
