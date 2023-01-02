import PhotoCamera from '@material-design-icons/svg/filled/photo_camera.svg';
import type { FC } from 'react';
import type { UnsplashPhoto } from '../../../../api/unsplash/common';
import { Chip } from '../../../common/Chip/Chip';

export const UnsplashPhotographerAttribution: FC<{
  shape: 'rounded' | 'squared';
  unsplashPhoto: UnsplashPhoto;
}> = (props) => {
  return (
    <Chip
      fallbackSvg={<PhotoCamera />}
      iconEllipse={true}
      iconSrc={props.unsplashPhoto.photographer.avatar.large.url}
      label={`Photo by ${props.unsplashPhoto.photographer.name} on Unsplash`}
      shape={props.shape}
      url={props.unsplashPhoto.webPageUrl}
    />
  );
};
