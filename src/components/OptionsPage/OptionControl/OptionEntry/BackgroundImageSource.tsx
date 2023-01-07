import type { FC } from 'react';
import { t } from '../../../../api/i18n/translate';
import { useOption } from '../../../../api/options/hook';
import { CollectionDoesNotExist, getRandomUnsplashPhotoFromCollectionByUrl } from '../../../../api/unsplash';
import { BackgroundPreview } from '../../BackgroundPreview/BackgroundPreview';
import { FilteredOptions } from '../../OptionsCategory/FilteredOptions/FilteredOptions';
import { categoriesMap } from '../../OptionsCategory/OptionsSearchForm/OptionsSearchForm';
import { OptionDropdownSelect } from '../OptionDropdownSelect';
import { OptionTextField } from '../OptionTextField';

export const BackgroundImageSource: FC = () => {
  const [backgroundImageSourceType] = useOption('background_provider_type');

  const validateUnsplashCollection = async (newValue: string): Promise<string | undefined> => {
    try {
      await getRandomUnsplashPhotoFromCollectionByUrl(newValue);
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      if (error instanceof CollectionDoesNotExist) {
        return t('option_backgroundImageUnsplashCollection_error_notFound');
      }
    }

    return undefined;
  };

  return (
    <>
      <FilteredOptions categories={[categoriesMap.background]}>
        <OptionDropdownSelect
          description={t('option_backgroundImage_sourceTypeDescription')}
          dropdownOptions={[
            {
              value: 'link',
              label: t('option_backgroundImage_sourceTypeOptionLink'),
            },
            {
              value: 'unsplash_collection',
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
            description={t('option_backgroundImageUnsplashCollection_description', [
              'https://unsplash.com/collections/123',
            ])}
            label={t('option_backgroundImageUnsplashCollection_label')}
            optionKey="background_image_unsplash_collection"
            pattern={'^https:\\/\\/unsplash\\.com\\/collections\\/[1-9]+[0-9]*?.*'}
            placeholder={t('option_backgroundImageUnsplashCollection_placeholder', [
              'https://unsplash.com/collections/123',
            ])}
            spellCheck={false}
            type={'url'}
            validate={validateUnsplashCollection}
          />
        </FilteredOptions>
      ) : undefined}
    </>
  );
};
