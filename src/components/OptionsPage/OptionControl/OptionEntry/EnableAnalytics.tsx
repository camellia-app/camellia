import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { LabeledCheckbox } from '../../Checkbox/LabeledCheckbox';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';

export const EnableAnalytics: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.analytics]}>
      <LabeledCheckbox
        description={t('option_analytics_description')}
        disabled
        label={t('option_analytics_label')}
        learnMoreLink="https://github.com/camellia-app/camellia/wiki/Privacy-Policy"
        loading={false}
        value={true}
      />
    </FilteredOptions>
  );
};
