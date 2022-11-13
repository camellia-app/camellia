import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useOption } from '../../api/options/hook';
import { BackgroundProviderType } from '../../api/options/options';
import { backgroundMedia, backgroundMediaLoading } from './BackgroundMedia.module.css';
import { ImageByUrlFromOptions } from './providers/optionProvider/ImageByUrlFromOptions';
import { PhotoFromUnsplashCollectionByIdFromOptions } from './providers/optionProvider/PhotoFromUnsplashCollectionByIdFromOptions';

export const BackgroundMedia: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backgroundProviderType] = useOption('background_provider_type');

  useEffect(() => {
    setIsLoading(true);
  }, []);

  console.count('Rerender <BackgroundMedia>');

  const handleSuccessfulLoading = (): void => {
    setIsLoading(false);
  };

  let background: ReactNode | undefined = undefined;

  switch (backgroundProviderType) {
    case BackgroundProviderType.UnsplashCollection:
      background = <PhotoFromUnsplashCollectionByIdFromOptions onLoad={handleSuccessfulLoading} />;

      break;

    case BackgroundProviderType.Link:
      background = <ImageByUrlFromOptions onLoad={handleSuccessfulLoading} />;

      break;

    default:
      console.log('bg image loading');
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
