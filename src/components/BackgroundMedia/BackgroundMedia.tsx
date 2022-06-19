import classNames from 'classnames';
import type { ReactElement, FC } from 'react';
import { useEffect, useState } from 'react';
import { useOption } from '../../api/options/hook';
import { BackgroundProviderType } from '../../api/options/options';
import { backgroundMedia, backgroundMediaLoading } from './BackgroundMedia.module.css';
import { BackgroundImageByUrl } from './providers/BackgroundImageByUrl';
import { UnsplashImageFromCollection } from './providers/UnsplashImageFromCollection';

export const BackgroundMedia: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgroundProviderType] = useOption('background_provider_type');
  const [backgroundImageLink] = useOption('background_image_link');
  const [backgroundImageUnsplashCollectionId] = useOption('background_image_unsplash_collection_id');

  useEffect(() => {
    setIsLoading(true);
  }, [backgroundProviderType]);

  console.info('Rerender <BackgroundMedia>');

  let background: ReactElement | undefined = undefined;

  const handleSuccessfulLoading = (): void => {
    setIsLoading(false);
  };

  switch (backgroundProviderType) {
    case BackgroundProviderType.Link:
      if (backgroundImageLink !== undefined) {
        background = <BackgroundImageByUrl onLoad={handleSuccessfulLoading} url={backgroundImageLink} />;
      }

      break;
    case BackgroundProviderType.UnsplashCollection:
      if (backgroundImageUnsplashCollectionId !== undefined) {
        const collectionId = backgroundImageUnsplashCollectionId.replace(
          /^https:\/\/unsplash\.com\/collections\/([0-9]+)/,
          '$1',
        );

        background = <UnsplashImageFromCollection collectionId={collectionId} onLoad={handleSuccessfulLoading} />;
      }

      break;

    case undefined:
      console.info('Loading background image...');

      break;
  }

  return (
    <div
      className={classNames(backgroundMedia, {
        [backgroundMediaLoading]: isLoading,
      })}
    >
      {background}
    </div>
  );
};
