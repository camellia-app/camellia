import type { FC } from 'react';
import type { UnsplashPhoto } from '../../../api/unsplash/common';
import { Chip } from '../../Chip/Chip';

export const UnsplashPhotographerAttribution: FC<{
  shape: 'rounded' | 'squared';
  unsplashPhoto: UnsplashPhoto;
}> = (props) => {
  return (
    <Chip
      iconEllipse={true}
      iconSrc={props.unsplashPhoto.photographer.avatar.large.url}
      label={`Photo by ${props.unsplashPhoto.photographer.name}`}
      shape={props.shape}
      url={props.unsplashPhoto.webPageUrl}
    />
  );
};
