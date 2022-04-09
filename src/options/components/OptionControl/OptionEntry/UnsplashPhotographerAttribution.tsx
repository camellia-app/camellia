import type { VFC } from 'react';
import { OptionCheckbox } from '../OptionCheckbox';
import { useOption } from '../../../../hooks/useOption';
import { BackgroundProviderType } from '../../../../api/options/options';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';

export const UnsplashPhotographerAttribution: VFC = () => {
  const [backgroundImageSourceType] = useOption('background_provider_type');

  if (backgroundImageSourceType !== BackgroundProviderType.UnsplashCollection) {
    return <></>;
  }

  return (
    <CategorizedOption categories={[categoriesMap.background, categoriesMap.bottomToolbar]}>
      <OptionCheckbox
        description="By default, Camellia displays photographer's name in bottom toolbar, which can be clicked to open full photo if you wish to save it or explore more photos of the author. The attribution may be hidden in case you don't want it to be displayed."
        label="Display photographer attribution"
        optionKey="display_unsplash_attribution"
      />
    </CategorizedOption>
  );
};
