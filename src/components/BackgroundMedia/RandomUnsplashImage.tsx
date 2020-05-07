import { h } from 'preact';
import BackgroundImage from './BackgroundImage';

interface RandomUnsplashImageProps {
  imageLoadingFailureHandler: () => void;
}

export default (props: RandomUnsplashImageProps) => {
  const pixelRatio = window.devicePixelRatio;

  const realWidth = Math.round(window.screen.width * pixelRatio);
  const realHeight = Math.round(window.screen.height * pixelRatio);

  const dimensions = {
    height: realHeight,
    width: realWidth,
  };

  return (
    <BackgroundImage url={`https://source.unsplash.com/featured/${realWidth}x${realHeight}/daily/?dark`} dimensions={dimensions} imageLoadingFailureHandler={props.imageLoadingFailureHandler} />
  );
};
