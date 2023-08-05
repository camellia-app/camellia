import type { FC } from 'react';

import { useOption } from '../../../../../api/options/hook';
import { ImageByUrl } from '../ImageByUrl';

export const ImageByUrlFromOptions: FC<{
  onLoad: () => void;
}> = (props) => {
  const [backgroundImageLink] = useOption('background_image_link');

  if (backgroundImageLink === undefined) {
    return <></>;
  }

  return <ImageByUrl onLoad={props.onLoad} url={backgroundImageLink} />;
};
