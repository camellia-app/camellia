import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { useOption } from '../../../../api/options/hook';
import { BackgroundProviderType } from '../../../../api/options/options';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionCheckbox } from '../OptionCheckbox';

export const UnsplashPhotographerAttribution: FC = () => {
  const [backgroundImageSourceType] = useOption('background_provider_type');

  if (backgroundImageSourceType !== BackgroundProviderType.UnsplashCollection) {
    return <></>;
  }

  return (
    <FilteredOptions categories={[categoriesMap.background, categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description={t('option_displayPhotographerAttribution_description')}
        label={t('option_displayPhotographerAttribution_label')}
        optionKey="display_unsplash_attribution"
      />
    </FilteredOptions>
  );
};
