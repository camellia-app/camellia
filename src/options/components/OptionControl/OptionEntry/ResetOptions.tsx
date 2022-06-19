import type { FC } from 'react';
import { resetOptionsToDefaultValues } from '../../../../api/options';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';

export const ResetOptions: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.advanced]}>
      <LabeledActionButton
        buttonHtmlType={'button'}
        clickHandler={(): void => {
          resetOptionsToDefaultValues();
        }}
        description={
          'Pressing this button will reset all your options and preferences in Camellia to default values without confirmation! ⚠️'
        }
        disabled={false}
        label={'Reset options to defaults'}
        loading={false}
      />
    </CategorizedOption>
  );
};
