import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { useOption } from '../../../../api/options/hook';
import { BackgroundProviderType } from '../../../../api/options/options';
import { BackgroundPreview } from '../../BackgroundPreview/BackgroundPreview';
import { CategorizedOption } from '../../CategorizedOption/CategorizedOption';
import { categoriesMap } from '../../Navigation/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';
import { OptionTextField } from '../OptionTextField';

export const BackgroundImageSource: FC = () => {
  const [backgroundImageSourceType] = useOption('background_provider_type');

  return (
    <>
      <CategorizedOption categories={[categoriesMap.background]}>
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
      </CategorizedOption>

      <CategorizedOption categories={[categoriesMap.background]}>
        <BackgroundPreview />
      </CategorizedOption>

      {backgroundImageSourceType === 'link' ? (
        <CategorizedOption categories={[categoriesMap.background]}>
          <OptionTextField
            description={t('option_backgroundImageLink_description')}
            label={t('option_backgroundImageLink_label')}
            optionKey="background_image_link"
            pattern={'^https:\\/\\/.+'}
            placeholder={t('option_backgroundImageLink_placeholder', ['https://example.com/image.jpg'])}
            spellCheck={false}
            type={'url'}
          />
        </CategorizedOption>
      ) : undefined}

      {backgroundImageSourceType === 'unsplash_collection' ? (
        <CategorizedOption categories={[categoriesMap.background]}>
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
        </CategorizedOption>
      ) : undefined}
    </>
  );
};
