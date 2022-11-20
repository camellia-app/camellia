import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { resetOptionsToDefaultValues } from '../../../../api/options';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsSearchForm/OptionsSearchForm';

export const ResetOptions: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.advanced]}>
      <LabeledActionButton
        buttonHtmlType={'button'}
        clickHandler={(): void => {
          resetOptionsToDefaultValues();
        }}
        description={t('option_resetOptions_description')}
        disabled={false}
        label={t('option_resetOptions_label')}
        loading={false}
      />
    </CategorizedOption>
  );
};
