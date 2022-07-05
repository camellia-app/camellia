import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowSearchButton: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bottomToolbar, categoriesMap.search]}>
      <OptionCheckbox
        description={t('option_showSearchButton_description')}
        label={t('option_showSearchButton_label')}
        optionKey="show_search_button"
      />
    </CategorizedOption>
  );
};
