import type { FC } from 'react';

import { t } from '../../../../api/i18n/translate';
import { LabeledCheckbox } from '../../Checkbox/LabeledCheckbox';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';

export const EnableErrorReporting: FC = () => {
  return (
    <FilteredOptions categories={[categoriesMap.analytics]}>
      <LabeledCheckbox
        description={t('option_sentry_description')}
        disabled
        label={t('option_sentry_label')}
        learnMoreLink="https://github.com/camellia-app/camellia/wiki/Privacy-Policy"
        loading={false}
        value={true}
      />
    </FilteredOptions>
  );
};
