import type { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { useOption } from '../../../api/options/hook';
import { backgroundMedia, backgroundMediaBlurred, backgroundMediaLoading } from './BackgroundMedia.module.css';
import { ImageByUrlFromOptions } from './providers/optionProvider/ImageByUrlFromOptions';
import { PhotoFromUnsplashCollectionByIdFromOptions } from './providers/optionProvider/PhotoFromUnsplashCollectionByIdFromOptions';

export const BackgroundMedia: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgroundProviderType] = useOption('background_provider_type');
  const [blurBackground] = useOption('blur_background');

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const handleSuccessfulLoading = (): void => {
    setIsLoading(false);
  };

  let background: ReactNode | undefined = undefined;

  switch (backgroundProviderType) {
    case 'unsplash_collection':
      background = <PhotoFromUnsplashCollectionByIdFromOptions onLoad={handleSuccessfulLoading} />;

      break;

    case 'link':
      background = <ImageByUrlFromOptions onLoad={handleSuccessfulLoading} />;

      break;

    default:
      break;
  }

  return (
    <div
      className={classNames(backgroundMedia, {
        [backgroundMediaBlurred]: blurBackground === true,
        [backgroundMediaLoading]: isLoading,
      })}
    >
      {background}
    </div>
  );
};
