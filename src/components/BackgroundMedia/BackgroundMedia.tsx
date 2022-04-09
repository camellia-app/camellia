import cn from 'classnames';
import type { ReactElement, VoidFunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import s from './BackgroundMedia.module.css';
import { useOption } from '../../hooks/useOption';
import { UnsplashImageFromCollection } from './providers/UnsplashImageFromCollection';
import { BackgroundImageByUrl } from './providers/BackgroundImageByUrl';
import { BackgroundProviderType } from '../../api/options/options';

export const BackgroundMedia: VoidFunctionComponent = () => {
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
      className={cn(s.backgroundMedia, {
        [s.backgroundMediaLoading]: isLoading,
      })}
    >
      {background}
    </div>
  );
};
