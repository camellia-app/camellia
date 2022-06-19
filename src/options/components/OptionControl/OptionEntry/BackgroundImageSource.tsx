import type { FC } from 'react';
import { useOption } from '../../../../api/options/hook';
import { BackgroundProviderType } from '../../../../api/options/options';
import { BackgroundPreview } from '../../BackgroundPreview/BackgroundPreview';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsCategory/OptionsCategories';
import { OptionDropdownSelect } from '../OptionDropdownSelect';
import { OptionTextField } from '../OptionTextField';

export const BackgroundImageSource: FC = () => {
  const [backgroundImageSourceType] = useOption('background_provider_type');

  return (
    <CategorizedOption categories={[categoriesMap.background]}>
      <OptionDropdownSelect
        description="Select background image source type."
        dropdownOptions={[
          {
            value: BackgroundProviderType.Link,
            label: 'Load image from link',
          },
          {
            value: BackgroundProviderType.UnsplashCollection,
            label: 'Unsplash collection',
          },
        ]}
        label="Background image source type"
        optionKey="background_provider_type"
      />

      <BackgroundPreview />

      {backgroundImageSourceType === 'link' ? (
        <OptionTextField
          description={'Link pointing to the image. It should start with "https://".'}
          label="Image link"
          optionKey="background_image_link"
          pattern={'^https:\\/\\/.+'}
          placeholder={'e.g. https://example.com/image.jpg'}
          spellCheck={false}
          type={'url'}
        />
      ) : undefined}

      {backgroundImageSourceType === 'unsplash_collection' ? (
        <OptionTextField
          description={'Link pointing to Unsplash collection in form of "https://unsplash.com/collections/123".'}
          label="Unsplash collection link"
          optionKey="background_image_unsplash_collection_id"
          pattern={'^https:\\/\\/unsplash\\.com\\/collections\\/[1-9]+[0-9]*?.+'}
          placeholder={'e.g. https://unsplash.com/collections/10745553'}
          spellCheck={false}
          type={'url'}
        />
      ) : undefined}
    </CategorizedOption>
  );
};
