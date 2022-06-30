import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { ContentLayoutType } from '../../../../api/options/options';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionDropdownSelect } from '../OptionDropdownSelect';

export const ContentLayout: FC = () => {
  return (
    <CategorizedOption categories={[categoriesMap.bookmarks]}>
      <OptionDropdownSelect
        description={t('option_contentLayout_description')}
        dropdownOptions={[
          {
            value: ContentLayoutType.Centered,
            label: t('option_contentLayout_optionCentered'),
          },
          {
            value: ContentLayoutType.Fluid,
            label: t('option_contentLayout_optionFluid'),
          },
        ]}
        label={t('option_contentLayout_label')}
        optionKey="content_layout"
      />
    </CategorizedOption>
  );
};
