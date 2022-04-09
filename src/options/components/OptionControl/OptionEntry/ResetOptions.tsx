import type { VFC } from 'react';
import { LabeledActionButton } from '../../ActionButton/LabeledActionButton';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { resetOptionsToDefaultValues } from '../../../../api/options';

export const ResetOptions: VFC = () => {
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
