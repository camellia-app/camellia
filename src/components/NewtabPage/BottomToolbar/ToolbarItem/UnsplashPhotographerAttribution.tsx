import PhotoCamera from '@material-design-icons/svg/filled/photo_camera.svg';
import type { FC } from 'react';
import type { UnsplashPhoto } from '../../../../api/unsplash/common';
import { Chip } from '../../../common/Chip/Chip';

export const UnsplashPhotographerAttribution: FC<{
  shape: 'rounded' | 'squared';
  unsplashPhoto: UnsplashPhoto;
}> = (props) => {
  // Removes emojis and other non-standard symbols from name
  // see https://stackoverflow.com/a/63464318/4981937
  const photographerName = props.unsplashPhoto.photographer.name.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '');

  return (
    <Chip
      fallbackSvg={<PhotoCamera />}
      iconEllipse={true}
      iconSrc={props.unsplashPhoto.photographer.avatar.large.url}
      label={`Photo by ${photographerName} on Unsplash`}
      shape={props.shape}
      url={props.unsplashPhoto.webPageUrl}
    />
  );
};
