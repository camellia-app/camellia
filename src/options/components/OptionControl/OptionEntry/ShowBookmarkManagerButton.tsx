import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsSearchForm/OptionsSearchForm';
import { OptionCheckbox } from '../OptionCheckbox';

export const ShowBookmarkManagerButton: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={t('option_showBookmarkManagerButton_description')}
        label={t('option_showBookmarkManagerButton_label')}
        optionKey="show_bookmark_manager_button"
      />
    </CategorizedOption>
  );
};
