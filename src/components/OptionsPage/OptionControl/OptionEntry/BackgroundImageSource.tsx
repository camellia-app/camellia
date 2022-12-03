import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { useOption } from '../../../../api/options/hook';
import { BackgroundProviderType } from '../../../../api/options/options';
import { BackgroundPreview } from '../../BackgroundPreview/BackgroundPreview';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';
import { OptionTextField } from '../OptionTextField';

export const BackgroundImageSource: FC = () => {
  const [backgroundImageSourceType] = useOption('background_provider_type');

  return (
    <>
      <FilteredOptions categories={[categoriesMap.background]}>
        <OptionDropdownSelect
          description={t('option_backgroundImage_sourceTypeDescription')}
          dropdownOptions={[
            {
              value: BackgroundProviderType.Link,
              label: t('option_backgroundImage_sourceTypeOptionLink'),
            },
            {
              value: BackgroundProviderType.UnsplashCollection,
              label: t('option_backgroundImage_sourceTypeOptionUnsplashCollection'),
            },
          ]}
          label={t('option_backgroundImage_sourceTypeLabel')}
          optionKey="background_provider_type"
        />
      </FilteredOptions>

      <FilteredOptions categories={[categoriesMap.background]}>
        <BackgroundPreview />
      </FilteredOptions>

      {backgroundImageSourceType === 'link' ? (
        <FilteredOptions categories={[categoriesMap.background]}>
          <OptionTextField
            description={t('option_backgroundImageLink_description')}
            label={t('option_backgroundImageLink_label')}
            optionKey="background_image_link"
            pattern={'^https:\\/\\/.+'}
            placeholder={t('option_backgroundImageLink_placeholder', ['https://example.com/image.jpg'])}
            spellCheck={false}
            type={'url'}
          />
        </FilteredOptions>
      ) : undefined}

      {backgroundImageSourceType === 'unsplash_collection' ? (
        <FilteredOptions categories={[categoriesMap.background]}>
          <OptionTextField
            description={t('option_backgroundImageUnsplashCollectionId_description', [
              'https://unsplash.com/collections/123',
            ])}
            label={t('option_backgroundImageUnsplashCollectionId_label')}
            optionKey="background_image_unsplash_collection_id"
            pattern={'^https:\\/\\/unsplash\\.com\\/collections\\/[1-9]+[0-9]*?.+'}
            placeholder={t('option_backgroundImageUnsplashCollectionId_placeholder', ['https://example.com/image.jpg'])}
            spellCheck={false}
            type={'url'}
          />
        </FilteredOptions>
      ) : undefined}
    </>
  );
};
