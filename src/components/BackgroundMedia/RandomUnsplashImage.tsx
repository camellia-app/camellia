import {
  Component, h,
} from 'preact';
import * as classnames from 'classnames';
import * as s from './BackgroundMedia.css';

interface RandomUnsplashImageProps {
}

export interface RandomUnsplashImageState {
  loaded: boolean;
}

export default class RandomUnsplashImage extends Component<RandomUnsplashImageProps, RandomUnsplashImageState> {
  state: RandomUnsplashImageState = {
    loaded: false,
  };

  handleImageLoaded = (): void => {
    this.setState({
      loaded: true,
    });
  };

  render(props: RandomUnsplashImageProps, state: RandomUnsplashImageState) {
    const classes = state.loaded === false
      ? classnames(s.backgroundMedia, s.loading)
      : s.backgroundMedia;

    const pixelRatio = window.devicePixelRatio;

    const realWidth = Math.round(window.screen.width * pixelRatio);
    const realHeight = Math.round(window.screen.height * pixelRatio);

    return (
      <div className={s.backgroundMediaContainer}>
        <img
          className={classes}
          src={`https://source.unsplash.com/featured/${realWidth}x${realHeight}/daily/?dark`}
          alt=""
          onLoad={this.handleImageLoaded}
        />
      </div>
    );
  }
}
