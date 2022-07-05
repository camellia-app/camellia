import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowOptionsButton: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={t('option_showOptionsButton_description')}
        label={t('option_showOptionsButton_label')}
        optionKey="show_options_button"
      />
    </CategorizedOption>
  );
};
